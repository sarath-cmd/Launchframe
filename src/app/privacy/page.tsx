import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Info } from "lucide-react";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Launchframe handles the information you share through the project enquiry form.",
  path: "/privacy",
});

const sections = [
  {
    title: "Who we are",
    body: [
      `${site.name} is a web design and development business. [Business legal name, registered address and contact email to be added by the business.]`,
    ],
  },
  {
    title: "What information we collect",
    body: [
      "When you send a project enquiry we collect the details you enter: your name, business name, phone number and/or email address, the service you need, an approximate budget, and an optional existing website address.",
      "We do not ask for payment details or sensitive personal information through the enquiry form.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use your details only to read and respond to your enquiry and to discuss a possible project with you. We do not use them for unrelated marketing without your separate consent.",
    ],
  },
  {
    title: "Who we share it with",
    body: [
      "Enquiries are delivered to us by email through an email delivery provider acting on our behalf. We do not sell your information. [Name the actual provider and any hosting or analytics providers before publishing.]",
    ],
  },
  {
    title: "How long we keep it",
    body: ["[Retention period to be confirmed by the business.] We keep enquiry details only as long as needed to respond and, if a project goes ahead, to deliver and support it."],
  },
  {
    title: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct or delete your personal information, or to object to how it is used. [Add the applicable legal basis and how to exercise these rights.]",
    ],
  },
  {
    title: "Cookies and analytics",
    body: ["This website does not currently set advertising or tracking cookies. [Update this section if analytics or other tools are added.]"],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-14 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-12 flex items-start gap-3 rounded-md border border-line-strong bg-sand px-5 py-4 text-sm">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-cobalt" />
              <span>
                <strong className="font-semibold">Draft for review.</strong> This policy is a starting point. The
                business must review it, complete the bracketed items, and obtain legal advice before relying on it.
              </span>
            </p>
            <div className="space-y-12">
              {sections.map((s) => (
                <section key={s.title}>
                  <h2 className="text-h3">{s.title}</h2>
                  <div className="mt-4 space-y-4 text-ink-soft">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
