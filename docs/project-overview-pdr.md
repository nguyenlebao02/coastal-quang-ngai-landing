# Project Overview — Haus Coastal Quảng Ngãi

## Purpose
Marketing landing page + blog system for **Coastal Quảng Ngãi** — a 93,9ha coastal real estate development on Dung Quất – Sa Huỳnh coastal road, Quảng Ngãi by Haus Group. Only 14% building density, 1.111 units. The site targets Vietnamese home buyers and investors with SEO-optimized content, consultation form, and blog.

## Production
- **Landing**: `https://hauscoastal.com.vn` (Docker on Tose)
- **Blog API**: `https://haus-coastal-blog-api.hauscoastal.workers.dev` (Cloudflare Workers)
- **Admin panel**: `https://haus-coastal-blog-api.hauscoastal.workers.dev/admin/`

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend framework | Next.js 14 (App Router, React 18) |
| Styling | Tailwind CSS 3.4, Framer Motion |
| Blog API | Hono on Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) |
| Image storage | Cloudflare R2 |
| AI content | Gemini 2.5 Flash Lite |
| Hosting (landing) | Docker standalone on Tose |
| Analytics | Google Analytics 4, Google Search Console |
| Domain | hauscoastal.com.vn |

## Key Features

### Landing Page
- 15-section homepage with scroll animations (Framer Motion + Intersection Observer)
- Sections: Hero → Introduction → Overview → Location → Partners → Products → Planning → Operations → Amenities → Policy → Potential → RegistrationForm → Progress → News → Contact
- Contact/consultation form with webhook integration, honeypot, rate limiting
- SEO: JSON-LD structured data (RealEstateListing, FAQPage, Organization, Article, BreadcrumbList)
- Dynamic sitemap + robots.txt
- Floating CTA (Zalo + phone hotline)
- Consultation slide deck (`/slide-tu-van/`)

### Blog System
- Blog listing page (`/tin-tuc/`) with ISR (60s revalidation)
- Blog detail pages with DOMPurify sanitized HTML content
- Related articles (3 per post)
- Dynamic `generateStaticParams` for pre-rendering

### Blog Admin (separate repo)
- Admin SPA at `/admin/` embedded in Cloudflare Worker
- AI-powered content generation (Gemini)
- Create posts from URL (crawl + rewrite)
- Bulk URL import
- Scheduled publishing (cron every 5 minutes)
- Cover image suggestions via Pexels API
- Image upload to R2

## Content Status

- **10 published blog posts** covering: project intro, location, interior design, investment, sustainability, green living, construction progress, pricing, comparison, urban planning
- **All content in Vietnamese** — component names in English, UI/SEO/slugs in Vietnamese

## Project Products (source: dongtayland.vn)
- Nhà Liền Kề & Shophouse (~146 căn, tối đa 5 tầng)
- Biệt Thự Sinh Thái (~296 căn, tối đa 3 tầng)
- Căn Hộ Cao Tầng (~669 căn, cao đến 25 tầng)
- Total: 1.111 căn — Pháp lý: Sổ hồng sở hữu lâu dài

## Project Partners
- Quy hoạch & thiết kế đô thị: Sweco (Thụy Điển) — TOP 1 châu Âu
- Đơn vị xây dựng: Delta — hàng đầu Việt Nam
- Quản lý & vận hành: Copper Beech (Anh Quốc)

## Contact
- Hotline: 098 624 3450
- Email: hauscoastal@gmail.com
- Address: 88 Hùng Vương, Phường Nghĩa Lộ, TP Quảng Ngãi
- Zalo: https://zalo.me/0986243450
