# Deployment Guide — Haus Coastal Landing + Blog

## Quick Reference

```bash
# Landing — build & deploy
npm run build                    # local build check
docker build -t haus-coastal .   # Docker image
tose deploy coastal-quang-ngai   # push to Tose
tose status coastal-quang-ngai   # check status

# Blog API — deploy
cd "E:/Landingpage AI/haus-coastal-blog-api"
npx wrangler deploy --env=""     # deploy to Cloudflare Workers
npx wrangler tail                # live logs
```

## Landing (This Repo)

### Stack
Next.js 14 standalone → Docker → Tose hosting
Production: `https://hauscoastal.com.vn`

### Build

```bash
npm run build   # standalone output in .next/standalone/
```

`NEXT_PUBLIC_BLOG_API_URL` is baked at build time (set in Dockerfile).

### Docker

```dockerfile
# Multi-stage: builder → runner
FROM node:20-alpine AS builder   # npm ci + build
FROM node:20-alpine AS runner    # copy standalone + run server.js
EXPOSE 3000
```

Runtime env vars (NOT baked at build):
- `WEBHOOK_URL` — contact form webhook destination
- `REVALIDATE_SECRET` — ISR revalidation API secret

### Deploy to Tose

```bash
docker build -t haus-coastal .
tose deploy coastal-quang-ngai
tose status coastal-quang-ngai   # verify pod is Running
```

### ISR Revalidation

Blog pages auto-refresh every 60s via ISR. Manual trigger:
```bash
curl -X POST "https://hauscoastal.com.vn/api/revalidate/?secret=<REVALIDATE_SECRET>"
```
Note: `REVALIDATE_SECRET` must be set as runtime env var in Tose.

### Sitemap

`/sitemap.xml` generated at build time from `app/sitemap.ts`. Blog post URLs are fetched from Blog API during build. New posts appear in sitemap only after next rebuild (ISR doesn't update sitemap).

---

## Blog API (Separate Repo)

### Stack
Hono + Cloudflare Workers + D1 + R2
API: `https://haus-coastal-blog-api.hauscoastal.workers.dev`
Admin: `https://haus-coastal-blog-api.hauscoastal.workers.dev/admin/`

### Deploy

```bash
cd "E:/Landingpage AI/haus-coastal-blog-api"
npx wrangler deploy --env=""
```

### Secrets (via `wrangler secret put`)

| Secret | Purpose |
|--------|---------|
| `ADMIN_PASSWORD` | Admin panel login |
| `JWT_SECRET` | JWT token signing |
| `GEMINI_API_KEY` | AI content generation |

```bash
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put JWT_SECRET
npx wrangler secret put GEMINI_API_KEY
```

### Environment Vars (in `wrangler.toml`)

| Var | Value |
|-----|-------|
| `CORS_ORIGIN` | `https://hauscoastal.com.vn` |
| `LANDING_URL` | `https://hauscoastal.com.vn` |
| `REVALIDATE_SECRET` | ISR revalidation secret |

### Database Migrations

```bash
npx wrangler d1 execute haus-coastal-blog --remote --file=./migrations/XXX.sql
```

### Cron

`*/5 * * * *` — scheduled publishing check (publishes posts with `publish_at` in the past).

---

## Verify Deployment

### Landing
- [ ] `https://hauscoastal.com.vn/` loads without errors
- [ ] Blog listing: `/tin-tuc/` shows posts
- [ ] Blog detail: `/tin-tuc/<any-slug>/` renders content + related posts
- [ ] Contact form submits successfully
- [ ] Floating CTA (Zalo/phone) visible
- [ ] Google Analytics tracking (`G-HHW4ZZ4BN2`)
- [ ] `/sitemap.xml` and `/robots.txt` accessible

### Blog API
- [ ] `GET /api/posts` returns post list
- [ ] `GET /api/posts/<slug>` returns post detail
- [ ] `/admin/` login works
- [ ] Post create/edit/delete works
- [ ] Image upload to R2 works
- [ ] Scheduled publishing (cron) runs

---

## Rollback

### Landing (Tose)
```bash
tose rollback coastal-quang-ngai    # rollback to previous deployment
```

### Blog API (Cloudflare Workers)
```bash
# Redeploy previous git commit
git checkout <previous-commit>
npx wrangler deploy --env=""
git checkout master
```

---

## Troubleshooting

| Problem | Check |
|---------|-------|
| Blog posts not showing | Blog API running? `curl https://haus-coastal-blog-api.hauscoastal.workers.dev/api/posts` |
| Images broken | Check if path starts with `http` or `/images/`. R2 bucket accessible? |
| Contact form 500 | `WEBHOOK_URL` env var set in Tose? |
| ISR not refreshing | Wait 60s. Or trigger: `POST /api/revalidate/?secret=...` |
| Admin login fails | Check `ADMIN_PASSWORD` secret: `npx wrangler secret list` |
| AI generation fails | Gemini API blocked from CF Workers (known issue). Works from browser admin panel. |
| CORS errors | Check `CORS_ORIGIN` in `wrangler.toml` matches `hauscoastal.com.vn` |

### Logs

```bash
# Blog API live logs
npx wrangler tail
npx wrangler tail --status 500   # errors only

# Landing — check Tose pod logs
tose logs coastal-quang-ngai
```
