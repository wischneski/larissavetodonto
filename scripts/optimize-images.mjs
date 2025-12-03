import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images-optimized');

// Cria pasta de saída se não existir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Configurações de otimização por tipo
const CONFIG = {
  // Imagens grandes (hero, about) - max 1200px largura
  large: {
    maxWidth: 1200,
    quality: 75,
  },
  // Imagens médias (cards, quiz) - max 600px largura
  medium: {
    maxWidth: 600,
    quality: 70,
  },
  // Imagens pequenas (thumbnails) - max 400px
  small: {
    maxWidth: 400,
    quality: 65,
  },
};

// Mapeamento de arquivos para configurações
const FILE_CONFIG = {
  'exoticos.webp': 'large',
  'cirurgia.webp': 'large',
  'dr-larissa.webp': 'large',
  'lov-dog.jpg': 'medium',
  'lov-dog.webp': 'medium',
  'aparelho.webp': 'medium',
  'aparelho (2).webp': 'medium',
  'dente1.webp': 'medium',
  // Quiz images - small
  '1.jpg': 'small',
  '22_moderate_calculus.jpg': 'small',
  '23_advanced_calculus.jpg': 'small',
  '24_severe_calculus.jpg': 'small',
  '31b_no_inflammation.jpg': 'small',
  '32b_moderate_inflammation.jpg': 'small',
  '33_advanced_inflammation.jpg': 'small',
  '34b_severe_inflammation.jpg': 'small',
  '41_normal.jpg': 'small',
  '42_single_tooth_displaced.jpg': 'small',
  '43_mandible_short.jpg': 'small',
  '44_mandible_long.jpg': 'small',
  '51_intact.jpg': 'small',
  '52a_fresh.jpg': 'small',
  '53_old.jpg': 'small',
  '54_uncompl.jpg': 'small',
  '61b_primary_upper.jpg': 'small',
};

async function optimizeImage(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
  
  const originalSize = fs.statSync(filePath).size;
  
  try {
    let pipeline = sharp(filePath)
      .resize({ width: config.maxWidth, withoutEnlargement: true });
    
    // Converter para WebP otimizado
    await pipeline
      .webp({ quality: config.quality, effort: 6 })
      .toFile(outputPath);
    
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / 1024).toFixed(1);
    const percent = ((1 - newSize / originalSize) * 100).toFixed(0);
    
    console.log(`✓ ${path.basename(filePath)} → ${baseName}.webp | ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB | -${percent}% (${savings} KB)`);
    return originalSize - newSize;
  } catch (err) {
    console.error(`✗ Erro ao processar ${path.basename(filePath)}:`, err.message);
    return 0;
  }
}

async function main() {
  console.log('🖼️  Otimizando imagens para pasta images-optimized...\n');
  
  let totalSavings = 0;
  
  for (const [filename, configKey] of Object.entries(FILE_CONFIG)) {
    const filePath = path.join(IMAGES_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      const savings = await optimizeImage(filePath, CONFIG[configKey]);
      totalSavings += savings;
    }
  }
  
  console.log(`\n📊 Economia total: ${(totalSavings / 1024 / 1024).toFixed(2)} MB`);
  console.log(`\n📁 Imagens otimizadas salvas em: public/images-optimized/`);
  console.log(`\n⚠️  Para aplicar, substitua os arquivos em public/images/ pelos da pasta images-optimized/`);
}

main().catch(console.error);
