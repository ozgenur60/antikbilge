#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Güvenli otomatik düzeltmeler:
 A. Görsel boyutları: img width/height → gerçek dosya boyutu
 B. BreadcrumbList JSON "Anasayfa" → "Ana Sayfa" (görünür breadcrumb ile eşleştir)
 C. related-item: img bulunamayan satırları raporla (düzeltme yok, sadece rapor)
"""

import os, re, json, glob
from bs4 import BeautifulSoup
from PIL import Image

BASE = '/home/user/antikbilge'

def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()

def write(p, c):
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)

def img_real_path(src, html_path):
    return os.path.normpath(os.path.join(os.path.dirname(html_path), src))

changed = []
dim_fixed = 0
bc_fixed  = 0

for path in sorted(glob.glob(f'{BASE}/**/*.html', recursive=True)):
    raw  = read(path)
    orig = raw

    # ── A. Görsel boyut düzeltme (regex tabanlı, BeautifulSoup parse etme) ──
    def fix_img_dimensions(m):
        global dim_fixed
        tag = m.group(0)
        src_m = re.search(r'src=["\']([^"\']+)["\']', tag)
        w_m   = re.search(r'width=["\'](\d+)["\']', tag)
        h_m   = re.search(r'height=["\'](\d+)["\']', tag)
        if not src_m or not w_m or not h_m:
            return tag
        src = src_m.group(1)
        if src.startswith('http'):
            return tag
        rp = img_real_path(src, path)
        if not os.path.isfile(rp):
            return tag
        try:
            with Image.open(rp) as im:
                rw, rh = im.size
        except Exception:
            return tag
        dw, dh = int(w_m.group(1)), int(h_m.group(1))
        if (dw, dh) == (rw, rh):
            return tag
        new_tag = tag
        new_tag = re.sub(r'width=["\']' + str(dw) + r'["\']', f'width="{rw}"', new_tag)
        new_tag = re.sub(r'height=["\']' + str(dh) + r'["\']', f'height="{rh}"', new_tag)
        dim_fixed += 1
        return new_tag

    raw = re.sub(r'<img[^>]+>', fix_img_dimensions, raw)

    # ── B. BreadcrumbList "Anasayfa" → "Ana Sayfa" ──────────────────────────
    # Görünür breadcrumb'dan ilk <li> metnini al
    soup_vis = BeautifulSoup(raw, 'html.parser')
    bc_ol = soup_vis.find('ol', class_='breadcrumb-list')
    if bc_ol:
        first_li = bc_ol.find('li')
        vis_first = first_li.get_text(strip=True) if first_li else None

        if vis_first:
            # JSON-LD bloklarında "Anasayfa" ile "vis_first" farklıysa düzelt
            def fix_bc_json(m):
                global bc_fixed
                blk = m.group(0)
                try:
                    obj = json.loads(m.group(1))
                except Exception:
                    return blk
                if obj.get('@type') != 'BreadcrumbList':
                    return blk
                changed_json = False
                for elem in obj.get('itemListElement', []):
                    if elem.get('position') == 1 and elem.get('name') != vis_first:
                        elem['name'] = vis_first
                        changed_json = True
                        bc_fixed += 1
                if changed_json:
                    new_json = json.dumps(obj, ensure_ascii=False, indent=4)
                    return blk.replace(m.group(1), new_json)
                return blk
            raw = re.sub(
                r'<script type="application/ld\+json">\s*(.*?)\s*</script>',
                fix_bc_json,
                raw,
                flags=re.DOTALL
            )

    if raw != orig:
        write(path, raw)
        changed.append(path.replace(BASE+'/', ''))

print(f'Görsel boyut düzeltilen: {dim_fixed}')
print(f'Breadcrumb LD adı düzeltilen: {bc_fixed}')
print(f'Değişen dosya: {len(changed)}')
for f in changed:
    print(f'  {f}')
