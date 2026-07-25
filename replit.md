# Royal Properties

A premium real estate website for Royal Properties Kanpur, powered by React + Supabase. No custom backend — the frontend communicates directly with Supabase. Includes a full custom admin CMS at `/admin`.

## Run & Operate

- `pnpm --filter @workspace/royal-properties run dev` — run the website (managed by workflow)
- `pnpm --filter @workspace/royal-properties run typecheck` — typecheck the frontend

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, shadcn/ui, wouter (routing)
- Database / Auth / Storage: Supabase (direct JS client — no backend)
- Animations: GSAP, AOS
- Icons: lucide-react

## Where things live

```
artifacts/royal-properties/src/
  lib/
    supabase.ts      — Supabase client (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
    database.ts      — typed CRUD helpers for all tables
    storage.ts       — file upload helpers for Supabase Storage
    seedData.ts      — fallback data when Supabase tables are empty
  pages/
    Home.tsx         — public website (all sections)
    admin/           — full CMS (Dashboard, Properties, Blogs, Testimonials, Messages, Settings)
  components/
    public/          — Navbar, Hero, PropertyCard, PropertyModal, filters, Contact, Footer, etc.
    admin/           — AdminSidebar, ImageUploader, etc.
```

## Supabase Setup

Run `supabase-setup.sql` in your Supabase SQL Editor to create all tables, RLS policies, and seed 20 sample properties + blogs + testimonials.

Also create these 4 **public** storage buckets in Supabase Dashboard → Storage:
- `property-images`
- `blog-images`
- `testimonial-photos`
- `website-assets`

Create the admin user in Supabase Dashboard → Authentication → Users.

## Environment Variables

- `VITE_SUPABASE_URL` — Supabase project URL (already set)
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key (already set)

## Admin Dashboard

URL: `/admin`

Full CMS with:
- Property management (add/edit/delete, image upload, publish/draft toggle)
- Blog management
- Testimonial management
- Contact message inbox (mark read/archive/delete)
- Website settings (phone, address, social links, hero text, etc.)

## Architecture decisions

- No custom backend — Supabase Row Level Security (RLS) enforces access control directly
- Public reads allowed for published properties/blogs/testimonials — no auth required
- Contact form inserts directly to Supabase — no auth required
- Admin routes protected by checking Supabase auth session on every admin page
- Sample data fallback in `seedData.ts` ensures the site looks full even before Supabase tables are populated

## User preferences

_Populate as needed._

## Gotchas

- Google Fonts `@import url(...)` must be the very first line of `index.css` before `@import "tailwindcss"`
- All Supabase env vars must use `VITE_` prefix for Vite to expose them client-side
- Supabase anon key is public by design; RLS policies protect data security
- Admin user must be created manually in Supabase Auth dashboard (not in SQL)
