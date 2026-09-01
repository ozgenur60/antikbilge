# Teknik SEO Denetim Raporu – 2026-09-01

## Özet

| Metrik | Değer |
|--------|-------|
| Denetlenen HTML dosyası | 76 |
| İlk taramada bulunan toplam sorun | 675 |
| Otomatik düzeltilen | 480 |
| İnsan kararı gereken (kalan) | 195 |
| Değişen dosya | 76 |

---

## Otomatik Düzeltilen Sorunlar (480)

### 19 – Ham `&` HTML hatası (72 adet) ✅
Google Fonts `<link href>` ve diğer `href` niteliklerinde `&` → `&amp;` dönüştürüldü.
Etkilenen dosya: tüm HTML sayfaları (site geneli).

### 8 – Görsel boyut uyumsuzluğu (363 adet) ✅
HTML'deki `width`/`height` nitelikleri gerçek WebP/PNG boyutlarıyla eşleştirildi.
Etkilenen dosya: 73 makale ve kategori sayfası.

### 11 – BreadcrumbList `Anasayfa` → `Ana Sayfa` adı (57 adet) ✅
JSON-LD BreadcrumbList'in ilk öğesi görünür breadcrumb ile eşleştirildi.

### 11 – BreadcrumbList son öğede eksik `?` (44 adet) ✅
Son breadcrumb öğesinde yalnızca soru işareti farkı olan JSON-LD kayıtları düzeltildi.
Örnek: `"Akhilleus Kimdir"` → `"Akhilleus Kimdir?"`.

### 10 – FAQPage son öğede eksik `?` (1 adet) ✅
`articles/tutankhamunun-laneti-gercek-mi.html` — 2 FAQ sorusunda soru işareti eklendi.

### 14 – Sitemap (eksik veya sahte URL) (~43 adet) ✅
Mevcut indexlenebilir sayfalar sitemap'e eklendi; var olmayan URL'ler kaldırıldı.

---

## İnsan Kararı Gereken Sorunlar (195)

### 6 – Eksik görsel dosyaları (106 adet) ⚠️
Aşağıdaki görsel yolları HTML'de yazılı ama dosya sisteminde mevcut değil.
Görsel dosyalar yüklendiğinde sorun kendiliğinden çözülür; URL veya `src` değişikliği yapılmadı.

En sık tekrar eden eksik görseller:
- `../images/antik-misir-tanrilari.webp`
- `../images/olumden-sonra.webp`
- `../images/antik-misirda-tanrilar.webp`
- ve diğerleri (tüm liste: `reports/missing-images.txt`)

### 20 – Related-item eksik görseli (50 adet) ⚠️
Related posts bölümündeki `<img>` src'leri gerçek dosyaya ulaşmıyor.
Görseller yüklenince çözülür.

### 5 – Kırık iç bağlantılar (17 adet) ⚠️
Aşağıdaki `href` değerleri gerçek bir HTML dosyasına ulaşmıyor:

| Dosya | href | Not |
|-------|------|-----|
| `404.html` | `index.html#arkeoloji` | Anchor link; sayfa var ama # ID olmayabilir |
| `404.html` | `index.html#mitoloji` | Aynı |
| `404.html` | `index.html#tarih` | Aynı |
| `404.html` | `index.html#sanat-tarihi` | Aynı |
| `articles/antik-misirda-kediler-neden-kutsaldi.html` | `sekhmet-kimdir` (×10) | Makale henüz yok |
| `articles/antik-misirda-kediler-neden-kutsaldi.html` | `../kullanim-kosullari` | Dosya adı `kullanim-sartlari` olabilir |
| `articles/tutankhamun-kimdir.html` | `../` | `../index` yazılmalı mı? |
| `articles/tutankhamunun-laneti-gercek-mi.html` | `../` | Aynı |

> `sekhmet-kimdir` bağlantıları: Sekhmet makalesi yazılana kadar bu bağlantıları kaldırmak veya yoruma almak önerilir.
> `../kullanim-kosullari`: Dosya adı `kullanim-sartlari.html` ise href güncellenmeli.
> `../`: Ana sayfa bağlantısı — sunucu yapılandırmasına bağlı; çalışıyorsa sorun değil.

### 9 – FAQ içerik uyumsuzluğu (9 adet) ⚠️
Görünür SSS bölümündeki sorular JSON-LD FAQPage'den tamamen farklı. Muhtemelen makale metni güncellendi ama JSON-LD güncellenmedi. İçerik kararı gerektirdiğinden otomatik düzeltilmedi.

| Dosya |
|-------|
| `articles/dionysos-kimdir.html` |
| `articles/gaia-kimdir.html` |
| `articles/hermes-kimdir.html` |
| `articles/kronos-kimdir.html` |
| `articles/odysseia-filmi-2026.html` |
| `articles/prometheus-kimdir.html` |
| `articles/titanlar-kimdir.html` |
| `articles/titanlar-savasi.html` |
| `articles/tutankhamun-kimdir.html` |

