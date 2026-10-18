import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

/** Per-page metadata with a canonical URL built from the configured production domain. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: absoluteUrl(path), siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
