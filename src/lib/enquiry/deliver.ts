import "server-only";
import { labelFor, serviceOptions } from "./options";
import { normaliseUrl, type EnquiryFields } from "./schema";

interface DeliveryConfig {
  apiKey: string;
  to: string;
  from: string;
}

/** Reads server-only env vars. Returns null unless every required value is set. */
export function getDeliveryConfig(): DeliveryConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ENQUIRY_TO_EMAIL?.trim();
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim();
  return apiKey && to && from ? { apiKey, to, from } : null;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Strips CR/LF so user input can never inject extra email headers. */
const singleLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function buildEmail(fields: EnquiryFields) {
  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Business", fields.business],
    ["Phone", fields.phone || "Not provided"],
    ["Email", fields.email || "Not provided"],
    ["Service needed", labelFor(serviceOptions, fields.service)],
    ["Approximate budget", singleLine(fields.budget)],
    ["Existing website", normaliseUrl(fields.existingUrl) ?? "Not provided"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table>${rows
    .map(([k, v]) => `<tr><th align="left" style="padding-right:12px">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;
  return {
    subject: `New project enquiry: ${singleLine(fields.business)}`.slice(0, 200),
    text,
    html,
  };
}

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

export async function deliverEnquiry(fields: EnquiryFields, idempotencyKey: string): Promise<DeliveryResult> {
  const config = getDeliveryConfig();
  if (!config) return { ok: false, reason: "not_configured" };

  const { subject, text, html } = buildEmail(fields);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        // Reply goes straight to the enquirer when they gave an email.
        ...(fields.email ? { reply_to: fields.email } : {}),
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? { ok: true } : { ok: false, reason: "provider_error" };
  } catch {
    return { ok: false, reason: "provider_error" };
  }
}
