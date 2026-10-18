import type { CSSProperties } from "react";
import { Zap, MousePointerClick } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "@/components/mockups/frames";

const delay = (d: number) => ({ "--d": `${d}ms` }) as CSSProperties;

/** Low-fidelity wireframe standing in for "a website" — intentionally generic, not a client demo. */
function DesktopSkeleton() {
  return (
    <div className="aspect-16/11 w-full bg-paper p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-cobalt" />
          <span className="h-2 w-16 rounded-full bg-line-strong" />
        </div>
        <div className="flex items-center gap-3">
          <span className="h-2 w-8 rounded-full bg-line" />
          <span className="h-2 w-8 rounded-full bg-line" />
          <span className="h-5 w-14 rounded-full bg-cobalt" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex-1 space-y-2.5">
          <span className="block h-3 w-[85%] rounded-full bg-line-strong" />
          <span className="block h-3 w-[65%] rounded-full bg-line-strong" />
          <span className="mt-3 block h-2 w-[70%] rounded-full bg-line" />
          <span className="mt-4 block h-5 w-20 rounded-full bg-cobalt" />
        </div>
        <div className="aspect-square w-[38%] rounded-xl bg-linear-to-br from-cobalt-tint to-sand" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-sand p-2.5">
            <span className="block size-4 rounded-full bg-cobalt/30" />
            <span className="mt-2 block h-1.5 w-full rounded-full bg-line-strong" />
            <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneSkeleton() {
  return (
    <div className="aspect-[9/19] w-full bg-paper p-3">
      <div className="flex items-center justify-between">
        <span className="size-2.5 rounded-full bg-cobalt" />
        <span className="h-1.5 w-10 rounded-full bg-line" />
      </div>
      <div className="mt-4 aspect-4/3 w-full rounded-lg bg-linear-to-br from-cobalt-tint to-sand" />
      <span className="mt-4 block h-2.5 w-[80%] rounded-full bg-line-strong" />
      <span className="mt-2 block h-2.5 w-[55%] rounded-full bg-line-strong" />
      <span className="mt-4 block h-6 w-full rounded-full bg-cobalt" />
      <div className="mt-4 space-y-2.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="size-5 shrink-0 rounded-full bg-sand" />
            <span className="h-1.5 w-full rounded-full bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroMockup() {
  return (
    <div className="relative mx-auto aspect-6/5 w-full max-w-md lg:max-w-none" role="img" aria-label="Illustrative wireframe of a fast, mobile-friendly website">
      <div className="anim-drift absolute left-0 top-0 w-[82%]" style={delay(150)}>
        <BrowserFrame url="yourbusiness.com">
          <DesktopSkeleton />
        </BrowserFrame>
      </div>
      <div className="anim-drift absolute bottom-0 right-0 z-10 w-[32%]" style={delay(350)}>
        <PhoneFrame>
          <PhoneSkeleton />
        </PhoneFrame>
      </div>

      <div
        className="anim-rise absolute left-[2%] bottom-[6%] z-20 flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 shadow-soft"
        style={delay(550)}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-cobalt-tint">
          <Zap aria-hidden className="size-3.5 text-cobalt" strokeWidth={2.25} />
        </span>
        <span className="text-xs font-medium text-ink">Loads in under 1s</span>
      </div>
      <div
        className="anim-rise absolute right-[20%] top-[4%] z-20 hidden items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 shadow-soft sm:flex"
        style={delay(650)}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-cobalt-tint">
          <MousePointerClick aria-hidden className="size-3.5 text-cobalt" strokeWidth={2.25} />
        </span>
        <span className="text-xs font-medium text-ink">Built to get clicks</span>
      </div>
    </div>
  );
}
