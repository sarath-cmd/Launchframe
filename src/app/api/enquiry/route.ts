import { NextResponse } from "next/server";
import { deliverEnquiry } from "@/lib/enquiry/deliver";
import { isRateLimited, markSubmitted, wasAlreadySubmitted } from "@/lib/enquiry/guards";
import { enquirySubmissionSchema, validateEnquiry } from "@/lib/enquiry/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
/** Humans take longer than this to fill the form; scripts often don't. */
const MIN_FILL_MS = 3_000;

type ErrorCode = "invalid" | "rate_limited" | "not_configured" | "delivery_failed" | "forbidden" | "too_large";

const fail = (status: number, code: ErrorCode, message: string, fieldErrors?: unknown) =>
  NextResponse.json({ ok: false, code, message, fieldErrors }, { status });

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser or same-origin GET-less request
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return fail(403, "forbidden", "This request was not allowed.");

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return fail(413, "too_large", "That submission is too large.");

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return fail(413, "too_large", "That submission is too large.");
    body = JSON.parse(raw);
  } catch {
    return fail(400, "invalid", "We could not read that submission. Please try again.");
  }

  if (isRateLimited(clientKey(request))) {
    return fail(429, "rate_limited", "Too many attempts. Please wait a few minutes and try again.");
  }

  // A filled honeypot is a bot: pretend success so it learns nothing.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = validateEnquiry(enquirySubmissionSchema, body);
  if (!parsed.success) {
    return fail(400, "invalid", "Please check the highlighted fields.", parsed.errors);
  }

  const { submissionId, startedAt, website: _honeypot, ...fields } = parsed.data;
  void _honeypot;

  if (Date.now() - startedAt < MIN_FILL_MS) {
    return fail(400, "invalid", "That was submitted too quickly. Please try again.");
  }

  // Duplicate of a submission that already succeeded: report success without re-sending.
  if (wasAlreadySubmitted(submissionId)) return NextResponse.json({ ok: true, duplicate: true });

  const result = await deliverEnquiry(fields, submissionId);
  if (!result.ok) {
    if (result.reason === "not_configured") {
      return fail(
        503,
        "not_configured",
        "Online enquiries are not switched on yet, so your message has not been sent.",
      );
    }
    return fail(502, "delivery_failed", "We could not send your enquiry just now. Please try again in a moment.");
  }

  markSubmitted(submissionId);
  return NextResponse.json({ ok: true });
}
