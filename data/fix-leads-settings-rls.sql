-- ============================================================
-- Mumbai Realty — Fix Leads & Settings RLS Policies
-- Run this in Supabase SQL Editor to fix the contact form error
-- ============================================================

-- ── FIX LEADS TABLE ─────────────────────────────────────────

-- First, create the table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  interest    text,
  message     text NOT NULL,
  status      text NOT NULL DEFAULT 'New',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop old conflicting policies if they exist, then recreate cleanly
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated can read and update leads" ON leads;
DROP POLICY IF EXISTS "Anon full access" ON leads;

-- Allow anyone (public visitors) to submit the contact form
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anon to read leads too (needed for the admin panel which uses anon key)
CREATE POLICY "Anyone can read leads"
  ON leads FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow update and delete for the admin panel
CREATE POLICY "Anyone can update leads"
  ON leads FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete leads"
  ON leads FOR DELETE
  TO anon, authenticated
  USING (true);


-- ── FIX SETTINGS TABLE ──────────────────────────────────────

-- Create the table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS settings (
  key     text PRIMARY KEY,
  value   text NOT NULL,
  label   text,
  "group" text
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Drop old conflicting policies if they exist, then recreate cleanly
DROP POLICY IF EXISTS "Anon can read settings" ON settings;
DROP POLICY IF EXISTS "Authenticated can update settings" ON settings;

-- Allow anyone to read settings (needed for contact info on public site)
CREATE POLICY "Anyone can read settings"
  ON settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to insert/update/delete settings (admin panel uses anon key)
CREATE POLICY "Anyone can write settings"
  ON settings FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ── SEED DEFAULT SETTINGS (safe to run again) ───────────────
INSERT INTO settings (key, value, label, "group") VALUES
  ('company_name',    'Mumbai Realty',                              'Company Name',           'company'),
  ('tagline',         'Your Trusted Property Partner in Mumbai',    'Tagline',                'company'),
  ('rera_number',     'RERA/XXXX/XXXX',                            'RERA Number',            'company'),
  ('years_active',    '12',                                         'Years Active',           'company'),
  ('phone',           '+91 97571 90200',                            'Phone Number',           'contact'),
  ('email',           'ganatraj@gmail.com',                         'Email Address',          'contact'),
  ('whatsapp',        '919757190200',                               'WhatsApp Number (no +)', 'contact'),
  ('address_line1',   'G-54, Saidham Shopping Plaza',               'Address Line 1',         'contact'),
  ('address_line2',   'P.K. Road, Mulund West, Mumbai',             'Address Line 2',         'contact'),
  ('business_hours',  'Mon–Sat, 10am–7pm IST',                      'Business Hours',         'contact'),
  ('youtube_channel', 'https://www.youtube.com/@jupiterproperties', 'YouTube Channel URL',    'social'),
  ('facebook_url',    '',                                           'Facebook URL',           'social'),
  ('instagram_url',   '',                                           'Instagram URL',          'social')
ON CONFLICT (key) DO NOTHING;

-- ── VERIFY ──────────────────────────────────────────────────
SELECT 'leads count' AS check, COUNT(*) AS value FROM leads
UNION ALL
SELECT 'settings count', COUNT(*) FROM settings;
