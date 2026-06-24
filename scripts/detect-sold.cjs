const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const xlsx = require('xlsx');

async function main() {
  const fileBuffer = fs.readFileSync(path.join(process.cwd(), 'data', 'real-estate-listings.xlsx'));
  const zip = await JSZip.loadAsync(fileBuffer);

  // Style indices that map to fontId=2 (strikethrough)
  // From debug: xf index 2 (fontId=2) and xf index 4 (fontId=2 + fill)
  const STRIKE_STYLE_INDICES = new Set([2, 4]);

  const sheetXml = await zip.files['xl/worksheets/sheet1.xml'].async('string');
  const rowMatches = [...sheetXml.matchAll(/<row[^>]+r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)];

  const strikeExcelRows = new Set();
  for (const [, rowNum, rowContent] of rowMatches) {
    const cellMatches = [...rowContent.matchAll(/<c[^>]+s="(\d+)"/g)];
    for (const [, styleIdx] of cellMatches) {
      if (STRIKE_STYLE_INDICES.has(parseInt(styleIdx))) {
        strikeExcelRows.add(parseInt(rowNum));
        break;
      }
    }
  }

  // Excel row 1 = header, row 2 = property #1
  // So property # = excelRow - 1
  const strikeExcelRowsSorted = [...strikeExcelRows].sort((a, b) => a - b);
  const propNums = strikeExcelRowsSorted.map(r => r - 1);

  console.log('Strikethrough Excel rows:', strikeExcelRowsSorted.join(', '));
  console.log('\nProperty numbers (# column):', propNums.join(', '));
  console.log('Total struck properties:', propNums.length);

  // Now load xlsx data to get property titles for confirmation
  const wb = xlsx.readFile(path.join(process.cwd(), 'data', 'real-estate-listings.xlsx'));
  const ws = wb.Sheets[wb.SheetNames[0]];
  const raw = xlsx.utils.sheet_to_json(ws, { defval: '' });
  const rows = raw.filter(r => r['Property Description'] && r['Property Type']);

  console.log('\nStruck-out properties (Sold):');
  propNums.forEach(num => {
    const row = rows.find(r => r['#'] === num);
    if (row) {
      console.log(`  #${num}: ${row['Property Description']} [${row['Location']}]`);
    }
  });

  // Save for use in SQL
  fs.writeFileSync(
    path.join(process.cwd(), 'data', 'sold-property-numbers.json'),
    JSON.stringify(propNums, null, 2)
  );
  console.log('\nSaved data/sold-property-numbers.json');
}

main().catch(console.error);
