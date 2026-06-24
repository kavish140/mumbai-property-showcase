import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Load env vars
dotenv.config({ path: path.resolve(rootDir, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Missing Supabase environment variables. Prerendering property pages will be skipped.');
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
const baseUrl = 'https://real-estate.jupiterfastfinance.com';

const routes = [
  {
    path: '/',
    title: 'Mumbai Realty — Premium Real Estate, Finance & Legal Advisory',
    description: 'Discover premium residential and commercial properties across Mumbai with end-to-end finance and legal advisory.',
    image: `${baseUrl}/og-image.jpg`,
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Mumbai Realty",
      "url": baseUrl,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "G-54 Saidham Shopping Plaza, P.K. Road, Mulund West",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "telephone": "+919757190200",
      "email": "ganatraj@gmail.com"
    }
  },
  {
    path: '/about',
    title: 'About Us | Mumbai Realty',
    description: 'Meet the founder and learn about our multidisciplinary approach across property, capital, and law.',
    image: `${baseUrl}/og-image.jpg`
  },
  {
    path: '/services',
    title: 'Our Services | Mumbai Realty',
    description: 'Explore our services including residential sales, commercial leasing, legal advisory, and real estate finance.',
    image: `${baseUrl}/og-image.jpg`
  },
  {
    path: '/contact',
    title: 'Contact Us | Mumbai Realty',
    description: 'Get in touch for property inquiries, legal assistance, or finance consultation in Mumbai.',
    image: `${baseUrl}/og-image.jpg`
  },
  {
    path: '/properties',
    title: 'Properties | Mumbai Realty',
    description: 'Browse premium properties for sale and rent across prime locations in Mumbai.',
    image: `${baseUrl}/og-image.jpg`
  }
];

async function fetchProperties() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('properties').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function run() {
  const indexHtmlPath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('index.html not found in dist/. Please run `vite build` first.');
    process.exit(1);
  }
  
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const properties = await fetchProperties();

  // Add property routes
  for (const property of properties) {
    routes.push({
      path: `/properties/${property.id}`,
      title: `${property.title} | Mumbai Realty`,
      description: property.description ? property.description.substring(0, 160) : `Check out this ${property.bedrooms}BHK ${property.type} at ${property.location}.`,
      image: property.imageUrl || `${baseUrl}/og-image.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property.title,
        "description": property.description,
        "image": property.imageUrl,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": property.price,
          "availability": property.status === 'Available' ? "https://schema.org/InStock" : "https://schema.org/SoldOut"
        }
      }
    });
  }

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  console.log(`Generating ${routes.length} static pages...`);

  for (const route of routes) {
    const $ = cheerio.load(baseHtml);
    
    // Inject SEO tags
    $('title').text(route.title);
    $('meta[name="description"]').remove();
    $('head').append(`<meta name="description" content="${route.description}">`);
    
    // OpenGraph
    $('meta[property^="og:"]').remove();
    $('head').append(`
      <meta property="og:title" content="${route.title}">
      <meta property="og:description" content="${route.description}">
      <meta property="og:image" content="${route.image}">
      <meta property="og:url" content="${baseUrl}${route.path}">
      <meta property="og:type" content="website">
    `);

    // JSON-LD
    if (route.schema) {
      $('head').append(`
        <script type="application/ld+json">
          ${JSON.stringify(route.schema)}
        </script>
      `);
    }

    // Canonical
    $('link[rel="canonical"]').remove();
    $('head').append(`<link rel="canonical" href="${baseUrl}${route.path}">`);

    // Determine output file path
    let outPath;
    if (route.path === '/') {
      outPath = path.resolve(distDir, 'index.html');
    } else {
      const dirPath = path.resolve(distDir, route.path.substring(1));
      ensureDirSync(dirPath);
      outPath = path.resolve(dirPath, 'index.html');
    }

    fs.writeFileSync(outPath, $.html());
    console.log(`✓ Created ${outPath.replace(distDir, '')}`);

    sitemapXml += `\n  <url>\n    <loc>${baseUrl}${route.path}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`;
  }

  sitemapXml += `\n</urlset>`;
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml);
  
  // Create 404 fallback for GitHub pages SPA routing
  fs.copyFileSync(path.resolve(distDir, 'index.html'), path.resolve(distDir, '404.html'));

  console.log(`✓ Created sitemap.xml`);
  console.log('Prerendering complete!');
}

run().catch(console.error);
