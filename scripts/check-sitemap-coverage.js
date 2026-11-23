#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>(https:\/\/antikbilge\.com\/[^<]*)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url) => !url.includes('/images/'))
);
const failures = [];

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(fullPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

const expected = new Set();
for (const file of htmlFiles(root)) {
  const html = fs.readFileSync(file, 'utf8');
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;

  const canonicalTag = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0];
  const canonical = canonicalTag?.match(/href=["']([^"']+)["']/i)?.[1];
  if (!canonical) {
    failures.push(`${path.relative(root, file)}: canonical adres eksik.`);
    continue;
  }

  expected.add(canonical);
  if (!sitemapUrls.has(canonical)) {
    failures.push(`${path.relative(root, file)}: sitemap içinde yok (${canonical}).`);
  }
}

for (const url of sitemapUrls) {
  if (!expected.has(url)) {
    failures.push(`Sitemap artık var olmayan veya noindex bir URL içeriyor: ${url}.`);
  }
}

if (failures.length) {
  console.error('Sitemap kapsam denetimi başarısız:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log(`${expected.size} dizine açık URL sitemap içinde doğrulandı.`);
