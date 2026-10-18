import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { site } from "@/lib/site";

const included = ["Mobile-first design", "Fast loading", "Simple to update"];

export function PricingLine() {
  return (
    <section aria-labelledby="pricing-title" className="py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-line bg-paper px-8 py-12 text-center shadow-soft sm:px-14">
          <p className="text-eyebrow text-cobalt">Pricing</p>
          <p id="pricing-title" className="text-h2 mt-4">
            Websites from <span className="text-cobalt">{site.pricing.startingPrice}</span>
          </p>
          <p className="mt-2 text-lead text-ink-soft">delivered in {site.pricing.deliveryDays} days.</p>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check aria-hidden className="size-4 text-cobalt" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          <CtaButtons className="mt-8 justify-center" />
        </Reveal>
      </Container>
    </section>
  );
}
