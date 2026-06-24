const fs = require('fs');
const path = require('path');
const sqlFile = './data/update-images.sql';
let sql = fs.readFileSync(sqlFile, 'utf-8');

const imagesDir = path.join(__dirname, '../public/images/properties');
const validFiles = fs.readdirSync(imagesDir).filter(f => f.match(/\.(jpg|jpeg|png)$/));

// Create a revert script for the bad ones
let revertSql = '-- REVERT DELETED IMAGES TO UNSPLASH\n';
const lines = sql.split('\n');
let newSql = [];

for (const line of lines) {
  if (!line.includes('UPDATE properties')) {
    newSql.push(line);
    continue;
  }
  // Extract filename
  const match = line.match(/\/images\/properties\/(.*?\.jpe?g|\.png)/i);
  if (match) {
    const filename = match[1];
    if (validFiles.includes(filename)) {
      newSql.push(line);
    } else {
      // It was deleted. Let's create a revert for it. We need the WHERE clause.
      const whereIdx = line.indexOf('WHERE');
      if (whereIdx !== -1) {
        const whereClause = line.substring(whereIdx);
        // Fallback Unsplash image URL (from seed)
        revertSql += `UPDATE properties SET "imageUrl" = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' ${whereClause}\n`;
      }
    }
  } else {
    newSql.push(line);
  }
}

fs.writeFileSync(sqlFile, newSql.join('\n'));
fs.writeFileSync('./data/revert-bad-images.sql', revertSql);
console.log('Done!');
