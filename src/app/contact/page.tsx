import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { CtaButtons } from "@/components/ui/CtaButtons";

export const metadata = pageMetadata({
  title: "Contact & Project Enquiry",
  description: "Tell Launchframe about your project. Share what you are building and what you need, and we will suggest next steps.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, location } = site.contact;

  return (
    <section className="pb-20 pt-10 lg:pb-32 lg:pt-20">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-eyebrow mb-6 inline-flex items-center gap-2 rounded-full bg-cobalt-tint px-3.5 py-1.5 text-cobalt-deep">
            <span aria-hidden className="size-1.5 rounded-full bg-cobalt" />
            Start a project
          </p>
          <h1 className="text-h1 anim-rise">Let&rsquo;s talk about your project.</h1>
          <p className="text-lead mt-6 text-ink-soft">
            Tell us what you are building, what is not working today, or where you want your business to go. WhatsApp or call
            us directly &mdash; there is no obligation.
          </p>

          <div id="questions" className="mt-12 scroll-mt-28 border-t border-line pt-8">
            <h2 className="text-eyebrow text-muted">Have a question first?</h2>
            {email || phone || location ? (
              <dl className="mt-5 space-y-4">
                {email && (
                  <div>
                    <dt className="text-sm text-muted">Email</dt>
                    <dd className="font-medium">
                      <a className="underline underline-offset-4 hover:text-cobalt" href={`mailto:${email}`}>{email}</a>
                    </dd>
                  </div>
                )}
                {phone && (
                  <div>
                    <dt className="text-sm text-muted">Phone</dt>
                    <dd className="font-medium">
                      <a className="underline underline-offset-4 hover:text-cobalt" href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                    </dd>
                  </div>
                )}
                {location && (
                  <div>
                    <dt className="text-sm text-muted">Location</dt>
                    <dd className="font-medium">{location}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className="mt-4 text-ink-soft">
                WhatsApp or call us with any questions and we will get back to you.
              </p>
            )}
          </div>
        </div>

        <div id="enquiry" className="scroll-mt-28 lg:col-span-7">
          <div className="rounded-2xl border border-line bg-paper p-8 shadow-soft lg:p-10">
            <h2 className="text-h3">Reach out directly.</h2>
            <p className="mt-3 text-ink-soft">
              Online enquiries aren&rsquo;t switched on yet. For now, WhatsApp or call and we&rsquo;ll get back to you quickly.
            </p>
            <CtaButtons size="lg" className="mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
