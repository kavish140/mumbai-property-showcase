const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

const dir = path.join(__dirname, '../public/images/properties');
const files = fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png)$/));

async function analyze() {
  console.log(`Analyzing ${files.length} images for text (WhatsApp/Excel screenshots)...`);
  
  let badImages = [];

  // We will run them sequentially to avoid overwhelming memory
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      // Recognize text
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
      
      // If there's a significant amount of text, it's likely a screenshot of a doc/chat
      if (text.length > 100) {
        console.log(`[BAD] ${file} has ${text.length} characters of text. Excerpt: ${text.substring(0, 30).replace(/\n/g, ' ')}...`);
        badImages.push(file);
      } else {
        console.log(`[OK] ${file}`);
      }
    } catch (err) {
      console.log(`[ERROR] analyzing ${file}: ${err.message}`);
    }
  }

  console.log(`\nFound ${badImages.length} bad images with text.`);
  
  if (badImages.length > 0) {
    console.log("Removing bad images...");
    for (const file of badImages) {
      fs.unlinkSync(path.join(dir, file));
      console.log(`Deleted ${file}`);
    }
    console.log("Images deleted. Run the SQL script to reset them to null if necessary, or just rely on fallback.");
  }
}

analyze();
