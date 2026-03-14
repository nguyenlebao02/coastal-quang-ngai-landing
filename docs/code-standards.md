# Code Standards — Haus Coastal Landing

## Language & Framework

- TypeScript strict mode (via `tsconfig.json`)
- Next.js 14 App Router (server components by default)
- Tailwind CSS 3.4 for styling
- Framer Motion for animations

## File Naming

- **kebab-case** for all files: `hero-section.tsx`, `blog-api.ts`, `section-wrapper.tsx`
- Sections: `app/components/sections/<name>-section.tsx`
- UI components: `app/components/ui/<name>.tsx`
- Lib/utils: `app/lib/<name>.ts`

## Component Patterns

### Server Components (default)
All section components and pages are async server components. No `'use client'` unless the component needs browser APIs, state, or event handlers.

```tsx
// app/components/sections/hero-section.tsx — server component
export default function HeroSection() { ... }
```

### Client Components
Only used when needed (animations, forms, interactivity). Marked with `'use client'` directive.

```tsx
// app/components/ui/section-wrapper.tsx — client component
'use client';
import { motion } from 'framer-motion';
```

Current client components: `SectionWrapper`, `Carousel`, `Lightbox`, `FloatingCta`, `Header`, `RegistrationFormSection`, `ContactSection`, form utilities.

### Section Components
Each homepage section follows this pattern:
- Wrapped in `<SectionWrapper id="anchor-id">` for scroll animation + anchor linking
- Self-contained — owns its own data/layout
- Uses brand design tokens from Tailwind config

## Styling

### Tailwind Classes
Use Tailwind utility classes directly. No CSS modules or styled-components.

### Brand Design Tokens (tailwind.config.ts)
```
navy / navy-light / navy-dark    — primary dark blue
gold / gold-light / gold-dark    — accent gold
cream / cream-light              — background warmth
terracotta / terracotta-dark     — accent red-brown
rose-beige / rose-pink           — soft accent
cta-orange / cta-amber           — call-to-action buttons
charcoal                         — text dark
ocean-blue                       — links
```

### Font Classes
- `font-heading` — Alumni Sans (headings, display)
- `font-sans` — Pathway Extreme (body text, default)

### Utility CSS Classes (globals.css)
- `.gold-line` / `.rose-line` / `.terracotta-line` — decorative section dividers
- `.bg-cream-gradient` — warm background gradient
- `.section-padding` — consistent vertical section spacing

## Data Management

All static content in `app/lib/constants.ts`:
- `NAV_ITEMS` — navigation links with Vietnamese anchor IDs
- `CONTACT_INFO` — hotline, email, address, Zalo
- `PROJECT_INFO` — project overview data
- `PRODUCT_TYPES` — product categories
- `SALES_POLICIES` — policy highlights
- `AMENITIES` — amenity gallery items
- `NEWS_ITEMS` — fallback blog items (used if Blog API unavailable)

## Blog Content

- Blog HTML content sanitized with `DOMPurify` via `sanitizeHtml()` before rendering
- Images resolved via `resolveImageUrl()` — handles absolute URLs, `/images/` paths, and Blog API relative paths
- `@tailwindcss/typography` `prose` classes used for blog content styling

## Vietnamese Content Convention

- Component/file names: English (`hero-section.tsx`)
- UI text, metadata, slugs: Vietnamese (`Giới thiệu`, `#gioi-thieu`, `/tin-tuc/`)
- SEO: Vietnamese keywords and descriptions
- All routes use Vietnamese slugs with `trailingSlash: true`

## API Routes

- Rate limiting: in-memory Map per IP
- Honeypot: hidden `website` field for bot detection
- Input sanitization: `.trim().slice(maxLength)` on all form fields
- UTM params forwarded to webhook

## Image Handling

- `images: { unoptimized: true }` — no Next.js image optimization
- Static images in `public/images/` organized by section
- Blog images from R2 via Blog API
- Use native `<img>` tags, not `next/image` (due to unoptimized config)

## Structured Data

- JSON-LD injected via `<script type="application/ld+json" dangerouslySetInnerHTML>`
- Organization + WebSite in layout (all pages)
- RealEstateListing + FAQPage on homepage
- Article + BreadcrumbList on blog detail pages
