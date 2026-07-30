# Royal Properties

A premium real estate website for Royal Properties Kanpur — built with React + Supabase. No backend server required; the frontend communicates directly with Supabase.

---

## Live Admin

URL: `/admin`  
Admin Email: `royalproperties_0611@royalproperties.com`  
Admin Password: `royalproperties42388434`  
*(Create this user in Supabase Auth — see Step 4 below)*

---

## Quick Setup (5 steps)

### Step 1 — Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Give it a name (e.g. `royal-properties`) and a database password
4. Wait for it to finish initializing (~2 minutes)
5. Go to **Settings → API**
6. Copy:
   - **Project URL** (e.g. `https://xxxx.supabase.co`)
   - **anon / public key** (the long `eyJ...` string)

---

### Step 2 — Add Environment Variables

**In Replit:**
1. Open **Tools → Secrets**
2. Add two secrets:
   - Key: `VITE_SUPABASE_URL` → Value: your Project URL
   - Key: `VITE_SUPABASE_ANON_KEY` → Value: your anon key

**For Vercel deployment:**  
Add the same two keys in **Vercel → Project → Settings → Environment Variables**.

---

### Step 3 — Run the Database Schema

1. In your Supabase project, click **SQL Editor** → **New query**
2. Open `supabase-schema.sql` from this project
3. Copy the entire contents and paste into the editor
4. Click **Run**

This creates all tables (properties, blogs, testimonials, contact_messages, settings, property_types, locations, amenities_list), sets up Row Level Security, and seeds sample data.

---

### Step 4 — Create Admin User

1. In Supabase, go to **Authentication → Users**
2. Click **Add user → Create new user**
3. Enter:
   - Email: `royalproperties_0611@royalproperties.com`
   - Password: `royalproperties42388434`
4. Click **Create user**

This is the login for your admin panel at `/admin`.

---

### Step 5 — Create Storage Buckets

1. In Supabase, go to **Storage**
2. Click **New bucket** and create these 4 buckets (each must be set to **Public**):

| Bucket Name    | Public |
|----------------|--------|
| `properties`   | ✅     |
| `blogs`        | ✅     |
| `testimonials` | ✅     |
| `site-assets`  | ✅     |

See `supabase-storage-setup.md` for detailed instructions and storage policies.

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm --filter @workspace/royal-properties run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deploy to Vercel (Free)

1. Push this project to a GitHub repository
2. Go to [https://vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Configure the build:
   - **Framework Preset:** Vite
   - **Build Command:** `pnpm --filter @workspace/royal-properties run build`
   - **Output Directory:** `artifacts/royal-properties/dist/public`
   - **Root Directory:** *(leave blank — repo root)*
5. Add Environment Variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`

---

## Admin Dashboard Features

| Section          | What you can do                                                        |
|------------------|------------------------------------------------------------------------|
| **Properties**   | Add, edit, delete, duplicate, publish/unpublish, image upload          |
| **Blogs**        | Add, edit, delete, publish/unpublish, image upload                     |
| **Testimonials** | Add (with star rating + photo), delete                                 |
| **Messages**     | View contact form submissions, mark read, archive, delete, reply email |
| **Settings**     | Edit contact info, hero text, about text, social links                 |

---

## Project Structure

```
artifacts/royal-properties/src/
├── lib/
│   ├── supabase.ts      — Supabase client
│   ├── database.ts      — All CRUD functions
│   ├── storage.ts       — File upload helpers
│   └── seedData.ts      — Fallback data when Supabase tables are empty
├── hooks/
│   ├── useProperties.ts — React Query hooks for properties, blogs, testimonials
│   └── useAdmin.ts      — Auth + messages hooks
├── pages/
│   ├── Home.tsx         — Full public website
│   └── admin/           — CMS pages
└── components/
    ├── public/          — Website sections (Hero, PropertyCard, etc.)
    └── admin/           — Admin sidebar, image uploader
```

---

## Files Included

| File                        | Purpose                                      |
|-----------------------------|----------------------------------------------|
| `supabase-schema.sql`       | Run once in Supabase SQL Editor to set up DB |
| `supabase-storage-setup.md` | Step-by-step guide to create storage buckets |
| `.env.example`              | Template for environment variables           |
| `README.md`                 | This file                                    |

---

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Routing:** wouter
- **Data fetching:** TanStack React Query
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Animations:** GSAP, AOS

---

## How It Works

The website talks directly to Supabase — no custom backend server. Supabase Row Level Security (RLS) policies control access:

- **Public:** Anyone can read published properties, blogs, testimonials, and settings
- **Admin:** Only authenticated users (your admin account) can create, update, or delete records
- **Contact form:** Anyone can submit a message (insert-only, no read access)

The anon key in `VITE_SUPABASE_ANON_KEY` is safe to expose publicly — RLS policies are the security boundary.
