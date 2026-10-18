import { MessageCircle, Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { callUrl, whatsappUrl } from "@/lib/site";

interface CtaButtonsProps {
  size?: "md" | "lg";
  className?: string;
  message?: string;
  /** Use "inverse" on a dark/cobalt background so both buttons stay legible. */
  tone?: "default" | "inverse";
}

/**
 * The WhatsApp + Call pair used at the top and bottom of the landing page.
 * Falls back to /contact while the real numbers are not yet configured.
 */
export function CtaButtons({
  size = "lg",
  className = "",
  message = "Hi! I'd like to talk about a website.",
  tone = "default",
}: CtaButtonsProps) {
  const whatsapp = whatsappUrl(message);
  const call = callUrl();
  const inverse = tone === "inverse";

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={whatsapp ?? "/contact"}
        {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={buttonClasses(inverse ? "inverse" : "primary", size)}
      >
        <MessageCircle aria-hidden className="size-5" />
        WhatsApp me
      </a>
      <a href={call ?? "/contact"} className={buttonClasses("secondary", size, inverse ? "border-ivory! text-ivory! hover:bg-ivory! hover:text-ink!" : "")}>
        <Phone aria-hidden className="size-5" />
        Call
      </a>
    </div>
  );
}
