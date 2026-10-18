/**
 * Central site configuration. Business details that do not exist yet are
 * `undefined` so the UI shows clearly-labelled placeholders instead of inventions.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const site = {
  name: "Launchframe",
  tagline: "Websites that turn attention into enquiries.",
  description:
    "Launchframe builds strategic, high-performing websites that help small businesses look their best, earn customer trust, and turn more visitors into opportunities.",
  url: rawUrl.replace(/\/+$/, ""),
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined,
    phone: process.env.NEXT_CONTACT_PHONE?.trim() || undefined,
    location: process.env.NEXT_PUBLIC_CONTACT_LOCATION?.trim() || undefined,
    /** Digits only, international format, no "+" (e.g. 919876543210). */
    whatsapp: process.env.NEXT_WHATSAPP_NUMBER?.trim() || undefined,
  },
  /** Landing page pricing line. Placeholders show until real values are set. */
  pricing: {
    startingPrice: process.env.NEXT_PUBLIC_STARTING_PRICE?.trim() || "₹10k",
    deliveryDays: process.env.NEXT_PUBLIC_DELIVERY_DAYS?.trim() || "5 working",
  },
  /** Add real profile URLs here. Nothing is rendered while this is empty. */
  social: [] as { label: string; href: string }[],
  /** Set to true once a Terms of Service page exists. */
  hasTerms: false,
};

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** wa.me link with an optional prefilled message. `undefined` while no number is configured. */
export function whatsappUrl(message?: string) {
  if (!site.contact.whatsapp) return undefined;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${text}`;
}

/** `tel:` link. `undefined` while no phone number is configured. */
export function callUrl() {
  return site.contact.phone ? `tel:${site.contact.phone.replace(/[^+\d]/g, "")}` : undefined;
}
