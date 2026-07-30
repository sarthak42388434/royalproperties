# Supabase Storage Setup

Create these 4 buckets in your Supabase project. Each must be set to **Public** so images load without authentication.

## Steps

1. Open your Supabase project dashboard
2. Click **Storage** in the left sidebar
3. Click **New bucket** for each bucket below

## Buckets to Create

| Bucket Name    | Public? | Used For                              |
|----------------|---------|---------------------------------------|
| `properties`   | ✅ Yes  | Property listing photos               |
| `blogs`        | ✅ Yes  | Blog post featured images             |
| `testimonials` | ✅ Yes  | Client headshots / testimonial photos |
| `site-assets`  | ✅ Yes  | Logo, favicon, general site images    |

## How to Make a Bucket Public

When creating a bucket, toggle **Public bucket** to ON.

If you already created a bucket without making it public:
1. Click the bucket name
2. Click the ⚙️ gear icon (Bucket settings)
3. Toggle **Public bucket** to ON
4. Click **Save**

## Storage Policies (Auto-applied by RLS)

Supabase public buckets allow anyone to **read** files.
Only authenticated users (your admin) can **upload** and **delete** files.

If uploads fail in the admin panel, add this policy manually:

```sql
-- Allow authenticated users to upload to all buckets
CREATE POLICY "Authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to delete their own files
CREATE POLICY "Authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (true);
```

Run this in **Supabase → SQL Editor**.

## Image URL Format

Once a file is uploaded, its public URL looks like:
```
https://<your-project>.supabase.co/storage/v1/object/public/<bucket>/<filename>
```

The admin panel handles this automatically — you only need the buckets to exist.
