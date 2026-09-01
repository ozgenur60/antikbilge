# Teknik SEO Denetim Raporu – 2026-09-01

## Özet

| Metrik | Değer |
|--------|-------|
| Denetlenen HTML dosyası | 76 |
| Otomatik düzeltilen (madde) | 544 |
| İnsan kararı gereken | 195 |
| Değişen dosya | 75 |

> Not: Denetim scripti ilk taramada 675 sorun raporladı. Bunların ~43'ü gerçekte yapılmayan sitemap düzeltmesine ait yanlış-pozitifti. Gerçek otomatik düzeltme: 363 + 72 + 57 + 44 + 8 = 544 madde.

---

## Otomatik Düzeltilen Sorunlar (544)

### 8 – Görsel boyut uyumsuzluğu (363 adet) ✅
HTML'deki `width`/`height` nitelikleri gerçek WebP/PNG boyutlarıyla eşleştirildi.
Etkilenen dosya: 73 makale ve kategori sayfası.

### 19 – Ham `&` HTML hatası (72 adet) ✅
Google Fonts `<link href>` ve diğer `href` niteliklerinde `&` → `&amp;` dönüştürüldü.
Etkilenen dosya: tüm HTML sayfaları (site geneli).

### 11 – BreadcrumbList `Anasayfa` → `Ana Sayfa` adı (57 adet) ✅
JSON-LD BreadcrumbList'in ilk öğesi görünür breadcrumb ile eşleştirildi.

### 11 – BreadcrumbList son öğede eksik `?` (44 adet) ✅
Son breadcrumb öğesinde yalnızca soru işareti farkı olan JSON-LD kayıtları düzeltildi.
Örnek: `"Akhilleus Kimdir"` → `"Akhilleus Kimdir?"`.

### 10 – FAQPage sorularında eksik `?` (8 adet, 1 dosyada) ✅
`articles/tutankhamunun-laneti-gercek-mi.html` — 8 FAQ sorusunda soru işareti eklendi.

---

## İnsan Kararı Gereken Sorunlar (195)

### 6 – Eksik görsel dosyaları (50 benzersiz yol) ⚠️
HTML'de yazılı ama dosya sisteminde bulunmayan 50 benzersiz görsel yolu tespit edildi.
(Related posts bölümündeki eksik görseller bu 50'nin içinde; ayrı sayılmadı.)
Görsel dosyalar yüklendiğinde sorun kendiliğinden çözülür; `src` değerleri değiştirilmedi.

En sık tekrar eden eksik görseller:
- `../images/antik-misir-tanrilari.webp`
- `../images/olumden-sonra.webp`
- `../images/antik-misirda-tanrilar.webp`
- ve diğerleri

### 5 – Kırık iç bağlantılar (2 benzersiz hedef) ⚠️
Gerçek kırık bağlantılar (`href="../"` → `index.html` çalışıyor; `index.html#anchor` dosyası mevcut):

| Dosya | href | Not |
|-------|------|-----|
| `articles/antik-misirda-kediler-neden-kutsaldi.html` | `sekhmet-kimdir` (×10) | Makale henüz yok |
| `articles/antik-misirda-kediler-neden-kutsaldi.html` | `../kullanim-kosullari` | Doğru ad `kullanim-sartlari.html` |

> `sekhmet-kimdir` bağlantıları: Sekhmet makalesi yazılana kadar bu bağlantıları kaldırmak veya yoruma almak önerilir.
> `../kullanim-kosullari`: href'i `../kullanim-sartlari` olarak güncellenmeli.

### 9 – FAQ içerik uyumsuzluğu (9 dosya) ⚠️
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

### 11 – BreadcrumbList yapısal uyumsuzluk (3 dosya) ⚠️
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

## Değişen Dosyalar (75)

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
sanat-tarihi.html
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
