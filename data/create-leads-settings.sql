-- ============================================================
-- Mumbai Realty — Leads & Settings Tables
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── LEADS TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  interest    text,   -- e.g. "Buy", "Rent", "Commercial", free-text
  message     text NOT NULL,
  status      text NOT NULL DEFAULT 'New',  -- New | Contacted | Closed
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Allow the anonymous (public) key to insert leads (contact form)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can read and update leads"
  ON leads FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- If you don't use Supabase Auth, temporarily allow anon full access:
-- DROP POLICY IF EXISTS "Authenticated can read and update leads" ON leads;
-- CREATE POLICY "Anon full access" ON leads FOR ALL TO anon USING (true) WITH CHECK (true);


-- ── SETTINGS TABLE ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  key    text PRIMARY KEY,
  value  text NOT NULL,
  label  text,
  "group"  text  -- e.g. 'contact', 'social', 'company'
);

-- Allow only authenticated to read/write settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can read settings"
  ON settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can update settings"
  ON settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seed default settings values
INSERT INTO settings (key, value, label, "group") VALUES
  ('company_name',    'Mumbai Realty',                           'Company Name',           'company'),
  ('tagline',         'Your Trusted Property Partner in Mumbai', 'Tagline',                'company'),
  ('rera_number',     'RERA/XXXX/XXXX',                          'RERA Number',            'company'),
  ('years_active',    '12',                                      'Years Active',           'company'),
  ('phone',           '+91 97571 90200',                         'Phone Number',           'contact'),
  ('email',           'ganatraj@gmail.com',                      'Email Address',          'contact'),
  ('whatsapp',        '919757190200',                            'WhatsApp Number (no +)', 'contact'),
  ('address_line1',   'G-54, Saidham Shopping Plaza',            'Address Line 1',         'contact'),
  ('address_line2',   'P.K. Road, Mulund West, Mumbai',          'Address Line 2',         'contact'),
  ('business_hours',  'Mon–Sat, 10am–7pm IST',                   'Business Hours',         'contact'),
  ('youtube_channel', 'https://www.youtube.com/@jupiterproperties', 'YouTube Channel URL', 'social'),
  ('facebook_url',    '',                                        'Facebook URL',           'social'),
  ('instagram_url',   '',                                        'Instagram URL',          'social')
ON CONFLICT (key) DO NOTHING;

-- Verify
SELECT * FROM settings ORDER BY "group", key;
SELECT COUNT(*) AS lead_count FROM leads;
