#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sizes = [32, 16];
const src = path.resolve(process.cwd(), 'dist', 'images', 'favicon.svg');
const targets = [
  path.resolve(process.cwd(), 'dist', 'images'),
  path.resolve(process.cwd(), 'public', 'images'),
  path.resolve(process.cwd(), 'public_html', 'images')
];

if (!fs.existsSync(src)) {
  console.error('Source SVG not found at', src);
  process.exit(1);
}

async function run() {
  for (const size of sizes) {
    const buf = await sharp(src).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    for (const dir of targets) {
      try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const out = path.join(dir, `favicon-${size}x${size}.png`);
        fs.writeFileSync(out, buf);
        console.log('Written', out);
      } catch (err) {
        console.error('Failed to write to', dir, err.message);
      }
    }
  }
}

run().catch(err => { console.error(err); process.exit(1); });
