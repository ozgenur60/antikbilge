# Teknik SEO Denetim Raporu — antikbilge.com
**Tarih:** 2026-08-28 | **Toplam URL:** 75 (57 makale + 8 kategori/ana sayfa + 10 yardımcı sayfa)

---

## KRİTİK ÖNCELİK

### KRIT-01 — Eksik Görsel Dosyaları (30 dosya)
Makaleler aşağıdaki görselleri referans alıyor; ancak bu dosyalar `images/` klasöründe **mevcut değil**. Hem hero görseli hem `og:image` kırık.

| Referans veren dosya | Eksik görsel |
|---|---|
| `articles/antik-misir-tanrilari.html` | `images/antik-misir-tanrilari.webp` (hero + og:image) |
| `articles/arachne-efsanesi.html` | `images/arachne-efsanesi.webp` (hero + og:image) |
| `articles/athena-kimdir.html` | `images/athena-kapak.webp` (hero + og:image) |
| `articles/athena-medusayi-neden-lanetledi.html` | `images/athena-medusa-kapak.webp` (hero + og:image) |
| `articles/athena-poseidon-atina-mucadelesi.html` | `images/athena-poseidon-atina-mucadelesi.webp` (hero + og:image) |
| `articles/demeter-kimdir.html` | `images/demeter-kimdir.webp` (hero + og:image) |
| `articles/hades-kimdir.html` | `images/hades-kapak.webp` (hero + og:image) |
| `articles/medusa-kimdir.html` | `images/medusa-kapak.webp` (hero + og:image) |
| `articles/pandoras-kutusu-nedir.html` | `images/pandoras-kutusu.webp` (hero + og:image) |
| `articles/pegasus-kimdir.html` | `images/pegasus-kapak.webp` (hero + og:image) |
| `articles/persephone-kacirilis.html` | `images/persephone-kacirilis.webp` (hero + og:image) |
| `articles/perseus-medusayi-nasil-oldurdu.html` | `images/perseus-medusa-kapak.webp` (hero + og:image) |
| `articles/poseidon-kimdir.html` | `images/poseidon-kimdir.webp` (hero + og:image) |
| `articles/set-kimdir.html` | `images/set.webp` (hero + og:image) |
| `articles/osiris-kimdir.html` | `images/osiris-kapak.webp` |
| `articles/ra-kimdir.html` | `images/ra.webp` (hero + og:image) |
| `articles/olumden-sonraki-yasam-inanci.html` | `images/olumden-sonraki-yasam.webp` |
| `articles/maat-kimdir.html` | `images/maat-kapak.webp` (hero + og:image) |
| Birden fazla makale (related post) | `images/zeus-kapak.webp`, `images/hades-kimdir.webp`, `images/isis.webp`, `images/athena-medusa-lanet.webp`, `images/poseidon-kapak.webp`, `images/hukumdar-sehirler-kapak.webp`, `images/piramitler-insaat.webp`, `images/anubis-kapak.webp` |

**Etki:** Kırık hero görseli kullanıcı deneyimini doğrudan bozar; kırık `og:image` sosyal paylaşımlarda site görselini yok eder. Google Search Console'da bu sayfalar için görsel indeksleme sıfır olacaktır.

---

### KRIT-02 — logo.png Dosyası (990 KB, PNG formatında)
- **Dosya:** `images/logo.png`
- **Boyut:** 990 KB — tek bir logo dosyası için aşırı büyük.
- **Format:** PNG; WebP versiyonu (`images/logo.webp`, 449 KB) de mevcut ama o da büyük.
- **Etki:** Bazı sayfalar `logo.png` referansı içerebilir; tüm sayfalarda `logo.webp` kullanılmalı. Her iki dosya da sıkıştırılmayı bekliyor (logo 70×70 px boyutunda render ediliyor).

---

## YÜKSEK ÖNCELİK

### YÜKS-01 — Büyük Görsel Dosyaları (8 dosya, her biri >1.9 MB)
Bu görseller WebP formatında olsa da boyutları aşırı yüksek:

| Dosya | Boyut |
|---|---|
| `images/bastet-festivali-bubastis.webp` | **2.31 MB** |
| `images/isis-kimdir.webp` | **2.09 MB** |
| `images/herakles-12-gorevi-kapak.webp` | **2.00 MB** |
| `images/bastet-sekhmet-donusum.webp` | **2.00 MB** |
| `images/herakles-kapak.webp` | **1.99 MB** |
| `images/bastet-kedi-mumyalari.webp` | **1.98 MB** |
| `images/akhilleus-kapak.webp` | **1.93 MB** |
| `images/yunan-mitolojisinde-evrenin-yaratilisi-kapak.webp` | **1.93 MB** |
| `images/logo.webp` | **449 KB** (logo için fazla) |

**Referans:** Sıkıştırılmış görseller (ör. `images/antik-misirda-kediler-neden-kutsaldi-kapak.webp`) 177 KB seviyesinde tutulmuş. Hedef: kapak görselleri için 150–300 KB arası.

