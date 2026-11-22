#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'articles', 'afrodit-kimdir.html');
let html = fs.readFileSync(file, 'utf8');

const navEnd = html.indexOf('</nav>');
const staleStart = html.indexOf('<script type="application/ld+json">{', navEnd);
const mainStart = html.indexOf('</script><main class="article-page">', staleStart);

if (
  staleStart >= 0 &&
  mainStart >= 0 &&
  html.slice(staleStart, mainStart).includes('"headline": "İnanna ve İştar')
) {
  html = html.slice(0, staleStart) + html.slice(mainStart + 9);
}

html = html.replace(
  '<li><a class="active" href="../mezopotamya-mitolojisi">Mezopotamya Mitolojisi</a></li>',
  '<li><a href="../mezopotamya-mitolojisi">Mezopotamya Mitolojisi</a></li>'
);
html = html.replace(
  '<li><a href="../yunan-mitolojisi">Yunan Mitolojisi</a></li>',
  '<li><a class="active" href="../yunan-mitolojisi">Yunan Mitolojisi</a></li>'
);

fs.writeFileSync(file, html.replace(/\n+$/, '\n'));
console.log('Afrodit sayfasındaki yanlış İnanna–İştar şemaları temizlendi.');
