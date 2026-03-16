# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page + Blog system for **Haus Coastal Quảng Ngãi** — real estate marketing site. Two separate repos work together:

| Repo | Stack | Deploy Target |
|------|-------|---------------|
| **This repo** (Landing) | Next.js 14, React 18, Tailwind 3.4, Framer Motion | Docker standalone on Tose |
| **haus-coastal-blog-api** (separate repo at `E:/Landingpage AI/haus-coastal-blog-api`) | Hono, Cloudflare Workers, D1, R2, Workers AI | Cloudflare Workers |

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
Homepage (`app/page.tsx`) composes section components sequentially:
`Hero → Introduction → Overview → Location → Partners → Products → Planning → Operations → Amenities → Policy → Potential → RegistrationForm → Progress → News (Suspense) → Contact`

There are also `architecture-section.tsx` and `layout-section.tsx` components in `app/components/sections/` available but not necessarily in the homepage composition above — check `app/page.tsx` for the actual render order.

Each section is a standalone component in `app/components/sections/`. Sections use `SectionWrapper` (client component with Framer Motion + Intersection Observer) for scroll-triggered animations and ID-based anchor linking.

`NewsSection` is the only async server component on the homepage — wrapped in `<Suspense>` with a skeleton fallback because it fetches from the Blog API.

### Navigation & Anchors
Navigation uses Vietnamese slugs for anchor IDs: `#gioi-thieu`, `#tong-quan`, `#vi-tri`, `#tien-ich`, `#ban-giao`, `#chinh-sach`, `#san-pham`, `#layout`, `#tien-do`, `#tin-tuc`, `#lien-he`. Defined in `app/lib/constants.ts` `NAV_ITEMS`.

### Content Data Source
Project content is aligned with the reference at `https://dongtayland.vn/du-an/coastal-quang-ngai/`. Key facts:
- Location: Đường ven biển Dung Quất – Sa Huỳnh, Quảng Ngãi
- Scale: 93,9 ha, mật độ xây dựng chỉ 14%
- Products: 1.111 căn (146 nhà liền kề, 296 biệt thự, 669 căn hộ)
- Legal: Sổ hồng sở hữu lâu dài
- Partners: Sweco (Thụy Điển) quy hoạch, Delta xây dựng, Copper Beech (Anh Quốc) vận hành
- Reference images stored in `images_chuan/` folder at project root

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
- **`app/lib/constants.ts`** — central data file for navigation, project info, product specs, contact info, sales policies, amenities, and news items. **Change project data here first** — includes `SITE_URL`, `SITE_NAME`, `CONTACT_INFO`, `PROJECT_INFO`, `PRODUCT_TYPES`, `SALES_POLICIES`, `AMENITIES`, `NEWS_ITEMS`, and all section content data.
- **Overview video overlay** — `overview-section.tsx` uses absolute-positioned YouTube iframe over a background image with `-translate-y-[10%]`. Info grid has `relative z-10` to stay above video; video container has `z-0`. Container uses `isolate` to prevent z-index bleed. Do NOT add `overflow-hidden` to the video container — it clips the border-radius.

### Analytics & Tracking
- **Google Analytics**: `G-HHW4ZZ4BN2` — loaded via `next/script` `afterInteractive`
- **Facebook Pixel**: `1999396194315989` — loaded via `next/script` `afterInteractive`. Fires `PageView` on load; fires `Lead` event on successful form submission (in `app/lib/form-utils.ts` → `trackFbLead()`)
- **Preconnect hints**: `connect.facebook.net` and `googletagmanager.com` in `<head>` for faster loading
- **Noscript fallback**: 1x1 pixel `<img>` for browsers with JS disabled

