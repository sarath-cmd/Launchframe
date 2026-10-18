import { Smartphone, MessageSquareText, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  {
    icon: Smartphone,
    title: "Looks professional on phones",
    text: "Most of your customers will find you on a phone, so that's where it has to look its best.",
  },
  {
    icon: MessageSquareText,
    title: "Makes your services clear",
    text: "No jargon, no clutter — just what you offer, laid out so it's easy to understand at a glance.",
  },
  {
    icon: PhoneCall,
    title: "Makes it easy to get in touch",
    text: "WhatsApp, call or enquire in one tap, so interested visitors don't drop off before contacting you.",
  },
];

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-title" className="border-t border-line bg-sand py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Why it works"
            title={<span id="benefits-title">Built for how customers actually find you.</span>}
            className="mx-auto"
          />
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-paper p-7 shadow-soft transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_24px_40px_-24px_rgb(17_19_24/0.3)]">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-cobalt-tint">
                    <Icon aria-hidden className="size-6 text-cobalt" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
                  <p className="mt-2 text-ink-soft">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
