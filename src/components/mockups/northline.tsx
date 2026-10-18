import { useId } from "react";

/** Original vector artwork for the illustrative "Northline Home Services" concept. */
const C = { deep: "#0F3D3E", amber: "#F2A23A", bg: "#F4F7F6", ink: "#12292A", mute: "#587072" };

function House({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="70" width="190" height="100" fill="#F3EBDD" />
      <polygon points="-14,72 95,0 204,72" fill="#2F5B5C" />
      <rect x="22" y="96" width="38" height="40" fill="#BFD8D2" />
      <rect x="130" y="96" width="38" height="40" fill="#BFD8D2" />
      <rect x="74" y="104" width="42" height="66" fill={C.amber} />
      <circle cx="108" cy="140" r="2.5" fill={C.deep} />
      <rect x="150" y="22" width="16" height="36" fill="#8C6A52" />
    </g>
  );
}

export function NorthlineDesktop() {
  const clip = useId();
  return (
    <svg viewBox="0 0 800 500" className="mk block h-auto w-full" role="img" aria-label="Northline Home Services concept homepage">
      <rect width="800" height="500" fill={C.bg} />
      {/* nav */}
      <rect width="800" height="58" fill="#fff" />
      <rect x="32" y="19" width="20" height="20" rx="4" fill={C.deep} />
      <text x="60" y="35" fontSize="17" fontWeight="700" fill={C.deep}>Northline</text>
      <g fontSize="13" fill={C.mute}>
        <text x="380" y="34">Services</text>
        <text x="453" y="34">Projects</text>
        <text x="525" y="34">Areas</text>
        <text x="580" y="34">Contact</text>
      </g>
      <rect x="656" y="15" width="112" height="30" rx="15" fill={C.amber} />
      <text x="712" y="35" fontSize="13" fontWeight="700" fill={C.ink} textAnchor="middle">Get a quote</text>
      {/* hero copy */}
      <text x="32" y="124" fontSize="12" fontWeight="600" fill={C.deep} letterSpacing="1.5">LOCAL HOME IMPROVEMENT</text>
      <text x="32" y="168" fontSize="42" fontWeight="700" fill={C.ink}>Repairs and</text>
      <text x="32" y="214" fontSize="42" fontWeight="700" fill={C.ink}>renovations,</text>
      <text x="32" y="260" fontSize="42" fontWeight="700" fill={C.deep}>done properly.</text>
      <text x="32" y="294" fontSize="14" fill={C.mute}>Clear quotes, tidy work and a team</text>
      <text x="32" y="314" fontSize="14" fill={C.mute}>that turns up when it says it will.</text>
      <rect x="32" y="336" width="136" height="40" rx="20" fill={C.deep} />
      <text x="100" y="361" fontSize="14" fontWeight="600" fill="#fff" textAnchor="middle">Request a quote</text>
      <rect x="180" y="336" width="124" height="40" rx="20" fill="none" stroke={C.deep} strokeWidth="1.5" />
      <text x="242" y="361" fontSize="14" fontWeight="600" fill={C.deep} textAnchor="middle">See our work</text>
      {/* hero image */}
      <clipPath id={clip}><rect x="396" y="80" width="372" height="296" rx="14" /></clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect x="396" y="80" width="372" height="296" fill="#CFE3DD" />
        <rect x="396" y="80" width="372" height="130" fill="#F6E6C8" />
        <circle cx="700" cy="128" r="30" fill="#FBD58E" />
        <rect x="396" y="300" width="372" height="76" fill="#7FAE8E" />
        <House x={470} y={150} s={1.25} />
        <circle cx="436" cy="290" r="34" fill="#4C8A66" />
        <rect x="432" y="300" width="8" height="40" fill="#6B4B38" />
      </g>
      <rect x="418" y="330" width="170" height="34" rx="17" fill="#fff" />
      <text x="503" y="352" fontSize="12" fontWeight="600" fill={C.deep} textAnchor="middle">Free, no-obligation quotes</text>
      {/* trust strip + services */}
      <rect y="400" width="800" height="100" fill="#fff" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={32 + i * 252} y="418" width="236" height="64" rx="10" fill={C.bg} />
          <circle cx={58 + i * 252} cy="450" r="12" fill={i === 1 ? C.amber : C.deep} />
          <text x={80 + i * 252} y="446" fontSize="13" fontWeight="700" fill={C.ink}>{["Kitchens & bathrooms", "Repairs & upkeep", "Extensions & lofts"][i]}</text>
          <text x={80 + i * 252} y="464" fontSize="11" fill={C.mute}>{["Planned around your space", "Prompt, tidy and clear", "Scoped before we start"][i]}</text>
        </g>
      ))}
    </svg>
  );
}

export function NorthlineMobile() {
  const clip = useId();
  return (
    <svg viewBox="0 0 220 440" className="mk block h-auto w-full" role="img" aria-label="Northline Home Services concept on mobile">
      <rect width="220" height="440" fill={C.bg} />
      <rect width="220" height="44" fill="#fff" />
      <rect x="14" y="14" width="16" height="16" rx="3" fill={C.deep} />
      <text x="37" y="27" fontSize="12" fontWeight="700" fill={C.deep}>Northline</text>
      <rect x="168" y="15" width="22" height="2.5" rx="1" fill={C.ink} />
      <rect x="168" y="21" width="22" height="2.5" rx="1" fill={C.ink} />
      <rect x="168" y="27" width="22" height="2.5" rx="1" fill={C.ink} />
      <text x="14" y="76" fontSize="8" fontWeight="600" fill={C.deep} letterSpacing="1">LOCAL HOME IMPROVEMENT</text>
      <text x="14" y="104" fontSize="23" fontWeight="700" fill={C.ink}>Repairs and</text>
      <text x="14" y="130" fontSize="23" fontWeight="700" fill={C.ink}>renovations,</text>
      <text x="14" y="156" fontSize="23" fontWeight="700" fill={C.deep}>done properly.</text>
      <rect x="14" y="174" width="192" height="34" rx="17" fill={C.amber} />
      <text x="110" y="195" fontSize="11" fontWeight="700" fill={C.ink} textAnchor="middle">Request a quote</text>
      <clipPath id={clip}><rect x="14" y="222" width="192" height="130" rx="10" /></clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect x="14" y="222" width="192" height="130" fill="#F6E6C8" />
        <rect x="14" y="316" width="192" height="36" fill="#7FAE8E" />
        <House x={50} y={250} s={0.65} />
      </g>
      <rect x="14" y="366" width="192" height="26" rx="6" fill="#fff" />
      <text x="26" y="383" fontSize="9" fontWeight="600" fill={C.ink}>Kitchens & bathrooms</text>
      <rect x="14" y="398" width="192" height="26" rx="6" fill="#fff" />
      <text x="26" y="415" fontSize="9" fontWeight="600" fill={C.ink}>Repairs & upkeep</text>
    </svg>
  );
}
