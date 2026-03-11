# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page + Blog system for **Haus Coastal Quảng Ngãi** — real estate marketing site. Two separate repos work together:

| Repo | Stack | Deploy Target |
|------|-------|---------------|
| **This repo** (Landing) | Next.js 14, React 18, Tailwind 3.4, Framer Motion | Docker standalone (`node server.js`) on Tose |
| **haus-coastal-blog-api** (separate repo) | Hono, Cloudflare Workers, D1, R2, Gemini 2.5 Flash | Cloudflare Workers |

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
- **Landing** (this repo): SSR pages fetch blog posts from the Blog API at runtime
- **Blog API** (E:/Landingpage AI/haus-coastal-blog-api): REST API + embedded admin SPA
- Blog API URL configured via `NEXT_PUBLIC_BLOG_API_URL` (default: `https://haus-coastal-blog-api.hauscoastal.workers.dev`)

### Landing Page Structure
Homepage (`app/page.tsx`) is composed of 12 section components rendered sequentially:
`Hero → Introduction → RegistrationForm → Overview → Location → Amenities → Architecture → Policy → Products → Layout → Progress → News → Contact`

Each section is a standalone async server component in `app/components/sections/`. Sections use `SectionWrapper` for consistent ID-based anchor linking (navigation uses `#gioi-thieu`, `#vi-tri`, etc.).

### Key Architectural Patterns
- **All content is in Vietnamese** — component names are English, but UI text, SEO metadata, and slugs are Vietnamese
- **No image optimization** — `images: { unoptimized: true }` in next.config.mjs, images served from `public/` or Blog API's R2
- **Blog data fetching** — `app/lib/blog-api.ts` fetches from Blog API with `revalidate: 60` ISR; falls back to `NEWS_ITEMS` constants if API unavailable
- **`app/lib/constants.ts`** — Central data file for navigation items, project info, product specs, contact info
- **Standalone Docker deploy** — `output: 'standalone'` in next.config.mjs, Dockerfile builds and runs `server.js`
- **`trailingSlash: true`** — All routes end with `/` (e.g., `/tin-tuc/`, `/tin-tuc/[slug]/`)

### Design System
- **Fonts**: `Alumni Sans` (headings, `font-heading`), `Pathway Extreme` (body, `font-sans`)
- **Brand colors** (defined in tailwind.config.ts): `navy` (#0B3D5C), `gold` (#D4AF37), `cream` (#F0E6DC), `rose-beige` (#C39F93), `terracotta` (#B7401D), `cta-orange` (#FF5722)
- **Utility CSS classes** in globals.css: `.gold-line`, `.rose-line`, `.terracotta-line`, `.bg-cream-gradient`
- **Path alias**: `@/*` maps to project root

### Blog API (Separate Repo)
Admin panel is an embedded SPA in the Worker, modularized across `src/admin-ui-sections/`:
- `admin-styles.ts` — CSS
- `admin-shared-scripts.ts` — api(), esc(), router, toSlug(), sanitizeHtml()
- `admin-views-scripts.ts` — View rendering + form setup
- `admin-ai-scripts.ts` — AI generate/edit (Gemini 2.5 Flash)
- `admin-bulk-import-scripts.ts` — Bulk URL import

Admin features: AI post generation (with tone/templates), create from URL (crawl + rewrite), bulk import, scheduled publishing (cron `*/5 * * * *`), auto cover image suggestion.

## Deployment

**Landing (this repo)**: Docker image → Tose hosting
```bash
docker build -t haus-coastal .
# NEXT_PUBLIC_BLOG_API_URL is baked at build time in Dockerfile
```

**Blog API**: Cloudflare Workers via wrangler (auth stored in `%APPDATA%/xdg.config/.wrangler/`)
```bash
cd "E:/Landingpage AI/haus-coastal-blog-api"
npx wrangler deploy --env=""              # Deploy worker
npx wrangler d1 execute haus-coastal-blog --remote --file=./migrations/XXX.sql  # Run migration
npx wrangler secret put GEMINI_API_KEY    # Set secrets
```

## Key Environment Variables

```env
NEXT_PUBLIC_BLOG_API_URL=https://haus-coastal-blog-api.hauscoastal.workers.dev
```

Blog API secrets (set via `wrangler secret put`): `ADMIN_PASSWORD`, `JWT_SECRET`, `GEMINI_API_KEY`
