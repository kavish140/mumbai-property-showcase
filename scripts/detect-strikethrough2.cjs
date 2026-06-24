// Try reading with full cell style extraction via the raw XML approach
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');

async function main() {
  const fileBuffer = fs.readFileSync(path.join(process.cwd(), 'data', 'real-estate-listings.xlsx'));
  const zip = await JSZip.loadAsync(fileBuffer);
  
  // List all files in the zip to understand structure
  console.log('Files in xlsx zip:');
  Object.keys(zip.files).forEach(name => console.log(' ', name));
  
  // Read styles.xml to find font styles with strikethrough
  if (zip.files['xl/styles.xml']) {
    const stylesXml = await zip.files['xl/styles.xml'].async('string');
    // Look for strike elements
    const strikes = stylesXml.match(/<strike[^/]*/g) || [];
    console.log('\nStrikethrough entries in styles.xml:', strikes.length);
    console.log(strikes.slice(0, 10));
    
    // Show font index positions that have strike
    const fontMatches = [...stylesXml.matchAll(/<font>([\s\S]*?)<\/font>/g)];
    console.log('\nTotal fonts defined:', fontMatches.length);
    const strikeFonts = fontMatches.map((m, i) => ({ i, hasStrike: m[1].includes('<strike'), content: m[1].substring(0, 80) }))
      .filter(f => f.hasStrike);
    console.log('Fonts with strike:', JSON.stringify(strikeFonts, null, 2));
  }
  
  // Read sheet1 to see cell formats
  const sheetKey = Object.keys(zip.files).find(k => k.match(/xl\/worksheets\/sheet\d+\.xml/));
  if (sheetKey) {
    const sheetXml = await zip.files[sheetKey].async('string');
    // Find all rows with 's' attribute (style) and extract row numbers
    const rowMatches = [...sheetXml.matchAll(/<row[^>]+r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)];
    console.log('\nTotal rows in sheet:', rowMatches.length);
    
    // Show first few rows to understand structure
    console.log('\nFirst 3 rows:');
    rowMatches.slice(0, 3).forEach(m => {
      console.log('Row', m[1], ':', m[2].substring(0, 200));
    });
  }
}

main().catch(console.error);
