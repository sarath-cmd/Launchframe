/** Original vector artwork for the illustrative "Clearpath Consulting" concept. */
const C = { navy: "#1B2A4A", teal: "#2F8F83", bg: "#FFFFFF", wash: "#F1F4F8", mute: "#5B6778", line: "#D8DEE8" };

function Path({ x, y, w }: { x: number; y: number; w: number }) {
  const step = w / 2;
  return (
    <g>
      <path d={`M${x} ${y} H${x + w}`} stroke={C.line} strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x} ${y} H${x + step}`} stroke={C.teal} strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + i * step} cy={y} r="9" fill={i < 2 ? C.teal : C.bg} stroke={i < 2 ? C.teal : C.line} strokeWidth="3" />
      ))}
    </g>
  );
}

export function ClearpathDesktop() {
  return (
    <svg viewBox="0 0 800 500" className="mk block h-auto w-full" role="img" aria-label="Clearpath Consulting concept homepage">
      <rect width="800" height="500" fill={C.bg} />
      <path d="M32 22l10 10-10 10" stroke={C.teal} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="54" y="39" fontSize="17" fontWeight="700" fill={C.navy}>Clearpath</text>
      <g fontSize="13" fill={C.mute}>
        <text x="420" y="38">Approach</text>
        <text x="497" y="38">Services</text>
        <text x="572" y="38">Insights</text>
      </g>
      <rect x="648" y="17" width="120" height="32" rx="6" fill={C.navy} />
      <text x="708" y="38" fontSize="13" fontWeight="600" fill="#fff" textAnchor="middle">Book a call</text>
      <rect y="64" width="800" height="1" fill={C.line} />
      <text x="36" y="132" fontSize="12" fontWeight="600" fill={C.teal} letterSpacing="1.5">INDEPENDENT CONSULTING</text>
      <text x="36" y="182" fontSize="44" fontWeight="700" fill={C.navy}>Clear decisions</text>
      <text x="36" y="232" fontSize="44" fontWeight="700" fill={C.navy}>for growing teams.</text>
      <text x="36" y="268" fontSize="14" fill={C.mute}>Practical advice on strategy, operations and planning,</text>
      <text x="36" y="288" fontSize="14" fill={C.mute}>explained in plain language.</text>
      <rect x="36" y="312" width="150" height="40" rx="6" fill={C.teal} />
      <text x="111" y="337" fontSize="14" fontWeight="600" fill="#fff" textAnchor="middle">Book a consultation</text>
      <rect x="198" y="312" width="130" height="40" rx="6" fill="none" stroke={C.navy} />
      <text x="263" y="337" fontSize="14" fontWeight="600" fill={C.navy} textAnchor="middle">How we work</text>
      {/* engagement diagram */}
      <rect x="440" y="96" width="328" height="270" rx="12" fill={C.wash} />
      <text x="464" y="128" fontSize="12" fontWeight="600" fill={C.navy}>How an engagement unfolds</text>
      <Path x={488} y={176} w={240} />
      <g fontSize="11" fill={C.navy} fontWeight="600" textAnchor="middle">
        <text x="488" y="210">Listen</text>
        <text x="608" y="210">Plan</text>
        <text x="728" y="210">Act</text>
      </g>
      <rect x="464" y="240" width="280" height="14" rx="7" fill={C.line} />
      <rect x="464" y="240" width="180" height="14" rx="7" fill={C.teal} />
      <rect x="464" y="268" width="220" height="10" rx="5" fill={C.line} />
      <rect x="464" y="288" width="170" height="10" rx="5" fill={C.line} />
      <rect x="464" y="318" width="108" height="30" rx="6" fill={C.navy} />
      <text x="518" y="338" fontSize="12" fontWeight="600" fill="#fff" textAnchor="middle">See the approach</text>
      {/* services row */}
      {["Strategy", "Operations", "Planning"].map((t, i) => (
        <g key={t}>
          <rect x={36 + i * 252} y="396" width="236" height="76" rx="8" fill={C.bg} stroke={C.line} />
          <rect x={52 + i * 252} y="412" width="22" height="22" rx="5" fill={i === 1 ? C.teal : C.navy} />
          <text x={86 + i * 252} y="429" fontSize="14" fontWeight="700" fill={C.navy}>{t}</text>
          <rect x={52 + i * 252} y="446" width="160" height="7" rx="3.5" fill={C.line} />
        </g>
      ))}
    </svg>
  );
}

export function ClearpathMobile() {
  return (
    <svg viewBox="0 0 220 440" className="mk block h-auto w-full" role="img" aria-label="Clearpath Consulting concept on mobile">
      <rect width="220" height="440" fill={C.bg} />
      <path d="M16 15l7 7-7 7" stroke={C.teal} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="31" y="28" fontSize="12" fontWeight="700" fill={C.navy}>Clearpath</text>
      <rect x="168" y="17" width="22" height="2.5" rx="1" fill={C.navy} />
      <rect x="168" y="24" width="22" height="2.5" rx="1" fill={C.navy} />
      <text x="16" y="78" fontSize="8" fontWeight="600" fill={C.teal} letterSpacing="1">INDEPENDENT CONSULTING</text>
      <text x="16" y="108" fontSize="22" fontWeight="700" fill={C.navy}>Clear decisions</text>
      <text x="16" y="134" fontSize="22" fontWeight="700" fill={C.navy}>for growing</text>
      <text x="16" y="160" fontSize="22" fontWeight="700" fill={C.navy}>teams.</text>
      <rect x="16" y="180" width="188" height="34" rx="6" fill={C.teal} />
      <text x="110" y="201" fontSize="11" fontWeight="600" fill="#fff" textAnchor="middle">Book a consultation</text>
      <rect x="16" y="232" width="188" height="120" rx="10" fill={C.wash} />
      <Path x={50} y={278} w={120} />
      <text x="50" y="306" fontSize="8" fontWeight="600" fill={C.navy} textAnchor="middle">Listen</text>
      <text x="110" y="306" fontSize="8" fontWeight="600" fill={C.navy} textAnchor="middle">Plan</text>
      <text x="170" y="306" fontSize="8" fontWeight="600" fill={C.navy} textAnchor="middle">Act</text>
      <rect x="16" y="368" width="188" height="48" rx="8" fill="#fff" stroke={C.line} />
      <text x="30" y="396" fontSize="11" fontWeight="700" fill={C.navy}>Strategy</text>
    </svg>
  );
}
