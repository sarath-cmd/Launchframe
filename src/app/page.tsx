import { absoluteUrl, site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/ui/JsonLd";
import { LandingHero } from "@/components/sections/LandingHero";
import { DemosSection } from "@/components/sections/DemosSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PricingLine } from "@/components/sections/PricingLine";
import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { ContactLine } from "@/components/sections/ContactLine";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

export const metadata = {
  ...pageMetadata({ title: site.tagline, description: site.description, path: "/" }),
  title: { absolute: `${site.name} | ${site.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: absoluteUrl("/"),
          description: site.description,
        }}
      />
      <LandingHero />
      <DemosSection />
      <BenefitsSection />
      <ProcessSection />
      <PricingLine />
      <AboutMeSection />
      <ContactLine />
      <FloatingWhatsApp />
    </>
  );
}
