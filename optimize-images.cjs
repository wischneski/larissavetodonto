// Script de otimização de imagens usando Sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public_html', 'images');

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    
    console.log(`Otimizando: ${file}...`);
    
    try {
      if (ext === '.png') {
        // PNG -> WebP com fallback PNG otimizado
        await sharp(inputPath)
          .resize(1200, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 85 })
          .toFile(path.join(outputDir, `${baseName}.webp`));
        
        await sharp(inputPath)
          .resize(1200, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .png({ compressionLevel: 9, quality: 85 })
          .toFile(path.join(outputDir, file));
        
        console.log(`  ✓ ${baseName}.webp criado`);
        console.log(`  ✓ ${file} otimizado`);
      } else if (ext === '.jpg' || ext === '.jpeg') {
        // JPG -> WebP com fallback JPG otimizado
        await sharp(inputPath)
          .resize(1200, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 85 })
          .toFile(path.join(outputDir, `${baseName}.webp`));
        
        await sharp(inputPath)
          .resize(1200, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: 85, progressive: true })
          .toFile(path.join(outputDir, file));
        
        console.log(`  ✓ ${baseName}.webp criado`);
        console.log(`  ✓ ${file} otimizado`);
      }
      
      // Comparar tamanhos
      const originalSize = fs.statSync(inputPath).size;
      const optimizedPath = path.join(outputDir, file);
      const webpPath = path.join(outputDir, `${baseName}.webp`);
      
      if (fs.existsSync(optimizedPath)) {
        const optimizedSize = fs.statSync(optimizedPath).size;
        const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
        console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB → Otimizado: ${(optimizedSize / 1024).toFixed(2)} KB (${reduction}% redução)`);
      }
      
      if (fs.existsSync(webpPath)) {
        const webpSize = fs.statSync(webpPath).size;
        console.log(`  WebP: ${(webpSize / 1024).toFixed(2)} KB`);
      }
      
    } catch (error) {
      console.error(`  ✗ Erro ao otimizar ${file}:`, error.message);
    }
  }
  
  console.log('\n✅ Otimização concluída!');
}

optimizeImages().catch(console.error);
