const fs = require('fs');
const path = require('path');

const srcDir = 'G:\\My Drive\\Mumbai real estate';
const destDir = path.join(__dirname, '..', 'public', 'images', 'properties');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const folders = fs.readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let sqlQueries = `-- UPDATE IMAGES SCRIPT\n-- Run this in Supabase SQL Editor\n\n`;

let totalCopied = 0;

for (const folder of folders) {
    // ID is usually the first part of the folder name "01 ", "100 "
    const match = folder.match(/^(\d+)/);
    if (!match) continue;
    
    const displayId = match[1]; // like "01"
    const numericId = parseInt(displayId, 10);
    
    // Find the first image in the folder
    const folderPath = path.join(srcDir, folder);
    const files = fs.readdirSync(folderPath);
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const image = files.find(f => imageExtensions.includes(path.extname(f).toLowerCase()));
    
    if (image) {
        const ext = path.extname(image).toLowerCase();
        // Naming the image after its ID
        const newImageName = `${numericId}${ext}`;
        const sourceFile = path.join(folderPath, image);
        const destFile = path.join(destDir, newImageName);
        
        fs.copyFileSync(sourceFile, destFile);
        totalCopied++;
        
        // Let's create an update query for Supabase
        // We don't have the uuid in this script, but we can match by title
        // Wait, the title in DB might slightly differ from the folder name.
        // It's safer to just match by TITLE or use a rough LIKE.
        // Actually, we can use the folder name stripped of ID to match the Title!
        const titleWithoutId = folder.replace(/^\d+\s/, '').trim();
        const imageUrl = `/images/properties/${newImageName}`;
        
        // We need to escape single quotes in SQL
        const safeTitle = titleWithoutId.replace(/'/g, "''");
        
        sqlQueries += `UPDATE properties SET "imageUrl" = '${imageUrl}' WHERE title = '${safeTitle}';\n`;
        // Or if it doesn't perfectly match
        sqlQueries += `UPDATE properties SET "imageUrl" = '${imageUrl}' WHERE title LIKE '${safeTitle}%';\n`;
    }
}

fs.writeFileSync(path.join(__dirname, '..', 'data', 'update-images.sql'), sqlQueries);
console.log(`Copied ${totalCopied} images and generated data/update-images.sql`);