---

### YÜKS-02 — Title/H1 Uyumsuzlukları (6 sayfa)
Title tag ile H1 içeriği farklı; Google hangisini tercih edeceğini seçiyor, tutarlılık bozuluyor.

| Dosya | Title (kısaltılmış) | H1 (kısaltılmış) |
|---|---|---|
| `articles/horus-kimdir.html` | "…Şahin Başlı Tanrısı" | "…Şahin Başlı Tanrısı, **Horus'un Gözü ve Set ile Mücadelesi**" |
| `articles/medusa-kimdir.html` | "…En Ünlü Gorgonu **ve Efsanesi**" | "…En Ünlü Gorgonu **Nasıl Bir Efsaneye Dönüştü?**" |
| `articles/olumden-sonraki-yasam-inanci.html` | "…Ruhun Yolculuğu **ve** Sonsuz Yaşam" | "…Ruhun Yolculuğu**, Yargılanması ve** Sonsuz Yaşam" |
| `articles/perseus-kimdir.html` | "…**Mitolojik Hikâyesi ve** Gerçek Anlamı" | "…**Mitolojik Hikâyesi, Soyu ve** Gerçek Anlamı" |
| `articles/set-kimdir.html` | "…Kaos ve Çöl Tanrısı" | "…Kaos ve Çöl Tanrısı**, Horus'un Ezeli Rakibi**" |
| `articles/truva-ati-gercek-mi.html` | Title: "**Troya**'nın En Ünlü Sırrı" | H1: "**Truva**'nın En Ünlü Sırrı" (farklı yazım) |

---

### YÜKS-03 — Related Post Görselleri: Width/Height Eksikliği (tüm makaleler)
Tüm 57 makale dosyasında `related-card` bölümündeki `<img>` etiketlerinde `width` ve `height` attribute'ları yok.

```html
<!-- Mevcut (CLS risk): -->
<img src="../images/anubis.webp" alt="Anubis Kimdir?" loading="lazy">

<!-- Olması gereken: -->
<img src="../images/anubis.webp" alt="Anubis Kimdir?" loading="lazy" width="400" height="250">
```

**Etki:** Tarayıcı görselin boyutunu önceden bilemediği için alan tahsis edemez → Cumulative Layout Shift (CLS) skoru düşer → Core Web Vitals etkilenir.

---

### YÜKS-04 — Kategori Sayfalarında BreadcrumbList Schema Yok
Aşağıdaki kategori sayfaları BreadcrumbList structured data içermiyor:

- `arkeoloji.html`
- `mitoloji.html`
- `yunan-mitolojisi.html`
- `misir-mitolojisi.html`
- `tarih.html`
- `sanat-tarihi.html`
- `turk-mitolojisi.html`
- `mezopotamya-mitolojisi.html`

Google bu sayfalar için breadcrumb snippet gösteremez.

---

### YÜKS-05 — Makale Başına İç Link Almayan 5 Sayfa (Orphan Articles)
Aşağıdaki sayfalar diğer **makale** sayfalarından hiç iç bağlantı almıyor:

| Makale | Giden bağlantı sayısı |
|---|---|
| `articles/antik-misirda-kediler-neden-kutsaldi` | 5 (yeni eklendi) |
| `articles/odysseia-filmi-2026` | 6 |
| `articles/prometheusun-cezasi` | 6 (yeni eklendi) |
| `articles/theseus-kimdir` | 8 |
| `articles/yunan-mitolojisinde-evrenin-yaratilisi` | 9 (yeni eklendi) |

**Not:** Bu sayfalar kategori listelerinden bağlantı alıyor, dolayısıyla tamamen yetim değil. Ancak diğer makalelerden iç bağlantı almaları PageRank dağılımı için önemlidir.

---

### YÜKS-06 — Çok Uzun Meta Description (2 sayfa)
Google ~160 karakter sınırını aşan açıklamaları kesiyor:

| Dosya | Karakter | Sorun |
|---|---|---|
| `articles/prometheusun-cezasi.html` | **190 karakter** | 30 karakter fazla |
| `articles/anubis-kimdir.html` | **157 karakter** | Sınırda (kesilebilir) |
| `articles/bastet-kimdir.html` | **173 karakter** | 13 karakter fazla |

---

### YÜKS-07 — tarih.html ItemList Schema Tutarsızlığı
- `tarih.html` sayfasında JSON-LD içinde **1 öğe** listeleniyor
- Ancak HTML'de **4 makale kartı** gösteriliyor
- Dosya: `tarih.html`, satır ~65 (script type="application/ld+json")

---

## ORTA ÖNCELİK

### ORTA-01 — index.html H1 Görsel Olarak Gizli
```html
<!-- index.html, satır ~XX -->
<h1 class="sr-only">Antik Bilge - Tarih, Mitoloji, Sanat Tarihi ve Arkeoloji</h1>
```
H1 crawlerlar için var ama kullanıcılara görünmüyor. Ana sayfada görsel bir H1 olmak, sayfa otoritesini güçlendirir.

