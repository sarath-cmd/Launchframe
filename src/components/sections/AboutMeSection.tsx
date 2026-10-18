import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutMe } from "@/content/about-me";

function initials(name: string) {
  const clean = name.replace(/[[\]]/g, "");
  const parts = clean.split(/\s+/).filter(Boolean);
  const [first, second] = parts;
  return first ? (first[0] + (second?.[0] ?? "")).toUpperCase() : "?";
}

export function AboutMeSection() {
  return (
    <section aria-labelledby="about-title" className="border-t border-line bg-sand py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span
            aria-hidden
            className="flex size-20 items-center justify-center rounded-full bg-cobalt text-2xl font-semibold text-ivory shadow-soft"
          >
            {initials(aboutMe.name)}
          </span>
          <div>
            <p className="text-eyebrow text-cobalt">About me</p>
            <h2 id="about-title" className="text-h3 mt-3">
              {aboutMe.name}
            </h2>
            <p className="text-lead mt-4 text-ink-soft">{aboutMe.bio}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
