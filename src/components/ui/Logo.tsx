import { useId } from "react";

/**
 * Launchframe mark: a browser frame in perspective with a code glyph.
 * Vector redraw of the brand icon. `color` defaults to brand cobalt;
 * pass "currentColor" for monochrome use.
 */
export function LogoMark({ className = "size-8", color = "var(--color-cobalt)" }: { className?: string; color?: string }) {
  const mask = useId();
  return (
    <svg viewBox="0 0 236 272" aria-hidden className={className} fill="none">
      <mask id={mask}>
        <rect width="236" height="272" fill="white" />
        <circle cx="85" cy="70" r="5.8" fill="black" />
        <circle cx="101.5" cy="64.5" r="5.8" fill="black" />
        <circle cx="118" cy="59" r="5.8" fill="black" />
      </mask>
      <g fill={color}>
        {/* left upright + base */}
        <path d="M52 66V220.5L154 188.5C160 186.6 165 187 170 189.5L210.5 211.5L40 268.5C25 273 13 264 13 249V101C13 93 16.5 87.5 23 83.5Z" />
        {/* title bar + right upright, with window dots cut out */}
        <path
          mask={`url(#${mask})`}
          d="M68 58.5L196 17C210 12.5 222 20 222 34V169C222 173.5 218.5 175.8 214.5 174.2L203.5 169.5V50.5L68 93Z"
        />
      </g>
      {/* code glyph */}
      <g stroke={color} strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M118.5 104.5L96.5 130L118 156.5" />
        <path d="M145.5 98L169.5 121L146.5 149" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "", tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-auto" color={tone === "inverse" ? "var(--color-ivory)" : undefined} />
      <span className="font-brand text-[1.4rem] font-bold leading-none tracking-[-0.03em]">Launchframe</span>
    </span>
  );
}
