# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page + Blog system for **Haus Coastal Quảng Ngãi** — real estate marketing site. Two separate repos work together:

| Repo | Stack | Deploy Target |
|------|-------|---------------|
| **This repo** (Landing) | Next.js 14, React 18, Tailwind 3.4, Framer Motion | Docker standalone on Tose |
| **haus-coastal-blog-api** (separate repo at `E:/Landingpage AI/haus-coastal-blog-api`) | Hono, Cloudflare Workers, D1, R2, Gemini | Cloudflare Workers |

Production URL: `https://hauscoastal.com.vn`

## Build Commands

```bash
npm run dev          # Next.js dev server on localhost:3000
npm run build        # Production build (standalone output)
npm run start        # Start production server
npm run lint         # ESLint
```

No test framework is configured. Validate with `npm run lint` and `npm run build`.

## Architecture

### Two-Repo System
- **Landing** (this repo): SSR pages fetch blog posts from the Blog API at runtime via ISR (`revalidate: 60`)
- **Blog API**: REST API + embedded admin SPA. URL configured via `NEXT_PUBLIC_BLOG_API_URL` (default: `https://haus-coastal-blog-api.hauscoastal.workers.dev`)
- When Blog API is unavailable, blog pages return empty arrays (graceful fallback)

### Homepage Structure
Homepage (`app/page.tsx`) composes 12 section components sequentially:
`Hero → Introduction → RegistrationForm → Overview → Location → Amenities → Architecture → Policy → Products → Layout → Progress → News → Contact`

Each section is a standalone component in `app/components/sections/`. Sections use `SectionWrapper` (client component with Framer Motion + Intersection Observer) for scroll-triggered animations and ID-based anchor linking.

### Navigation & Anchors
Navigation uses Vietnamese slugs for anchor IDs: `#gioi-thieu`, `#tong-quan`, `#vi-tri`, `#tien-ich`, `#ban-giao`, `#chinh-sach`, `#san-pham`, `#layout`, `#tien-do`, `#tin-tuc`, `#lien-he`. Defined in `app/lib/constants.ts` `NAV_ITEMS`.

### Blog System
- **Listing page**: `/tin-tuc/` — fetches all published posts, renders grid
- **Detail page**: `/tin-tuc/[slug]/` — fetches single post by slug, renders HTML content with DOMPurify sanitization, shows 3 related posts
- **Data fetching**: `app/lib/blog-api.ts` — all blog API calls with ISR. `fetchPostBySlug` is wrapped with React `cache()` to deduplicate across `generateMetadata` and page component. `resolveImageUrl()` resolves relative image paths to Blog API origin. `sanitizeHtml()` runs DOMPurify first, then rewrites relative `/api/` image paths (order matters for security)
- **Static generation**: `generateStaticParams()` pre-renders all blog slugs at build time; ISR refreshes every 60s
- **Sitemap**: `app/sitemap.ts` — dynamic, includes homepage + listing + all blog post URLs. Blog URLs only update on rebuild (not ISR)

### Key Architectural Patterns
- **All content is in Vietnamese** — component names are English, UI text/SEO/slugs are Vietnamese
- **No image optimization** — `images: { unoptimized: true }` in next.config.mjs; images from `public/` or Blog API's R2
- **`trailingSlash: true`** — all routes end with `/` (e.g., `/tin-tuc/`, `/tin-tuc/[slug]/`)
- **Standalone Docker** — `output: 'standalone'` in next.config.mjs, Dockerfile builds and runs `server.js`
- **`app/lib/constants.ts`** — central data file for navigation, project info, product specs, contact info. **Change project data here first** — includes `SITE_URL`, `SITE_NAME`, `CONTACT_INFO`, and all section content data.

### SEO & Structured Data
- `app/layout.tsx`: Organization + WebSite JSON-LD, Google Analytics (`G-HHW4ZZ4BN2`), Google Search Console verification
- `app/page.tsx`: RealEstateListing + FAQPage JSON-LD
- `app/tin-tuc/[slug]/page.tsx`: Article + BreadcrumbList JSON-LD
- `app/robots.ts` + `app/sitemap.ts`: auto-generated

### Security Headers
Configured in `next.config.mjs` `headers()`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `X-DNS-Prefetch-Control`, `Strict-Transport-Security`.

### Slide Tư Vấn (Presentation Page)
Client-side fullscreen presentation at `/slide-tu-van/` — used by sales team to pitch investors. Modular structure:
- `app/slide-tu-van/page.tsx` — Main component (`'use client'`), composes all slides, loads Chart.js via `next/script`
- `app/slide-tu-van/use-slide-navigation.ts` — Keyboard/touch/click navigation hook, progress bar updates
- `app/slide-tu-van/slide-charts.ts` — Chart.js initialization per slide (lazy, only when slide becomes active)
- `app/slide-tu-van/slide-styles.css` — Self-contained CSS (not Tailwind — intentional for presentation isolation). Uses separate fonts (Playfair Display + Inter) loaded via CSS `@import`

