import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({
  title: "Work",
  description: "Real demo sites showing how Launchframe designs websites for home businesses, interior design studios and SaaS products.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Real sites, not mockups."
        lead="These are live demo sites, built to show our approach to different kinds of small business. Open any of them and click around."
      />
      <section className="py-16 lg:py-24">
        <Container>
          <ul className="grid gap-x-8 gap-y-16 lg:grid-cols-2">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <Reveal delay={i * 80}>
                  <ProjectCard project={project} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCta title="Have a project in mind?" text="Tell us about your business and what you would like your website to do. We will help you explore the next step." />
    </>
  );
}