---

### ORTA-02 — Boş/Placeholder Kategori Sayfaları (3 sayfa)
- `turk-mitolojisi.html` — "Yakında Geliyor", makale yok
- `mezopotamya-mitolojisi.html` — "Yakında Geliyor", makale yok
- `sanat-tarihi.html` — 1 placeholder kart (`href="#"`)

Bu sayfalar indekslenip crawl bütçesi tüketiyor ama içerik değeri sunmuyor.

---

### ORTA-03 — Kırık Bağlantılar (href="#")
| Dosya | Konum |
|---|---|
| `index.html` | "Tümünü Gör" linki (`href="#"`) |
| `sanat-tarihi.html` | "Rönesans" makale kartı (`href="#"`) |
| `iletisim.html` | Form `action="#"` (fonksiyonel değil) |

---

### ORTA-04 — Legal Sayfalarda Eksik OG/Twitter Meta Etiketleri
| Dosya | Eksik |
|---|---|
| `kullanim-sartlari.html` | `og:description`, `twitter:description` |
| `gizlilik-politikasi.html` | `og:description`, `twitter:description` |
| `cerez-politikasi.html` | `og:description`, `twitter:description` |

---

### ORTA-05 — hakkimizda.html Twitter Card Tipi
`hakkimizda.html` sayfasında `twitter:card` değeri `summary` (küçük görsel). Diğer tüm sayfalarda `summary_large_image` kullanılıyor. Tutarsızlık.

---

### ORTA-06 — AI Bot Kuralları robots.txt'te Yorum Satırı
```
# robots.txt içinde GPTBot, CCBot, anthropic-ai yorum satırı (#) ile devre dışı
```
Dosya: `robots.txt`. Bu botları engellemek istiyorsanız yorum karakterini (#) kaldırın. Aktif değil.

---

### ORTA-07 — Web.config'de Eski Redirect Hedefleri
```xml
<!-- web.config -->
<rule name="Redirect gobeklitepe-arkeolojik">
    <action type="Redirect" url="/articles/gobeklitepe-nedir" ... />
</rule>
```
Redirect hedefleri mevcut ve doğru, ancak kaynak URL'lerin (`articles/gobeklitepe-arkeolojik-kirilma`, `articles/olimpos-tanrilari-neden-degisir`) hâlâ sitemap'te veya herhangi bir iç bağlantıda geçip geçmediği kontrol edilmeli.

---

### ORTA-08 — Kategori Sayfalarında Görsel width/height Eksikliği
`yunan-mitolojisi.html`, `misir-mitolojisi.html`, `mitoloji.html`: makale kartı görselleri inline CSS (`style="width:100%;height:100%;..."`) kullanıyor, explicit `width`/`height` attribute'ları yok → CLS riski.

---

## DÜŞÜK ÖNCELİK

### DÜŞK-01 — 404.html İçindeki Bağlantılar Temiz URL Kullanmıyor
```html
<!-- 404.html -->
<a href="index.html#arkeoloji">...</a>
```
IIS rewrite kuralları `index.html` → `index` yönlendirmesi yapıyor. Bu bağlantılar önce 301 ile doğru URL'ye yönlendirilecek, doğrudan zarar yok ama tutarsız.

---

### DÜŞK-02 — hakkimizda.html Yorumlanan AdSense Kodu
```html
<!-- hakkimizda.html, satır ~XX -->
<!-- AdSense placeholder kodu yorum satırı olarak bırakılmış -->
```
Temizlik açısından kaldırılabilir.

---

### DÜŞK-03 — Sitemap lastmod Tutarsızlığı
Sitemap'teki çoğu makale `lastmod: 2026-07-05` olarak işaretli; bu makalelerin yayın tarihleri farklı. `thoth-kimdir` gibi güncellenen makaleler için sitemap'teki lastmod doğru güncelleme tarihini yansıtmıyor.

---

### DÜŞK-04 — Tek Makale İçin Farklı published/modified Tarihleri
`articles/thoth-kimdir.html`:
- `article:published_time`: 2026-06-10
- `article:modified_time`: 2026-07-19
Bu tek güncellenmiş makale; diğer 56 makalede published_time = modified_time. Güncelleme tarihinin schema'ya yansıtılması freshness sinyali göndermesi açısından olumlu.

---

## GENEL YAPININ OLUMLU TARAFLARI

- Tüm 57 makale: FAQPage schema ✅, BreadcrumbList schema ✅, Article schema ✅
- Tüm makaleler: canonical URL ✅, robots: index/follow ✅
- Tüm makaleler: Hero görseli `fetchpriority="high"` + explicit `width`/`height` ✅
- IIS web.config: www → non-www, .html kaldırma redirectler ✅, güvenlik başlıkları ✅
- robots.txt: /css/, /js/, /images/ açık ✅, sitemap referansı ✅
- AdSense ve GA4 tüm sayfalarda tutarlı ✅
- Tüm görseller WebP formatında ✅ (logo.png istisnasıyla)
