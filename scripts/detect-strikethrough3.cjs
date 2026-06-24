const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');

async function main() {
  const fileBuffer = fs.readFileSync(path.join(process.cwd(), 'data', 'real-estate-listings.xlsx'));
  const zip = await JSZip.loadAsync(fileBuffer);

  // --- 1. Parse styles.xml to build cellXf → fontId map ---
  const stylesXml = await zip.files['xl/styles.xml'].async('string');

  // Find all font definitions — font index 2 has strike
  const fontMatches = [...stylesXml.matchAll(/<font>([\s\S]*?)<\/font>/g)];
  const strikeFontIndices = new Set(
    fontMatches.map((m, i) => m[1].includes('<strike') ? i : null).filter(i => i !== null)
  );
  console.log('Font indices with strikethrough:', [...strikeFontIndices]);

  // Parse cellXfs (xf elements) to find which xf has one of the strike font ids
  const cellXfsMatch = stylesXml.match(/<cellXfs>([\s\S]*?)<\/cellXfs>/);
  const xfEntries = [...(cellXfsMatch ? cellXfsMatch[1].matchAll(/<xf[^>]+fontId="(\d+)"[^>]*/g) : [])];
  const strikeStyleIndices = new Set(
    xfEntries.map((m, i) => strikeFontIndices.has(parseInt(m[1])) ? i : null).filter(i => i !== null)
  );
  console.log('Cell style (xf) indices with strike font:', [...strikeStyleIndices]);

  // --- 2. Parse sheet1.xml to find cells using those style indices ---
  const sheetXml = await zip.files['xl/worksheets/sheet1.xml'].async('string');
  const rowMatches = [...sheetXml.matchAll(/<row[^>]+r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)];

  const strikeRows = new Set();
  for (const [, rowNum, rowContent] of rowMatches) {
    // Find all cells in this row
    const cellMatches = [...rowContent.matchAll(/<c[^>]+r="([A-Z]+\d+)"(?:[^>]+s="(\d+)")?[^>]*>/g)];
    for (const [, cellRef, styleIdx] of cellMatches) {
      if (styleIdx && strikeStyleIndices.has(parseInt(styleIdx))) {
        strikeRows.add(parseInt(rowNum));
        break;
      }
    }
  }

  console.log('\nRows with strikethrough (Excel row number):', [...strikeRows].sort((a,b)=>a-b).join(', '));
  // Property # = rowNum - 1 (row 1 is header, row 2 = property #1)
  const propNums = [...strikeRows].sort((a,b)=>a-b).map(r => r - 1);
  console.log('Property numbers (# column):', propNums.join(', '));
  console.log('Count:', propNums.length);

  // Also write property numbers to a JSON file for use in SQL generation
  fs.writeFileSync(
    path.join(process.cwd(), 'data', 'sold-property-numbers.json'),
    JSON.stringify(propNums, null, 2)
  );
  console.log('\nSaved to data/sold-property-numbers.json');
}

main().catch(console.error);
