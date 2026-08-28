# Site Mimarisi Raporu — antikbilge.com
**Tarih:** 2026-08-28

---

## Genel Yapı

```
antikbilge.com/
├── index                    (Ana sayfa)
├── Kategori Sayfaları
│   ├── tarih
│   ├── mitoloji
│   │   ├── misir-mitolojisi
│   │   ├── yunan-mitolojisi
│   │   ├── turk-mitolojisi       ← İçerik yok
│   │   └── mezopotamya-mitolojisi ← İçerik yok
│   ├── arkeoloji
│   └── sanat-tarihi              ← İçerik yok
├── Makale Sayfaları (57 adet)
│   └── articles/[slug]
├── Yardımcı Sayfalar
│   ├── hakkimizda
│   ├── iletisim
│   └── katilim
└── Legal Sayfalar
    ├── gizlilik-politikasi
    ├── cerez-politikasi
    └── kullanim-sartlari
```

**Derinlik:** Tüm makaleler 2 tık derinliğinde (Ana Sayfa → Kategori → Makale).
**URL yapısı:** Temiz, ekstensiyon yok (`/articles/zeus-kimdir`), IIS rewrite aktif.

---

## Kategori → Makale Bağlantı Durumu

### Mısır Mitolojisi (misir-mitolojisi.html)
HTML'de listelenen makaleler: **14**
JSON-LD ItemList: **14** ✅

| Sıra | Makale |
|---|---|
| 1 | antik-misirda-kediler-neden-kutsaldi *(en yeni)* |
| 2 | thoth-kimdir |
| 3 | antik-misir-tanrilari |
| 4 | maat-kimdir |
| 5 | hathor-kimdir |
| 6 | bastet-kimdir |
| 7 | isis-kimdir |
| 8 | ra-kimdir |
| 9 | horus-kimdir |
| 10 | set-kimdir |
| 11 | anubis-kimdir |
| 12 | osiris-kimdir |
| 13 | oluler-kitabi-nedir |
| 14 | olumden-sonraki-yasam-inanci |

**Eksik:** `antik-misirda-mumyalama` ve `misir-piramitleri-nasil-insa-edildi` Mısır kategorisinde görünmüyor; farklı kategorilerde mi?

---

### Yunan Mitolojisi (yunan-mitolojisi.html)
HTML'de listelenen makaleler: **36**
JSON-LD ItemList: **36** ✅

Kategorideki Yunan makaleleri (tam liste `yunan-mitolojisi.html` içindedir):
zeus-kimdir, hera-kimdir, poseidon-kimdir, demeter-kimdir, athena-kimdir, apollon-kimdir, artemis-kimdir, ares-kimdir, hermes-kimdir, dionysos-kimdir, hades-kimdir, hephaistos (varsa), titanlar-kimdir, titanlar-savasi, kronos-kimdir, gaia-kimdir, prometheus-kimdir, prometheusun-cezasi, herakles-kimdir, herakles-12-gorevi, odysseus-kimdir, odysseia-destani-nedir, odysseia-filmi-2026, perseus-kimdir, perseus-medusayi-nasil-oldurdu, pegasus-kimdir, medusa-kimdir, athena-medusayi-neden-lanetledi, arachne-efsanesi, akhilleus-kimdir, truva-savasi-nedir, truva-ati-gercek-mi, minotor-efsanesi, theseus-kimdir, ikarus-efsanesi, pandoras-kutusu-nedir, athena-poseidon-atina-mucadelesi, persephone-kacirilis, demeter-kimdir, yunan-mitolojisinde-evrenin-yaratilisi

---

### Tarih (tarih.html)
HTML'de gösterilen: **4 makale**
JSON-LD ItemList: **1 öğe** ⚠️ TUTARSIZLIK

Bağlantılı makaleler: `gobeklitepe-nedir`, `olimpos-tanrilari`, `misir-piramitleri-nasil-insa-edildi`, `ismini-hukumdarlardan-alan-sehirler`

---

### Arkeoloji (arkeoloji.html)
Makale sayısı: **1** (`gobeklitepe-nedir`)
Kategori içeriği son derece kısıtlı.

---

### Sanat Tarihi, Türk Mitolojisi, Mezopotamya Mitolojisi
Makale sayısı: **0** (placeholder içerikli)
Bu sayfalar indekslenmiş ama boş kategori olarak kalıyor.

