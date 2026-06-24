const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');

async function main() {
  const fileBuffer = fs.readFileSync(path.join(process.cwd(), 'data', 'real-estate-listings.xlsx'));
  const zip = await JSZip.loadAsync(fileBuffer);

  const stylesXml = await zip.files['xl/styles.xml'].async('string');
  // Dump entire cellXfs section
  const cellXfsMatch = stylesXml.match(/<cellXfs>([\s\S]*?)<\/cellXfs>/);
  if (cellXfsMatch) {
    console.log('=== cellXfs ===');
    console.log(cellXfsMatch[1]);
  }

  // Also dump full fonts section
  const fontsMatch = stylesXml.match(/<fonts[^>]*>([\s\S]*?)<\/fonts>/);
  if (fontsMatch) {
    console.log('\n=== fonts ===');
    console.log(fontsMatch[1]);
  }

  // Dump a sample of sheet XML around a row that might have strikethrough
  const sheetXml = await zip.files['xl/worksheets/sheet1.xml'].async('string');
  // Get rows 5-10 to see their style attributes
  const rowMatches = [...sheetXml.matchAll(/<row[^>]+r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)];
  console.log('\n=== Sample rows with s= attributes ===');
  for (const [, rowNum, rowContent] of rowMatches.slice(0, 20)) {
    const hasSAttr = rowContent.includes('s="');
    if (hasSAttr) {
      console.log(`Row ${rowNum}:`, rowContent.substring(0, 300));
    }
  }
  
  // Find ALL rows that have any cell with s= attribute
  const rowsWithStyle = [];
  for (const [, rowNum, rowContent] of rowMatches) {
    if (rowContent.includes('s="')) {
      rowsWithStyle.push(rowNum);
    }
  }
  console.log('\nAll rows with styled cells:', rowsWithStyle.join(', '));
  console.log('Total styled rows:', rowsWithStyle.length);
}

main().catch(console.error);
