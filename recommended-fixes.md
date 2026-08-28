# Önerilen Düzeltmeler — antikbilge.com SEO Denetimi
**Tarih:** 2026-08-28 | Değişiklik yapılmadan önce onay alınmalıdır.

---

## KRİTİK — Hemen Yapılmalı

### [KRIT-01] Eksik Kapak Görsellerini Yükle (30 dosya)
**Sorun:** Makale hero görselleri ve og:image referansları kırık.
**Yapılacak:** Aşağıdaki görselleri GitHub üzerinden `images/` klasörüne yükle (mevcut yükleme yöntemiyle).
**Öncelik sırası (en çok görüntülenen makaleye göre):**
1. `images/zeus-kapak.webp` — ~20 makalenin related bölümünde kullanılıyor
2. `images/set.webp`, `images/ra.webp`, `images/osiris-kapak.webp` — hero görseli eksik
3. `images/athena-kapak.webp`, `images/hades-kapak.webp`, `images/medusa-kapak.webp`
4. `images/pandoras-kutusu.webp`, `images/pegasus-kapak.webp`, `images/persephone-kacirilis.webp`
5. Geri kalan ~20 görsel

**Not:** Görsel yüklerken logo.webp ve büyük dosyaları da sıkıştır (YÜKS-01).

---

## YÜKSEK — Bu Ay İçinde Yapılmalı

### [YÜKS-01] Büyük Görselleri Sıkıştır
**Sorun:** 8 görsel 1.93–2.31 MB arasında; hedef 150–300 KB.
**Yapılacak:** Yeni görseller yüklenirken Python/Pillow ile quality=82 WebP sıkıştırması yapılacak (mevcut iş akışıyla uyumlu).
**Etkilenen dosyalar:**
- `images/bastet-festivali-bubastis.webp` (2.31 MB)
- `images/isis-kimdir.webp` (2.09 MB)
- `images/herakles-12-gorevi-kapak.webp` (2.00 MB)
- `images/bastet-sekhmet-donusum.webp` (2.00 MB)
- `images/herakles-kapak.webp` (1.99 MB)
- `images/bastet-kedi-mumyalari.webp` (1.98 MB)
- `images/akhilleus-kapak.webp` (1.93 MB)
- `images/yunan-mitolojisinde-evrenin-yaratilisi-kapak.webp` (1.93 MB)
- `images/logo.webp` (449 KB → ~30 KB hedeflenmeli)
- `images/logo.png` (990 KB → silinebilir, WebP var)

---

### [YÜKS-02] Title/H1 Uyumsuzluklarını Gider
**Sorun:** 6 makalede title tag ile H1 farklı içerik taşıyor.
**Yapılacak:** Her biri için ya title ya H1'i diğeriyle eşleştir. Önerilen yaklaşım: H1'i uzun tut, title tag'ı kısalt (60 karakter altı).

| Dosya | Öneri |
|---|---|
| `articles/horus-kimdir.html` | Title'ı H1 ile eşleştir; H1 daha bilgilendirici |
| `articles/medusa-kimdir.html` | Title'ı H1 ile eşleştir |
| `articles/set-kimdir.html` | Title'ı H1 ile eşleştir |
| `articles/olumden-sonraki-yasam-inanci.html` | H1'i title ile eşleştir (daha kısa) |
| `articles/perseus-kimdir.html` | Title'ı H1 ile eşleştir |
| `articles/truva-ati-gercek-mi.html` | "Troya" / "Truva" yazımını tek tipleştir; "Truva" kullan (URL ile uyumlu) |

---

### [YÜKS-03] Related Post Görsellerine Width/Height Ekle
**Sorun:** Tüm makalelerde `related-card` görsellerinde `width`/`height` attribute yok → CLS riski.
**Yapılacak:** Tüm makale dosyalarındaki related post img etiketlerine standart boyutları ekle.
```html
<!-- Değiştirilecek pattern (tüm makalelerde): -->
<img src="../images/xxx.webp" alt="..." loading="lazy">

<!-- Olması gereken: -->
<img src="../images/xxx.webp" alt="..." loading="lazy" width="400" height="250">
```
**Scope:** 57 makale dosyası, her birinde 2 adet related img.

