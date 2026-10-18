import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  headingLevel?: "h2" | "h3";
}

export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-2xl border border-line bg-sand transition-shadow duration-500 group-hover:shadow-[0_30px_50px_-28px_rgb(17_19_24/0.45)]"
      >
        <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2.5">
          <span aria-hidden className="size-2 rounded-full bg-line-strong" />
          <span aria-hidden className="size-2 rounded-full bg-line-strong" />
          <span aria-hidden className="size-2 rounded-full bg-line-strong" />
          <span className="ml-2 flex items-center gap-1 truncate rounded-full bg-sand px-2.5 py-0.5 text-xs text-muted">
            <Globe aria-hidden className="size-3" />
            {project.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
        <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-sand to-line/60">
          {project.previewImage ? (
            <Image
              src={project.previewImage}
              alt={`${project.name} preview`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          ) : (
            <iframe
              src={project.url}
              title={`${project.name} live preview`}
              loading="lazy"
              tabIndex={-1}
              aria-hidden
              sandbox="allow-scripts allow-same-origin"
              className="pointer-events-none absolute left-0 top-0 h-[250%] w-[250%] origin-top-left scale-[0.4] border-0"
            />
          )}
        </div>
      </a>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="text-eyebrow text-muted">{project.category}</p>
          <Heading className="text-h3 mt-2">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </a>
          </Heading>
          <p className="mt-2 max-w-md text-ink-soft">{project.tagline}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/80 transition-[background-color,color,rotate] duration-500 group-hover:rotate-45 group-hover:bg-cobalt group-hover:border-cobalt group-hover:text-ivory"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </article>
  );
}
