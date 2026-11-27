#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(fullPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

const requiredLinks = [
  ['Bizans Tarihi', /href="(?:\.\.\/|\/)?bizans-tarihi(?:\.html)?"/g],
  ['İskandinav Mitolojisi', /href="(?:\.\.\/|\/)?iskandinav-mitolojisi(?:\.html)?"/g],
];

const failures = [];
let menuCount = 0;

function categoryMenus(html) {
  const menus = [];
  const startPattern = /<ul\b[^>]*class="[^"]*category-menu[^"]*"[^>]*>/g;
  let startMatch;

  while ((startMatch = startPattern.exec(html)) !== null) {
    const tagPattern = /<\/?ul\b[^>]*>/g;
    tagPattern.lastIndex = startMatch.index;
    let depth = 0;
    let tagMatch;

    while ((tagMatch = tagPattern.exec(html)) !== null) {
      depth += tagMatch[0].startsWith('</') ? -1 : 1;
      if (depth === 0) {
        menus.push(html.slice(startMatch.index, tagPattern.lastIndex));
        startPattern.lastIndex = tagPattern.lastIndex;
        break;
      }
    }
  }

  return menus;
}

for (const file of htmlFiles(root)) {
  const html = fs.readFileSync(file, 'utf8');
  const menus = categoryMenus(html);
  if (menus.length === 0) {
    failures.push(`${path.relative(root, file)}: category-menu bulunamadı`);
    continue;
  }

  menuCount += menus.length;
  for (const menu of menus) {
    for (const [label, pattern] of requiredLinks) {
      pattern.lastIndex = 0;
      const matches = menu.match(pattern) || [];
      if (matches.length !== 1) {
        failures.push(`${path.relative(root, file)}: ${label} bağlantısı ${matches.length}/1`);
      }
    }
  }
}

if (failures.length) {
  console.error('Menü denetimi başarısız:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`${menuCount} menü denetlendi; zorunlu kategori bağlantılarının tamamı mevcut.`);
