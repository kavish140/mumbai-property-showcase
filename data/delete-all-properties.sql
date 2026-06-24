-- ============================================================
-- Mumbai Realty — Clean Up Database
-- Run this in Supabase SQL Editor
-- ============================================================

-- WARNING: This will permanently delete ALL properties from your database.
-- Run this only if you want to start fresh with an empty catalog.

DELETE FROM properties;

-- Verify
SELECT COUNT(*) as remaining_properties FROM properties;
