import { readFile, writeFile, mkdir, rm, copyFile } from 'node:fs/promises';
import { deflateRawSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'addon-dist');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ['app.js', 'style.css']) await copyFile(path.join(root, 'public', file), path.join(out, file));
for (const file of ['manifest.json', 'sdk.js', 'addon.css']) await copyFile(path.join(root, 'addon', file), path.join(out, file));
let html = await readFile(path.join(root, 'public/index.html'), 'utf8');
html = html.replace('<body>', '<body class="adobe-addon">')
  .replace('</head>', '<link rel="stylesheet" href="addon.css"></head>')
  .replace('</header>', '</header><section class="express-insertion" aria-label="Adobe Express integration"><button id="add-to-express" class="primary" disabled>Connecting to Express…</button><p id="express-status" role="status">Open this add-on in Adobe Express to insert your design.</p></section>')
  .replace('Download your sneaker, then upload it to an Adobe Express project.', 'Use Add to Express to insert your sneaker into the current page. You can also download a copy below.')
  .replace('Direct insertion into Express will be part of the add-on version.', 'Add to Express inserts a transparent PNG. Keep a project file to edit your panels and artwork later.')
  .replace('</body>', '<script type="module" src="sdk.js"></script></body>');
await writeFile(path.join(out, 'index.html'), html);

// A small ZIP writer keeps packaging dependency-free and reproducible.
const table = Array.from({ length: 256 }, (_, n) => {
  for (let i = 0; i < 8; i++) n = (n & 1) ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
function crc32(bytes) { let crc = 0xffffffff; for (const b of bytes) crc = table[(crc ^ b) & 255] ^ (crc >>> 8); return (crc ^ 0xffffffff) >>> 0; }
const files = ['manifest.json', 'index.html', 'style.css', 'app.js', 'addon.css', 'sdk.js'];
const locals = [], central = []; let offset = 0;
for (const file of files) {
  const name = Buffer.from(file), data = await readFile(path.join(out, file)), compressed = deflateRawSync(data), crc = crc32(data);
  const head = Buffer.alloc(30); head.writeUInt32LE(0x04034b50); head.writeUInt16LE(20, 4); head.writeUInt16LE(8, 8); head.writeUInt16LE(33, 12); head.writeUInt32LE(crc, 14); head.writeUInt32LE(compressed.length, 18); head.writeUInt32LE(data.length, 22); head.writeUInt16LE(name.length, 26);
  locals.push(head, name, compressed);
  const item = Buffer.alloc(46); item.writeUInt32LE(0x02014b50); item.writeUInt16LE(20, 4); item.writeUInt16LE(20, 6); item.writeUInt16LE(8, 10); item.writeUInt16LE(33, 14); item.writeUInt32LE(crc, 16); item.writeUInt32LE(compressed.length, 20); item.writeUInt32LE(data.length, 24); item.writeUInt16LE(name.length, 28); item.writeUInt32LE(offset, 42); central.push(item, name);
  offset += head.length + name.length + compressed.length;
}
const directory = Buffer.concat(central), end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16);
const zip = Buffer.concat([...locals, directory, end]);
await writeFile(path.join(root, 'DesignXDM-Sneaker-Studio-Adobe-Express.zip'), zip);
console.log(`Created Adobe Express package: ${zip.length} bytes, ${files.length} root files.`);
