#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const articlesDir = path.join(root, 'articles');

const hierarchyByCategory = {
  'Yunan Mitolojisi': [
    ['Mitoloji', 'mitoloji'],
    ['Yunan Mitolojisi', 'yunan-mitolojisi'],
  ],
  'Mısır Mitolojisi': [
    ['Mitoloji', 'mitoloji'],
    ['Mısır Mitolojisi', 'misir-mitolojisi'],
  ],
  'Türk Mitolojisi': [
    ['Mitoloji', 'mitoloji'],
    ['Türk Mitolojisi', 'turk-mitolojisi'],
  ],
  'İskandinav Mitolojisi': [
    ['Mitoloji', 'mitoloji'],
    ['İskandinav Mitolojisi', 'iskandinav-mitolojisi'],
  ],
  'Mezopotamya Mitolojisi': [
    ['Mitoloji', 'mitoloji'],
    ['Mezopotamya Mitolojisi', 'mezopotamya-mitolojisi'],
  ],
  'Osmanlı Tarihi': [
    ['Tarih', 'tarih'],
    ['Osmanlı Tarihi', 'osmanli-tarihi'],
  ],
  'Roma Tarihi': [
    ['Tarih', 'tarih'],
    ['Roma Tarihi', 'roma-tarihi'],
  ],
  'Bizans Tarihi': [
    ['Tarih', 'tarih'],
    ['Bizans Tarihi', 'bizans-tarihi'],
  ],
  'Antik Mısır Tarihi': [
    ['Tarih', 'tarih'],
    ['Antik Mısır Tarihi', 'antik-misir-tarihi'],
  ],
  Tarih: [['Tarih', 'tarih']],
  Arkeoloji: [['Arkeoloji', 'arkeoloji']],
  'Sanat Tarihi': [['Sanat Tarihi', 'sanat-tarihi']],
};

function cleanText(value) {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function jsonLdBlocks(html, file) {
  return [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)]
    .map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch (error) {
        throw new Error(`${file}: geçersiz JSON-LD (${error.message})`);
      }
    });
}

const failures = [];
const files = fs.readdirSync(articlesDir).filter((file) => file.endsWith('.html'));

for (const file of files) {
  const html = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const categoryMatch = html.match(/<span\b[^>]*class=["'][^"']*article-category[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
  if (!categoryMatch) {
    failures.push(`${file}: makale kategori etiketi bulunamadı`);
    continue;
  }

  const category = cleanText(categoryMatch[1]);
  const hierarchy = hierarchyByCategory[category];
  if (!hierarchy) {
    failures.push(`${file}: bilinmeyen makale kategorisi “${category}”`);
    continue;
  }

  const navMatch = html.match(/<nav\b[^>]*class=["'][^"']*breadcrumb[^"']*["'][^>]*>[\s\S]*?<\/nav>/i);
  if (!navMatch) {
    failures.push(`${file}: görünür breadcrumb bulunamadı`);
    continue;
  }

  const visibleLinks = [...navMatch[0].matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ href: match[1], name: cleanText(match[2]) }));
  const expectedVisible = [['Ana Sayfa', null], ...hierarchy];

  if (visibleLinks.length !== expectedVisible.length) {
    failures.push(`${file}: görünür breadcrumb bağlantı sayısı ${visibleLinks.length}/${expectedVisible.length}`);
  } else {
    expectedVisible.forEach(([name, slug], index) => {
      const actual = visibleLinks[index];
      if (actual.name !== name) failures.push(`${file}: breadcrumb ${index + 1}. ad “${actual.name}” yerine “${name}” olmalı`);
      if (slug && !new RegExp(`(?:^|/)${slug}(?:\\.html)?$`).test(actual.href)) {
        failures.push(`${file}: ${name} bağlantısı yanlış (${actual.href})`);
      }
    });
  }

  let blocks;
  try {
    blocks = jsonLdBlocks(html, file);
  } catch (error) {
    failures.push(error.message);
    continue;
  }

  const article = blocks.find((block) => block['@type'] === 'Article');
  if (!article) failures.push(`${file}: Article şeması bulunamadı`);
  else if (article.articleSection !== category) {
    failures.push(`${file}: Article.articleSection “${article.articleSection}” yerine “${category}” olmalı`);
  }

  const breadcrumb = blocks.find((block) => block['@type'] === 'BreadcrumbList');
  if (!breadcrumb || !Array.isArray(breadcrumb.itemListElement)) {
    failures.push(`${file}: BreadcrumbList şeması bulunamadı`);
    continue;
  }

  const items = breadcrumb.itemListElement;
  const expectedNames = ['Ana Sayfa', ...hierarchy.map(([name]) => name)];
  if (items.length !== expectedNames.length + 1) {
    failures.push(`${file}: şema breadcrumb öğe sayısı ${items.length}/${expectedNames.length + 1}`);
    continue;
  }

  expectedNames.forEach((name, index) => {
    if (items[index]?.name !== name) failures.push(`${file}: şema ${index + 1}. ad “${items[index]?.name}” yerine “${name}” olmalı`);
    if (items[index]?.position !== index + 1) failures.push(`${file}: şema ${index + 1}. sıra numarası yanlış`);
  });
  if (items.at(-1)?.position !== items.length) failures.push(`${file}: son şema sıra numarası yanlış`);
}

if (failures.length) {
  console.error('Makale breadcrumb denetimi başarısız:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`${files.length} makalenin görünür breadcrumb, kategori ve JSON-LD yolları doğrulandı.`);
