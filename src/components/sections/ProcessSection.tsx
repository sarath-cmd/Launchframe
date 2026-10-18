import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-24 py-20 lg:py-32">
      <Container>
        <Reveal>
        <SectionHeading
          eyebrow="Our process"
          title={<span id="process-title">A clear process. No unnecessary complexity.</span>}
        />
        </Reveal>
        <Reveal as="ol" className="relative mt-14 grid gap-0 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* connecting rule on desktop */}
          <span aria-hidden className="draw-x absolute left-0 right-0 top-[2.1rem] hidden h-px origin-left bg-cobalt/40 lg:block" />
          {processSteps.map((step, i) => (
            <li key={step.number} className="relative">
              <Reveal
                delay={i * 90}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-8 lg:block lg:border-t-0 lg:py-0"
              >
                <span className="relative z-10 inline-flex h-[4.25rem] items-start bg-ivory pr-4 text-5xl font-semibold tracking-[-0.04em] text-cobalt lg:h-auto lg:pb-8 lg:text-6xl">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-h3 lg:mt-0">{step.title}</h3>
                  <p className="mt-3 text-ink">{step.text}</p>
                  <p className="mt-3 text-sm text-muted">{step.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
