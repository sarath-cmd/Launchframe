import { z } from "zod";
import { serviceValues } from "./options";

/** Accepts "example.com" or a full URL; returns a normalised https URL or null. */
export function normaliseUrl(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Loose international phone check: allowed characters, and 7 to 15 digits. */
export function isPhone(input: string) {
  const value = input.trim();
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

const emailCheck = z.email();

export const enquiryFieldsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please keep your name under 100 characters."),
  business: z
    .string()
    .trim()
    .min(2, "Please enter your business name.")
    .max(120, "Please keep the business name under 120 characters."),
  phone: z
    .string()
    .trim()
    .max(30, "That phone number is too long.")
    .refine((v) => v === "" || isPhone(v), "Enter a valid phone number, including the area code."),
  email: z
    .string()
    .trim()
    .max(254, "That email address is too long.")
    .refine((v) => v === "" || emailCheck.safeParse(v).success, "Enter a valid email address, such as name@example.com."),
  service: z.enum(serviceValues, { error: "Choose the service you need." }),
  budget: z
    .string()
    .trim()
    .min(1, "Enter your approximate budget.")
    .max(100, "Please keep the budget under 100 characters."),
  existingUrl: z
    .string()
    .trim()
    .max(300, "That web address is too long.")
    .refine((v) => v === "" || normaliseUrl(v) !== null, "Enter a web address like example.com, or leave this blank."),
  consent: z.boolean().refine((v) => v === true, "Please confirm you are happy for us to use these details to reply."),
});

/** What the browser sends: the fields plus anti-spam and idempotency metadata. */
export const enquirySubmissionSchema = enquiryFieldsSchema.extend({
  submissionId: z.string().min(8).max(64),
  /** Honeypot. Real users never see or fill this. */
  website: z.string().max(0).optional().default(""),
  /** Epoch ms when the form was first shown. */
  startedAt: z.number().int(),
});

export type EnquiryFields = z.infer<typeof enquiryFieldsSchema>;
export type EnquirySubmission = z.infer<typeof enquirySubmissionSchema>;
export type FieldErrors = Partial<Record<keyof EnquiryFields, string>>;

export const CONTACT_REQUIRED = "Add a phone number or an email address so we can reply.";

/** Flattens zod issues to the first message per field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !(key in out)) out[key] = issue.message;
  }
  return out as FieldErrors;
}

/**
 * Full validation used by both the form and the API, including the
 * cross-field rule that at least one of phone or email is given.
 * (Done here rather than in a zod refinement so the rule is reported
 * alongside other field errors, not only after they are fixed.)
 */
export function validateEnquiry<S extends typeof enquiryFieldsSchema | typeof enquirySubmissionSchema>(
  schema: S,
  input: unknown,
): { success: true; data: z.infer<S> } | { success: false; errors: FieldErrors } {
  const result = schema.safeParse(input);
  const errors: FieldErrors = result.success ? {} : toFieldErrors(result.error);

  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (!phone && !email) errors.email ??= CONTACT_REQUIRED;

  return result.success && Object.keys(errors).length === 0
    ? { success: true, data: result.data as z.infer<S> }
    : { success: false, errors };
}
