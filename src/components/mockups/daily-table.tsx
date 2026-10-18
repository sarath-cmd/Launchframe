/** Original vector artwork for the illustrative "The Daily Table" concept. */
const C = { bg: "#1E1A17", cream: "#F3E9D8", ember: "#E0653A", mute: "#B7A894", card: "#2A2420" };

function Plate({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#EDE3D1" />
      <circle cx={cx} cy={cy} r={r * 0.78} fill="#F7F0E3" />
      <circle cx={cx - r * 0.12} cy={cy + r * 0.05} r={r * 0.42} fill="#C8512B" />
      <circle cx={cx + r * 0.2} cy={cy - r * 0.18} r={r * 0.2} fill="#6F8F4E" />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.28} r={r * 0.13} fill="#E9B44C" />
      <circle cx={cx + r * 0.28} cy={cy + r * 0.3} r={r * 0.12} fill="#6F8F4E" />
    </g>
  );
}

export function DailyTableDesktop() {
  return (
    <svg viewBox="0 0 800 500" className="mk block h-auto w-full" role="img" aria-label="The Daily Table concept homepage">
      <rect width="800" height="500" fill={C.bg} />
      <text className="serif" x="36" y="42" fontSize="26" fontStyle="italic" fill={C.cream}>The Daily Table</text>
      <g fontSize="13" fill={C.mute}>
        <text x="470" y="40">Menu</text>
        <text x="526" y="40">Hours</text>
        <text x="584" y="40">Find us</text>
      </g>
      <rect x="664" y="18" width="104" height="30" rx="15" fill={C.ember} />
      <text x="716" y="38" fontSize="13" fontWeight="700" fill={C.bg} textAnchor="middle">Book a table</text>
      <text x="36" y="130" fontSize="12" fill={C.ember} letterSpacing="2">NEIGHBOURHOOD RESTAURANT</text>
      <text className="serif" x="36" y="198" fontSize="64" fill={C.cream}>Seasonal food,</text>
      <text className="serif" x="36" y="262" fontSize="64" fontStyle="italic" fill={C.ember}>shared at the table.</text>
      <text x="36" y="304" fontSize="14" fill={C.mute}>Simple cooking, good ingredients, long evenings.</text>
      <rect x="36" y="326" width="132" height="40" rx="20" fill={C.cream} />
      <text x="102" y="351" fontSize="14" fontWeight="700" fill={C.bg} textAnchor="middle">View the menu</text>
      <circle cx="600" cy="236" r="190" fill="#2B231E" />
      <Plate cx={600} cy={236} r={150} />
      <g>
        <rect x="36" y="408" width="228" height="64" rx="10" fill={C.card} />
        <text x="54" y="434" fontSize="11" fill={C.ember} letterSpacing="1.5">LUNCH</text>
        <text x="54" y="456" fontSize="13" fill={C.cream}>Light plates, daily specials</text>
        <rect x="276" y="408" width="228" height="64" rx="10" fill={C.card} />
        <text x="294" y="434" fontSize="11" fill={C.ember} letterSpacing="1.5">DINNER</text>
        <text x="294" y="456" fontSize="13" fill={C.cream}>Sharing plates, slow courses</text>
        <rect x="516" y="408" width="248" height="64" rx="10" fill={C.card} />
        <text x="534" y="434" fontSize="11" fill={C.ember} letterSpacing="1.5">WEEKENDS</text>
        <text x="534" y="456" fontSize="13" fill={C.cream}>Brunch, coffee and pastries</text>
      </g>
    </svg>
  );
}

export function DailyTableMobile() {
  return (
    <svg viewBox="0 0 220 440" className="mk block h-auto w-full" role="img" aria-label="The Daily Table concept on mobile">
      <rect width="220" height="440" fill={C.bg} />
      <text className="serif" x="16" y="32" fontSize="17" fontStyle="italic" fill={C.cream}>The Daily Table</text>
      <rect x="170" y="19" width="22" height="2.5" rx="1" fill={C.cream} />
      <rect x="170" y="26" width="22" height="2.5" rx="1" fill={C.cream} />
      <text x="16" y="72" fontSize="8" fill={C.ember} letterSpacing="1.5">NEIGHBOURHOOD RESTAURANT</text>
      <text className="serif" x="16" y="112" fontSize="34" fill={C.cream}>Seasonal food,</text>
      <text className="serif" x="16" y="148" fontSize="34" fontStyle="italic" fill={C.ember}>shared at</text>
      <text className="serif" x="16" y="184" fontSize="34" fontStyle="italic" fill={C.ember}>the table.</text>
      <rect x="16" y="204" width="188" height="34" rx="17" fill={C.ember} />
      <text x="110" y="225" fontSize="11" fontWeight="700" fill={C.bg} textAnchor="middle">Book a table</text>
      <circle cx="110" cy="330" r="78" fill="#2B231E" />
      <Plate cx={110} cy={330} r={62} />
      <rect x="16" y="414" width="188" height="1.5" fill={C.card} />
    </svg>
  );
}