### SEO & Structured Data
- `app/layout.tsx`: Organization + WebSite JSON-LD, Google Search Console verification
- `app/page.tsx`: RealEstateListing + FAQPage JSON-LD (uses raw `JSON.stringify` — NOT `safeJsonLd`, since no user-generated content)
- `app/tin-tuc/[slug]/page.tsx`: Article + BreadcrumbList JSON-LD (uses `safeJsonLd()` since it includes blog content)
- `app/tin-tuc/page.tsx`: BreadcrumbList + CollectionPage JSON-LD
- `app/robots.ts` + `app/sitemap.ts`: auto-generated
- `app/lib/json-ld-utils.ts`: `safeJsonLd()` escapes `<` to `\u003c` preventing `</script>` XSS in JSON-LD blocks; `safeFormatDate()` handles invalid dates gracefully

### Security
- **CSP** in `next.config.mjs`: Whitelists `self`, Google Analytics, Facebook Pixel, `cdn.jsdelivr.net` (Chart.js), Blog API origin. `unsafe-inline` + `unsafe-eval` for scripts (Next.js requirement). `object-src 'none'`, `base-uri 'self'`.
- **Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`
- When adding new external scripts/domains, update CSP `connect-src` and `script-src` in `next.config.mjs`

### Slide Tư Vấn (Presentation Page)
Client-side fullscreen presentation at `/slide-tu-van/` — used by sales team to pitch investors. `robots: noindex, nofollow` via `layout.tsx`. Modular structure:
- `app/slide-tu-van/page.tsx` — Main component (`'use client'`), composes all 12 slides, loads Chart.js via `next/script`
- `app/slide-tu-van/use-slide-navigation.ts` — Keyboard/touch/click navigation hook, progress bar updates
- `app/slide-tu-van/slide-charts.ts` — Chart.js initialization per slide (lazy, only when slide becomes active)
- `app/slide-tu-van/slide-styles.css` — Self-contained CSS (not Tailwind — intentional for presentation isolation). Uses separate fonts (Playfair Display + Inter) loaded via CSS `@import`

### Form & UTM Utilities
- `app/lib/form-utils.ts` — `getUtmParams()` reads UTM query params client-side; `submitFormToWebhook()` POSTs form data to `/api/contact/`; `trackFbLead()` fires FB Pixel Lead event on success
- Used by `RegistrationFormSection` and `ContactSection` — both forward UTM params alongside lead data
- Both forms have honeypot field (`website`) for bot detection

### API Routes
- `POST /api/contact/` — form submission with honeypot field (`website`), in-memory rate limiting (5/min/IP with periodic cleanup), phone regex validation (`/^(\+84|0)\d{9,10}$/`), email format validation, forwards to `WEBHOOK_URL`. Note: in-memory rate limiter resets on cold start — relies on reverse proxy for production-grade protection.
- `POST /api/revalidate/` — ISR revalidation trigger, requires `Bearer REVALIDATE_SECRET` header, validates slug against `/^[a-z0-9-]+$/` before revalidating `/`, `/tin-tuc/`, and optionally `/tin-tuc/{slug}/`

### Error & Loading States
- `app/error.tsx` — Global error boundary (client component)
- `app/not-found.tsx` — Custom 404 page
- `app/loading.tsx` + `app/tin-tuc/loading.tsx` — Skeleton loading states

### Design System
- **Fonts**: `Alumni Sans` (headings via `font-heading`), `Pathway Extreme` (body via `font-sans`)
- **Brand colors** (tailwind.config.ts): `navy` (#0B3D5C), `gold` (#D4AF37), `cream` (#F0E6DC), `rose-beige` (#C39F93), `terracotta` (#B7401D), `cta-orange` (#FF5722), `cta-amber` (#FFAB00), `ocean-blue` (#1B76A8)
- **Primary accent**: `cta-orange` (#FF5722) — used for headings, hover states, focus rings, card values, thumbnail labels, success messages, and all interactive elements. `gold` is secondary accent for divider lines only. `rose-beige` and `terracotta` are retained in config but minimally used in components.
- **Gradient sections**: Planning, Operations, Potential use `bg-gradient-to-br from-terracotta to-cta-orange`. Form sections (Registration, Contact) also use this gradient.
- **Button styles**: Primary button is `bg-cta-orange text-navy` (orange background, navy text). Outline variant uses `ocean-blue` border. On gradient backgrounds, buttons use `bg-white text-cta-orange`.
- **Utility CSS classes** in globals.css: `.gold-line`, `.rose-line`, `.terracotta-line`, `.bg-cream-gradient`, `.section-padding`
- **Path alias**: `@/*` maps to project root

### UI Components
- `app/components/ui/section-wrapper.tsx` — Client component wrapping sections with Framer Motion scroll animation
- `app/components/ui/carousel.tsx` — Image carousel with touch/swipe, keyboard nav, auto-play, visibility-change pause
- `app/components/ui/lightbox.tsx` — Fullscreen image viewer with `role="dialog"`, `aria-modal`, focus trap, Escape to close
- `app/components/ui/button.tsx` — Shared button component (renders as `<button>` or `<a>`), supports `primary` and `outline` variants
- `app/components/floating-cta.tsx` — Fixed-position CTA (Zalo + phone + scroll-to-top), hidden on `/slide-tu-van` pages
- `app/components/header.tsx` — Sticky nav with mobile menu, body scroll lock, focus trap, Escape to close
- `app/components/footer.tsx` — Footer with contact info

### Blog API (Separate Repo)

**AI System**: Workers AI (Gemma 3 12B) is the primary model — runs on Cloudflare edge with no region restrictions. Falls back to Gemini API (`gemini-2.5-flash-lite`) if Workers AI binding is unavailable. The function is still named `callGemini()` for historical reasons.

**Auto Daily Posts**: `auto-post-generator.ts` — cron-triggered (`*/5 * * * *`) generates 1 AI post/day at 8:00 AM ICT from a pool of 15 rotating topics about the project. Picks random topic, generates via AI, auto-uploads cover from Pexels, publishes, then triggers landing page ISR revalidation.

**Full Article Import**: `POST /api/admin/ai/import-url` — paste a URL, system crawls full content preserving ALL images and HTML structure (no AI rewrite). `html-content-extractor.ts` has `extractFullContentFromHtml()` with: whitelisted HTML tags, class-based content container detection (falls back through `<article>` → `<main>` → common content div classes → `<body>`), nesting-aware junk div stripping (share/social/sidebar/related/comment/banner/pagination), relative URL resolution, `<img>` attribute normalization. All inline images are downloaded to R2 via `downloadAndReplaceImages()` in `r2-upload.ts`.

Admin panel is an embedded SPA in the Worker, modularized across `src/admin-ui-sections/`:
- `admin-styles.ts` — CSS
- `admin-shared-scripts.ts` — api(), esc(), router, toSlug(), sanitizeHtml()
- `admin-views-scripts.ts` — View rendering + form setup
- `admin-ai-scripts.ts` — AI generate/edit, import from URL, full article import
- `admin-bulk-import-scripts.ts` — Bulk URL import

Admin features: AI post generation, create from URL (crawl + rewrite), full article import (preserve original), bulk import, scheduled publishing (cron `*/5 * * * *`), cover image suggestion via Pexels, auto daily post generation.

## Deployment

**Landing (this repo)**: Docker image → Tose hosting (no CI/CD — manual build & deploy)
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

**Blog API secrets** (set via `wrangler secret put`): `ADMIN_PASSWORD`, `JWT_SECRET`, `GEMINI_API_KEY`, `PEXELS_API_KEY`

## Project Documentation

Maintained in `docs/`:
- `project-overview-pdr.md` — Product development requirements
- `code-standards.md` — Coding conventions
- `codebase-summary.md` — Module-level summary
- `system-architecture.md` — Architecture diagrams & data flow
- `deployment-guide.md` — Deployment procedures

Read these before making architectural changes.
