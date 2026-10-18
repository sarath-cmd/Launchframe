import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-line pb-14 pt-10 lg:pb-24 lg:pt-20">
      <Container>
        <div className="anim-rise">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
          {children}
        </div>
      </Container>
    </section>
  );
}
