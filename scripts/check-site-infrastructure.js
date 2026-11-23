const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function walkHtml(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') return [];
      return walkHtml(fullPath);
    }
    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

for (const file of walkHtml(root)) {
  const html = fs.readFileSync(file, 'utf8');
  const stylesheetPattern = /<link\b[^>]*\bhref=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi;
  for (const match of html.matchAll(stylesheetPattern)) {
    const href = match[1];
    if (/^(?:https?:)?\/\//i.test(href)) continue;
    const stylesheetPath = path.resolve(path.dirname(file), href.split('?')[0]);
    if (!fs.existsSync(stylesheetPath)) {
      failures.push(`${path.relative(root, file)}: eksik stil dosyası ${href}.`);
    }
  }

  if (path.dirname(file) === path.join(root, 'articles')) {
    const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
    const canonical = canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1];
    const articleSchemas = [];

    for (const match of html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    )) {
      try {
        const schema = JSON.parse(match[1]);
        if (schema['@type'] === 'Article') articleSchemas.push(schema);
      } catch (error) {
        failures.push(`${path.relative(root, file)}: geçersiz JSON-LD (${error.message}).`);
      }
    }

    if (articleSchemas.length !== 1) {
      failures.push(
        `${path.relative(root, file)}: tam olarak bir Article şeması bulunmalı; ${articleSchemas.length} bulundu.`
      );
    } else if (articleSchemas[0].mainEntityOfPage?.['@id'] !== canonical) {
      failures.push(`${path.relative(root, file)}: Article şeması canonical adresle eşleşmiyor.`);
    }
  }
}

if (fs.existsSync(path.join(root, 'articles', 'osmanli-tarihi.html'))) {
  failures.push('articles/osmanli-tarihi.html: kopya kategori sayfası yeniden eklenmiş.');
}

const webConfig = read('web.config');
if (!/RedirectDuplicateOttomanHistory/.test(webConfig)) {
  failures.push('web.config: /articles/osmanli-tarihi 301 yönlendirmesi eksik.');
}
if (!/<clientCache\s+cacheControlMode="DisableCache"\s*\/>/.test(webConfig)) {
  failures.push('web.config: HTML için uzun önbelleği engelleyen DisableCache ayarı eksik.');
}

if (failures.length) {
  console.error('Site altyapı politikası başarısız:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log('Site altyapı politikası doğrulandı.');
