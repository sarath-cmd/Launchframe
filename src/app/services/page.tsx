import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/content/services";
import { getProject } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Custom website design, development, landing pages, redesigns, SEO foundations and ongoing support for small businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your website needs to make a stronger impression."
        lead="Six clear services, explained in plain language. Use one on its own, or combine them into a complete website project."
      >
        <ButtonLink href="/contact" size="lg" arrow className="mt-8">
          Start a Project
        </ButtonLink>
      </PageHero>

      <section className="py-8 lg:py-16">
        <Container>
          <ol>
            {services.map((s, i) => (
              <li key={s.slug} id={s.slug} className="scroll-mt-28 border-b border-line last:border-b-0">
                <Reveal className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
                  <div className="lg:col-span-5">
                    <p className="font-mono text-sm text-cobalt">0{i + 1}</p>
                    <h2 className="text-h2 mt-3">{s.title}</h2>
                    <p className="text-lead mt-4 text-ink-soft">{s.summary}</p>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-ink-soft">{s.value}</p>
                    <h3 className="text-eyebrow mt-8 text-muted">What this typically includes</h3>
                    <ul className="mt-4 space-y-3">
                      {s.included.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check aria-hidden className="mt-1 size-4 shrink-0 text-cobalt" strokeWidth={3} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 rounded-md bg-sand px-5 py-4 text-sm">
                      <strong className="font-semibold">Good for: </strong>
                      {s.suitedTo}
                    </p>
                    {s.relatedProjects.length > 0 && (
                      <p className="mt-6 text-sm text-muted">
                        See it in our work:{" "}
                        {s.relatedProjects.map((slug, idx) => {
                          const p = getProject(slug);
                          return p ? (
                            <span key={slug}>
                              {idx > 0 && ", "}
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-ink underline underline-offset-4 hover:text-cobalt"
                              >
                                {p.name}
                              </a>
                            </span>
                          ) : null;
                        })}
                      </p>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
