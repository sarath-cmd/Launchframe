import { ClipboardList, FileCheck2, MessagesSquare, RefreshCcw, MonitorSmartphone, PackageCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "./Faq";

const commitments = [
  { icon: ClipboardList, title: "Clear project scope", text: "What is included is written down before work begins." },
  { icon: FileCheck2, title: "Agreed deliverables", text: "You know what you will receive at each stage." },
  { icon: MessagesSquare, title: "Transparent communication", text: "Plain updates, with no jargon and no chasing." },
  { icon: RefreshCcw, title: "Defined feedback and revisions", text: "Set review points so the project keeps moving." },
  { icon: MonitorSmartphone, title: "Responsive and browser tested", text: "Checked on common devices and browsers before launch." },
  { icon: PackageCheck, title: "Clear launch and handover", text: "You know what happens at launch and what you receive after." },
];

export function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="border-t border-line bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Trust & transparency"
              title={<span id="trust-title">Know what you are getting, from day one.</span>}
              lead="Choosing a web partner should not feel risky. Here is how we keep things straightforward."
            />
            <div className="mt-10 border-l-2 border-cobalt pl-5">
              <h3 className="font-semibold">Pricing</h3>
              <p className="mt-2 text-ink-soft">
                Every project is scoped individually. Once we understand what you need, you receive a written scope and
                quote before any work begins.
              </p>
            </div>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {commitments.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={(i % 2) * 80}>
                  <Icon aria-hidden className="size-6 text-cobalt" strokeWidth={1.75} />
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1.5 text-ink-soft">{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-16 lg:mt-24 lg:grid-cols-12">
          <h3 className="text-h3 lg:col-span-5">Questions, answered</h3>
          <div className="lg:col-span-7">
            <Faq />
          </div>
        </div>
      </Container>
    </section>
  );
}
