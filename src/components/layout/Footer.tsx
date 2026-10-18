import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Logo";

const linkClass = "text-ivory/80 transition-colors hover:text-white";

export function Footer() {
  const { email, phone, location } = site.contact;

  return (
    <footer className="on-ink bg-ink text-ivory">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="inverse" />
            <p className="mt-6 max-w-sm text-lg text-ivory/80">
              Beautiful, fast, strategic websites for small businesses that want to look professional online and make
              it easier for customers to get in touch.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="text-eyebrow text-ivory/60">Explore</h2>
              <ul className="mt-5 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className={linkClass}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-eyebrow text-ivory/60">Services</h2>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className={linkClass}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-eyebrow text-ivory/60">Contact</h2>
              <ul className="mt-5 space-y-3 text-ivory/80">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className={linkClass}>
                      {phone}
                    </a>
                  </li>
                )}
                {location && <li>{location}</li>}
                {!email && !phone && (
                  <li>
                    <Link href="/contact" className={linkClass}>
                      Send a project enquiry
                    </Link>
                  </li>
                )}
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="noopener noreferrer" className={linkClass}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-sm text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            {site.hasTerms && (
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms of Service
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
