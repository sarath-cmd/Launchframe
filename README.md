# Launchframe

Marketing site for Launchframe, a web design and development studio for small businesses.
Next.js (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Zod · Lucide.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`, `npm test`.

## Configuration

All variables are listed in `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin. Drives canonical URLs, sitemap, robots and Open Graph. |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `_PHONE`, `_LOCATION` | Optional. Shown in the footer and on `/contact`; placeholders are shown while empty. |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | Server-only. Enable enquiry delivery through [Resend](https://resend.com). |

Social links, the Terms page toggle and other business details live in `src/lib/site.ts`.

## Brand

Colours come from the Launchframe logo and are defined once as tokens in `src/app/globals.css`:
Cobalt Blue `#2457FF`, Charcoal `#111318`, Background `#FAF9F6`, plus derived hover, tint, line and muted shades (all text pairings meet WCAG AA).

The logo mark is a vector redraw of the brand icon (`src/components/ui/Logo.tsx`, standalone copy in `public/brand/launchframe-mark.svg`).
The wordmark is set in Outfit Bold to match the logo lettering. The favicon, Apple touch icon and Open Graph image are generated from the same mark.

## Enquiry form

`/contact` hosts a single-step form that POSTs to `src/app/api/enquiry/route.ts`. It asks for: name, business name,
phone number and/or email (at least one is required), the service needed, an approximate budget, an optional
link to an existing website, and privacy consent.

- Validation: `validateEnquiry` in `src/lib/enquiry/schema.ts` (Zod plus the phone-or-email rule) runs in the browser and again on the server.
- Spam and abuse: hidden honeypot field, minimum fill time, same-origin check, body size limit, in-memory rate limit per IP.
- Duplicates: the browser disables the button while sending and reuses one submission ID; the server ignores repeats of a delivered ID and passes it to Resend as an idempotency key.
- **If the three delivery variables are not set, the API returns 503 and the form shows that the enquiry was not sent.** It never reports false success.
- To use another provider, replace `deliverEnquiry` in `src/lib/enquiry/deliver.ts`.
- The rate limit and duplicate store (`src/lib/enquiry/guards.ts`) are per-instance memory. On serverless or multi-instance hosting, back them with a shared store such as Redis.
- The service choices come from `src/content/services.ts`. Budget is a free-text field so enquirers can give their exact figure.

## Content to review before launch

- **Portfolio**: the four projects in `src/content/projects.ts` are illustrative concepts and are labelled as such. The mockups are original vector artwork in `src/components/mockups`. No real clients, testimonials or statistics are used.
- **Privacy Policy** (`/privacy`) is a draft with bracketed gaps and needs legal review.
- FAQ answers and the "Pricing" note describe process only. Confirm they match how you actually work.
- Footer and contact details show "coming soon" until the env variables are set.

## Structure

```
src/app            routes, metadata, sitemap, robots, OG image, API route
src/components     ui primitives, layout, sections, mockups, enquiry form
src/content        services, projects, process, FAQ copy
src/lib            site config, metadata helper, enquiry logic
```

Server Components are the default. Client Components are limited to the header, scroll reveal, service tabs, promo video and the enquiry form.

Motion is deliberately restrained and CSS only: a short hero entrance, gentle section reveals, a process line that draws in, and subtle hover states. All of it is gated on `prefers-reduced-motion`, and content stays visible without JavaScript.

## Deployment

Works on any Node host or Vercel. Set the environment variables, run `npm run build`, then `npm start`.
Set `NEXT_PUBLIC_SITE_URL` to the final domain before building, since it is baked into metadata.

## Notes

- TypeScript is pinned to 6.x because typescript-eslint does not yet support 7.
- `npm audit` reports advisories in the dev-only ESLint toolchain (`braces` via `eslint-config-next`); they do not ship to production.
