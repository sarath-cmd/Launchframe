import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/services", "/work", "/about", "/contact", "/privacy"];
  return staticPaths.map((path) => ({ url: absoluteUrl(path), priority: path === "/" ? 1 : 0.7 }));
}
