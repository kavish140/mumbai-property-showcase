const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');

const wb = xlsx.readFile(path.join(process.cwd(), 'data', 'real-estate-listings.xlsx'));
const ws = wb.Sheets[wb.SheetNames[0]];
const raw = xlsx.utils.sheet_to_json(ws, { defval: '' });
const rows = raw.filter(r => r['Property Description'] && r['Property Type']);

// Load sold property numbers detected via strikethrough analysis
const soldNums = new Set(JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'sold-property-numbers.json'), 'utf-8')));
console.log('Sold property #s:', [...soldNums].join(', '));

const locationImages = {
  Mulund: [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  ],
  Thane: [
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  ],
  Ambernath: [
    'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  ],
  Alibaug: [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
  ],
  Bhandup: [
    'https://images.unsplash.com/photo-1561753757-d8880c5a3551?w=800&q=80',
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
  ],
  Koparkhairne: [
    'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
    'https://images.unsplash.com/photo-1561753757-d8880c5a3551?w=800&q=80',
  ],
};

const commercialImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
];
const landImages = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
  'https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=800&q=80',
];

const counters = {};
function getImage(type, location) {
  const key = `${type}-${location}`;
  counters[key] = (counters[key] || 0);
  let pool;
  if (type === 'Commercial' || type === 'Industrial') pool = commercialImages;
  else if (type === 'Land') pool = landImages;
  else pool = locationImages[location] || locationImages.Mulund;
  const img = pool[counters[key] % pool.length];
  counters[key]++;
  return img;
}

function mapType(raw) {
  if (raw === 'Residential') return 'Residential';
  if (raw === 'Land') return 'Land';
  return 'Commercial';
}

function parseBedrooms(desc) {
  const m = desc.match(/(\d+(?:\.\d+)?)\s*BHK/i);
  if (m) return Math.floor(parseFloat(m[1]));
  if (/studio|1rk/i.test(desc)) return 1;
  return 0;
}

function estimatePrice(type, location, bedrooms) {
  if (type === 'Land') return 50000000;
  if (type === 'Commercial' || type === 'Industrial') {
    if (location === 'Mulund') return 8000000;
    return 5000000;
  }
  const base = (location === 'Mulund' || location === 'Bhandup') ? 15000000 : 10000000;
  return base + Math.max(0, bedrooms - 1) * 3000000;
}

const escape = s => String(s).replace(/'/g, "''");

const inserts = rows.map(r => {
  const id = randomUUID();
  const propNum = r['#'];
  const type = mapType(r['Property Type']);
  const desc = r['Property Description'].trim();
  const location = r['Location'].trim();
  const saleOrLease = r['Sale or Lease'];
  const subType = r['Sub-Type'];
  const bedrooms = parseBedrooms(desc);
  const bathrooms = bedrooms > 0 ? Math.max(1, bedrooms - 1) : 1;
  const area = type === 'Land' ? 10000 : bedrooms > 0 ? 850 + bedrooms * 200 : 1200;
  const price = estimatePrice(type, location, bedrooms);
  const image = getImage(type, location);

  // KEY: use 'Sold' for strikethrough rows
  const status = soldNums.has(propNum) ? 'Sold' : 'Available';

  const saleDesc = saleOrLease === 'Sale/Rent' ? 'Available for Sale or Rent'
    : saleOrLease === 'Rent' ? 'Available for Rent'
    : 'Available for Sale';
  const fullDesc = `${subType ? subType + ' — ' : ''}${status === 'Sold' ? 'SOLD. ' : ''}${saleDesc}. Located in ${location}, Maharashtra. Contact Mumbai Realty for details.`;

  return `('${id}', '${escape(desc)}', '${escape(location)}, Maharashtra', ${price}, '${type}', '${status}', ${bedrooms}, ${bathrooms}, ${area}, '${escape(fullDesc)}', '${image}')`;
});

const sql = `-- ============================================================
-- Mumbai Realty — Real Property Data (178 listings)
-- Strikethrough rows correctly marked as 'Sold'
-- Sold properties: #3, #25, #64, #88, #133, #165
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Remove all existing properties
DELETE FROM properties;

-- Step 2: Insert all 178 properties with correct status
-- NOTE: Prices are estimates — update actual figures via Admin panel
-- NOTE: Images are placeholder Unsplash photos — replace via Admin

INSERT INTO properties (id, title, location, price, type, status, bedrooms, bathrooms, "areaSqft", description, "imageUrl")
VALUES
${inserts.join(',\n')};

-- Verify counts
SELECT status, COUNT(*) FROM properties GROUP BY status;
SELECT COUNT(*) AS total FROM properties;
`;

fs.writeFileSync(path.join(process.cwd(), 'data', 'seed-properties.sql'), sql);
console.log(`✓ Generated seed-properties.sql with ${rows.length} properties`);
console.log(`  - Available: ${rows.length - soldNums.size}`);
console.log(`  - Sold: ${soldNums.size}`);