---

### [YÜKS-04] Kategori Sayfalarına BreadcrumbList Schema Ekle
**Sorun:** 8 kategori sayfasında BreadcrumbList structured data yok.
**Yapılacak:** Her kategori sayfasına şu pattern'i ekle:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Anasayfa", "item": "https://antikbilge.com/"},
    {"@type": "ListItem", "position": 2, "name": "Mitoloji", "item": "https://antikbilge.com/mitoloji"},
    {"@type": "ListItem", "position": 3, "name": "Mısır Mitolojisi", "item": "https://antikbilge.com/misir-mitolojisi"}
  ]
}
```
**Etkilenen dosyalar:** `arkeoloji.html`, `mitoloji.html`, `yunan-mitolojisi.html`, `misir-mitolojisi.html`, `tarih.html`, `sanat-tarihi.html`, `turk-mitolojisi.html`, `mezopotamya-mitolojisi.html`

---

### [YÜKS-05] Orphan Makalelere İç Bağlantı Ekle
**Sorun:** 5 makale diğer makalelerden iç bağlantı almıyor.
**Yapılacak:**

| Orphan makale | Nereden bağlantı verilebilir |
|---|---|
| `prometheusun-cezasi` | `prometheus-kimdir` içindeki "ceza" bölümünden |
| `yunan-mitolojisinde-evrenin-yaratilisi` | `gaia-kimdir` ve `titanlar-kimdir` giriş paragraflarından |
| `antik-misirda-kediler-neden-kutsaldi` | `bastet-kimdir` ve `antik-misir-tanrilari` makale metinlerinden |
| `theseus-kimdir` | `minotor-efsanesi` içindeki Theseus bölümünden |
| `odysseia-filmi-2026` | `odysseia-destani-nedir` veya `odysseus-kimdir` related posts'una ekle |

---

### [YÜKS-06] Çok Uzun Meta Description Kısalt
**Sorun:** 3 makalenin meta description'ı 160 karakteri aşıyor.
**Yapılacak:**

| Dosya | Mevcut (karakter) | Hedef |
|---|---|---|
| `articles/prometheusun-cezasi.html` | 190 | ~155 karakter |
| `articles/bastet-kimdir.html` | 173 | ~155 karakter |
| `articles/anubis-kimdir.html` | 157 | ~155 karakter |

---

### [YÜKS-07] tarih.html JSON-LD ItemList Güncelle
**Sorun:** `tarih.html` JSON-LD'sinde 1 makale var, HTML'de 4 makale gösteriliyor.
**Yapılacak:** JSON-LD'ye eksik 3 makaleyi ekle:
```json
{"@type": "ListItem", "position": 2, "name": "Olimpos Tanrıları", "url": "https://antikbilge.com/articles/olimpos-tanrilari"},
{"@type": "ListItem", "position": 3, "name": "Mısır Piramitleri", "url": "https://antikbilge.com/articles/misir-piramitleri-nasil-insa-edildi"},
{"@type": "ListItem", "position": 4, "name": "İsmini Hükümdarlardan Alan Şehirler", "url": "https://antikbilge.com/articles/ismini-hukumdarlardan-alan-sehirler"}
```

---

## ORTA — Önümüzdeki Ay

### [ORTA-01] Boş Kategori Sayfaları — noindex veya içerik
**Seçenek A:** `turk-mitolojisi.html`, `mezopotamya-mitolojisi.html`, `sanat-tarihi.html` sayfalarına `<meta name="robots" content="noindex, follow">` ekle — içerik hazır olana kadar crawl bütçesini koru.
**Seçenek B:** Bu kategoriler için en az 2–3 makale yayınla ve sayfaları indekslenebilir hale getir.

---

### [ORTA-02] href="#" Bağlantıları Kaldır veya Düzelt
- `index.html`: "Tümünü Gör" → `mitoloji` veya `yunan-mitolojisi` gibi gerçek URL
- `sanat-tarihi.html`: Placeholder kart → kaldır veya gerçek makaleyle değiştir
- `iletisim.html`: Form → gerçek işlem uç noktası veya mailto

---

### [ORTA-03] Legal Sayfalara og:description Ekle
**Etkilenen:** `kullanim-sartlari.html`, `gizlilik-politikasi.html`, `cerez-politikasi.html`
Kısa bir açıklama yeterli; bu sayfalar sosyal paylaşıma uygun olmasa da eksik etiket uyarı üretiyor.

---

### [ORTA-04] hakkimizda.html Twitter Card Güncelle
```html
<!-- Mevcut: -->
<meta name="twitter:card" content="summary">
<!-- Olması gereken: -->
<meta name="twitter:card" content="summary_large_image">
```

---

### [ORTA-05] Sitemap lastmod Değerlerini Gerçek Tarihlerle Güncelle
**Sorun:** Çoğu makalede `lastmod: 2026-07-05` — gerçek tarihleri yansıtmıyor.
**Yapılacak:** Her makale için `lastmod` değerini o makalenin `article:modified_time` değeriyle eşleştir. `seo-content-inventory.csv`'deki `modified_date` sütunu referans alınabilir.

---

### [ORTA-06] AI Bot Kurallarını robots.txt'te Aktif Et (opsiyonel)
```
# Mevcut (devre dışı):
# User-agent: GPTBot
# Disallow: /

