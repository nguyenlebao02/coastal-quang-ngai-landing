# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page + Blog system for **Haus Coastal Quảng Ngãi** - a real estate/resort property marketing site built with Next.js 14 and a Cloudflare Workers backend.

## Tech Stack

**Frontend (Landing):**
- Next.js 14.2.21
- React 18.3.1
- TypeScript 5.6
- Tailwind CSS 3.4
- Framer Motion 11.18 (animations)
- React Intersection Observer 9.13

**Frontend Deployment:**
- Cloudflare Pages with SSR support
- `@cloudflare/next-on-pages` for build optimization
- Wrangler 4.71 for local preview and deployment

**Backend (Blog API):**
- Hono (lightweight HTTP server for Workers)
- Cloudflare Workers (serverless compute)
- Cloudflare D1 (SQLite database)
- Cloudflare R2 (object storage for images)
- Single-admin JWT authentication

## Build Commands

```bash
# Development
npm run dev              # Start Next.js dev server on localhost:3000

# Production Build
npm run build           # Build with @cloudflare/next-on-pages (Cloudflare Pages target)
npm run build:next     # Build with Next.js only

# Local Preview
npm run preview        # Preview Cloudflare Pages build locally

# Quality
npm run lint           # ESLint check
```

## Architecture Overview

**Landing Pages (SSR):**
- Main landing page: `/`
- Consultation page: `/slide-tu-van/`
- Blog listing: `/tin-tuc/`
- Blog detail: `/tin-tuc/[slug]/` (SSR with revalidation every 60s)

**Blog API Endpoints:**
- `GET /api/posts` - List published blog posts
- `GET /api/posts/{slug}` - Get single blog post by slug
- `POST /api/posts` (admin) - Create new blog post
- `PUT /api/posts/{id}` (admin) - Update blog post
- `DELETE /api/posts/{id}` (admin) - Delete blog post
- Admin panel SPA at `/admin/` with password + JWT auth

**File Structure:**
- `app/` - Next.js app directory (pages, layouts, components)
- `app/tin-tuc/` - Blog routes (listing and detail pages)
- `app/lib/blog-api.ts` - API client for blog backend
- `public/` - Static assets (logos, images)
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

## Key Environment Variables

```env
NEXT_PUBLIC_BLOG_API_URL=https://haus-coastal-blog-api.workers.dev
```

## Deployment

1. **Landing:** Deployed to Cloudflare Pages
2. **Blog API:** Deployed to Cloudflare Workers with D1 database
3. Build output: `.vercel/output/static/` (for Cloudflare Pages)

## Code Standards & Documentation

Refer to `./docs/` directory for:
- `system-architecture.md` - Detailed architecture and data flow
- `deployment-guide.md` - Step-by-step deployment instructions
- `code-standards.md` - Code quality and naming conventions
