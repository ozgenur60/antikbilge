const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFiles = [];

function collectHtml(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtml(fullPath);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}

collectHtml(root);

const checks = [
  { label: 'harici img src', regex: /<img\b[^>]*\bsrc=["']https?:\/\//gi },
  { label: 'harici og:image', regex: /<meta\b(?=[^>]*(?:property|name)=["']og:image["'])[^>]*content=["']https?:\/\/(?!antikbilge\.com\/)/gi },
  { label: 'harici twitter:image', regex: /<meta\b(?=[^>]*(?:property|name)=["']twitter:image["'])[^>]*content=["']https?:\/\/(?!antikbilge\.com\/)/gi },
  { label: 'harici yapılandırılmış görsel', regex: /"contentUrl"\s*:\s*"https?:\/\/(?!antikbilge\.com\/)/gi },
];

const violations = [];
for (const file of htmlFiles) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  for (const check of checks) {
    for (let index = 0; index < lines.length; index++) {
      check.regex.lastIndex = 0;
      if (check.regex.test(lines[index])) {
        violations.push(`${path.relative(root, file)}:${index + 1} — ${check.label}`);
      }
    }
  }

  for (let index = 0; index < lines.length; index++) {
    const imageTags = lines[index].match(/<img\b[^>]*>/gi) || [];
    for (const imageTag of imageTags) {
      const hasWidth = /\bwidth=["']\d+["']/i.test(imageTag);
      const hasHeight = /\bheight=["']\d+["']/i.test(imageTag);
      if (!hasWidth || !hasHeight) {
        violations.push(
          `${path.relative(root, file)}:${index + 1} — görsel width/height eksik`
        );
      }
    }
  }
}

if (violations.length) {
  console.error('Görsel politikası ihlalleri:');
  console.error(violations.join('\n'));
  process.exit(1);
}

console.log(`Görsel politikası doğrulandı: ${htmlFiles.length} HTML dosyası.`);
