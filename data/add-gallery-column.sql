-- ============================================================
-- Mumbai Realty — Add Gallery Column to Properties
-- Run this in Supabase SQL Editor
-- ============================================================

-- Add a column to store an array of image URLs
ALTER TABLE properties ADD COLUMN IF NOT EXISTS gallery text[] DEFAULT '{}';

-- Verify
SELECT id, title, gallery FROM properties LIMIT 5;
