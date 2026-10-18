"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  CONTACT_REQUIRED,
  enquiryFieldsSchema,
  validateEnquiry,
  type EnquiryFields,
  type FieldErrors,
} from "@/lib/enquiry/schema";
import { serviceOptions } from "@/lib/enquiry/options";
import { Button } from "@/components/ui/Button";
import { Checkbox, ChoiceChips, FieldError, TextField } from "./fields";

const initialValues: EnquiryFields = {
  name: "",
  business: "",
  phone: "",
  email: "",
  service: "" as EnquiryFields["service"],
  budget: "" as EnquiryFields["budget"],
  existingUrl: "",
  consent: false,
};

/** Display order, used for the error summary. */
const fieldOrder: (keyof EnquiryFields)[] = ["name", "business", "phone", "email", "service", "budget", "existingUrl", "consent"];

type Status = "idle" | "submitting" | "success" | "error";

interface EnquiryFormProps {
  /** Shown if the server reports that delivery is not configured. */
  fallbackEmail?: string;
}

export function EnquiryForm({ fallbackEmail }: EnquiryFormProps) {
  const [values, setValues] = useState<EnquiryFields>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryFields, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [showAll, setShowAll] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const submissionId = useRef("");
  const submittingRef = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validation = validateEnquiry(enquiryFieldsSchema, values);
  const liveErrors: FieldErrors = validation.success ? {} : validation.errors;

  const visibleErrors: FieldErrors = {};
  for (const f of fieldOrder) {
    const err = serverErrors[f] ?? liveErrors[f];
    // The "phone or email" message waits until both contact fields have been visited.
    const seen = err === CONTACT_REQUIRED ? touched.phone && touched.email : touched[f];
    if (err && (showAll || seen || serverErrors[f])) visibleErrors[f] = err;
  }

  const set = <K extends keyof EnquiryFields>(key: K, value: EnquiryFields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (serverErrors[key] || ((key === "phone" || key === "email") && serverErrors.email)) {
      setServerErrors((e) => ({ ...e, [key]: undefined, ...(key === "phone" ? { email: undefined } : {}) }));
    }
  };
  const blur = (key: keyof EnquiryFields) => setTouched((t) => ({ ...t, [key]: true }));

  async function submit() {
    if (submittingRef.current) return; // guards against double clicks / Enter
    submittingRef.current = true;
    setStatus("submitting");
    setMessage("");
    submissionId.current ||= crypto.randomUUID();

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submissionId: submissionId.current, website: "", startedAt: startedAt.current }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        message?: string;
        fieldErrors?: FieldErrors;
      } | null;

      if (response.ok && data?.ok) {
        setStatus("success");
        return;
      }
      if (data?.fieldErrors) {
        setServerErrors(data.fieldErrors);
        setShowAll(true);
      }
      setMessage(data?.message ?? "Something went wrong and your enquiry has not been sent. Please try again.");
      if (data?.code === "invalid") submissionId.current = "";
      setStatus("error");
    } catch {
      setMessage("We could not reach the server. Check your connection and try again. Your answers are still here.");
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "submitting") return;
    if (!validation.success) {
      setShowAll(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    void submit();
  }

  if (status === "success") {
    const replyTo = values.email || values.phone;
    return (
      <div role="status" className="rounded-2xl border border-line-strong bg-paper p-6 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-cobalt text-ivory">
          <Check aria-hidden className="size-6" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="text-h2 mt-6 outline-none">
          Thank you, {values.name.split(" ")[0]}. Your enquiry has been sent.
        </h2>
        <p className="text-lead mt-4 text-ink-soft">
          We will get back to you on <strong className="font-semibold text-ink">{replyTo}</strong>.
        </p>
        <h3 className="mt-8 font-semibold">What happens next</h3>
        <ol className="mt-3 space-y-3 text-ink-soft">
          <li className="flex gap-3"><span className="font-mono text-cobalt">1</span>We read your enquiry and think about how we can help.</li>
          <li className="flex gap-3"><span className="font-mono text-cobalt">2</span>We contact you with a few questions or suggested next steps.</li>
          <li className="flex gap-3"><span className="font-mono text-cobalt">3</span>If we are a good fit, we agree a written scope and quote before any work starts.</li>
        </ol>
        <Link href="/work" className="mt-8 inline-block font-medium underline underline-offset-4 hover:text-cobalt">
          Explore our work while you wait
        </Link>
      </div>
    );
  }

  const submitting = status === "submitting";
  const errorList = fieldOrder.filter((f) => visibleErrors[f]).map((f) => [f, visibleErrors[f]!] as const);
  const contactError = visibleErrors.email === CONTACT_REQUIRED ? CONTACT_REQUIRED : undefined;

  const focusField = (field: keyof EnquiryFields) => {
    const target = document.querySelector<HTMLElement>(`[name="${field}"]`);
    target?.focus();
    target?.scrollIntoView({ block: "center" });
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="enquiry-heading" className="relative rounded-2xl border border-line-strong bg-paper p-5 sm:p-10">
      <h2 id="enquiry-heading" className="text-h3">Project enquiry</h2>
      <p className="mt-1 text-muted">Takes about a minute. Fields marked optional can be left blank.</p>

      {showAll && errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 rounded-xl border border-danger bg-danger-tint p-4 outline-none">
          <p className="font-semibold text-danger">
            {errorList.length === 1 ? "There is 1 thing to fix:" : `There are ${errorList.length} things to fix:`}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorList.map(([field, text]) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  className="underline"
                  onClick={(e) => {
                    e.preventDefault();
                    focusField(field);
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech, left empty by real users. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="mt-8 space-y-7">
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField id="name" label="Your name" autoComplete="name" value={values.name} error={visibleErrors.name}
            onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} />
          <TextField id="business" label="Business name" autoComplete="organization" value={values.business} error={visibleErrors.business}
            onChange={(e) => set("business", e.target.value)} onBlur={() => blur("business")} />
        </div>

        <fieldset aria-describedby={contactError ? "contact-error" : "contact-hint"}>
          <legend className="font-medium">How can we reach you?</legend>
          <p id="contact-hint" className="mb-3 mt-1 text-sm text-muted">A phone number or an email address. Either is fine.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" value={values.phone}
              error={contactError ? undefined : visibleErrors.phone} invalid={!!contactError}
              onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")} />
            <TextField id="email" label="Email address" type="email" autoComplete="email" inputMode="email" value={values.email}
              error={contactError ? undefined : visibleErrors.email} invalid={!!contactError}
              onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} />
          </div>
          <FieldError id="contact-error" message={contactError} />
        </fieldset>

        <ChoiceChips name="service" legend="What service do you need?" value={values.service} options={serviceOptions}
          error={visibleErrors.service} onChange={(v) => { set("service", v); blur("service"); }} />

        <TextField id="budget" label="Approximate budget" inputMode="text" autoComplete="off"
          placeholder="e.g. ₹20,000" hint="Give us a figure or a range — whatever you have in mind." value={values.budget}
          error={visibleErrors.budget} onChange={(e) => set("budget", e.target.value)} onBlur={() => blur("budget")} />

        <TextField id="existingUrl" label="Your current website" optional type="text" inputMode="url" autoComplete="url"
          hint="If you already have a website, paste the link." placeholder="example.com" value={values.existingUrl}
          error={visibleErrors.existingUrl}
          onChange={(e) => set("existingUrl", e.target.value)} onBlur={() => blur("existingUrl")} />

        <Checkbox id="consent" checked={values.consent} error={visibleErrors.consent}
          onChange={(e) => { set("consent", e.target.checked); blur("consent"); }}>
          I agree that Launchframe may use these details to reply to my enquiry, as described in the{" "}
          <Link href="/privacy" className="font-medium text-ink underline underline-offset-2">Privacy Policy</Link>.
        </Checkbox>
      </div>

      {status === "error" && message && (
        <div role="alert" className="mt-8 rounded-xl border border-danger bg-danger-tint p-4 text-danger">
          <p className="font-semibold">Your enquiry has not been sent.</p>
          <p className="mt-1 text-ink">{message}</p>
          {fallbackEmail && (
            <p className="mt-2 text-ink">
              You can also email us at <a className="font-medium underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>.
            </p>
          )}
        </div>
      )}

      <Button type="submit" size="lg" disabled={submitting} aria-disabled={submitting} className="mt-10 w-full sm:w-auto">
        {submitting ? (
          <><Loader2 aria-hidden className="size-4 animate-spin" /> Sending…</>
        ) : (
          <>Send Project Enquiry <ArrowRight aria-hidden className="size-4" /></>
        )}
      </Button>
      <p className="sr-only" role="status" aria-live="polite">{submitting ? "Sending your enquiry" : ""}</p>
    </form>
  );
}
