const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Rutas de entrada y salida
const inputFolder = './raw-images';
const outputFolder = './public/projects';

// Crear la carpeta de salida si no existe
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputFolder);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    // Filtrar solo formatos de imagen soportados
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const fileNameWithoutExt = path.basename(file, ext);
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(outputFolder, `${fileNameWithoutExt}.webp`);

      try {
        await sharp(inputPath)
         // .resize({ width: 1280, withoutEnlargement: true }) // Limita el ancho máximo a 1000px sin deformar
          .webp({ quality: 100 })                             // Convierte a WebP con 80% de calidad
          .toFile(outputPath);

        console.log(`✅ Optimizada: ${file} ➔ ${fileNameWithoutExt}.webp`);
      } catch (error) {
        console.error(`❌ Error con ${file}:`, error);
      }
    }
  }
}

processImages();