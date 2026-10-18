import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { DesktopMockup, MobileMockup } from "@/components/mockups/ProjectMockup";
import { services } from "@/content/services";

const delay = (d: number) => ({ "--d": `${d}ms` }) as CSSProperties;

function HeroComposition() {
  return (
    <div
      className="relative aspect-[6/5] w-full"
      role="group"
      aria-label="Illustrative concept designs: a home services website, a restaurant site on mobile and a consulting website"
    >
      <div className="anim-drift absolute left-0 top-0 w-[52%]" style={delay(250)}>
        <DesktopMockup mockup="clearpath" />
      </div>
      <div className="anim-drift absolute right-0 top-[11%] z-10 w-[74%]" style={delay(100)}>
        <DesktopMockup mockup="northline" />
      </div>
      <div className="anim-drift absolute bottom-[2%] left-[3%] z-20 w-[21%]" style={delay(400)}>
        <MobileMockup mockup="daily-table" />
      </div>
      <p className="absolute bottom-0 right-0 text-xs text-muted">Illustrative concept designs</p>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid items-center gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="text-eyebrow anim-rise mb-6 text-cobalt" style={delay(0)}>
            Web design &amp; development studio
          </p>
          <h1 id="hero-title" className="text-display anim-rise" style={delay(80)}>
            Websites that turn attention into <span className="text-cobalt">enquiries.</span>
          </h1>
          <p className="text-lead anim-rise mt-7 max-w-xl text-ink-soft" style={delay(180)}>
            Launchframe builds strategic, high-performing websites that help small businesses look their best, earn
            customer trust, and turn more visitors into opportunities.
          </p>
          <div className="anim-rise mt-9 flex flex-col gap-3 sm:flex-row" style={delay(260)}>
            <ButtonLink href="/contact" size="lg" arrow>
              Start Your Project
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary" size="lg">
              Explore Our Work
            </ButtonLink>
          </div>
          <p className="anim-rise mt-6 text-sm text-muted" style={delay(340)}>
            Built around your business. Designed for your customers.
          </p>
        </div>
        <div className="lg:col-span-6 lg:pl-4">
          <HeroComposition />
        </div>
      </Container>

      {/* Capability strip */}
      <div className="border-t border-line">
        <Container>
          <ul aria-label="What we do" className="flex flex-wrap gap-x-8 gap-y-2 py-5 text-sm text-muted">
            {services.map((s) => (
              <li key={s.slug} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rounded-full bg-cobalt" />
                {s.title}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