### Form & UTM Utilities
- `app/lib/form-utils.ts` — `getUtmParams()` reads UTM query params client-side; `submitFormToWebhook()` POSTs form data to `/api/contact/`
- Used by `RegistrationFormSection` and `ContactSection` — both forward UTM params alongside lead data

### API Routes
- `POST /api/contact/` — form submission with honeypot field (`website`), in-memory rate limiting (5/min/IP with periodic cleanup), phone regex validation (`/^(\+84|0)\d{9,10}$/`), email format validation, forwards to `WEBHOOK_URL`. Note: in-memory rate limiter resets on cold start — relies on reverse proxy for production-grade protection.
- `POST /api/revalidate/` — ISR revalidation trigger, requires `Bearer REVALIDATE_SECRET` header, validates slug against `/^[a-z0-9-]+$/` before revalidating `/`, `/tin-tuc/`, and optionally `/tin-tuc/{slug}/`

### Error & Loading States
- `app/error.tsx` — Global error boundary (client component)
- `app/not-found.tsx` — Custom 404 page
- `app/loading.tsx` + `app/tin-tuc/loading.tsx` — Skeleton loading states

### Design System
- **Fonts**: `Alumni Sans` (headings via `font-heading`), `Pathway Extreme` (body via `font-sans`)
- **Brand colors** (tailwind.config.ts): `navy` (#0B3D5C), `gold` (#D4AF37), `cream` (#F0E6DC), `rose-beige` (#C39F93), `terracotta` (#B7401D), `cta-orange` (#FF5722)
- **Utility CSS classes** in globals.css: `.gold-line`, `.rose-line`, `.terracotta-line`, `.bg-cream-gradient`, `.section-padding`
- **Path alias**: `@/*` maps to project root

### UI Components
- `app/components/ui/section-wrapper.tsx` — Client component wrapping sections with Framer Motion scroll animation
- `app/components/ui/carousel.tsx` — Image carousel with touch/swipe, keyboard nav, auto-play
- `app/components/ui/lightbox.tsx` — Fullscreen image viewer with `role="dialog"`, `aria-modal`, Escape to close
- `app/components/ui/button.tsx` — Shared button component (renders as `<button>` or `<a>`)
- `app/components/floating-cta.tsx` — Fixed-position CTA (Zalo + phone), currently only on homepage

### Blog API (Separate Repo)
Admin panel is an embedded SPA in the Worker, modularized across `src/admin-ui-sections/`:
- `admin-styles.ts` — CSS
- `admin-shared-scripts.ts` — api(), esc(), router, toSlug(), sanitizeHtml()
- `admin-views-scripts.ts` — View rendering + form setup
- `admin-ai-scripts.ts` — AI generate/edit (Gemini)
- `admin-bulk-import-scripts.ts` — Bulk URL import

Admin features: AI post generation, create from URL (crawl + rewrite), bulk import, scheduled publishing (cron `*/5 * * * *`), cover image suggestion via Pexels.

**Known issue**: Gemini API calls from Cloudflare Workers get "User location not supported" — Google blocks cloud provider IPs. Needs Cloudflare AI Gateway proxy to fix.

## Deployment

**Landing (this repo)**: Docker image → Tose hosting
```bash
docker build -t haus-coastal .
# Override blog API URL at build time:
docker build --build-arg NEXT_PUBLIC_BLOG_API_URL=https://... -t haus-coastal .
# WEBHOOK_URL and REVALIDATE_SECRET must be passed at runtime
```

Note: `PUPPETEER_SKIP_DOWNLOAD=true` is set in Dockerfile to avoid downloading Chromium during build (puppeteer is a devDependency used only by root-level comparison scripts, not the app).

**Blog API**:
```bash
cd "E:/Landingpage AI/haus-coastal-blog-api"
npx wrangler deploy --env=""              # Deploy worker
npx wrangler d1 execute haus-coastal-blog --remote --file=./migrations/XXX.sql  # Run migration
npx wrangler secret put GEMINI_API_KEY    # Set secrets
```

## Key Environment Variables

**Landing (this repo)**:
```env
NEXT_PUBLIC_BLOG_API_URL=https://haus-coastal-blog-api.hauscoastal.workers.dev
WEBHOOK_URL=<contact form webhook endpoint>
REVALIDATE_SECRET=<secret for ISR revalidation API>
```

**Blog API secrets** (set via `wrangler secret put`): `ADMIN_PASSWORD`, `JWT_SECRET`, `GEMINI_API_KEY`

## Project Documentation

Maintained in `docs/`:
- `project-overview-pdr.md` — Product development requirements
- `code-standards.md` — Coding conventions
- `codebase-summary.md` — Module-level summary
- `system-architecture.md` — Architecture diagrams & data flow
- `deployment-guide.md` — Deployment procedures

Read these before making architectural changes.
