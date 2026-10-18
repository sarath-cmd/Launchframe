import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PromoVideo } from "./PromoVideo";

const expectations = [
  ["A website shaped around your goals", "We start with what you want the site to achieve, then design to that."],
  ["Clear communication throughout", "You always know what is happening, what is next, and what we need from you."],
  ["Design decisions with a purpose", "Every layout, colour and headline choice has a reason we can explain."],
  ["Responsive across devices", "Built and checked on phones, tablets and desktops, not just shrunk to fit."],
  ["Performance and accessibility from the start", "Fast loading and usable by more people, considered early rather than patched in later."],
  ["A clear process with defined deliverables", "You know what you will receive at each stage before it begins."],
  ["Straightforward to manage and improve", "A site you can understand, update and grow as your business changes."],
] as const;

export function WhyLaunchframe() {
  return (
    <section aria-labelledby="why-title" className="on-ink bg-ink py-20 text-ivory lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            tone="inverse"
            eyebrow="Why Launchframe"
            title={<span id="why-title">A better website starts with understanding your business.</span>}
            lead="We do not simply build websites that look good. We build websites that help businesses present themselves professionally, communicate their value, and make it easier for potential customers to take action."
          />
          <div className="mt-10 max-w-75">
            <PromoVideo />
          </div>
        </Reveal>
        <ol className="lg:col-span-6 lg:col-start-7">
          {expectations.map(([title, text], i) => (
            <li key={title}>
              <Reveal
                delay={(i % 4) * 50}
                className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-ivory/15 py-6 first:border-t-0 first:pt-0"
              >
                <span aria-hidden className="pt-1 font-mono text-sm text-ivory/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
                  <p className="mt-1 text-ivory/70">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
