const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../public/night-theme');
const files = ['stars.png', 'twinkling.png', 'clouds_repeat.png', 'moon2.png'];

async function convertToWebP() {
  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(sourceDir, file.replace('.png', '.webp'));

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`✓ ${file} → ${file.replace('.png', '.webp')}`);
      console.log(`  ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`✗ Error converting ${file}:`, error.message);
    }
  }
}

convertToWebP();
