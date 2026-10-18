import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Launchframe builds beautiful, fast, strategic websites for small businesses. Learn how we think and the principles we work by.",
  path: "/about",
});

const principles = [
  { title: "Understand first", text: "Good decisions come from knowing your customers, your services and your goals. We ask before we design." },
  { title: "Say it plainly", text: "Clear language beats clever language. Your customers should understand what you offer within seconds." },
  { title: "Design with a reason", text: "Every choice on the page should help someone understand, trust or act. If it does not, it goes." },
  { title: "Build it properly", text: "Fast, responsive and accessible, because a site that does not work for everyone is not finished." },
  { title: "Be transparent", text: "Defined scope, agreed deliverables and honest communication, so there are no surprises." },
  { title: "Stay practical", text: "We recommend what your business needs, not the biggest thing we could build." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Launchframe"
        title={<>We build websites that help small businesses <span className="text-cobalt">get found, trusted and contacted.</span></>}
        lead="Launchframe is a web design and development studio for small businesses that want to look more professional online and make it easier for customers to take action."
      />

      <section className="py-16 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-h2">Our approach</h2>
          </Reveal>
          <Reveal className="space-y-6 text-lg text-ink-soft lg:col-span-6 lg:col-start-7" delay={100}>
            <p>
              Many small businesses are better in person than they look online. The service is excellent, the people are
              reliable, but the website is dated, confusing or hard to use on a phone.
            </p>
            <p>
              We do not simply build websites that look good. We build websites that help businesses present themselves
              professionally, communicate their value, and make it easier for potential customers to take action.
            </p>
            <p>
              That means starting with your business and your customers, not with a template. It means being clear about
              scope and deliverables from the beginning. And it means building something fast, accessible and
              straightforward to manage.
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="on-ink bg-ink py-16 text-ivory lg:py-28">
        <Container>
          <h2 id="principles-title" className="text-h2 max-w-2xl">How we work</h2>
          <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-ivory/25 pt-6">
                <span className="font-mono text-sm text-ivory/60">0{i + 1}</span>
                <h3 className="text-h3 mt-4">{p.title}</h3>
                <p className="mt-3 text-ivory/75">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessSection />
      <FinalCta />
    </>
  );
}
