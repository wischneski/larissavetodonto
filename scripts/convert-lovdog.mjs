import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcJpg = path.resolve(process.cwd(), 'public', 'images', 'lov-dog.jpg');
const targets = [
  path.resolve(process.cwd(), 'public', 'images', 'lov-dog.webp'),
  path.resolve(process.cwd(), 'dist', 'images', 'lov-dog.webp')
];

if (!fs.existsSync(srcJpg)) {
  console.error('Source lov-dog.jpg not found at', srcJpg);
  process.exit(1);
}

async function run() {
  const buf = await sharp(srcJpg).webp({quality: 80}).toBuffer();
  for (const out of targets) {
    const dir = path.dirname(out);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
    fs.writeFileSync(out, buf);
    console.log('Written', out);
  }
}

run().catch(err => { console.error(err); process.exit(1); });
