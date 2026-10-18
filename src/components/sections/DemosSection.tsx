import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { demos } from "@/content/demos";

const accents = [
  { badge: "bg-cobalt-tint text-cobalt", dot: "bg-cobalt" },
  { badge: "bg-[#fff2e6] text-[#b9560d]", dot: "bg-[#e8780a]" },
  { badge: "bg-[#e9f7ef] text-[#0f7a45]", dot: "bg-[#17a85e]" },
];

export function DemosSection() {
  return (
    <section aria-labelledby="demos-title" className="py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Real demos"
            title={<span id="demos-title">See it working, not just hear about it.</span>}
            className="mx-auto"
          />
        </Reveal>
        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {demos.map((demo, i) => {
            const accent = accents[i % accents.length] ?? accents[0]!;
            return (
              <li key={demo.slug}>
                <Reveal delay={i * 80}>
                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-2xl border border-line bg-paper p-2 shadow-soft transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_30px_50px_-28px_rgb(17_19_24/0.35)]"
                  >
                    {/* Browser chrome preview */}
                    <div className="overflow-hidden rounded-xl border border-line bg-sand">
                      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2.5">
                        <span aria-hidden className="size-2 rounded-full bg-line-strong" />
                        <span aria-hidden className="size-2 rounded-full bg-line-strong" />
                        <span aria-hidden className="size-2 rounded-full bg-line-strong" />
                        <span className="ml-2 flex items-center gap-1 truncate rounded-full bg-sand px-2.5 py-0.5 text-xs text-muted">
                          <Globe aria-hidden className="size-3" />
                          {demo.url.replace(/^https?:\/\//, "") || "example.com"}
                        </span>
                      </div>
                      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-sand to-line/60">
                        {demo.previewImage ? (
                          <Image
                            src={demo.previewImage}
                            alt={`${demo.name} preview`}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="object-contain"
                          />
                        ) : demo.url !== "#" ? (
                          <iframe
                            src={demo.url}
                            title={`${demo.name} live preview`}
                            loading="lazy"
                            tabIndex={-1}
                            aria-hidden
                            sandbox="allow-scripts allow-same-origin"
                            className="pointer-events-none absolute left-0 top-0 h-[250%] w-[250%] origin-top-left scale-[0.4] border-0"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-muted">
                            Live preview
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 pt-5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${accent.badge}`}>
                        <span aria-hidden className={`size-1.5 rounded-full ${accent.dot}`} />
                        {demo.group}
                      </span>
                      <h3 className="text-h3 mt-3 flex items-center gap-1.5">
                        {demo.name}
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cobalt"
                        />
                      </h3>
                      <p className="mt-1.5 text-ink-soft">{demo.tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-xs font-medium text-ink-soft">
                        Demo
                      </span>
                    </div>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
