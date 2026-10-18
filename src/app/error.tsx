"use client";

import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="py-24 lg:py-40">
      <Container>
        <p className="text-eyebrow text-cobalt">Something went wrong</p>
        <h1 className="text-display mt-5 max-w-3xl">We hit an unexpected problem.</h1>
        <p className="text-lead mt-6 max-w-xl text-ink-soft">Please try again. If it keeps happening, head back to the homepage.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary" size="lg">Back to the homepage</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
