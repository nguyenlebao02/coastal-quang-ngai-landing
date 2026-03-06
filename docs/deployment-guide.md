# Deployment Guide - Haus Coastal Landing + Blog

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account with Pages and Workers enabled
- Git repository connected to Cloudflare Pages
- Wrangler CLI installed globally: `npm install -g @cloudflare/wrangler`

### Environment Setup

**Landing Frontend (.env.local):**
```env
NEXT_PUBLIC_BLOG_API_URL=https://haus-coastal-blog-api.workers.dev
```

**Blog API Worker (wrangler.toml):**
```toml
[env.production]
vars = { ADMIN_PASSWORD = "your-secure-password" }
```

---

## Deployment: Landing (Cloudflare Pages)

### Automatic Deployment

1. **Connect Repository**
   - Go to Cloudflare Pages dashboard
   - Select "Connect to Git"
   - Choose the GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `.vercel/output/static`

2. **Automatic Builds**
   - Any push to main branch triggers automatic build
   - Deployment completes in ~2-3 minutes
   - Automatic rollback available for failed deploys

### Local Build & Preview

```bash
# Build for Cloudflare Pages
npm run build

# Preview locally
npm run preview

# Access at http://localhost:8788
```

### Verify Deployment

1. Check Cloudflare Pages dashboard for build status
2. Visit production URL: `https://your-domain.pages.dev` (or custom domain)
3. Test blog routes:
   - Blog listing: `/tin-tuc/`
   - Blog post: `/tin-tuc/gioi-thieu-du-an/`

---

## Deployment: Blog API (Cloudflare Workers)

### Setup

1. **Create D1 Database**
   ```bash
   wrangler d1 create haus-coastal-blog
   ```
   Note the database ID

2. **Create R2 Bucket**
   ```bash
   wrangler r2 bucket create haus-coastal-blog
   ```

3. **Configure wrangler.toml**
   ```toml
   name = "haus-coastal-blog-api"
   type = "service"
   account_id = "your-account-id"
   workers_dev = true

   [[d1_databases]]
   binding = "DB"
   database_id = "your-d1-id"

   [[r2_buckets]]
   binding = "BUCKET"
   bucket_name = "haus-coastal-blog"

   [env.production]
   vars = { ADMIN_PASSWORD = "your-secure-password" }
   ```

### Deploy

```bash
# Deploy to production
wrangler deploy --env production

# Deploy to staging
wrangler deploy --env staging

# View logs
wrangler tail
```

### Initialize Database

```bash
# Run migrations (if DB schema needs setup)
wrangler d1 execute haus-coastal-blog --file ./schema.sql --remote
```

**schema.sql:**
```sql
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  published INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert seed data
INSERT OR IGNORE INTO posts (slug, title, excerpt, content, cover_image, published)
VALUES
  ('gioi-thieu-du-an', 'Giới thiệu Dự Án Haus Coastal', '...', '...', '/images/hero.jpg', 1),
  ('dia-chi-va-vi-tri', 'Địa chỉ và Vị trí Dự Án', '...', '...', '/images/location.jpg', 1),
  ('co-so-va-tien-ich', 'Cơ sở và Tiện ích', '...', '...', '/images/amenities.jpg', 1);
```

### Verify Deployment

```bash
# Test API endpoints
curl https://haus-coastal-blog-api.workers.dev/api/posts
curl https://haus-coastal-blog-api.workers.dev/api/posts/gioi-thieu-du-an

# Check admin panel
open https://haus-coastal-blog-api.workers.dev/admin/
```

---

## Environment Variables & Secrets

### Landing (NEXT_PUBLIC_ variables)

- `NEXT_PUBLIC_BLOG_API_URL` - Blog API endpoint (public, in code)

### Blog API (Cloudflare Secrets)

Set via Cloudflare Workers dashboard:
- `ADMIN_PASSWORD` - Single admin password for login
- `JWT_SECRET` - Secret for signing JWT tokens

```bash
# Or via wrangler
wrangler secret put ADMIN_PASSWORD
wrangler secret put JWT_SECRET
```

---

## Post-Deployment Checklist

- [ ] Landing site loads without errors
- [ ] Blog listing page displays posts
- [ ] Blog detail pages render SSR correctly
- [ ] Images load correctly from R2
- [ ] CRM webhook form submission works
- [ ] Admin panel accessible at `/admin/` on Workers API
- [ ] API endpoints return correct data
- [ ] Cache headers set properly on responses

---

## Rollback Procedures

### Landing (Cloudflare Pages)

1. Go to Pages dashboard
2. Select deployment to rollback to
3. Click "Rollback to this deployment"
4. Takes effect immediately (no rebuild)

### Blog API (Cloudflare Workers)

```bash
# Redeploy previous version
wrangler deploy --name haus-coastal-blog-api
```

---

## Monitoring & Debugging

### Landing Logs

```bash
# View Pages analytics in dashboard
# Check "Analytics" tab for performance metrics
```

### API Logs

```bash
# Tail live logs
wrangler tail

# Filter by status
wrangler tail --status 500

# Filter by method
wrangler tail --method GET
```

### Database Queries

- Access D1 console via Cloudflare dashboard
- Run SQL queries directly
- Check query performance

### Common Issues

**API 404 on blog posts:**
- Check `NEXT_PUBLIC_BLOG_API_URL` in landing env
- Verify blog API is deployed and responding
- Check CORS configuration in Worker

**Images not loading:**
- Verify R2 bucket is configured correctly
- Check image paths in database
- Test R2 URLs directly: `https://r2.example.com/...`

**Admin login fails:**
- Verify `ADMIN_PASSWORD` is set in Cloudflare Secrets
- Check JWT_SECRET is configured
- Clear browser cookies and retry

---

## Performance Optimization

1. **ISR Revalidation** - Blog pages cached for 60 seconds
2. **Image Optimization** - Cloudflare auto-resize and format conversion
3. **Edge Caching** - API responses cached at Cloudflare edge
4. **Database Connection Pooling** - D1 manages connections efficiently

---

## Troubleshooting

**Landing build fails:**
- Check `npm run build` locally
- Verify Next.js version compatibility
- Check for missing environment variables

**Blog API endpoints return 500:**
- Check Worker logs: `wrangler tail`
- Verify D1 database is accessible
- Check SQL syntax in queries

**Images missing from posts:**
- Verify R2 bucket permissions
- Check image paths in database
- Test R2 URL directly

**Admin panel unreachable:**
- Check Worker is deployed to production
- Verify custom domain DNS if using one
- Check browser console for CORS errors
