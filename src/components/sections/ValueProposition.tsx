import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const problems = [
  "It looks outdated",
  "Customers struggle to understand what you offer",
  "It does not work well on mobile",
  "Getting in touch or requesting a quote is awkward",
  "The business looks less credible online than in real life",
];

const outcomes = [
  { title: "Look more professional", text: "Create a strong first impression that reflects the quality of your business." },
  { title: "Build customer confidence", text: "Make your services, expertise, and value easy to understand." },
  { title: "Make enquiries easier", text: "Guide visitors toward requesting a quote, booking a consultation, or contacting your business." },
];

export function ValueProposition() {
  return (
    <section aria-labelledby="value-title" className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading eyebrow="Why it matters" title={<span id="value-title">Your website should work as hard as you do.</span>} />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-12" delay={100}>
            <p className="text-lead text-ink-soft">
              Many good businesses lose enquiries to a website that does not do them justice. The usual reasons:
            </p>
            <ul className="mt-6 space-y-2.5 text-ink-soft">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-line-strong" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8 lg:mt-20">
          {outcomes.map(({ title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 80}>
                <span className="font-mono text-sm text-cobalt">0{i + 1}</span>
                <h3 className="text-h3 mt-4">{title}</h3>
                <p className="mt-3 max-w-sm text-ink-soft">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
