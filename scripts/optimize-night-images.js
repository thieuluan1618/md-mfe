const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../public/night-theme');

const optimizations = [
  {
    file: 'moon2.webp',
    maxWidth: 800,  // Resize from 1180x1165 to 800x790 (sufficient for all screens)
    quality: 75,    // Aggressive compression
  },
  {
    file: 'twinkling.webp',
    maxWidth: 800,  // Reduce size and increase compression
    quality: 70,    // Higher compression
  },
  {
    file: 'clouds_repeat.webp',
    maxWidth: 800,  // Reduce size and increase compression
    quality: 70,    // Higher compression
  },
  {
    file: 'stars.webp',
    maxWidth: 1200, // Resize from 2000x1375 to 1200x825
    quality: 70,    // Higher compression
  },
];

async function optimizeImages() {
  console.log('🔧 Optimizing night theme images for mobile...\n');

  for (const config of optimizations) {
    const inputPath = path.join(sourceDir, config.file);
    const backupPath = path.join(sourceDir, config.file.replace('.webp', '.backup.webp'));

    // Create backup if it doesn't exist
    if (!fs.existsSync(backupPath) && fs.existsSync(inputPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`📦 Created backup: ${config.file}.backup`);
    }

    try {
      // Use backup if it exists, otherwise use current file
      const sourceFile = fs.existsSync(backupPath) ? backupPath : inputPath;
      const metadata = await sharp(sourceFile).metadata();
      const inputStats = fs.statSync(inputPath);

      const image = sharp(sourceFile);

      // Only resize if current width is larger than maxWidth
      if (metadata.width > config.maxWidth) {
        image.resize(config.maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      await image
        .webp({
          quality: config.quality,
          effort: 6,
          smartSubsample: true
        })
        .toFile(inputPath + '.tmp');

      // Replace original with optimized
      fs.renameSync(inputPath + '.tmp', inputPath);

      const outputStats = fs.statSync(inputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
      const newMetadata = await sharp(inputPath).metadata();

      console.log(`✓ ${config.file}`);
      console.log(`  Size: ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
      console.log(`  Dimensions: ${metadata.width}x${metadata.height} → ${newMetadata.width}x${newMetadata.height}`);
      console.log();
    } catch (error) {
      console.error(`✗ Error optimizing ${config.file}:`, error.message);
    }
  }

  console.log('✅ Optimization complete!');
  console.log('💡 Backups saved as *.backup.webp in case you need to restore');
}

optimizeImages();
