import type { CSSProperties } from "react";
import { Zap, ShieldCheck, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { HeroMockup } from "@/components/sections/HeroMockup";

const delay = (d: number) => ({ "--d": `${d}ms` }) as CSSProperties;

const badges = [
  { icon: Zap, label: "Live in days, not months" },
  { icon: Smartphone, label: "Built mobile-first" },
  { icon: ShieldCheck, label: "No templates, no lock-in" },
];

export function LandingHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      {/* Decorative backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,var(--color-cobalt-tint),transparent)]" />
        <div className="absolute top-1/2 left-1/2 size-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="text-center lg:col-span-6 lg:text-left">
          <p
            className="text-eyebrow anim-rise mx-auto flex w-fit items-center gap-2 rounded-full border border-cobalt/20 bg-cobalt-tint px-4 py-1.5 text-cobalt lg:mx-0"
            style={delay(0)}
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cobalt opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-cobalt" />
            </span>
            Taking on new projects this month
          </p>

          <h1 id="hero-title" className="text-display anim-rise mx-auto mt-6 max-w-xl lg:mx-0" style={delay(80)}>
            Websites that turn visitors into <span className="text-cobalt">enquiries.</span>
          </h1>
          <p className="text-lead anim-rise mx-auto mt-6 max-w-lg text-ink-soft lg:mx-0" style={delay(160)}>
            I design and build fast, professional websites for local businesses that want more calls, bookings and
            quote requests, without the agency price tag.
          </p>

          <div className="anim-rise mt-9" style={delay(240)}>
            <CtaButtons className="justify-center lg:justify-start" />
          </div>

          <ul
            className="anim-rise mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-line pt-7 text-sm text-ink-soft lg:mx-0 lg:justify-start"
            style={delay(320)}
          >
            {badges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon aria-hidden className="size-4 text-cobalt" strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <HeroMockup />
        </div>
      </Container>
    </section>
  );
}