### 11 – BreadcrumbList yapısal uyumsuzluk (3 adet) ⚠️
LD'deki öğe sayısı veya kategori adı görünür breadcrumb'dan farklı. Kategori kararı gerektirdiğinden otomatik düzeltilmedi.

| Dosya | Sorun |
|-------|-------|
| `articles/athena-poseidon-atina-mucadelesi.html` | LD 3 öğe, görünür 4 öğe (Yunan Mitolojisi eksik) |
| `articles/misir-piramitleri-nasil-insa-edildi.html` | LD başlığı `"Gerçekten Nasıl İnşa Edildi"`, görünür `"Nasıl İnşa Edildi?"` |
| `articles/truva-ati-gercek-mi.html` | LD kategorisi Tarih, görünür Mitoloji → Yunan Mitolojisi |

### 17 – `href="#"` (tag dışı) (10 adet) ⚠️
Makale alt kategorisi veya etiket bağlantısı olmayan `<a href="#">` kullanımları.
Bu bağlantılar işlevsel değil; hedef URL belirlendikten sonra doldurulabilir.

---

## Değişen Dosyalar (76)

Görsel boyut düzeltmesi, `&amp;` dönüşümü veya BreadcrumbList adı düzeltmesi yapılan dosyalar (makale metni, başlık, meta description ve URL'ler değiştirilmedi):

```
404.html
antik-misir-tarihi.html
arkeoloji.html
articles/akhilleus-kimdir.html
articles/antik-misir-tanrilari.html
articles/antik-misirda-kediler-neden-kutsaldi.html
articles/antik-misirda-mumyalama.html
articles/anubis-kimdir.html
articles/apollon-kimdir.html
articles/arachne-efsanesi.html
articles/ares-kimdir.html
articles/artemis-kimdir.html
articles/athena-kimdir.html
articles/athena-medusayi-neden-lanetledi.html
articles/athena-poseidon-atina-mucadelesi.html
articles/bastet-kimdir.html
articles/demeter-kimdir.html
articles/dionysos-kimdir.html
articles/gaia-kimdir.html
articles/gobeklitepe-nedir.html
articles/hades-kimdir.html
articles/hathor-kimdir.html
articles/hera-kimdir.html
articles/herakles-12-gorevi.html
articles/herakles-kimdir.html
articles/hermes-kimdir.html
articles/horus-kimdir.html
articles/ikarus-efsanesi.html
articles/isis-kimdir.html
articles/ismini-hukumdarlardan-alan-sehirler.html
articles/kronos-kimdir.html
articles/maat-kimdir.html
articles/medusa-kimdir.html
articles/minotor-efsanesi.html
articles/misir-piramitleri-nasil-insa-edildi.html
articles/odysseia-destani-nedir.html
articles/odysseia-filmi-2026.html
articles/odysseus-kimdir.html
articles/olimpos-tanrilari.html
articles/oluler-kitabi-nedir.html
articles/olumden-sonraki-yasam-inanci.html
articles/osiris-kimdir.html
articles/pandoras-kutusu-nedir.html
articles/pegasus-kimdir.html
articles/persephone-kacirilis.html
articles/perseus-kimdir.html
articles/perseus-medusayi-nasil-oldurdu.html
articles/poseidon-kimdir.html
articles/prometheus-kimdir.html
articles/prometheusun-cezasi.html
articles/ra-kimdir.html
articles/set-kimdir.html
articles/theseus-kimdir.html
articles/thoth-kimdir.html
articles/titanlar-kimdir.html
articles/titanlar-savasi.html
articles/truva-ati-gercek-mi.html
articles/truva-savasi-nedir.html
articles/tutankhamun-kimdir.html
articles/tutankhamunun-laneti-gercek-mi.html
articles/yunan-mitolojisinde-evrenin-yaratilisi.html
articles/zeus-kimdir.html
hakkimizda.html
iletisim.html
index.html
katilim.html
mezopotamya-mitolojisi.html
misir-mitolojisi.html
mitoloji.html
reports/technical-seo-audit-2026-09-01.md
sanat-tarihi.html
sitemap.xml
tarih.html
turk-mitolojisi.html
yunan-mitolojisi.html
```

---

## Denetim Kapsamı Dışında Tutulan Alanlar

- Makale metinleri, H1/H2/H3 başlıkları, paragraflar
- Meta title ve meta description metinleri
- Canonical URL ve URL yapısı
- Yayın/güncelleme tarihleri
- Tasarım ve CSS
- Görsellerin kendisi

---

*Denetim tarihi: 2026-09-01 | Script: seo_audit.py + seo_fix.py*
