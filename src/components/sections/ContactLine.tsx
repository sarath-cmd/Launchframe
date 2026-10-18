import { Container } from "@/components/ui/Container";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function ContactLine() {
  const { phone, email } = site.contact;
  const line = phone || email || "Message me on WhatsApp and I'll reply the same day.";

  return (
    <section aria-labelledby="contact-title" className="on-cobalt relative overflow-hidden bg-cobalt py-20 text-center text-ivory lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_110%,rgb(255_255_255/0.14),transparent)]" />
        <div className="absolute top-0 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl">
          <h2 id="contact-title" className="text-h2">
            {line}
          </h2>
          <p className="mt-4 text-ivory/80">Usually replies within the hour.</p>
          <CtaButtons className="mt-9 justify-center" size="lg" tone="inverse" />
        </Reveal>
      </Container>
    </section>
  );
}
