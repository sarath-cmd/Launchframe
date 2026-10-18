import { BrowserFrame, PhoneFrame } from "./frames";
import { NorthlineDesktop, NorthlineMobile } from "./northline";
import { FormaDesktop, FormaMobile } from "./forma";
import { DailyTableDesktop, DailyTableMobile } from "./daily-table";
import { ClearpathDesktop, ClearpathMobile } from "./clearpath";

export type MockupKey = "northline" | "forma" | "daily-table" | "clearpath";

const registry = {
  northline: { Desktop: NorthlineDesktop, Mobile: NorthlineMobile, url: "northline.example" },
  forma: { Desktop: FormaDesktop, Mobile: FormaMobile, url: "forma-studio.example" },
  "daily-table": { Desktop: DailyTableDesktop, Mobile: DailyTableMobile, url: "thedailytable.example" },
  clearpath: { Desktop: ClearpathDesktop, Mobile: ClearpathMobile, url: "clearpath.example" },
} as const;

export function DesktopMockup({ mockup, className }: { mockup: MockupKey; className?: string }) {
  const { Desktop, url } = registry[mockup];
  return (
    <BrowserFrame url={url} className={className}>
      <Desktop />
    </BrowserFrame>
  );
}

export function MobileMockup({ mockup, className }: { mockup: MockupKey; className?: string }) {
  const { Mobile } = registry[mockup];
  return (
    <PhoneFrame className={className}>
      <Mobile />
    </PhoneFrame>
  );
}
