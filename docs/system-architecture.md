# System Architecture - Haus Coastal Landing + Blog

## Overview

Two-tier system: Next.js 14 frontend on Cloudflare Pages communicates with a serverless blog API running on Cloudflare Workers.

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Pages (SSR)                   │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Landing Page │  │ Blog Listing │  │ Blog Detail  │      │
│  │   (/)        │  │  (/tin-tuc)  │  │ (/tin-tuc/   │      │
│  │              │  │              │  │   [slug])    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                             ▲                │
│                                             │                │
└─────────────────────────────────────────────┼────────────────┘
                                              │
                                    fetch/revalidate
                                    (60s cache)
                                              │
                                              ▼
                    ┌───────────────────────────────┐
                    │  Cloudflare Workers API        │
                    │  (haus-coastal-blog-api)       │
                    │                               │
                    │  GET /api/posts               │
                    │  GET /api/posts/{slug}        │
                    │  POST/PUT/DELETE (admin)      │
                    └──────────┬────────────────────┘
                               │
                   ┌───────────┴───────────┐
                   ▼                       ▼
            ┌─────────────┐      ┌──────────────┐
            │ Cloudflare  │      │ Cloudflare   │
            │    D1       │      │     R2       │
            │  (SQLite    │      │  (Images &   │
            │  Database)  │      │   Assets)    │
            └─────────────┘      └──────────────┘
```

## Frontend Architecture

### Pages & Routes

**Home (`/`):**
- Hero section with property showcase
- Key amenities and features
- Call-to-action for consultation

**Consultation Form (`/slide-tu-van/`):**
- Form submission with CRM webhook integration
- Phone and email validation
- Automatic lead capture

**Blog Listing (`/tin-tuc/`):**
- Fetches from `GET /api/posts` on load
- 60-second ISR (Incremental Static Regeneration)
- Displays published posts with excerpts and cover images

**Blog Detail (`/tin-tuc/[slug]/`):**
- Dynamic route using `[slug]` parameter
- Server-side rendering with revalidation every 60 seconds
- Calls `GET /api/posts/{slug}` to fetch full post content

### Data Flow

```
Blog Listing Page
  └─ fetchPublishedPosts()
      └─ fetch GET /api/posts
          └─ Returns: BlogPostListItem[] (id, slug, title, excerpt, cover_image, published)

Blog Detail Page
  └─ fetchPostBySlug(slug)
      └─ fetch GET /api/posts/{slug}
          └─ Returns: BlogPost (full content + metadata)

Image Resolution
  └─ resolveImageUrl(coverImage)
      └─ Handles absolute URLs, R2 URLs, and relative paths
```

### Blog API Client

**File:** `app/lib/blog-api.ts`

**Types:**
- `BlogPost` - Full blog post (title, content, images, dates)
- `BlogPostListItem` - Listing preview (without content)

**Functions:**
- `fetchPublishedPosts()` - Get all published posts
- `fetchPostBySlug(slug)` - Get single post
- `resolveImageUrl(url)` - Handle image URL resolution

**Environment:**
- `NEXT_PUBLIC_BLOG_API_URL` - Blog API endpoint (default: `https://haus-coastal-blog-api.workers.dev`)

## Backend Architecture

### Cloudflare Workers API

**Runtime:** Cloudflare Workers (V8 isolate, <50ms startup)

**Framework:** Hono (lightweight, optimized for Workers)

**Authentication:**
- Single admin password for access
- JWT tokens for authenticated requests
- Stored securely in Cloudflare Secrets

### Database Schema (D1/SQLite)

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  published INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Seed Data:**
- 3 Vietnamese blog posts included in initial deployment
- Covers project features, location, and updates

### Storage (R2)

- Blog post cover images stored in R2
- Images served via Cloudflare CDN with automatic optimization
- Path structure: `/blog/posts/{slug}/cover.jpg`

### API Endpoints

**Public (No Auth):**
- `GET /api/posts` - List published posts (published = 1)
- `GET /api/posts/{slug}` - Get single post detail

**Admin (JWT Auth):**
- `POST /api/posts` - Create new post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

**Admin Panel:**
- Served at `/admin/` as single-page HTML application
- Login with admin password to get JWT token
- Manage posts (create, edit, delete)
- Upload cover images to R2

### Response Format

```json
{
  "posts": [
    {
      "id": 1,
      "slug": "gioi-thieu-du-an",
      "title": "Giới thiệu Dự Án Haus Coastal",
      "excerpt": "...",
      "cover_image": "https://r2.example.com/...",
      "published": 1,
      "created_at": "2026-01-15T10:30:00Z",
      "updated_at": "2026-01-15T10:30:00Z"
    }
  ]
}
```

## Deployment & Infrastructure

### Cloudflare Pages (Landing)

**Trigger:** Git push to main branch
**Build:** `npm run build` (uses @cloudflare/next-on-pages)
**Output:** Static + SSR-capable deployment
**Preview:** `npm run preview` for local testing

### Cloudflare Workers (Blog API)

**Deployment:** Via Wrangler CLI
**Secrets:** Environment variables for admin password, JWT secret
**Database:** D1 SQLite instance
**Storage:** R2 bucket for images
**CDN:** Automatic Cloudflare CDN caching

### Caching Strategy

**Frontend:**
- Blog listing/detail: 60-second ISR (revalidate on fetch)
- Images: Cloudflare Cache (1-year max-age)
- HTML: Browser cache per response headers

**Backend:**
- POST/PUT/DELETE: Cache-Control: no-cache
- GET (public): Cacheable with ETag

## Performance Considerations

1. **SSR with ISR** - Blog pages render on-demand, cached for 60s
2. **R2 Image Optimization** - Cloudflare auto-resizes images
3. **Edge Caching** - API responses cached at edge nodes
4. **Small Deployments** - Workers are serverless with minimal cold starts
5. **Database Optimization** - D1 queries optimized for Workers (single connection)

## Security

1. **Admin Authentication** - Single password + JWT token
2. **CORS Policy** - Blog API only accepts requests from landing domain
3. **Input Validation** - Blog content sanitized before storage
4. **HTTPS Only** - All endpoints use HTTPS
5. **Secrets Management** - Admin password and JWT secret in Cloudflare Secrets

## Monitoring & Logging

- Cloudflare Pages Analytics for frontend performance
- Cloudflare Workers Analytics for API performance
- Error logging in Worker console (visible via `wrangler tail`)
- D1 query logs available via Cloudflare dashboard
