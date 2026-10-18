import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface FinalCtaProps {
  title?: string;
  text?: string;
}

export function FinalCta({
  title = "Let's build a website your business can grow with.",
  text = "Tell us what you are building, what is not working today, or where you want your business to go. We will help you explore the next step.",
}: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-title" className="on-cobalt bg-cobalt text-ivory">
      <Container className="py-20 lg:py-28">
        <Reveal className="max-w-4xl">
          <h2 id="cta-title" className="text-h1">{title}</h2>
          <p className="text-lead mt-7 max-w-2xl text-ivory">{text}</p>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" variant="inverse" size="lg" arrow>
              Tell Us About Your Project
            </ButtonLink>
            <Link href="/contact#questions" className="font-medium underline decoration-ivory/60 underline-offset-4 transition-colors hover:decoration-ivory">
              Have a question? Get in touch.
            </Link>
          </div>
          <p className="mt-6 text-sm text-ivory">No obligation. Just a conversation about what you need.</p>
        </Reveal>
      </Container>
    </section>
  );
}
