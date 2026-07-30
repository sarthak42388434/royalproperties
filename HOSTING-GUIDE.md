# Royal Properties — Complete Hosting Guide
### For Non-Technical Users

---

## Overview

You need to do **3 things** to get this website live:

1. **Set up Supabase** (free database in the cloud — stores your properties, blogs, etc.)
2. **Set up your database** (run a script that creates the tables)
3. **Publish the website** (put it live on the internet)

**Total time:** About 30–45 minutes  
**Cost:** Free (Supabase free tier + Vercel free tier)

---

## PART 1 — Set Up Supabase (Your Database)

### Step 1 — Create a Supabase Account

1. Open your browser and go to: **https://supabase.com**
2. Click the green **"Start your project"** button
3. Click **"Sign up"** and create a free account (use your email or GitHub)
4. Verify your email if they send a confirmation link

---

### Step 2 — Create Your Database Project

1. After logging in, you'll see a dashboard. Click **"New project"**
2. Fill in:
   - **Organization:** Your name (e.g. "Royal Properties")
   - **Project name:** `royal-properties`
   - **Database Password:** Create a strong password and **save it somewhere safe** (e.g. in a notepad file)
   - **Region:** Choose **"South Asia (Mumbai)"** — this is closest to Kanpur
3. Click **"Create new project"**
4. Wait 2–3 minutes while Supabase sets up your database. You'll see a loading screen.

---

### Step 3 — Copy Your Project Credentials

Once your project is ready:

1. In the left sidebar, click **"Settings"** (gear icon at the bottom)
2. Click **"API"**
3. You'll see two important values. **Copy both of these into a notepad file:**
   - **Project URL** — looks like: `https://abcdefghijkl.supabase.co`
   - **anon public key** — a very long string starting with `eyJhbGciOi...`

> ⚠️ Keep these safe. You'll need them in Part 3.

---

## PART 2 — Set Up Your Database

### Step 4 — Run the Database Setup Script

This creates all the tables your website needs (properties, blogs, messages, etc.)

1. In Supabase, click **"SQL Editor"** in the left sidebar (looks like a terminal icon `>_`)
2. Click **"New query"** (top left of the editor)
3. Now open the file `supabase-schema.sql` from this project in Replit
   - In Replit, click the file `supabase-schema.sql` in the file tree (left panel)
   - Press **Ctrl+A** (Windows) or **Cmd+A** (Mac) to select all the text
   - Press **Ctrl+C** (Windows) or **Cmd+C** (Mac) to copy
4. Go back to Supabase SQL Editor and click inside the blank text area
5. Press **Ctrl+V** (Windows) or **Cmd+V** (Mac) to paste
6. Click the green **"Run"** button (or press Ctrl+Enter)
7. Wait a few seconds. You should see **"Success. No rows returned"** at the bottom.

> ✅ If you see "Success" — your database is set up correctly!  
> ❌ If you see an error — copy the error message and share it for help.

---

### Step 5 — Create Storage Buckets (For Images)

This is where your property photos will be stored.

1. In Supabase, click **"Storage"** in the left sidebar (looks like a folder icon)
2. Click **"New bucket"**
3. In the "Bucket name" field, type: `properties`
4. Toggle **"Public bucket"** to ON (important!)
5. Click **"Save"**

**Repeat this 3 more times** for these bucket names:
- `blogs`
- `testimonials`
- `site-assets`

After this, you should have **4 buckets** listed in Storage.

---

### Step 6 — Create Your Admin Account

This is the login you'll use to manage your website.

1. In Supabase, click **"Authentication"** in the left sidebar (looks like a person icon)
2. Click **"Users"**
3. Click **"Add user"** → **"Create new user"**
4. Fill in:
   - **Email:** `royalproperties_0611@royalproperties.com`
   - **Password:** `royalproperties42388434`
5. Click **"Create user"**

> You can change the email and password to anything you want — just remember what you set!

---

## PART 3 — Add Your Credentials to the Website

### Step 7 — Add Environment Variables in Replit

This connects your website to your Supabase database.

1. Open your project in **Replit**
2. In the left panel, look for **"Secrets"** (it looks like a lock 🔒 icon) — usually in the **Tools** section
3. Click **"+ New secret"** and add the first one:
   - **Key:** `VITE_SUPABASE_URL`
   - **Value:** Paste your Project URL from Step 3 (e.g. `https://abcdefghijkl.supabase.co`)
   - Click **"Add secret"**
4. Click **"+ New secret"** again and add the second one:
   - **Key:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Paste your anon public key from Step 3 (the long eyJ... string)
   - Click **"Add secret"**

---

## PART 4 — Publish Your Website

You have two options. **Option A (Replit) is the easiest.**

---

### OPTION A — Publish on Replit (Easiest)

1. In Replit, look for the **"Deploy"** button in the top right area of the screen
   - It may say **"Publish"** or show a rocket icon 🚀
