import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const galleryDir = path.join(__dirname, '../public/images/gallery');
const outputFile = path.join(__dirname, '../src/data/galleryManifest.json');

// Ensure gallery directory exists
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

const manifest = [];

// Scan years
const years = fs.readdirSync(galleryDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const year of years) {
  const yearDir = path.join(galleryDir, year);
  
  // Scan folders in year
  const folders = fs.readdirSync(yearDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const folder of folders) {
    const folderDir = path.join(yearDir, folder);
    
    // Scan images
    const images = fs.readdirSync(folderDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(dirent.name))
      .map(dirent => dirent.name);

    if (images.length > 0) {
      manifest.push({
        year,
        folder,
        images
      });
    }
  }
}

fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
console.log(`✅ Gallery manifest generated with ${manifest.length} folders.`);
