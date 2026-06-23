
## Mumbai Real Estate — UI Build Plan (v2)

Frontend-only build on the existing TanStack Start + Tailwind v4 + shadcn stack. No backend, no Supabase. All data lives in local React state, persisted to `localStorage` for admin mutations.

### 1. Design tokens (`src/styles.css`)

Use shadcn's HSL pattern correctly so opacity modifiers (`bg-primary/50`) keep working:

```css
:root {
  --background: hsl(220 20% 97%);
  --foreground: hsl(220 40% 13%);
  --primary: hsl(220 60% 20%);
  --primary-foreground: hsl(45 100% 96%);
  /* ...full palette per spec... */
  --radius: 0.625rem;
  --shadow-card: 0 4px 24px -4px rgba(0,0,0,0.4);
  --shadow-card-hover: 0 12px 40px -8px rgba(0,0,0,0.6);
  --gradient-navy: linear-gradient(135deg, hsl(220 65% 12%), hsl(220 60% 20%), hsl(220 45% 30%));
  --gradient-gold: linear-gradient(135deg, hsl(40 90% 51%), hsl(35 95% 58%));
}
.dark { /* dark palette per spec, same hsl() wrapping */ }

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ...no re-wrapping in hsl()... */
  --font-sans: "Inter", sans-serif;
  --font-display: "Outfit", sans-serif;
  --radius-lg: var(--radius);
  --shadow-card: var(--shadow-card);
  --shadow-card-hover: var(--shadow-card-hover);
}
```

**Deliberate deviation:** shadcn's current default scaffold uses OKLCH; we're staying on HSL per user spec.

Container: define as plain CSS (Tailwind v4 dropped the v3 container plugin):
```css
.container { width: 100%; margin-inline: auto; padding-inline: 2rem; }
@media (min-width: 1536px) { .container { max-width: 1400px; } }
```

Base layer: apply `font-display` to `h1-h6`, `font-sans` to body.

### 2. Font loading

Add Inter + Outfit via `head()` `links` on `__root.tsx` (preconnect + Google Fonts stylesheet) — rendered through `<HeadContent />`, not hand-placed `<link>` JSX. This plays correctly with TanStack head dedup.

### 3. Shared types (`src/types/property.ts`)

Single `Property` interface (id, title, location, price, type, status: 'Available'|'Sold'|'Pending', bedrooms, bathrooms, areaSqft, description, imageUrl) imported by mock data, public cards, and admin table/dialog.

### 4. Mock data (`src/data/mockProperties.ts`)

~8 Mumbai properties (Bandra, Andheri, Powai, Worli, Lower Parel…) with realistic ₹ pricing and **stable** `images.unsplash.com/photo-<id>?w=1200&q=80` URLs (never `source.unsplash.com`).

### 5. Theme provider

Root-level `ThemeProvider` (class on `<html>`, persisted to `localStorage`). Toggle UI exposed in the admin header for now; provider lives at root so the public `SiteHeader` can adopt it later without refactor.

### 6. Public routes & sections

- `src/routes/index.tsx` — landing page composed of section components below.
- Each section in `src/components/site/`:
  1. **SiteHeader** — sticky nav, logo, anchor links, gold "Get in Touch" CTA.
  2. **Hero** — Navy gradient bg, Outfit headline ("Find Your Home in Mumbai"), subcopy, gold primary + outline CTAs, mock search bar (location / type / budget).
  3. **ServicesGrid** — 4 shadcn `Card`s (Residential Sales, Commercial Real Estate, Investment Advisory, Legal & Finance Support) with Lucide icons, custom card shadow + hover lift via `--shadow-card-hover`.
  4. **FeaturedProperties** — 6 property cards from mock data.
  5. **YouTubeSection** — "Mumbai Real Estate on YouTube", "255+ Subscribers" stat badge, 4 mock video thumbnail cards with play overlay, gold "Subscribe on YouTube" CTA.
  6. **FounderProfile** — split layout: portrait + bio spanning Real Estate, Finance, upcoming Legal/Law.
  7. **ContactSection** — name/email/phone/message form + WhatsApp CTA card + floating WhatsApp button. Submit → `toast.success`.
  8. **Footer** — nav, socials, copyright.

### 7. Admin (`/admin/properties`)

- `src/routes/_admin.tsx` — pathless layout: `SidebarProvider` + shadcn `Sidebar` (Dashboard, Properties, Leads, Settings) + top header (mock user avatar, theme toggle, `SidebarTrigger`). Note: shadcn Sidebar brings `SidebarProvider`, cookie collapse persistence, and multiple subcomponents — the heaviest piece of this build.
- `src/routes/_admin.admin.index.tsx` → redirect to `/admin/properties`.
- `src/routes/_admin.admin.properties.tsx`:
  - Header with "Add Property" button.
  - shadcn `Table`: Image thumb, Title, Location, Price (₹), Status badge, Actions (Edit / Delete icons).
  - `Dialog` Add/Edit form: title, location, price, type Select, status Select, bedrooms, bathrooms, area, description Textarea, image URL.
  - `AlertDialog` delete confirmation.
  - Mutations update local state **and** persist to `localStorage` (`re-admin-properties-v1`) so refresh survives the session. Seeded from mock data on first load.
  - **Validation:** lightweight inline checks (required title/location/image; price/area/bedrooms/bathrooms must be positive numbers). No react-hook-form/zod.
  - **Toasts** on every Add / Update / Delete via sonner.

### 8. Out of scope

- No real auth on `/admin` (user handles backend).
- No real YouTube API.
- No public dark-mode toggle yet (provider is ready when wanted).

### 9. Technical notes

- Tailwind v4 CSS-first; no `tailwind.config.js`.
- Only semantic tokens in components — no hex / `text-white`.
- Each route gets distinct `head()` meta with relative `og:url`; canonical on leaves only.
