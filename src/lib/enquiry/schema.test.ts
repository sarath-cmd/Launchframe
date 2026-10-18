import { describe, expect, it } from "vitest";
import { CONTACT_REQUIRED, enquiryFieldsSchema, isPhone, normaliseUrl, validateEnquiry } from "./schema";

const valid = {
  name: "Sam Rivera",
  business: "Rivera Plumbing",
  phone: "",
  email: "sam@example.com",
  service: "website-redesign",
  budget: "medium",
  existingUrl: "",
  consent: true,
};

const check = (over: Record<string, unknown>) => validateEnquiry(enquiryFieldsSchema, { ...valid, ...over });

describe("validateEnquiry", () => {
  it("accepts a complete enquiry with email only, phone only, or both", () => {
    expect(check({}).success).toBe(true);
    expect(check({ email: "", phone: "+44 20 7946 0958" }).success).toBe(true);
    expect(check({ phone: "(555) 010-2030" }).success).toBe(true);
  });

  it("requires at least one way to reply, reported alongside other errors", () => {
    const result = check({ email: "", phone: "", name: "" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.errors.email).toBe(CONTACT_REQUIRED);
    expect(result.errors.name).toMatch(/your name/i);
  });

  it("validates the format of whichever contact fields are filled", () => {
    const result = check({ email: "nope", phone: "12" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.errors.email).toMatch(/valid email/i);
    expect(result.errors.phone).toMatch(/valid phone/i);
  });

  it("rejects a service outside the configured options, and an empty budget", () => {
    expect(check({ service: "logo-design" }).success).toBe(false);
    expect(check({ budget: "" }).success).toBe(false);
    expect(check({ budget: "  " }).success).toBe(false);
    expect(check({ service: "not-sure" }).success).toBe(true);
  });

  it("allows an optional existing URL with or without protocol, but not nonsense", () => {
    expect(check({ existingUrl: "example.com" }).success).toBe(true);
    expect(check({ existingUrl: "not a url" }).success).toBe(false);
  });

  it("requires consent", () => {
    const result = check({ consent: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.consent).toMatch(/confirm/i);
  });
});

describe("helpers", () => {
  it("normaliseUrl adds https and rejects dangerous schemes", () => {
    expect(normaliseUrl("example.com")).toBe("https://example.com/");
    expect(normaliseUrl("javascript:alert(1)")).toBeNull();
    expect(normaliseUrl("")).toBeNull();
  });

  it("isPhone accepts common formats and rejects junk", () => {
    expect(isPhone("+91 91234 56780")).toBe(true);
    expect(isPhone("020 7946 0958")).toBe(true);
    expect(isPhone("call me")).toBe(false);
    expect(isPhone("123")).toBe(false);
  });
});
