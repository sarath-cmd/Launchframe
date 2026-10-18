import { services } from "@/content/services";

/** Business-configurable choices for the enquiry form. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

export function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}