2. Click it
3. Choose **"Autoscale"** deployment (cheapest — only charges when someone visits)
4. Follow the prompts and click **"Deploy"**
5. Replit will give you a URL like: `royal-properties.replit.app`

> 🎉 Your website is now live! Share that URL with anyone.

---

### OPTION B — Publish on Vercel (Free, Recommended for Long-Term)

Vercel is completely free for websites like this and gives you a faster, professional hosting.

**First, push your code to GitHub:**

1. Go to **https://github.com** and create a free account if you don't have one
2. Click **"+"** in the top right → **"New repository"**
3. Name it `royal-properties`, leave it Private, click **"Create repository"**
4. Back in Replit, click the **Git** icon in the left sidebar (looks like a branch)
5. Follow the prompts to connect and push your code to GitHub

**Then deploy on Vercel:**

1. Go to **https://vercel.com** and sign up with your GitHub account
2. Click **"New Project"**
3. Find your `royal-properties` repository and click **"Import"**
4. You'll see a configuration screen. Change these settings:
   - **Framework Preset:** Select **"Vite"**
   - **Build Command:** `pnpm --filter @workspace/royal-properties run build`
   - **Output Directory:** `artifacts/royal-properties/dist/public`
   - Leave everything else as default
5. Scroll down to **"Environment Variables"** and add:
   - Name: `VITE_SUPABASE_URL` → Value: your Supabase URL
   - Click **"Add"**
   - Name: `VITE_SUPABASE_ANON_KEY` → Value: your Supabase anon key
   - Click **"Add"**
6. Click **"Deploy"**
7. Wait 2–3 minutes. Vercel will give you a URL like: `royal-properties.vercel.app`

> 🎉 Your website is now live! You can also set a custom domain (like `royalproperties.com`) in Vercel settings.

---

## PART 5 — Test Your Website

### Step 8 — Check the Public Website

1. Open your website URL in a browser
2. You should see the Royal Properties homepage with the luxury gold/black design
3. Properties should appear (sample data is included)
4. Try clicking on a property — the modal should open with details
5. Try the search and filters

---

### Step 9 — Test the Admin Panel

1. Go to your website URL + `/admin` (e.g. `https://royal-properties.vercel.app/admin`)
2. Enter the email and password you created in Step 6
3. You should be logged in to the admin dashboard
4. Try adding a new property:
   - Click **"Properties"** in the left menu
   - Click **"Add New Property"**
   - Fill in the details
   - Click **"Publish"**
5. Go back to your homepage — your new property should appear!

---

## PART 6 — Using the Admin Panel

### Adding a Property

1. Go to `/admin` → login
2. Click **"Properties"** → **"Add New Property"**
3. Fill in **Basic Info** tab: title, description, price, type, purpose, beds, baths, area
4. Go to **Location** tab: enter city and area name
5. Go to **Images** tab: click the upload area and select photos from your computer
6. Go to **SEO** tab (optional): add a search engine title and description
7. Check **"Published"** if you want it visible on the website
8. Click **"Publish"**

### Adding a Blog Post

1. Click **"Blogs"** → **"Add New Post"**
2. Fill in title, category, description, content
3. Upload a featured image
4. Check **"Published"** and click **"Publish"**

### Reading Contact Messages

1. Click **"Messages"** in the left menu
2. Click any message to read the full text
3. Click the ✓ button to mark as read
4. Click the archive button to archive
5. Click the trash icon to delete
6. Use **"Reply via Email"** to respond directly

### Updating Website Info (Phone, Address, etc.)

1. Click **"Settings"** in the left menu
2. Update your phone, email, address, social links, etc.
3. Click **"Save Changes"**

---

## Troubleshooting

**Website shows "No properties found"**
- Check that you ran the SQL script in Step 4
- Check that your Supabase credentials in Secrets are correct (no extra spaces)

**Images don't upload**
- Make sure all 4 storage buckets are created and set to **Public** (Step 5)

**Can't log in to admin**
- Make sure you created the user in Supabase Authentication (Step 6)
- Email and password must match exactly (case-sensitive)

**Website shows a blank page**
- Check that both secrets (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) are added correctly
- Try restarting the workflow in Replit (or redeploying on Vercel)

**"Could not save settings" error**
- This means the `settings` table might not exist — re-run `supabase-schema.sql`

---

## Quick Reference

| What | Where |
|---|---|
| Your website | `https://your-site.vercel.app` |
| Admin panel | `https://your-site.vercel.app/admin` |
| Supabase dashboard | `https://supabase.com/dashboard` |
| Vercel dashboard | `https://vercel.com/dashboard` |

---

## Need Help?

If something doesn't work, note:
1. What step you were on
2. What you expected to happen
3. What actually happened (copy any error messages)

Then ask for help with those details!
