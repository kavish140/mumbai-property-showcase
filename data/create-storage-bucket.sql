-- ============================================================
-- Mumbai Realty — Create Supabase Storage Bucket for Property Images
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Allow anyone to VIEW images (public read)
CREATE POLICY "Public read access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'property-images');

-- Step 3: Allow uploads from anyone (no auth required - you manage the admin panel yourself)
CREATE POLICY "Allow uploads"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'property-images');

-- Step 4: Allow deletes (so you can replace images)
CREATE POLICY "Allow deletes"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'property-images');

-- Verify: should show the bucket
SELECT * FROM storage.buckets WHERE id = 'property-images';
