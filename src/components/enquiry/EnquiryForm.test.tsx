import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnquiryForm } from "./EnquiryForm";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function fillValid(user: ReturnType<typeof userEvent.setup>, contact: { phone?: string; email?: string } = { email: "sam@example.com" }) {
  await user.type(screen.getByLabelText(/your name/i), "Sam Rivera");
  await user.type(screen.getByLabelText(/business name/i), "Rivera Plumbing");
  if (contact.phone) await user.type(screen.getByLabelText(/phone number/i), contact.phone);
  if (contact.email) await user.type(screen.getByLabelText(/email address/i), contact.email);
  await user.click(screen.getByLabelText("Website Redesign"));
  await user.type(screen.getByLabelText(/approximate budget/i), "₹20,000");
  await user.click(screen.getByLabelText(/i agree/i));
}

describe("EnquiryForm", () => {
  it("is a single step with all fields visible", () => {
    render(<EnquiryForm />);
    for (const label of [/your name/i, /business name/i, /phone number/i, /email address/i, /your current website/i]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByRole("group", { name: /what service do you need/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/approximate budget/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /continue/i })).not.toBeInTheDocument();
  });

  it("summarises errors, including the phone-or-email rule, when submitted empty", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<EnquiryForm />);
    await user.click(screen.getByRole("button", { name: /send project enquiry/i }));
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/things to fix/i);
    expect(alert).toHaveTextContent(/phone number or an email/i);
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts a phone number instead of an email", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<EnquiryForm />);
    await fillValid(user, { phone: "+44 20 7946 0958" });
    await user.click(screen.getByRole("button", { name: /send project enquiry/i }));
    await waitFor(() => expect(screen.getByText(/your enquiry has been sent/i)).toBeInTheDocument());
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
    expect(body).toMatchObject({ phone: "+44 20 7946 0958", email: "", service: "website-redesign", budget: "₹20,000" });
  });

  it("shows an error, not success, when the server cannot deliver", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: false, code: "not_configured", message: "Online enquiries are not switched on yet." }), { status: 503 }),
      ),
    );
    render(<EnquiryForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send project enquiry/i }));
    await waitFor(() => expect(screen.getByText(/has not been sent/i)).toBeInTheDocument());
    expect(screen.queryByText(/your enquiry has been sent/i)).not.toBeInTheDocument();
  });

  it("submits once even when double-clicked", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<EnquiryForm />);
    await fillValid(user);
    await user.dblClick(screen.getByRole("button", { name: /send project enquiry/i }));
    await waitFor(() => expect(screen.getByText(/your enquiry has been sent/i)).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
