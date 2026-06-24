const xlsx = require('xlsx');
const path = require('path');

// xlsx doesn't expose rich cell styles easily — use the raw cell data
const wb = xlsx.readFile(path.join(process.cwd(), 'data', 'real-estate-listings.xlsx'), {
  cellStyles: true,
  cellDates: true,
});

const ws = wb.Sheets[wb.SheetNames[0]];

// Iterate every cell and find ones with strikethrough
const strikeCells = [];
for (const cellAddr in ws) {
  if (cellAddr.startsWith('!')) continue;
  const cell = ws[cellAddr];
  // strikethrough is stored in cell.s.font.strike
  if (cell.s && cell.s.font && cell.s.font.strike) {
    strikeCells.push({ addr: cellAddr, value: cell.v });
  }
}

console.log('Cells with strikethrough:', strikeCells.length);
console.log(JSON.stringify(strikeCells, null, 2));

// Extract row numbers from strikethrough cells
const strikeRows = [...new Set(strikeCells.map(c => {
  const match = c.addr.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}).filter(Boolean))].sort((a, b) => a - b);

console.log('\nStruck-through row numbers (Excel rows):', strikeRows.join(', '));
// Row 1 = header, so data rows start at 2 (= index 1 in data array)
// Property # = row - 1
console.log('Property numbers (# column):', strikeRows.map(r => r - 1).join(', '));
