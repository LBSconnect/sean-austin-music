# Sean Austin - Official Music Artist Website

## Overview
A modern, high-converting music artist website for international reggae artist Sean Austin (@iamseanaustin). Built with a dark theme featuring gold/green Caribbean-inspired accents.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Wouter (routing) + TanStack Query
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Stripe (via stripe-replit-sync for webhook/data sync)
- **UI Components**: shadcn/ui

## Pages
- `/` - Home (Hero, Social Proof Counter, Latest Release, Countdown Timer, Upcoming Shows, Videos, Fan Testimonials, About Preview, Newsletter)
- `/music` - Full discography with streaming links and UTM tracking
- `/videos` - Music videos and live performances (LazyYouTube facade)
- `/tour` - Tour dates from database with JSON-LD structured data
- `/about` - Full artist biography and stats
- `/contact` - Contact form (saves to database)
- `/epk` - Electronic Press Kit (8 sections: bio toggle, press photos, music embed, video, achievements, press quotes, booking contact, PDF download)
- `/fan-club` - Fan club membership page with Free/Premium tier pricing (Stripe checkout)
- `/admin/login` - Admin login page
- `/admin` - Admin dashboard (tour dates, music releases, press quotes, subscribers)

## Project Structure
- `client/src/pages/` - All page components (including admin-login.tsx, admin-dashboard.tsx, fan-club.tsx)
- `client/src/components/` - Navigation, Footer, SEO, LazyYouTube, growth components, UI components
- `client/src/lib/tracking.ts` - Analytics tracking (GA4, Meta Pixel, TikTok Pixel)
- `client/public/images/` - Generated artist images and press photos
- `client/public/robots.txt` - Robots.txt for crawlers
- `server/` - Express backend with API routes
- `server/stripeClient.ts` - Stripe client using Replit connection API
- `server/webhookHandlers.ts` - Stripe webhook processing
- `server/seed-products.ts` - Script to seed fan club products in Stripe
- `shared/schema.ts` - Database schema (contacts, subscribers, tourDates, adminUsers, musicReleases, pressQuotes)

## API Routes
- `POST /api/contact` - Submit contact form
- `POST /api/subscribe` - Email newsletter subscription
- `GET /api/tour-dates` - Fetch tour dates
- `GET /api/music-releases` - Fetch music releases
- `GET /api/press-quotes` - Fetch press quotes
- `GET /sitemap.xml` - Dynamic XML sitemap (8 pages)

## Fan Club API Routes (Stripe)
- `GET /api/stripe/publishable-key` - Get Stripe publishable key
- `GET /api/fan-club/products` - List fan club products with prices from stripe schema
- `POST /api/fan-club/checkout` - Create Stripe checkout session (validates priceId against allowed fan-club prices)
- `POST /api/fan-club/portal` - Open Stripe customer portal (requires email + active subscription)
- `POST /api/fan-club/status` - Check membership status by email
- `POST /api/stripe/webhook` - Stripe webhook endpoint (registered BEFORE express.json())

## Admin API Routes (session auth required)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Check auth status
- `POST/PUT/DELETE /api/admin/tour-dates(/:id)` - Manage tour dates
- `POST/PUT/DELETE /api/admin/music-releases(/:id)` - Manage music releases
- `POST/PUT/DELETE /api/admin/press-quotes(/:id)` - Manage press quotes
- `GET /api/admin/subscribers` - View subscribers
- `GET /api/admin/subscribers/export` - Export emails as CSV

## Database Tables
- `contacts` - Contact form submissions
- `subscribers` - Newsletter email subscribers
- `tour_dates` - Tour date entries (seeded with sample data)
- `admin_users` - Admin accounts (bcrypt hashed passwords)
- `music_releases` - Music catalog entries
- `press_quotes` - Press/media quotes
- `stripe.*` - Stripe schema tables (auto-managed by stripe-replit-sync)

## Fan Club Membership Tiers
- **Free**: Email updates, public content access, community
- **Premium** ($9.99/mo or $79.99/yr): Exclusive unreleased tracks, private livestreams, early ticket access, behind-the-scenes content, direct messages, member-only merch drops

## Growth Mechanics
- Exit-intent popup for email signup (session-scoped, one-time trigger)
- Sticky mobile footer with Stream Now + Follow on Instagram
- Countdown timer component for new releases
- Fan testimonial carousel with auto-advance
- Social proof counter with animated count-up (streams, followers, shows)

## SEO & Performance
- Per-page SEO via `<SEO>` component: title, description, canonical URL, Open Graph, Twitter Cards
- MusicArtist JSON-LD structured data in index.html
- MusicEvent JSON-LD on tour page with ISO dates
- Sitemap.xml generated server-side with all pages
- robots.txt in client/public
- Lazy loading on all images (loading="lazy" + width/height)
- LazyYouTube facade component: shows thumbnail, loads iframe on click
- Font optimization: only needed weights, display=swap
- Resource hints: preconnect (fonts, Spotify), dns-prefetch (YouTube)

## Analytics
- Meta Pixel, TikTok Pixel, GA4 via env vars (VITE_META_PIXEL_ID, VITE_TIKTOK_PIXEL_ID, VITE_GA4_MEASUREMENT_ID)
- Page views tracked once per route change (no duplication)
- Conversion events: email signup, stream clicks, contact form submit

## Auth & Security
- Session-based auth using express-session + connect-pg-simple
- SESSION_SECRET from environment secrets
- bcryptjs for password hashing
- Secure cookies in production
- Zod validation on all admin update endpoints
- Stripe checkout validates priceId against allowed fan-club prices
- Stripe portal requires email match with active subscription
- Default admin seeded on first run (admin/admin123 - should change in production)

## Design
- Dark theme with reggae gold (#D4AF37, HSL 46 69%) primary and green (#1DB954, HSL 141 73%) accent
- Dark background (#0f0f0f, HSL 0 0% 6%)
- Font: Montserrat (display), Inter (body)
- Mobile-first responsive design
- Caribbean-inspired premium aesthetic
