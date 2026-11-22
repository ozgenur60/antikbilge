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
