/** Original vector artwork for the illustrative "Forma Studio" concept. */
const C = { bg: "#EFE9E0", ink: "#26211D", clay: "#B4572F", sage: "#9DA88C", sand: "#D9C9B0", oat: "#E4D8C4", mute: "#6F655A" };

export function FormaDesktop() {
  return (
    <svg viewBox="0 0 800 500" className="mk block h-auto w-full" role="img" aria-label="Forma Studio concept homepage">
      <rect width="800" height="500" fill={C.bg} />
      <text x="36" y="40" fontSize="19" fontWeight="600" fill={C.ink} letterSpacing="3">FORMA</text>
      <g fontSize="12" fill={C.mute}>
        <text x="470" y="38">Projects</text>
        <text x="540" y="38">Studio</text>
        <text x="598" y="38">Journal</text>
      </g>
      <rect x="670" y="20" width="102" height="28" rx="14" fill="none" stroke={C.ink} />
      <text x="721" y="38" fontSize="12" fill={C.ink} textAnchor="middle">Enquire</text>
      {/* headline */}
      <text className="serif" x="36" y="130" fontSize="58" fill={C.ink}>Rooms with</text>
      <text className="serif" x="36" y="192" fontSize="58" fontStyle="italic" fill={C.clay}>a point of view.</text>
      <text x="36" y="232" fontSize="13" fill={C.mute}>Interior design for homes and small</text>
      <text x="36" y="251" fontSize="13" fill={C.mute}>commercial spaces, shaped around you.</text>
      <rect x="36" y="274" width="156" height="38" rx="19" fill={C.ink} />
      <text x="114" y="298" fontSize="13" fontWeight="600" fill={C.bg} textAnchor="middle">Book a consultation</text>
      {/* asymmetric gallery */}
      <rect x="36" y="346" width="150" height="120" rx="4" fill={C.sage} />
      <circle cx="111" cy="400" r="30" fill="#C9D1BB" />
      <rect x="203" y="346" width="150" height="120" rx="4" fill={C.sand} />
      <rect x="236" y="380" width="84" height="46" rx="8" fill={C.clay} />
      <rect x="236" y="426" width="8" height="18" fill={C.ink} />
      <rect x="312" y="426" width="8" height="18" fill={C.ink} />
      <rect x="456" y="72" width="316" height="394" rx="4" fill={C.oat} />
      <path d="M520 466V260a60 60 0 0 1 120 0v206z" fill={C.bg} />
      <path d="M538 466V262a42 42 0 0 1 84 0v204z" fill={C.sage} />
      <rect x="670" y="190" width="70" height="276" fill={C.clay} />
      <rect x="656" y="150" width="2" height="316" fill={C.ink} />
      <circle cx="657" cy="140" r="26" fill="#F4E4B8" stroke={C.ink} strokeWidth="2" />
      <rect x="456" y="440" width="316" height="26" fill={C.ink} opacity="0.12" />
      <text x="470" y="458" fontSize="11" fill={C.ink}>Selected project · Hallway & reading room</text>
    </svg>
  );
}

export function FormaMobile() {
  return (
    <svg viewBox="0 0 220 440" className="mk block h-auto w-full" role="img" aria-label="Forma Studio concept on mobile">
      <rect width="220" height="440" fill={C.bg} />
      <text x="16" y="30" fontSize="12" fontWeight="600" fill={C.ink} letterSpacing="2">FORMA</text>
      <rect x="168" y="19" width="22" height="2.5" rx="1" fill={C.ink} />
      <rect x="168" y="26" width="22" height="2.5" rx="1" fill={C.ink} />
      <text className="serif" x="16" y="84" fontSize="32" fill={C.ink}>Rooms with</text>
      <text className="serif" x="16" y="118" fontSize="32" fontStyle="italic" fill={C.clay}>a point of view.</text>
      <rect x="16" y="140" width="130" height="30" rx="15" fill={C.ink} />
      <text x="81" y="159" fontSize="10" fontWeight="600" fill={C.bg} textAnchor="middle">Book a consultation</text>
      <rect x="16" y="192" width="188" height="150" rx="3" fill={C.oat} />
      <path d="M60 342V250a34 34 0 0 1 68 0v92z" fill={C.sage} />
      <rect x="150" y="226" width="40" height="116" fill={C.clay} />
      <rect x="16" y="354" width="90" height="70" rx="3" fill={C.sand} />
      <rect x="114" y="354" width="90" height="70" rx="3" fill={C.sage} />
    </svg>
  );
}
