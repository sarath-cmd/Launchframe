"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { DesktopMockup, MobileMockup, type MockupKey } from "@/components/mockups/ProjectMockup";

/** Which concept preview illustrates each service. */
const previewFor: Record<string, MockupKey> = {
  "custom-website-design": "forma",
  "website-development": "northline",
  "landing-pages": "daily-table",
  "website-redesign": "clearpath",
  "seo-foundations": "clearpath",
  "ongoing-website-support": "northline",
};
const layers: MockupKey[] = ["forma", "northline", "daily-table", "clearpath"];

export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = services[active]!;
  const shown = previewFor[current.slug] ?? "northline";

  const select = (i: number) => {
    setActive(i);
    tabs.current[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: services.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key]! + services.length) % services.length;
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      {/* Horizontal switcher: scrolls on small screens */}
      <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div role="tablist" aria-label="Services" onKeyDown={onKey} className="inline-flex gap-1 rounded-full border border-line-strong bg-ivory p-1">
          {services.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`svc-tab-${i}`}
                aria-selected={on}
                aria-controls="svc-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className={`relative min-h-11 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-300 sm:px-5 sm:text-[0.9375rem] ${
                  on ? "bg-ink text-ivory" : "text-ink-soft hover:bg-sand hover:text-ink"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="svc-panel"
        role="tabpanel"
        aria-labelledby={`svc-tab-${active}`}
        className="mt-6 grid overflow-hidden rounded-2xl border border-line bg-ivory lg:grid-cols-[1fr_1.15fr]"
      >
        {/* key forces the copy to re-run its entrance on each change */}
        <div key={current.slug} className="anim-rise flex flex-col p-6 sm:p-10 lg:p-12">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-cobalt">0{active + 1} / 0{services.length}</span>
            <span aria-hidden className="h-px flex-1 bg-line-strong" />
          </div>
          <h3 className="text-h2 mt-6">{current.title}</h3>
          <p className="mt-4 text-ink-soft">{current.value}</p>
          <ul className="mt-6 grid gap-2.5">
            {current.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-cobalt" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={`/services#${current.slug}`}
            className="group mt-8 inline-flex items-center gap-2 self-start border-b-2 border-ink pb-0.5 font-semibold transition-colors hover:border-cobalt hover:text-cobalt lg:mt-auto lg:pt-8"
          >
            Read more about {current.title.toLowerCase()}
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div aria-hidden className="relative min-h-75 bg-sand sm:min-h-105">
          {layers.map((key) => {
            const on = key === shown;
            return (
              <div
                key={key}
                className={`absolute inset-0 flex items-center justify-center p-6 transition-[opacity,translate] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] sm:p-10 ${
                  on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <div className="relative w-full max-w-130">
                  <DesktopMockup mockup={key} />
                  <div className="absolute -bottom-5 -right-2 w-[22%] sm:-right-5">
                    <MobileMockup mockup={key} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
