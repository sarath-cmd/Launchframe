import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

/** Sticky mobile-friendly WhatsApp shortcut. Hidden while no number is configured. */
export function FloatingWhatsApp() {
  const href = whatsappUrl("Hi! I'd like to talk about a website.");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_rgb(0_0_0/0.4)] transition-transform duration-300 motion-safe:hover:scale-110 lg:bottom-8 lg:right-8"
    >
      <MessageCircle aria-hidden className="size-7" />
    </a>
  );
}
