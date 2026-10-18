import type { ReactNode } from "react";

/** Browser chrome around a mockup. The mockup SVG defines the aspect ratio. */
export function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] border border-ink/15 bg-paper shadow-frame ${className}`}
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-sand px-3 py-1.5 sm:py-2">
        <span className="size-1.5 rounded-full bg-ink/25 sm:size-2" />
        <span className="size-1.5 rounded-full bg-ink/25 sm:size-2" />
        <span className="size-1.5 rounded-full bg-ink/25 sm:size-2" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-paper px-3 py-0.5 text-center font-mono text-[9px] text-muted sm:text-[10px]">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Phone chrome around a mobile mockup. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] border-[3px] border-ink bg-ink shadow-frame sm:rounded-[26px] sm:border-[5px] ${className}`}
      aria-hidden
    >
      <div className="overflow-hidden rounded-[14px] sm:rounded-[20px]">{children}</div>
    </div>
  );
}