# Aktif hale getirmek için # kaldır
```
Bu tercih siteye bağlı; içeriklerin LLM veri setlerine dahil edilmesini istemiyorsanız aktif et.

---

## DÜŞÜK — Zaman Buldukça

### [DÜŞK-01] logo.png Dosyasını Sil
`images/logo.webp` kullanılıyor, `images/logo.png` gereksiz (990 KB). Site disk alanını boşaltır.

### [DÜŞK-02] hakkimizda.html AdSense Yorum Satırını Kaldır
Yorum satırı olarak bırakılan placeholder kodu temizle.

### [DÜŞK-03] index.html H1'i Görsel Olarak Göster
`class="sr-only"` kaldırılarak veya stillendirilmiş bir H1 eklenerek kullanıcı deneyimi güçlendirilebilir.

### [DÜŞK-04] misir-mitolojisi.html — Eksik Makaleleri Listele
`antik-misirda-mumyalama` ve `misir-piramitleri-nasil-insa-edildi` Mısır kategorisi listesinde görünmüyor; kategorilere göre konumlandırma gözden geçirilmeli.

---

## Uygulama Sırası Özeti

| Öncelik | İş | Etki |
|---|---|---|
| 🔴 Kritik | Eksik görselleri yükle | Kırık sayfalar düzelir, og:image çalışır |
| 🟠 Yüksek | Büyük görselleri sıkıştır | Sayfa yüklenme hızı, LCP iyileşir |
| 🟠 Yüksek | Related post img width/height ekle | CLS skoru iyileşir |
| 🟠 Yüksek | Title/H1 uyumsuzluklarını gider | Tutarlılık, Google snippet iyileşir |
| 🟠 Yüksek | Kategori sayfalarına BreadcrumbList ekle | SERP breadcrumb snippet kazanılır |
| 🟠 Yüksek | Orphan makalelere iç link ekle | PageRank dağılımı iyileşir |
| 🟡 Orta | Boş kategorilere noindex ekle | Crawl bütçesi korunur |
| 🟡 Orta | tarih.html ItemList düzelt | Structured data hatasız |
| 🟡 Orta | Uzun meta descriptionları kısalt | SERP snippet kesilmez |
| 🟢 Düşük | logo.png sil, temizlik | Disk ve kod temizliği |
