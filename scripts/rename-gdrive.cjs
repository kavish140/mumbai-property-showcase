const fs = require('fs');
const path = require('path');

const dir = 'G:\\My Drive\\Mumbai real estate';

const folders = fs.readdirSync(dir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const folder of folders) {
  let newName = folder;

  // 1. Remove everything in parentheses
  newName = newName.replace(/\s*\([^)]*\)/g, '');

  // 2. Remove "_Owner Name"
  if (newName.includes('_')) {
      const parts = newName.split('_');
      newName = parts[0].trim();
  }

  // 3. Specific manual fixes for dashes since regex was too aggressive
  // "02 2BHK City of Joy-Shankar Iyer"
  if (newName.includes('Joy-Shankar')) newName = newName.replace('-Shankar Iyer', '');
  
  newName = newName.trim();

  if (newName !== folder) {
      fs.renameSync(path.join(dir, folder), path.join(dir, newName));
      console.log(`Renamed: "${folder}" -> "${newName}"`);
  }
}
console.log("Done renaming.");
