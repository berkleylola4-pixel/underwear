# AGENTS.md — Period Underwear Shop

## Project Overview
Premium e-commerce boutique for period underwear (sous-vêtements menstruels) targeting the **US market**. Built to outperform thinx.com in SEO, GEO, copywriting, trust, and conversion.

## Architecture

```
/
├── index.html              # Homepage (hero, products, social proof, bundles, FAQ, blog, local SEO)
├── about.html              # Brand story, sustainability, 1% for Period Equity
├── faq.html                # Complete FAQ with Schema.org FAQPage markup
├── products/
│   └── high-waist-period-panties.html   # PDP example with full Schema.org Product JSON-LD
├── collections/
│   └── period-underwear.html            # Collection page with filters
├── blog/
│   └── index.html                       # Blog listing with Schema.org Blog markup
├── css/
│   └── style.css                        # Single CSS file, mobile-first, BEM-like naming
├── js/
│   └── main.js                          # Lightweight vanilla JS (mobile menu, gallery, cart, countdown)
├── images/                              # Placeholder for product images, badges, payment icons
├── sitemap.xml                          # Full sitemap with image tags
└── robots.txt                           # Optimized crawl directives
```

## Tech Stack
- **HTML5** semantic markup (header, nav, main, section, article, footer)
- **CSS3** with CSS custom properties (variables), Flexbox + Grid
- **Vanilla JavaScript** (no frameworks, ~200 lines, deferred loading)
- **Google Fonts**: Playfair Display (headings), Inter (body)
- No external JS/CDN dependencies except Google Fonts

## SEO Strategy

### On-Page SEO
- Semantic HTML5 structure with proper heading hierarchy (h1 → h2 → h3)
- Meta titles < 60 chars, descriptions < 160 chars
- Canonical URLs on every page
- Open Graph + Twitter Cards on every page
- BreadcrumbList schema with breadcrumb navigation

### Schema.org JSON-LD
- **Homepage**: Organization + WebSite + LocalBusiness
- **Product Pages**: Product + Offer + AggregateRating + Review + ShippingDetails + MerchantReturnPolicy
- **Collection Pages**: CollectionPage + ItemList
- **FAQ Pages**: FAQPage with Question/Answer pairs
- **Blog**: Blog + Article markup

### GEO / Local SEO
- `geo.region`, `geo.placename`, `geo.position`, `ICBM` meta tags
- LocalBusiness schema with full address, geo coordinates, opening hours
- City-specific sections: NYC, LA, Chicago, Houston, Phoenix, Philadelphia
- Sitemap includes `/local/*` city landing pages
- Shipping details mention "Ships from California warehouse"

### Keywords Targeted
Primary: `period underwear usa`, `best period panties`, `leakproof underwear`, `menstrual underwear`
Long-tail: `period underwear for heavy flow`, `organic cotton period panties`, `reusable period products usa`

## Copywriting Principles
- **Cialdini's 6 principles**: Social proof (12,400+ reviews), Authority (Vogue/NYT mentions), Scarcity (countdown timer), Consistency (60-day guarantee), Liking (relatable testimonials), Reciprocity (free shipping)
- **PAS framework**: Problem → Agitation → Solution (hero section)
- **Objection handling**: FAQ covers smell, washing, sizing, returns
- **Urgency**: Real countdown timer, "Memorial Day Sale" banners
- **Risk reversal**: 60-day guarantee, free returns, "97.3% keep their order"

## Performance
- Native lazy loading on all images (`loading="lazy"`)
- Hero image uses `fetchpriority="high"` + `loading="eager"`
- Preconnect to Google Fonts
- Intersection Observer for scroll animations
- Defer on all scripts
- CSS is a single file (~2000 lines) to minimize HTTP requests

## Accessibility
- Skip link for keyboard navigation
- ARIA labels on all interactive elements
- Proper button vs link usage
- Focus states on all interactive elements
- `prefers-reduced-motion` media query respected
- Semantic landmarks (header, nav, main, footer, section, article)

## Customization Notes
Replace `yourbrand.com` with actual domain in:
- All canonical links
- All `href` attributes pointing to internal pages
- Schema.org JSON-LD `@id` and `url` fields
- `og:url` meta tags
- Sitemap.xml URLs

Replace `YourBrand` text in logo SVGs and headings with actual brand name.
Replace placeholder image paths (`/images/...`) with actual product photography.
Replace `+1-800-555-0199` with actual customer service phone.
