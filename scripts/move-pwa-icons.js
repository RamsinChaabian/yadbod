// انتقال خودکار آیکون‌های PWA از public/images/ به public/
// این اسکریپت بعد از `pwa-assets-generator` اجرا می‌شود.

import { existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const files = [
  'pwa-64x64.png',
  'pwa-192x192.png',
  'pwa-512x512.png',
  'maskable-icon-512x512.png',
  'apple-touch-icon-180x180.png',
  'favicon.ico',
];

const srcDir = join(process.cwd(), 'public', 'images');
const dstDir = join(process.cwd(), 'public');

let moved = 0;
for (const file of files) {
  const src = join(srcDir, file);
  const dst = join(dstDir, file);
  if (existsSync(src)) {
    renameSync(src, dst);
    console.log(`✓ Moved ${file} to public/`);
    moved++;
  }
}

console.log(`\n✅ ${moved} files moved to public/`);