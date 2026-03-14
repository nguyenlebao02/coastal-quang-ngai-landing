# Codebase Summary — Haus Coastal Landing

## Directory Structure

```
app/
├── page.tsx                          # Homepage — 15 sections composed
├── layout.tsx                        # Root layout: fonts, GA, JSON-LD, GSC verification
├── globals.css                       # Tailwind base + utility CSS classes
├── loading.tsx                       # Root loading skeleton
├── error.tsx                         # Error boundary
├── not-found.tsx                     # 404 page
├── robots.ts                         # robots.txt generator
├── sitemap.ts                        # Dynamic sitemap (homepage + blog posts)
├── components/
│   ├── header.tsx                    # Sticky nav with anchor links (client)
│   ├── footer.tsx                    # Footer with contact info
│   ├── floating-cta.tsx              # Fixed Zalo + phone buttons (client)
│   ├── sections/                     # 15 homepage sections
│   │   ├── hero-section.tsx
│   │   ├── introduction-section.tsx
│   │   ├── overview-section.tsx
│   │   ├── location-section.tsx
│   │   ├── partners-section.tsx      # Sweco, Delta, Copper Beech
│   │   ├── products-section.tsx      # 3 product types with quantities
│   │   ├── planning-section.tsx      # Quy hoạch tổng thể
│   │   ├── operations-section.tsx    # Quản lý & vận hành
│   │   ├── amenities-section.tsx     # 3 amenity groups + carousel
│   │   ├── policy-section.tsx
│   │   ├── potential-section.tsx     # Đánh giá tiềm năng + ending CTA
│   │   ├── registration-form-section.tsx  # Contact form (client)
│   │   ├── progress-section.tsx
│   │   ├── news-section.tsx          # Fetches blog posts from API
│   │   └── contact-section.tsx       # Contact form (client)
│   └── ui/
│       ├── section-wrapper.tsx       # Framer Motion scroll animation (client)
│       ├── carousel.tsx              # Image carousel (client)
│       ├── lightbox.tsx              # Fullscreen image viewer (client)
│       └── button.tsx                # Shared button
├── lib/
│   ├── blog-api.ts                   # Blog API client (fetch, sanitize, resolve URLs)
│   ├── constants.ts                  # All static data (nav, products, contacts, amenities)
│   └── form-utils.ts                # Form validation helpers
├── api/
│   ├── contact/route.ts              # POST: form → webhook (honeypot + rate limit)
│   └── revalidate/route.ts           # POST: ISR cache purge
├── tin-tuc/
│   ├── page.tsx                      # Blog listing page
│   ├── loading.tsx                   # Blog listing skeleton
│   └── [slug]/page.tsx               # Blog detail (SSG + ISR, related posts)
└── slide-tu-van/
    ├── page.tsx                      # Consultation slide deck
    ├── slide-charts.ts               # Chart.js data
    └── use-slide-navigation.ts       # Slide navigation hook

public/images/                        # Static images by section
├── hero/                             # Hero banners, ending CTA, reference images
├── amenities/                        # Amenity photos (reference + originals)
├── products/                         # Product type images (shophouse, villa, apartment)
├── partners/                         # Partner logos (Sweco, Delta, Copper Beech)
├── location/                         # Location maps, detail photos, investment potential
├── progress/                         # Construction progress
├── backgrounds/                      # Section backgrounds
├── news/                             # Blog fallback images
└── misc/                             # Logos, icons

Config files:
├── next.config.mjs                   # standalone output, trailingSlash, unoptimized images
├── tailwind.config.ts                # Brand colors, fonts, container
├── tsconfig.json                     # Path alias @/* → root
├── Dockerfile                        # Multi-stage: builder → runner (node:20-alpine)
└── package.json                      # Dependencies
```

## Key Files Quick Reference

| Need to... | File |
|-------------|------|
| Change navigation links | `app/lib/constants.ts` → `NAV_ITEMS` |
| Update contact info | `app/lib/constants.ts` → `CONTACT_INFO` |
| Edit project details | `app/lib/constants.ts` → `PROJECT_INFO` |
| Change brand colors | `tailwind.config.ts` → `colors` |
| Update SEO metadata | `app/layout.tsx` → `metadata` export |
| Modify blog API URL | `app/lib/blog-api.ts` or `NEXT_PUBLIC_BLOG_API_URL` env |
| Add a homepage section | Create in `app/components/sections/`, add to `app/page.tsx` |
| Edit blog rendering | `app/tin-tuc/[slug]/page.tsx` |
| Change form webhook | `WEBHOOK_URL` env var (runtime) |
| Update JSON-LD schema | `app/layout.tsx` (global), `app/page.tsx` (homepage), `app/tin-tuc/[slug]/page.tsx` (articles) |
| Edit CSS utilities | `app/globals.css` |

## Dependencies

| Package | Purpose |
|---------|---------|
| next 14.2 | Framework |
| react 18 | UI library |
| framer-motion | Scroll animations |
| react-intersection-observer | Viewport detection for lazy animations |
| isomorphic-dompurify | HTML sanitization (SSR-safe) |
| @tailwindcss/typography | `prose` classes for blog content |
| puppeteer (devDep) | PDF/screenshot generation for slides |

## Blog API Repo (separate)

Location: `E:/Landingpage AI/haus-coastal-blog-api`

```
src/
├── index.ts                          # Hono app entry, route mounting
├── routes/
│   ├── public-posts.ts               # GET /api/posts, /api/posts/:slug
│   ├── admin-posts.ts                # CRUD for posts (JWT auth)
│   └── admin-ai.ts                   # AI generate/edit endpoints
├── services/
│   ├── gemini-client.ts              # Gemini API (model: gemini-2.5-flash-lite)
│   ├── posts-db.ts                   # D1 queries
│   ├── r2-upload.ts                  # R2 image upload
│   ├── pexels-image-search.ts        # Cover image suggestions
│   ├── auto-post-generator.ts        # Cron-triggered post generation
│   └── html-content-extractor.ts     # URL crawl + content extraction
├── admin-ui-sections/                # Embedded admin SPA
│   ├── admin-styles.ts
│   ├── admin-shared-scripts.ts
│   ├── admin-views-scripts.ts
│   ├── admin-ai-scripts.ts
│   └── admin-bulk-import-scripts.ts
└── wrangler.toml                     # Workers config, D1, R2, CORS, cron
```
