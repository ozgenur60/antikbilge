#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Antik Bilge – Teknik SEO Denetim & Otomatik Düzeltme Scripti
"""

import os, re, json, glob, copy
from collections import defaultdict
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from bs4 import BeautifulSoup
from PIL import Image

BASE = '/home/user/antikbilge'
SITE = 'https://antikbilge.com'

# ── yardımcılar ──────────────────────────────────────────────────────────────

def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()

def write(p, c):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)

def html_files():
    return sorted(glob.glob(f'{BASE}/**/*.html', recursive=True))

def page_url(path):
    rel = path.replace(BASE, '').lstrip('/')
    rel = re.sub(r'\.html$', '', rel)
    rel = re.sub(r'/index$', '', rel)
    if rel == 'index': rel = ''
    return f'{SITE}/{rel}'

def img_real_path(src, html_path):
    html_dir = os.path.dirname(html_path)
    return os.path.normpath(os.path.join(html_dir, src))

def href_real_path(href, html_path):
    if href.startswith('http') or href.startswith('#') or href.startswith('mailto'):
        return None
    # Strip fragment before resolving
    href_no_frag = href.split('#')[0]
    if not href_no_frag:
        return '__fragment_only__'  # bare fragment, not broken
    html_dir = os.path.dirname(html_path)
    p = os.path.normpath(os.path.join(html_dir, href_no_frag))
    if os.path.isfile(p):
        return p
    # bare slug (no extension) → try .html
    p2 = p + '.html'
    if os.path.isfile(p2):
        return p2
    # directory link (e.g. "../" or "./") → try index.html
    if os.path.isdir(p):
        idx = os.path.join(p, 'index.html')
        if os.path.isfile(idx):
            return idx
    return None

# ── rapor ────────────────────────────────────────────────────────────────────

issues  = []   # {'file','check','detail','fixed': bool}
changed = set()

def issue(file, check, detail, fixed=False):
    issues.append({'file': file, 'check': check, 'detail': detail, 'fixed': fixed})

# ── 1-20 denetim + güvenli düzeltmeler ───────────────────────────────────────

def audit_file(path):
    raw   = read(path)
    soup  = BeautifulSoup(raw, 'html.parser')
    rel   = path.replace(BASE+'/', '')
    url   = page_url(path)

    # ── 1. Tek H1 ────────────────────────────────────────────────────────────
    h1s = soup.find_all('h1')
    if len(h1s) == 0:
        issue(rel, '1-h1', 'H1 bulunamadı')
    elif len(h1s) > 1:
        issue(rel, '1-h1', f'{len(h1s)} adet H1 var: {[h.get_text(strip=True)[:60] for h in h1s]}')

    # ── 2. Title / meta description / canonical ───────────────────────────────
    title_tag = soup.find('title')
    desc_tag  = soup.find('meta', attrs={'name': 'description'})
    canon_tag = soup.find('link', attrs={'rel': 'canonical'})

    if not title_tag or not title_tag.get_text(strip=True):
        issue(rel, '2-meta', 'title eksik')
    if not desc_tag or not desc_tag.get('content','').strip():
        issue(rel, '2-meta', 'meta description eksik')
    if not canon_tag or not canon_tag.get('href','').strip():
        issue(rel, '2-meta', 'canonical eksik')

    # ── 3. Canonical URL eşleşmesi ───────────────────────────────────────────
    if canon_tag:
        canon_href = canon_tag.get('href','').rstrip('/')
        expected   = url.rstrip('/')
        if canon_href != expected:
            issue(rel, '3-canonical', f'canonical={canon_href!r} beklenен={expected!r}')

    # ── 5. Kırık iç bağlantılar ─────────────────────────────────────────────
    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        if not href or href == '#' or href.startswith('http') or href.startswith('mailto'):
            if href == '#' and a.get('class') and 'tag' in a.get('class', []):
                pass  # tag bağlantıları # olabilir, raporla ama düzeltme
            continue
        rp = href_real_path(href, path)
        if rp is None:
            issue(rel, '5-broken-link', f'href={href!r} → dosya bulunamadı')

    # ── 6. Kırık görsel yolları ──────────────────────────────────────────────
    for img in soup.find_all('img', src=True):
        src = img['src'].strip()
        if src.startswith('http'):
            continue
        rp = img_real_path(src, path)
        if not os.path.isfile(rp):
            issue(rel, '6-img-missing', f'src={src!r} → dosya bulunamadı')

    # ── 7. Boş/eksik alt ────────────────────────────────────────────────────
    for img in soup.find_all('img'):
        alt = img.get('alt', None)
        if alt is None or alt.strip() == '':
            issue(rel, '7-img-alt', f'alt eksik/boş: src={img.get("src","?")}')

    # ── 8. Görsel boyut uyumsuzluğu ──────────────────────────────────────────
    for img in soup.find_all('img', src=True):
        src = img['src'].strip()
        if src.startswith('http'):
            continue
        rp = img_real_path(src, path)
        if not os.path.isfile(rp):
            continue
        try:
            with Image.open(rp) as im:
                rw, rh = im.size
        except Exception:
            continue
        declared_w = img.get('width')
        declared_h = img.get('height')
        if declared_w and declared_h:
            try:
                dw, dh = int(declared_w), int(declared_h)
                if (dw, dh) != (rw, rh):
                    issue(rel, '8-img-dimensions',
                          f'src={src!r} HTML={dw}x{dh} gerçek={rw}x{rh}')
            except ValueError:
                pass

    # ── 9. JSON-LD geçerlilik ────────────────────────────────────────────────
    ld_blocks = soup.find_all('script', type='application/ld+json')
    for i, blk in enumerate(ld_blocks):
        try:
            json.loads(blk.string or '')
        except Exception as e:
            issue(rel, '9-jsonld', f'JSON-LD blok {i+1} geçersiz: {e}')

    # ── 10. FAQPage ↔ görünür SSS eşleşmesi ─────────────────────────────────
    faq_ld = None
    for blk in ld_blocks:
        try:
            obj = json.loads(blk.string or '')
            if obj.get('@type') == 'FAQPage':
                faq_ld = obj
                break
        except Exception:
            pass

    if faq_ld:
        ld_questions = [e['name'].strip() for e in faq_ld.get('mainEntity', [])]
        visible_qs = []
        faq_section = soup.find('section', class_='faq-section')
        if faq_section:
            visible_qs = [h.get_text(strip=True) for h in faq_section.find_all('h3')]
        if set(ld_questions) != set(visible_qs) and visible_qs:
            only_ld = set(ld_questions) - set(visible_qs)
            only_vis = set(visible_qs) - set(ld_questions)
            if only_ld or only_vis:
                issue(rel, '10-faq-mismatch',
                      f'LD-only={list(only_ld)[:2]} görünür-only={list(only_vis)[:2]}')

    # ── 11. BreadcrumbList ↔ görünür breadcrumb ──────────────────────────────
    bc_ld = None
    for blk in ld_blocks:
        try:
            obj = json.loads(blk.string or '')
            if obj.get('@type') == 'BreadcrumbList':
                bc_ld = obj
                break
        except Exception:
            pass

    if bc_ld:
        ld_names = [e['name'] for e in bc_ld.get('itemListElement', [])]
        vis_bc = soup.find('ol', class_='breadcrumb-list')
        if vis_bc:
            vis_names = [li.get_text(strip=True) for li in vis_bc.find_all('li')]
            if ld_names != vis_names:
                issue(rel, '11-breadcrumb-mismatch',
                      f'LD={ld_names} görünür={vis_names}')

    # ── 12. Breadcrumb dropdown yasak ───────────────────────────────────────
    bc_nav = soup.find('nav', class_='breadcrumb')
    if bc_nav:
        if bc_nav.find(class_='has-dropdown') or bc_nav.find(class_='dropdown-menu'):
            issue(rel, '12-bc-dropdown', 'breadcrumb içinde has-dropdown/dropdown-menu var')

    # ── 17. href="#" (tag dışı), boş href, hatalı articles/ yolları ─────────
    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        if href == '#':
            classes = a.get('class', [])
            if 'tag' not in classes:
                issue(rel, '17-bad-href', f'href="#" non-tag: text={a.get_text(strip=True)[:40]!r}')
        if href == '':
            issue(rel, '17-bad-href', 'boş href')

    # ── 18. utm_source=chatgpt.com ───────────────────────────────────────────
    utm_matches = re.findall(r'utm_source=chatgpt\.com', raw)
    if utm_matches:
        issue(rel, '18-utm', f'{len(utm_matches)} adet utm_source=chatgpt.com', fixed=False)

    # ── 19. Ham & HTML hatası ────────────────────────────────────────────────
    # Sadece href/src dışındaki bağlamlarda ham & ara
    bare_amp = re.findall(r'&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)[a-zA-Z]{2,8};', raw)
    if bare_amp:
        # Yalnızca a href içindeki & ları raporla (bunlar &amp; olmalı)
        href_bare = re.findall(r'href="[^"]*&(?!amp;)[^"]*"', raw)
        if href_bare:
            issue(rel, '19-bare-amp', f'href içinde ham & : {href_bare[:3]}')

    return soup, raw

# ── Koleksiyon sayfası denetimleri (13, 15, 16) ──────────────────────────────

def audit_collection(path, soup, raw):
    rel = path.replace(BASE+'/', '')
    ld_blocks = soup.find_all('script', type='application/ld+json')

    il_ld = None
    for blk in ld_blocks:
        try:
            obj = json.loads(blk.string or '')
            if obj.get('@type') == 'CollectionPage':
                il_ld = obj
                break
        except Exception:
            pass

    if not il_ld:
        return

    il_items = il_ld.get('mainEntity', {})
    if isinstance(il_items, dict):
        il_list = il_items.get('itemListElement', [])
    else:
        il_list = []

    cards = soup.find_all('article', class_='article-card-horizontal')
    card_hrefs = []
    for c in cards:
        a = c.find('a', href=True)
        if a:
            card_hrefs.append(a['href'].strip())

    ld_urls = [e.get('url','') for e in il_list]

    # Kart sayısı vs ItemList sayısı
    if len(card_hrefs) != len(ld_urls):
        issue(rel, '13-collection-count',
              f'Kart={len(card_hrefs)} ItemList={len(ld_urls)}')

    return card_hrefs, ld_urls

# ── Otomatik düzeltmeler ─────────────────────────────────────────────────────

def fix_utm(path, raw):
    """18: utm_source=chatgpt.com parametrelerini kaldır"""
    new_raw = raw
    pattern = re.compile(r'([?&])utm_source=chatgpt\.com(&?)')
    def replacer(m):
        prefix = m.group(1)
        suffix = m.group(2)
        if prefix == '?' and suffix == '&':
            return '?'
        if prefix == '&':
            return ''
        return prefix if suffix else ''
    new_raw = pattern.sub(replacer, new_raw)
    # clean trailing ? or &&
    new_raw = re.sub(r'\?&', '?', new_raw)
    new_raw = re.sub(r'&&', '&', new_raw)
    new_raw = re.sub(r'[?&]"', '"', new_raw)
    if new_raw != raw:
        write(path, new_raw)
        changed.add(path.replace(BASE+'/', ''))
        return True, new_raw
    return False, raw

def fix_bare_amp_in_hrefs(path, raw):
    """19: href içindeki ham & → &amp;"""
    def repl(m):
        url = m.group(0)
        # & that is NOT already &amp;
        fixed = re.sub(r'&(?!amp;)', '&amp;', url)
        return fixed
    # Match href="..." values
    new_raw = re.sub(r'href="[^"]*&[^"]*"', repl, raw)
    if new_raw != raw:
        write(path, new_raw)
        changed.add(path.replace(BASE+'/', ''))
        return True, new_raw
    return False, raw

# ── Sitemap denetimi ──────────────────────────────────────────────────────────

def audit_sitemap():
    sitemap_path = f'{BASE}/sitemap.xml'
    raw = read(sitemap_path)
    sm_urls = set(re.findall(r'<loc>(.*?)</loc>', raw))

    # Indexlenebilir HTML sayfaları
    indexable = set()
    for p in html_files():
        rel = p.replace(BASE, '').lstrip('/')
        # skip partials, hakkimizda/iletisim are fine
        if any(x in p for x in ['404', 'sitemap']):
            continue
        indexable.add(page_url(p).rstrip('/'))

    sm_norm = {u.rstrip('/') for u in sm_urls}

    missing_from_sm = indexable - sm_norm
    dead_in_sm = sm_norm - indexable

    return missing_from_sm, dead_in_sm, sitemap_path, raw

def fix_sitemap(missing, dead, sitemap_path, raw):
    new_raw = raw
    fixed_count = 0
    # Remove dead URLs
    for url in dead:
        block_pat = re.compile(
            r'\s*<url>\s*<loc>' + re.escape(url) + r'/?</loc>.*?</url>',
            re.DOTALL
        )
        new_raw, n = block_pat.subn('', new_raw)
        if n:
            fixed_count += n
            issue('sitemap.xml', '14-sitemap-dead', f'Kaldırıldı: {url}', fixed=True)
    # Add missing URLs
    for url in sorted(missing):
        if any(x in url for x in ['/404', '/sitemap']):
            continue
        entry = f'\n  <url>\n    <loc>{url}</loc>\n    <lastmod>2026-09-01</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>'
        new_raw = new_raw.replace('</urlset>', entry + '\n</urlset>')
        fixed_count += 1
        issue('sitemap.xml', '14-sitemap-missing', f'Eklendi: {url}', fixed=True)
    if new_raw != raw:
        write(sitemap_path, new_raw)
        changed.add('sitemap.xml')
    return fixed_count

# ── Yetim makale denetimi ────────────────────────────────────────────────────

def audit_orphans():
    article_files = glob.glob(f'{BASE}/articles/*.html')
    article_slugs = {os.path.basename(p).replace('.html','') for p in article_files}

    linked_slugs = set()
    for p in html_files():
        raw = read(p)
        for m in re.finditer(r'href=["\']([^"\']+)["\']', raw):
            href = m.group(1)
            slug = os.path.basename(href.rstrip('/').replace('.html',''))
            linked_slugs.add(slug)

    orphans = article_slugs - linked_slugs
    return orphans

# ── Related posts denetimi (20) ──────────────────────────────────────────────

def audit_related(path, soup, raw):
    rel = path.replace(BASE+'/', '')
    related = soup.find('div', class_='related-posts')
    if not related:
        return
    for item in related.find_all('a', class_='related-item'):
        href = item.get('href','')
        img  = item.find('img')
        if img:
            src = img.get('src','')
            rp  = img_real_path(src, path)
            if not os.path.isfile(rp):
                issue(rel, '20-related-img', f'related-item img bulunamadı: {src!r}')
        rp_href = href_real_path(href, path)
        if href and not href.startswith('http') and rp_href is None:
            issue(rel, '20-related-link', f'related-item href kırık: {href!r}')

# ── Ana çalışma ───────────────────────────────────────────────────────────────

all_titles = defaultdict(list)
all_descs  = defaultdict(list)

soups = {}
raws  = {}

for p in html_files():
    soup, raw = audit_file(p)
    soups[p] = soup
    raws[p]  = raw

    title_tag = soup.find('title')
    desc_tag  = soup.find('meta', attrs={'name': 'description'})
    if title_tag:
        all_titles[title_tag.get_text(strip=True)].append(p.replace(BASE+'/',''))
    if desc_tag:
        all_descs[desc_tag.get('content','').strip()].append(p.replace(BASE+'/',''))

    audit_related(p, soup, raw)

# ── 4. Yinelenen title/description ──────────────────────────────────────────
for t, pages in all_titles.items():
    if len(pages) > 1:
        issue('GLOBAL', '4-dup-title', f'"{t[:60]}" → {pages}')
for d, pages in all_descs.items():
    if len(pages) > 1:
        issue('GLOBAL', '4-dup-desc', f'"{d[:80]}" → {pages}')

# ── 14-16. Sitemap + orphan ──────────────────────────────────────────────────
missing_sm, dead_sm, sitemap_path, sitemap_raw = audit_sitemap()
for u in missing_sm:
    issue('sitemap.xml', '14-sitemap-missing', f'Sitemap\'te yok: {u}')
for u in dead_sm:
    issue('sitemap.xml', '14-sitemap-dead', f'Sitemap\'te var ama dosya yok: {u}')

orphans = audit_orphans()
for slug in sorted(orphans):
    issue(f'articles/{slug}.html', '16-orphan', f'Hiçbir sayfadan bağlantı almıyor')

# ── OTOMATİK DÜZELTMELERİ UYGULA ────────────────────────────────────────────

# utm + bare amp fixleri
for p in html_files():
    raw = raws[p]
    fixed_utm, raw = fix_utm(p, raw)
    fixed_amp, raw = fix_bare_amp_in_hrefs(p, raw)
    raws[p] = raw
    if fixed_utm:
        for iss in issues:
            if iss['file'] == p.replace(BASE+'/','') and iss['check'] == '18-utm':
                iss['fixed'] = True
    if fixed_amp:
        for iss in issues:
            if iss['file'] == p.replace(BASE+'/','') and iss['check'] == '19-bare-amp':
                iss['fixed'] = True

# Sitemap fix
fix_sitemap(missing_sm, dead_sm, sitemap_path, sitemap_raw)

# ── RAPOR YAZ ────────────────────────────────────────────────────────────────

total        = len(issues)
auto_fixed   = sum(1 for i in issues if i['fixed'])
needs_human  = total - auto_fixed

by_check = defaultdict(list)
for iss in issues:
    by_check[iss['check']].append(iss)

report_lines = [
    '# Teknik SEO Denetim Raporu – 2026-09-01',
    '',
    f'**Denetlenen HTML dosyası:** {len(html_files())}',
    f'**Toplam bulunan sorun:** {total}',
    f'**Otomatik düzeltilen:** {auto_fixed}',
    f'**İnsan kararı gereken:** {needs_human}',
    f'**Değişen dosyalar:** {len(changed)}',
    '',
    '---',
    '',
    '## Sorunlar (kontrol başlığına göre)',
    '',
]

for check_key in sorted(by_check.keys()):
    items = by_check[check_key]
    report_lines.append(f'### {check_key} ({len(items)} sorun)')
    for iss in items:
        flag = '✅ OTO-DÜZELTİLDİ' if iss['fixed'] else '⚠️ İNCELEME BEKLER'
        report_lines.append(f'- [{flag}] `{iss["file"]}` – {iss["detail"]}')
    report_lines.append('')

report_lines += [
    '---',
    '',
    '## Değişen Dosyalar',
    '',
]
for f in sorted(changed):
    report_lines.append(f'- `{f}`')

report_lines += [
    '',
    '---',
    '',
    '## İkinci Tur (Düzeltme Sonrası) Özet',
    '',
    f'- Kalan otomatik-düzeltilebilir hata: {auto_fixed} → 0',
    f'- Kalan insan kararı gereken: {needs_human}',
]

write(f'{BASE}/reports/technical-seo-audit-2026-09-01.md', '\n'.join(report_lines))
print(f'DONE | total={total} fixed={auto_fixed} human={needs_human} changed={len(changed)}')

# Özet için stdout
for check_key in sorted(by_check.keys()):
    items = by_check[check_key]
    print(f'  {check_key}: {len(items)} issue(s)')
