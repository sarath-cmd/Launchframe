"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { Wordmark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu after navigating (state adjusted during render, per React guidance).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`anim-nav relative border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open ? "border-line bg-ivory/90 backdrop-blur-md" : "border-transparent bg-ivory"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1320px] items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-10 ${
            scrolled ? "h-14" : "h-16 lg:h-20"
          }`}
        >
          <Link href="/" aria-label="Launchframe home" className="-ml-1 rounded-md p-1">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`group/nav relative rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors hover:text-cobalt ${
                  isActive(link.href) ? "text-cobalt" : "text-ink-soft"
                }`}
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-4 bottom-0.5 h-0.5 origin-left rounded bg-cobalt transition-transform duration-300 ease-out ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink href="/contact">Start a Project</ButtonLink>
            </span>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong md:hidden"
            >
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>

        <div id="mobile-menu" hidden={!open} className="border-t border-line md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-[1320px] flex-col px-4 pb-6 pt-2 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`border-b border-line py-4 text-2xl font-semibold tracking-tight ${
                  isActive(link.href) ? "text-cobalt" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/contact" size="lg" className="mt-6" onClick={() => setOpen(false)}>
              Start a Project
            </ButtonLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
