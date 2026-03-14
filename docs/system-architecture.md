# System Architecture — Haus Coastal Landing + Blog

## Overview

Two-repo system: Next.js 14 landing page on Docker/Tose + Hono Blog API on Cloudflare Workers.

```
┌──────────────────────────────────────────────────────────────┐
│                Docker Container (Tose)                        │
│                hauscoastal.com.vn                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Landing Page │  │ Blog Listing │  │ Blog Detail  │       │
│  │   (/)        │  │  (/tin-tuc/) │  │ (/tin-tuc/   │       │
│  │  15 sections │  │              │  │   [slug]/)   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                  │                 │               │
│         │         ISR fetch (revalidate: 60s)                │
│         ▼                  ▼                 ▼               │
│  ┌─────────────────────────────────────────────────┐         │
│  │ app/lib/blog-api.ts                             │         │
│  │ fetchPublishedPosts() / fetchPostBySlug()       │         │
│  └────────────────────────┬────────────────────────┘         │
│                           │                                  │
│  ┌────────────────────────┤                                  │
│  │ API Routes             │                                  │
│  │ POST /api/contact/     │  → WEBHOOK_URL                   │
│  │ POST /api/revalidate/  │  → ISR cache purge               │
│  └────────────────────────┘                                  │
└───────────────────────────┬──────────────────────────────────┘
                            │
                   HTTPS fetch (public API)
                            │
                            ▼
          ┌────────────────────────────────────┐
          │  Cloudflare Workers                │
          │  haus-coastal-blog-api             │
          │  (Hono framework)                  │
          │                                    │
          │  Public:                           │
          │    GET /api/posts                  │
          │    GET /api/posts/{slug}           │
          │  Admin (JWT):                      │
          │    POST/PUT/DELETE /api/admin/*    │
          │    POST /api/admin/ai/generate    │
          │    POST /api/admin/ai/edit        │
          │    /admin/ (SPA)                  │
          │  Cron: */5 * * * * (scheduler)    │
          └──────┬─────────────┬──────────────┘
                 │             │
       ┌─────────┘             └─────────┐
       ▼                                 ▼
┌─────────────┐                ┌──────────────┐
│ Cloudflare  │                │ Cloudflare   │
│    D1       │                │     R2       │
│ (SQLite DB) │                │ (Images)     │
│ posts table │                │ haus-coastal │
│ + scheduled │                │   -images    │
└─────────────┘                └──────────────┘
```

## Frontend Architecture

### Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Homepage — 15 section components |
| `/tin-tuc/` | ISR (60s) | Blog listing — fetches all published posts |
| `/tin-tuc/[slug]/` | ISR (60s) | Blog detail — full post + 3 related articles |
| `/slide-tu-van/` | SSG | Consultation slide deck |
| `/api/contact/` | API | Form submission → webhook forwarding |
| `/api/revalidate/` | API | ISR cache invalidation (POST, needs secret) |

### Data Flow

```
Homepage
  └─ 15 server components rendered sequentially
  └─ NewsSection → fetchPublishedPosts() → shows 3 latest posts

Blog Listing (/tin-tuc/)
  └─ fetchPublishedPosts() → GET /api/posts → BlogPostListItem[]

Blog Detail (/tin-tuc/[slug]/)
  └─ fetchPostBySlug(slug) → GET /api/posts/{slug} → BlogPost
  └─ fetchPublishedPosts() → filter → 3 related posts
  └─ sanitizeHtml(content) → DOMPurify + resolve relative image URLs

Contact Form
  └─ POST /api/contact/ → honeypot check → rate limit (5/min/IP) → WEBHOOK_URL

Sitemap (app/sitemap.ts)
  └─ fetchPublishedPosts() → generate dynamic sitemap at build time
  └─ Blog URLs only update on rebuild, not ISR
```

### SEO & Structured Data

| Page | JSON-LD Types |
|------|---------------|
| Layout (all pages) | Organization, WebSite |
| Homepage | RealEstateListing, FAQPage |
| Blog Detail | Article, BreadcrumbList |

Google Analytics: `G-HHW4ZZ4BN2`
Google Search Console: verified via meta tag

## Backend Architecture (Blog API)

### Routes

| Endpoint | Auth | Description |
|----------|------|-------------|
| `GET /api/posts` | None | Published posts list |
| `GET /api/posts/{slug}` | None | Single post detail |
| `POST /api/admin/login` | Password | Returns JWT (7d expiry) |
| `POST /api/admin/posts` | JWT | Create post |
| `PUT /api/admin/posts/{id}` | JWT | Update post |
| `DELETE /api/admin/posts/{id}` | JWT | Delete post |
| `POST /api/admin/ai/generate` | JWT | AI content generation (Gemini) |
| `POST /api/admin/ai/edit` | JWT | AI content editing |
| `GET /admin/` | None | Admin SPA (login in-app) |

### Services

| File | Purpose |
|------|---------|
| `gemini-client.ts` | Workers AI (Gemma 3 12B) primary, Gemini API fallback |
| `posts-db.ts` | D1 database queries |
| `r2-upload.ts` | R2 image upload |
| `pexels-image-search.ts` | Cover image suggestions via Pexels |
| `auto-post-generator.ts` | Scheduled post generation (cron) |
| `html-content-extractor.ts` | URL crawl + content extraction |

### Database Schema (D1)

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  published INTEGER DEFAULT 0,    -- 0=draft, 1=published
  publish_at TEXT,                 -- scheduled publishing
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Known Issues

- **Gemini location block**: Google API returns "User location not supported" from Cloudflare Worker IPs. Needs Cloudflare AI Gateway proxy to fix. Local/browser calls work fine.
- **Smart placement** enabled in `wrangler.toml` but may not fully resolve the issue.

## Caching Strategy

| Layer | TTL | Notes |
|-------|-----|-------|
| ISR (blog pages) | 60s | `next: { revalidate: 60 }` in fetch calls |
| Sitemap | Build time | Only updates on rebuild |
| Images (public/) | Browser cache | Unoptimized, served directly |
| R2 images | CF CDN | Auto-cached by Cloudflare |
| API GET | No explicit cache | Relies on ISR caching |

## Security

- Admin auth: single password → JWT token (7-day expiry)
- Login rate limit: 10 attempts per IP per 15-minute window
- Contact form: honeypot field + 5 req/min/IP rate limit
- CORS: Blog API only accepts `hauscoastal.com.vn`
- HTML sanitization: DOMPurify on all blog content
- Content-Security-Policy: not configured (potential improvement)