---

## İç Bağlantı Mimarisi

### Ana Sayfa → Makaleler
`index.html` makale sayfalarına doğrudan 6 bağlantı veriyor:
- `articles/gobeklitepe-nedir`
- `articles/olimpos-tanrilari`
- `articles/antik-misirda-mumyalama`
- `articles/misir-piramitleri-nasil-insa-edildi`
- `articles/anubis-kimdir`
- `articles/bastet-kimdir`
- `articles/pegasus-kimdir`

### Kategori Sayfaları → Makaleler
Her kategori sayfası, ilgili tüm makalelere bağlantı veriyor. ✅

### Makale → Makale (Related Posts)
Her makale genellikle **2 ilgili makale** bağlantısı içeriyor (related-posts bölümü).

### Makale → Makale (Metin İçi)
Makalelerin metin içinde kullandığı yaygın iç bağlantı hedefleri (en çok gelen):

| Hedef Makale | Yaklaşık kaynak sayısı |
|---|---|
| `articles/zeus-kimdir` | ~20+ makale |
| `articles/titanlar-kimdir` | ~15+ makale |
| `articles/herakles-kimdir` | ~10+ makale |
| `articles/prometheus-kimdir` | ~8+ makale |
| `articles/osiris-kimdir` | ~8+ makale |
| `articles/bastet-kimdir` | ~6+ makale |
| `articles/anubis-kimdir` | ~6+ makale |

### Diğer Makalelerden İç Bağlantı Almayan Sayfalar
Bu sayfalar yalnızca kategori listesinden bağlantı alıyor, makalelerden almıyor:

| Makale | Durum |
|---|---|
| `articles/antik-misirda-kediler-neden-kutsaldi` | Yeni eklendi — henüz diğer makalelerde referans yok |
| `articles/odysseia-filmi-2026` | Film içeriği — diğer mitoloji makalelerinde referans az |
| `articles/prometheusun-cezasi` | Yeni eklendi — prometheus-kimdir'den link bekliyor |
| `articles/theseus-kimdir` | minotor-efsanesi gibi ilgili makalelerden bağlantı almalı |
| `articles/yunan-mitolojisinde-evrenin-yaratilisi` | Yeni eklendi — gaia-kimdir, titanlar-kimdir'den link alabilir |

---

## Breadcrumb Zinciri

**Mevcut pattern (makaleler):**
```
Ana Sayfa → Mitoloji → [Alt Kategori] → [Makale Başlığı]
```
Örnek: `Ana Sayfa → Mitoloji → Yunan Mitolojisi → Zeus Kimdir?`

**Eksik breadcrumb:**
- Kategori sayfaları (`misir-mitolojisi.html` vb.) — schema yok
- Legal sayfalar (`gizlilik-politikasi.html` vb.) — schema yok

---

## Schema Dağılımı

| Sayfa türü | Article | FAQPage | BreadcrumbList | CollectionPage | Organization | WebSite |
|---|---|---|---|---|---|---|
| Ana sayfa | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Kategori sayfaları | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Makale sayfaları | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Yardımcı sayfalar | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Legal sayfalar | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Sitemap Analizi

- **Toplam URL:** 68
- **Format:** Her URL için `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>` mevcut ✅
- **Priority dağılımı:**
  - Ana sayfa: 1.0
  - Makale sayfaları: 0.8
  - Kategori sayfaları: 0.5
  - Legal/yardımcı: 0.3
- **Sorun:** Boş kategori sayfaları (`turk-mitolojisi`, `mezopotamya-mitolojisi`, `sanat-tarihi`) sitemap'te yer alıyor.
- **Sorun:** Çoğu makalenin `lastmod` değeri `2026-07-05` olarak sabit — gerçek yayın tarihlerini yansıtmıyor.

---

## Open Graph ve Twitter Card Özeti

**Makale sayfaları:**
- og:type: `article` ✅
- og:image + twitter:image: Her makaleye özgü cover görseli ✅ (ancak 30 görsel eksik)
- twitter:card: `summary_large_image` ✅

**Kategori/Ana sayfa:**
- og:type: `website` ✅
- og:image: `logo.webp` (genel; makaleye özgü değil — kabul edilebilir)

**Legal sayfalar:**
- `og:description` eksik ⚠️
