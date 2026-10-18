import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ServicesTabs } from "./ServicesTabs";

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-title" className="border-t border-line bg-paper py-20 lg:py-32">
      <Container>
        <Reveal className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title={
              <span id="services-title">
                Everything your website needs to make a stronger impression.
              </span>
            }
            lead="Choose a service to see what it is for. Clear services, explained in plain language."
          />
          <ButtonLink href="/services" variant="secondary" arrow className="self-start lg:self-auto">
            All services
          </ButtonLink>
        </Reveal>
        <Reveal delay={100}>
          <ServicesTabs />
        </Reveal>
      </Container>
    </section>
  );
}
