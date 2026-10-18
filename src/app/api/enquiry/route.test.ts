import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { resetGuards } from "@/lib/enquiry/guards";

const payload = (over: Record<string, unknown> = {}) => ({
  name: "Sam Rivera",
  business: "Rivera Plumbing",
  phone: "",
  email: "sam@example.com",
  service: "website-development",
  budget: "unsure",
  existingUrl: "",
  consent: true,
  submissionId: "abcdefgh-1234",
  website: "",
  startedAt: Date.now() - 10_000,
  ...over,
});

const request = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/enquiry", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

describe("POST /api/enquiry", () => {
  beforeEach(() => {
    resetGuards();
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("ENQUIRY_TO_EMAIL", "");
    vi.stubEnv("ENQUIRY_FROM_EMAIL", "");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns field errors for invalid input", async () => {
    const res = await POST(request(payload({ email: "bad" })));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.fieldErrors.email).toBeTruthy();
  });

  it("requires a phone number or an email", async () => {
    const res = await POST(request(payload({ email: "", phone: "" })));
    expect(res.status).toBe(400);
    expect((await res.json()).fieldErrors.email).toMatch(/phone number or an email/i);
  });

  it("does not claim success when delivery is not configured", async () => {
    const res = await POST(request(payload()));
    expect(res.status).toBe(503);
    expect((await res.json()).code).toBe("not_configured");
  });

  it("rejects submissions made implausibly fast", async () => {
    const res = await POST(request(payload({ startedAt: Date.now() })));
    expect(res.status).toBe(400);
  });

  it("silently accepts honeypot hits without delivering", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request(payload({ website: "http://spam.example" })));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects cross-origin requests", async () => {
    const res = await POST(request(payload(), { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("sends once via the provider and de-duplicates repeat submissions", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("ENQUIRY_TO_EMAIL", "hello@example.com");
    vi.stubEnv("ENQUIRY_FROM_EMAIL", "site@example.com");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    expect((await POST(request(payload()))).status).toBe(200);
    const second = await POST(request(payload()));
    expect((await second.json()).duplicate).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sent = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
    expect(sent.reply_to).toBe("sam@example.com");
    expect(sent.text).toContain("Service needed: Website Development");
  });

  it("delivers phone-only enquiries without a reply-to address", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("ENQUIRY_TO_EMAIL", "hello@example.com");
    vi.stubEnv("ENQUIRY_FROM_EMAIL", "site@example.com");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request(payload({ email: "", phone: "+44 20 7946 0958", submissionId: "phone-only-1" })));
    expect(res.status).toBe(200);
    const sent = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
    expect(sent.reply_to).toBeUndefined();
    expect(sent.text).toContain("Phone: +44 20 7946 0958");
  });

  it("reports provider failures as errors, not success", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("ENQUIRY_TO_EMAIL", "hello@example.com");
    vi.stubEnv("ENQUIRY_FROM_EMAIL", "site@example.com");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    const res = await POST(request(payload({ submissionId: "different-id-1" })));
    expect(res.status).toBe(502);
  });

  it("rate limits repeated attempts from one client", async () => {
    let last = 0;
    for (let i = 0; i < 7; i++) {
      last = (await POST(request(payload({ email: "bad" }), { "x-forwarded-for": "9.9.9.9" }))).status;
    }
    expect(last).toBe(429);
  });
});
