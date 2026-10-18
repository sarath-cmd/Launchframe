export interface Service {
  slug: string;
  title: string;
  summary: string;
  value: string;
  included: string[];
  suitedTo: string;
  relatedProjects: string[];
}

export const services: Service[] = [
  {
    slug: "custom-website-design",
    title: "Custom Website Design",
    summary: "Distinctive, brand-aligned interfaces designed around your business and customers.",
    value:
      "Your website is often the first impression a customer has of you. Custom design means it looks like your business, not like everyone else's template, and every page is arranged to make your offer easy to understand.",
    included: [
      "Page structure planned around what customers need to know",
      "Visual direction: typography, colour, imagery and layout",
      "Desktop, tablet and mobile designs",
      "Clear calls to action placed where decisions happen",
    ],
    suitedTo: "Businesses launching something new, or those whose current site does not reflect their quality.",
    relatedProjects: ["aurelia", "nook-grain"],
  },
  {
    slug: "website-development",
    title: "Website Development",
    summary: "Responsive, reliable, fast-loading websites built with modern technology.",
    value:
      "A good design only works if it loads quickly and behaves on every device. We build with modern, well-supported tools so the site is dependable, easy to extend, and comfortable to use on a phone.",
    included: [
      "Responsive build tested across common browsers and screen sizes",
      "Performance-minded images, fonts and code",
      "Accessible, semantic markup",
      "Working contact and enquiry forms",
    ],
    suitedTo: "Anyone who needs a site that is quick, stable and straightforward to maintain.",
    relatedProjects: ["nook-grain", "build-construct-pro"],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    summary: "Focused pages designed to explain an offer and encourage a specific action.",
    value:
      "When you are promoting one service, a seasonal offer or a launch, a single focused page can do more than a whole site. It tells one story and asks for one action.",
    included: [
      "One clear message and one primary call to action",
      "Copy structure that answers common questions",
      "Mobile-first layout",
      "Enquiry or booking form connected to your inbox",
    ],
    suitedTo: "Campaigns, launches, and businesses that want a fast, focused online presence.",
    relatedProjects: ["nook-grain"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    summary: "Modernise outdated websites and improve clarity, usability, and visual quality.",
    value:
      "If your site looks dated, is awkward on mobile, or buries the information customers want, a redesign can fix it without starting your business story from scratch. We keep what works and rebuild what does not.",
    included: [
      "Review of what the current site does well and badly",
      "Reorganised content and navigation",
      "Fresh visual design and a modern build",
      "Help planning how existing pages and links carry over",
    ],
    suitedTo: "Businesses with a site that no longer matches how good they are in person.",
    relatedProjects: ["build-construct-pro", "nook-grain"],
  },
  {
    slug: "seo-foundations",
    title: "SEO Foundations",
    summary: "Technical SEO, metadata, semantic HTML, performance, and search-friendly page structure.",
    value:
      "Search engines reward sites that are fast, clearly structured and easy to understand. We build those foundations in from the start, so people searching for what you do have a fair chance of finding you.",
    included: [
      "Page titles, descriptions and social sharing metadata",
      "Semantic headings and clean URL structure",
      "Sitemap and robots configuration",
      "Performance and mobile usability groundwork",
    ],
    suitedTo: "Any business that wants to be found by people who do not know it yet. These are foundations, not a ranking promise.",
    relatedProjects: ["build-construct-pro", "aurelia"],
  },
  {
    slug: "ongoing-website-support",
    title: "Ongoing Website Support",
    summary: "Maintenance, improvements, and updates based on the agreed service scope.",
    value:
      "A website is not finished at launch. Support means someone you know looks after updates, fixes and improvements, so small tasks do not turn into big problems.",
    included: [
      "Updates and small content changes within the agreed scope",
      "Maintenance of the site's code and dependencies",
      "Improvements planned as your business changes",
      "A clear point of contact",
    ],
    suitedTo: "Owners who would rather run their business than manage a website.",
    relatedProjects: [],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
