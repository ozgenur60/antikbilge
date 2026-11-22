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

function addCategory(html, anchorSlug, anchorLabel, newSlug, label) {
  const prefix = html.includes(`href="../${anchorSlug}"`) ? '../' : '';
  const targetPattern = new RegExp(`href="(?:\\.\\./)?${newSlug}(?:\\.html)?"`);
  const anchorPattern = new RegExp(
    `(<li><a(?: class="active")? href="${prefix}${anchorSlug}">${anchorLabel}<\\/a><\\/li>)`
  );
  const anchorMatch = anchorPattern.exec(html);

  if (!anchorMatch) {
    throw new Error(`Menü dayanağı bulunamadı: ${anchorSlug}`);
  }

  const dropdownStart = html.lastIndexOf('<ul class="dropdown-menu">', anchorMatch.index);
  const dropdownEnd = html.indexOf('</ul>', anchorMatch.index);
  const dropdown = html.slice(dropdownStart, dropdownEnd);
  if (targetPattern.test(dropdown)) return html;

  return html.replace(
    anchorPattern,
    `$1<li><a href="${prefix}${newSlug}">${label}</a></li>`
  );
}

let changed = 0;
for (const file of htmlFiles(root)) {
  const original = fs.readFileSync(file, 'utf8');
  if (!original.includes('category-menu')) continue;

  let updated = addCategory(
    original,
    'osmanli-tarihi',
    'Osmanlı Tarihi',
    'bizans-tarihi',
    'Bizans Tarihi'
  );
  updated = addCategory(
    updated,
    'mezopotamya-mitolojisi',
    'Mezopotamya Mitolojisi',
    'iskandinav-mitolojisi',
    'İskandinav Mitolojisi'
  );

  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed += 1;
  }
}

console.log(`${changed} HTML dosyasının menüsü güncellendi.`);
