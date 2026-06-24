const xlsx = require('xlsx');
const path = require('path');

const wb = xlsx.readFile(path.join(process.cwd(), 'src', 'real estate.xlsx'));
console.log('Sheets:', wb.SheetNames);

for (const sheetName of wb.SheetNames) {
  const ws = wb.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(ws, { defval: '' });
  console.log(`\n=== Sheet: ${sheetName} (${data.length} rows) ===`);
  if (data.length > 0) {
    console.log('Columns:', Object.keys(data[0]).join(' | '));
    console.log(JSON.stringify(data, null, 2));
  }
}
