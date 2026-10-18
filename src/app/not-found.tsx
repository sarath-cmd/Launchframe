import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="py-24 lg:py-40">
      <Container>
        <p className="text-eyebrow text-cobalt">Error 404</p>
        <h1 className="text-display mt-5 max-w-3xl">This page has gone missing.</h1>
        <p className="text-lead mt-6 max-w-xl text-ink-soft">
          The page you are looking for may have moved or never existed. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">Back to the homepage</ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">Start a Project</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
