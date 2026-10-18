export interface Project {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  /** Live URL of the actual site. */
  url: string;
  /** Optional static screenshot to use instead of a live iframe preview (e.g. when the site blocks framing). */
  previewImage?: string;
}

export const projects: Project[] = [
  {
    slug: "nook-grain",
    name: "Nook & Grain",
    category: "Home business",
    tagline: "A warm, modern home interiors site where visitors get an instant estimate and reach you on WhatsApp or by phone in one tap.",
    url: "https://nook-grain.vercel.app/",
  },
  {
    slug: "aurelia",
    name: "Aurelia",
    category: "Interior design studio",
    tagline: "A premium interior design site that showcases finished spaces and turns visitors into consultation bookings through WhatsApp or a call.",
    url: "https://demo1-ten-ecru.vercel.app/",
  },
  {
    slug: "build-construct-pro",
    name: "Build Construct Pro",
    category: "SaaS",
    tagline: "One dashboard to track construction projects, materials and labour, with separate logins for owners, engineers and homeowners.",
    url: "https://buildconstructpro.vercel.app/",
    previewImage: "/media/demo-build-construct-pro.png",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
