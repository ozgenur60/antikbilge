// Language translations
const translations = {
  en: {
    "logo-sub": "VIP Tourism & Transportation",
    "nav-home": "Home", "nav-dest": "Destinations", "nav-tours": "VIP Tours",
    "nav-services": "Services", "nav-about": "About Us", "nav-book": "Book Now",
    "hero-tag": "Antalya, Turkey",
    "hero-title": "Experience Turkey<br>in <span class='gold'>VIP Luxury</span>",
    "hero-desc": "Discover Turkey's most breathtaking historical wonders, ancient ruins, and natural beauty — all in premium comfort with your private guide.",
    "hero-btn1": "Explore VIP Tours", "hero-btn2": "Get a Free Quote",
    "stat1": "Happy Clients", "stat2": "Destinations", "stat3": "Years Experience",
    "scroll-down": "Scroll Down",
    "feat1-title": "Luxury Vehicles", "feat1-desc": "Mercedes Vito, Sprinter and VIP minibuses with A/C, Wi-Fi and refreshments",
    "feat2-title": "Private & Exclusive", "feat2-desc": "Fully personalized tours — no group tours, just you and your expert guide",
    "feat3-title": "Multilingual Guides", "feat3-desc": "English, German, Russian, Arabic speaking professional guides available",
    "feat4-title": "Airport Transfers", "feat4-desc": "24/7 VIP airport pickup and drop-off service across all Antalya region",
    "dest-tag": "Turkey's Wonders", "dest-title": "Iconic Destinations",
    "dest-desc": "From ancient cities to natural marvels — we take you to Turkey's most unforgettable places",
    "badge-pop": "Most Popular",
    "dest1-name": "Ephesus (Efes)", "dest1-loc": "📍 İzmir / Selçuk",
    "dest1-desc": "One of the best-preserved ancient cities in the world. Walk the same streets as the Romans — the Library of Celsus, the Grand Theatre, and the Temple of Artemis await.",
    "dest2-name": "Cappadocia", "dest2-loc": "📍 Nevşehir",
    "dest2-desc": "Fairy chimneys, underground cities, hot air balloons at sunrise. A landscape unlike anywhere on Earth.",
    "dest3-name": "Pamukkale", "dest3-loc": "📍 Denizli",
    "dest3-desc": "The famous white terraces of cotton-like calcium pools and the ancient spa city of Hierapolis — a UNESCO World Heritage Site.",
    "dest4-name": "Antalya Old City", "dest4-loc": "📍 Antalya",
    "dest4-desc": "Kaleiçi old town, Hadrian's Gate, Roman harbour, and the turquoise Mediterranean coast — history meets paradise.",
    "dest5-name": "Troy & Çanakkale", "dest5-loc": "📍 Çanakkale",
    "dest5-desc": "The legendary city of the Trojan War, the Gallipoli battlefields, and the Dardanelles Strait — history layered across millennia.",
    "dest6-name": "Istanbul", "dest6-loc": "📍 Istanbul",
    "dest6-desc": "Hagia Sophia, Topkapi Palace, the Grand Bazaar and the Bosphorus — the city where East meets West across two continents.",
    "dest7-name": "Perge & Aspendos", "dest7-loc": "📍 Antalya Region",
    "dest7-desc": "Magnificent Roman ruins on your doorstep — the ancient theatre of Aspendos is one of the best preserved in the world.",
    "dest8-name": "Konya & Mevlana", "dest8-loc": "📍 Konya",
    "dest8-desc": "The spiritual heart of Anatolia — home of the whirling dervishes, Mevlana Museum and the legacy of Rumi.",
    "dest-book": "Book This Tour",
    "tours-tag": "Exclusive Packages", "tours-title": "VIP Tour Packages",
    "tours-desc": "Carefully crafted luxury experiences with everything included — transport, guide, and unforgettable memories",
    "tour1-title": "Daily VIP Tours", "tour1-dur": "1 Day",
    "tour1-f1": "✓ Antalya Old City & Waterfalls", "tour1-f2": "✓ Perge & Aspendos Ruins",
    "tour1-f3": "✓ Side Ancient City", "tour1-f4": "✓ Pamukkale Day Trip",
    "tour1-f5": "✓ Lunch & refreshments included", "tour1-f6": "✓ Hotel pickup & drop-off",
    "tour2-title": "Multi-Day VIP Tours", "tour2-dur": "2 - 5 Days",
    "tour2-f1": "✓ Ephesus + Pamukkale (2 days)", "tour2-f2": "✓ Cappadocia Discovery (2-3 days)",
    "tour2-f3": "✓ Istanbul Cultural Tour (3 days)", "tour2-f4": "✓ Aegean Coast Explorer (5 days)",
    "tour2-f5": "✓ 4-5 star hotel accommodation", "tour2-f6": "✓ All meals & entrance fees",
    "tour3-title": "VIP Transfers", "tour3-dur": "Airport / Hotel / Port",
    "tour3-f1": "✓ Antalya Airport (AYT) transfers", "tour3-f2": "✓ Hotel to hotel transfers",
    "tour3-f3": "✓ Cruise port pickups", "tour3-f4": "✓ Mercedes Vito / Sprinter",
    "tour3-f5": "✓ Meet & greet with name sign", "tour3-f6": "✓ 24/7 availability",
    "badge-best": "Best Value", "tour-inquiry": "Send Inquiry",
    "book-tag": "Reserve Your Spot", "book-title": "Book Your VIP Tour",
    "book-desc": "Fill in the form and we will contact you within 2 hours with a personalized offer. All inquiries are free with no obligation.",
    "c-phone": "Phone / WhatsApp", "c-location": "Location", "c-loc-val": "Antalya, Turkey",
    "c-hours": "Working Hours", "c-hours-val": "24/7 Available",
    "wa-btn": "Chat on WhatsApp",
    "form-title": "Reservation Request",
    "form-name": "Full Name *", "form-country": "Country *",
    "form-email": "Email *", "form-phone": "Phone / WhatsApp *",
    "form-date": "Tour Date *", "form-persons": "Number of Persons *",
    "form-tour": "Tour / Destination *", "form-notes": "Special Requests / Notes",
    "form-submit": "Send Reservation Request",
    "form-note": "* We will respond within 2 hours via email or WhatsApp",
    "success-title": "Thank You!", "success-msg": "Your reservation request has been received. We will contact you within 2 hours.",
    "about-tag": "Who We Are", "about-title": "Son Nokta VIP — Your Trusted Travel Partner in Turkey",
    "about-p1": "Based in Antalya, Son Nokta VIP Tourism & Transportation has been providing premium travel services to international visitors for over a decade. We specialize in private, luxury tours that take you to Turkey's most iconic historical, cultural and natural wonders.",
    "about-p2": "Our team of experienced guides speaks English, German, Russian and Arabic, ensuring you feel comfortable and well-informed throughout your journey. We believe every traveller deserves a personalized, stress-free experience.",
    "about-badge": "Years of Excellence",
    "val1": "Safe & Licensed", "val2": "5-Star Service", "val3": "Luxury Vehicles", "val4": "Trusted by 500+ Guests",
    "about-cta": "Plan My Tour",
    "test-tag": "Guest Reviews", "test-title": "What Our Guests Say",
    "test1-text": '"Absolutely incredible experience. Our driver and guide was professional, punctual and very knowledgeable. The trip to Ephesus was the highlight of our Turkey holiday!"',
    "test2-text": '"Wir haben die Cappadocia-Tour gebucht und waren begeistert. Sehr professioneller Service, komfortables Fahrzeug und ein sehr freundlicher Fahrer. Absolut empfehlenswert!"',
    "test3-text": '"The Pamukkale tour was magical. Son Nokta handled everything perfectly — pickup from our hotel, the tour, lunch, everything. We will definitely book again next year!"',
    "foot-quick": "Quick Links", "foot-tours": "Popular Tours", "foot-contact": "Contact",
    "foot-transfer": "Airport Transfer",
    "footer-desc": "Premium VIP tours and transfers across Turkey. Based in Antalya, serving guests from around the world since 2015.",
    "footer-copy": "© 2025 Son Nokta VIP Tourism & Transportation. All rights reserved.",
    "footer-made": "Antalya, Turkey 🇹🇷"
  },
  tr: {
    "logo-sub": "VIP Turizm ve Taşımacılık",
    "nav-home": "Ana Sayfa", "nav-dest": "Destinasyonlar", "nav-tours": "VIP Turlar",
    "nav-services": "Hizmetler", "nav-about": "Hakkımızda", "nav-book": "Rezervasyon",
    "hero-tag": "Antalya, Türkiye",
    "hero-title": "Türkiye'yi<br><span class='gold'>VIP Lüksle</span> Keşfedin",
    "hero-desc": "Türkiye'nin en nefes kesici tarihi harikalarını, antik kalıntılarını ve doğal güzelliklerini — özel rehberinizle premium konforla keşfedin.",
    "hero-btn1": "VIP Turları Keşfet", "hero-btn2": "Ücretsiz Teklif Al",
    "stat1": "Mutlu Misafir", "stat2": "Destinasyon", "stat3": "Yıl Deneyim",
    "scroll-down": "Aşağı Kaydır",
    "feat1-title": "Lüks Araçlar", "feat1-desc": "Klima, Wi-Fi ve ikramlarla Mercedes Vito, Sprinter ve VIP minibüsler",
    "feat2-title": "Özel & Münhasır", "feat2-desc": "Tamamen kişiselleştirilmiş turlar — grup turu yok, sadece siz ve uzman rehberiniz",
    "feat3-title": "Çok Dilli Rehberler", "feat3-desc": "İngilizce, Almanca, Rusça, Arapça konuşan profesyonel rehberler",
    "feat4-title": "Havalimanı Transferi", "feat4-desc": "Antalya bölgesinde 7/24 VIP havalimanı karşılama ve bırakma hizmeti",
    "dest-tag": "Türkiye'nin Harikaları", "dest-title": "Efsanevi Destinasyonlar",
    "dest-desc": "Antik şehirlerden doğa harikalarına — Türkiye'nin en unutulmaz yerlerine sizi götürüyoruz",
    "badge-pop": "En Popüler",
    "dest1-name": "Efes", "dest1-loc": "📍 İzmir / Selçuk",
    "dest1-desc": "Dünyanın en iyi korunmuş antik şehirlerinden biri. Romalılarla aynı sokaklarda yürüyün — Celsus Kütüphanesi, Büyük Tiyatro ve Artemis Tapınağı sizi bekliyor.",
    "dest2-name": "Kapadokya", "dest2-loc": "📍 Nevşehir",
    "dest2-desc": "Peri bacaları, yeraltı şehirleri, gün doğumunda sıcak hava balonları. Yeryüzünde başka hiçbir yere benzemeyen bir manzara.",
    "dest3-name": "Pamukkale", "dest3-loc": "📍 Denizli",
    "dest3-desc": "Pamuk gibi kalsiyum havuzlarının ünlü beyaz terasları ve antik kaplıca şehri Hierapolis — UNESCO Dünya Mirası.",
    "dest4-name": "Antalya Kaleiçi", "dest4-loc": "📍 Antalya",
    "dest4-desc": "Kaleiçi eski şehir, Hadrian Kapısı, Roma limanı ve turkuaz Akdeniz kıyısı — tarih cenneti buluşturuyor.",
    "dest5-name": "Truva & Çanakkale", "dest5-loc": "📍 Çanakkale",
    "dest5-desc": "Truva Savaşı'nın efsanevi şehri, Gelibolu savaş alanları ve Çanakkale Boğazı — binlerce yıla yayılan tarih.",
    "dest6-name": "İstanbul", "dest6-loc": "📍 İstanbul",
    "dest6-desc": "Ayasofya, Topkapı Sarayı, Kapalıçarşı ve Boğaz — Doğu ile Batı'nın iki kıtada buluştuğu şehir.",
    "dest7-name": "Perge & Aspendos", "dest7-loc": "📍 Antalya Bölgesi",
    "dest7-desc": "Kapınızın önündeki muhteşem Roma kalıntıları — Aspendos antik tiyatrosu dünyanın en iyi korunmuş tiyatrolarından biridir.",
    "dest8-name": "Konya & Mevlana", "dest8-loc": "📍 Konya",
    "dest8-desc": "Anadolu'nun manevi kalbi — sema ayininin, Mevlana Müzesi'nin ve Hz. Mevlana'nın mirası.",
    "dest-book": "Bu Turu Rezerve Et",
    "tours-tag": "Özel Paketler", "tours-title": "VIP Tur Paketleri",
    "tours-desc": "Her şey dahil özenle hazırlanmış lüks deneyimler — ulaşım, rehber ve unutulmaz anılar",
    "tour1-title": "Günlük VIP Turlar", "tour1-dur": "1 Gün",
    "tour1-f1": "✓ Antalya Eski Şehir & Şelaleler", "tour1-f2": "✓ Perge & Aspendos Kalıntıları",
    "tour1-f3": "✓ Side Antik Kenti", "tour1-f4": "✓ Pamukkale Günübirlik",
    "tour1-f5": "✓ Öğle yemeği & ikramlar dahil", "tour1-f6": "✓ Otel alım & bırakma",
    "tour2-title": "Çok Günlük VIP Turlar", "tour2-dur": "2 - 5 Gün",
    "tour2-f1": "✓ Efes + Pamukkale (2 gün)", "tour2-f2": "✓ Kapadokya Keşfi (2-3 gün)",
    "tour2-f3": "✓ İstanbul Kültür Turu (3 gün)", "tour2-f4": "✓ Ege Kıyısı Keşfi (5 gün)",
    "tour2-f5": "✓ 4-5 yıldızlı otel konaklaması", "tour2-f6": "✓ Tüm yemekler & giriş ücretleri",
    "tour3-title": "VIP Transferler", "tour3-dur": "Havalimanı / Otel / Liman",
    "tour3-f1": "✓ Antalya Havalimanı (AYT) transferleri", "tour3-f2": "✓ Otel-otel transferleri",
    "tour3-f3": "✓ Kruvaziyer liman karşılamaları", "tour3-f4": "✓ Mercedes Vito / Sprinter",
    "tour3-f5": "✓ İsimli karşılama", "tour3-f6": "✓ 7/24 hizmet",
    "badge-best": "En İyi Değer", "tour-inquiry": "Bilgi Al",
    "book-tag": "Yerinizi Ayırtın", "book-title": "VIP Turunuzu Rezerve Edin",
    "book-desc": "Formu doldurun, 2 saat içinde size özel teklifimizle iletişime geçelim. Tüm sorgular ücretsiz ve bağlayıcı değildir.",
    "c-phone": "Telefon / WhatsApp", "c-location": "Konum", "c-loc-val": "Antalya, Türkiye",
    "c-hours": "Çalışma Saatleri", "c-hours-val": "7/24 Hizmetinizdeyiz",
    "wa-btn": "WhatsApp'tan Yazın",
    "form-title": "Rezervasyon Talebi",
    "form-name": "Ad Soyad *", "form-country": "Ülke *",
    "form-email": "E-posta *", "form-phone": "Telefon / WhatsApp *",
    "form-date": "Tur Tarihi *", "form-persons": "Kişi Sayısı *",
    "form-tour": "Tur / Destinasyon *", "form-notes": "Özel İstekler / Notlar",
    "form-submit": "Rezervasyon Talebi Gönder",
    "form-note": "* 2 saat içinde e-posta veya WhatsApp ile yanıt vereceğiz",
    "success-title": "Teşekkürler!", "success-msg": "Rezervasyon talebiniz alındı. 2 saat içinde sizinle iletişime geçeceğiz.",
    "about-tag": "Biz Kimiz", "about-title": "Son Nokta VIP — Türkiye'deki Güvenilir Seyahat Ortağınız",
    "about-p1": "Antalya merkezli Son Nokta VIP Turizm ve Taşımacılık, on yılı aşkın süredir uluslararası ziyaretçilere premium seyahat hizmetleri sunmaktadır. Türkiye'nin en ikonik tarihi, kültürel ve doğal harikalarına özel lüks turlar konusunda uzmanlaşıyoruz.",
    "about-p2": "Deneyimli rehber ekibimiz İngilizce, Almanca, Rusça ve Arapça konuşmaktadır. Her gezginin kişiselleştirilmiş, stressiz bir deneyim hak ettiğine inanıyoruz.",
    "about-badge": "Yıllık Mükemmellik",
    "val1": "Güvenli & Lisanslı", "val2": "5 Yıldızlı Hizmet", "val3": "Lüks Araçlar", "val4": "500+ Misafirin Güveni",
    "about-cta": "Turumu Planla",
    "test-tag": "Misafir Yorumları", "test-title": "Misafirlerimiz Ne Diyor",
    "test1-text": '"Kesinlikle inanılmaz bir deneyim. Sürücü ve rehberimiz profesyonel, dakik ve çok bilgiliydi. Efes gezisi Türkiye tatilimizin en güzel anıydı!"',
    "test2-text": '"Kapadokya turunu rezerve ettik ve büyülendik. Çok profesyonel hizmet, konforlu araç ve çok güler yüzlü bir sürücü. Kesinlikle tavsiye ederim!"',
    "test3-text": '"Pamukkale turu büyüleyiciydi. Son Nokta her şeyi mükemmel şekilde organize etti — otelimizden alınma, tur, öğle yemeği, her şey. Gelecek yıl tekrar rezervasyon yapacağız!"',
    "foot-quick": "Hızlı Linkler", "foot-tours": "Popüler Turlar", "foot-contact": "İletişim",
    "foot-transfer": "Havalimanı Transferi",
    "footer-desc": "Türkiye genelinde premium VIP turlar ve transferler. Antalya merkezli, 2015'ten bu yana dünya genelinden misafirlere hizmet veriyoruz.",
    "footer-copy": "© 2025 Son Nokta VIP Turizm ve Taşımacılık. Tüm hakları saklıdır.",
    "footer-made": "Antalya, Türkiye 🇹🇷"
  },
  de: {
    "logo-sub": "VIP Tourismus & Transport",
    "nav-home": "Startseite", "nav-dest": "Reiseziele", "nav-tours": "VIP Touren",
    "nav-services": "Leistungen", "nav-about": "Über uns", "nav-book": "Jetzt buchen",
    "hero-tag": "Antalya, Türkei",
    "hero-title": "Die Türkei im<br><span class='gold'>VIP-Luxus</span> erleben",
    "hero-desc": "Entdecken Sie die atemberaubendsten historischen Wunder, antiken Ruinen und die Naturschönheit der Türkei — in erstklassigem Komfort mit Ihrem Privatführer.",
    "hero-btn1": "VIP Touren entdecken", "hero-btn2": "Kostenloses Angebot",
    "stat1": "Zufriedene Gäste", "stat2": "Reiseziele", "stat3": "Jahre Erfahrung",
    "scroll-down": "Nach unten scrollen",
    "feat1-title": "Luxusfahrzeuge", "feat1-desc": "Mercedes Vito, Sprinter und VIP-Minibusse mit Klimaanlage, WLAN und Erfrischungen",
    "feat2-title": "Privat & Exklusiv", "feat2-desc": "Vollständig personalisierte Touren — keine Gruppenreisen, nur Sie und Ihr Expertenführer",
    "feat3-title": "Mehrsprachige Guides", "feat3-desc": "Professionelle Guides auf Englisch, Deutsch, Russisch und Arabisch verfügbar",
    "feat4-title": "Flughafentransfers", "feat4-desc": "24/7 VIP-Flughafenabholung und -abgabe in der gesamten Region Antalya",
    "dest-tag": "Wunder der Türkei", "dest-title": "Legendäre Reiseziele",
    "dest-desc": "Von antiken Städten bis hin zu Naturwundern — wir bringen Sie an die unvergesslichsten Orte der Türkei",
    "badge-pop": "Am beliebtesten",
    "dest1-name": "Ephesus (Efes)", "dest1-loc": "📍 İzmir / Selçuk",
    "dest1-desc": "Eine der am besten erhaltenen antiken Städte der Welt. Laufen Sie auf denselben Straßen wie die Römer — die Celsus-Bibliothek, das Große Theater und der Artemis-Tempel erwarten Sie.",
    "dest2-name": "Kappadokien", "dest2-loc": "📍 Nevşehir",
    "dest2-desc": "Feenschlote, unterirdische Städte, Heißluftballons bei Sonnenaufgang. Eine Landschaft wie nirgendwo sonst auf der Erde.",
    "dest3-name": "Pamukkale", "dest3-loc": "📍 Denizli",
    "dest3-desc": "Die berühmten weißen Terrassen der baumwollartigen Kalziumbecken und die antike Kurstadt Hierapolis — ein UNESCO-Weltkulturerbe.",
    "dest4-name": "Antalya Altstadt", "dest4-loc": "📍 Antalya",
    "dest4-desc": "Kaleiçi Altstadt, Hadrianstor, Römerhafen und die türkisfarbene Mittelmeerküste — Geschichte trifft Paradies.",
    "dest5-name": "Troja & Çanakkale", "dest5-loc": "📍 Çanakkale",
    "dest5-desc": "Die legendäre Stadt des Trojanischen Krieges, die Schlachtfelder von Gallipoli und die Dardanellen — Geschichte über Jahrtausende.",
    "dest6-name": "Istanbul", "dest6-loc": "📍 Istanbul",
    "dest6-desc": "Hagia Sophia, Topkapi-Palast, der Große Basar und der Bosporus — die Stadt, wo Ost und West auf zwei Kontinenten aufeinandertreffen.",
    "dest7-name": "Perge & Aspendos", "dest7-loc": "📍 Region Antalya",
    "dest7-desc": "Prächtige römische Ruinen direkt vor Ihrer Haustür — das antike Theater von Aspendos ist eines der besterhaltenen der Welt.",
    "dest8-name": "Konya & Mevlana", "dest8-loc": "📍 Konya",
    "dest8-desc": "Das spirituelle Herz Anatoliens — Heimat der Tanzenden Derwische, des Mevlana-Museums und des Erbes von Rumi.",
    "dest-book": "Diese Tour buchen",
    "tours-tag": "Exklusive Pakete", "tours-title": "VIP-Tourpakete",
    "tours-desc": "Sorgfältig gestaltete Luxuserlebnisse mit allem inklusive — Transport, Guide und unvergessliche Erinnerungen",
    "tour1-title": "Tages-VIP-Touren", "tour1-dur": "1 Tag",
    "tour1-f1": "✓ Antalya Altstadt & Wasserfälle", "tour1-f2": "✓ Perge & Aspendos Ruinen",
    "tour1-f3": "✓ Side Antike Stadt", "tour1-f4": "✓ Pamukkale Tagesausflug",
    "tour1-f5": "✓ Mittagessen & Erfrischungen inklusive", "tour1-f6": "✓ Hotel-Abholung & Rückfahrt",
    "tour2-title": "Mehrtägige VIP-Touren", "tour2-dur": "2 - 5 Tage",
    "tour2-f1": "✓ Ephesus + Pamukkale (2 Tage)", "tour2-f2": "✓ Kappadokien Entdeckung (2-3 Tage)",
    "tour2-f3": "✓ Istanbul Kulturreise (3 Tage)", "tour2-f4": "✓ Ägäis-Küsten-Explorer (5 Tage)",
    "tour2-f5": "✓ 4-5 Sterne Hotelunterkunft", "tour2-f6": "✓ Alle Mahlzeiten & Eintrittsgelder",
    "tour3-title": "VIP-Transfers", "tour3-dur": "Flughafen / Hotel / Hafen",
    "tour3-f1": "✓ Antalya Flughafen (AYT) Transfers", "tour3-f2": "✓ Hotel zu Hotel Transfers",
    "tour3-f3": "✓ Kreuzfahrthafen Abholungen", "tour3-f4": "✓ Mercedes Vito / Sprinter",
    "tour3-f5": "✓ Empfang mit Namensschild", "tour3-f6": "✓ 24/7 verfügbar",
    "badge-best": "Bestes Preis-Leistungs-Verhältnis", "tour-inquiry": "Anfrage senden",
    "book-tag": "Platz reservieren", "book-title": "Ihre VIP-Tour buchen",
    "book-desc": "Füllen Sie das Formular aus und wir melden uns innerhalb von 2 Stunden mit einem persönlichen Angebot. Alle Anfragen sind kostenlos und unverbindlich.",
    "c-phone": "Telefon / WhatsApp", "c-location": "Standort", "c-loc-val": "Antalya, Türkei",
    "c-hours": "Öffnungszeiten", "c-hours-val": "24/7 verfügbar",
    "wa-btn": "WhatsApp schreiben",
    "form-title": "Reservierungsanfrage",
    "form-name": "Vollständiger Name *", "form-country": "Land *",
    "form-email": "E-Mail *", "form-phone": "Telefon / WhatsApp *",
    "form-date": "Tourdatum *", "form-persons": "Personenanzahl *",
    "form-tour": "Tour / Reiseziel *", "form-notes": "Besondere Wünsche / Notizen",
    "form-submit": "Reservierungsanfrage senden",
    "form-note": "* Wir antworten innerhalb von 2 Stunden per E-Mail oder WhatsApp",
    "success-title": "Vielen Dank!", "success-msg": "Ihre Reservierungsanfrage ist eingegangen. Wir melden uns innerhalb von 2 Stunden.",
    "about-tag": "Wer wir sind", "about-title": "Son Nokta VIP — Ihr vertrauenswürdiger Reisepartner in der Türkei",
    "about-p1": "Mit Sitz in Antalya bietet Son Nokta VIP Tourismus & Transport seit über einem Jahrzehnt erstklassige Reisedienstleistungen für internationale Besucher an. Wir sind spezialisiert auf private Luxustouren zu den bekanntesten historischen, kulturellen und natürlichen Wundern der Türkei.",
    "about-p2": "Unser erfahrenes Führerteam spricht Englisch, Deutsch, Russisch und Arabisch, damit Sie sich während Ihrer Reise wohl und gut informiert fühlen.",
    "about-badge": "Jahre Exzellenz",
    "val1": "Sicher & Lizenziert", "val2": "5-Sterne-Service", "val3": "Luxusfahrzeuge", "val4": "Vertraut von 500+ Gästen",
    "about-cta": "Meine Tour planen",
    "test-tag": "Gästebewertungen", "test-title": "Was unsere Gäste sagen",
    "test1-text": '"Absolut unglaubliches Erlebnis. Unser Fahrer und Führer war professionell, pünktlich und sehr kenntnisreich. Der Ausflug nach Ephesus war der Höhepunkt unseres Türkeiurlaubs!"',
    "test2-text": '"Wir haben die Cappadocia-Tour gebucht und waren begeistert. Sehr professioneller Service, komfortables Fahrzeug und ein sehr freundlicher Fahrer. Absolut empfehlenswert!"',
    "test3-text": '"Die Pamukkale-Tour war magisch. Son Nokta hat alles perfekt organisiert — Abholung vom Hotel, die Tour, Mittagessen, alles. Wir werden nächstes Jahr definitiv wieder buchen!"',
    "foot-quick": "Schnelllinks", "foot-tours": "Beliebte Touren", "foot-contact": "Kontakt",
    "foot-transfer": "Flughafentransfer",
    "footer-desc": "Premium VIP-Touren und Transfers in der ganzen Türkei. Mit Sitz in Antalya, seit 2015 für Gäste aus aller Welt.",
    "footer-copy": "© 2025 Son Nokta VIP Tourismus & Transport. Alle Rechte vorbehalten.",
    "footer-made": "Antalya, Türkei 🇹🇷"
  },
  ru: {
    "logo-sub": "VIP Туризм и Трансфер",
    "nav-home": "Главная", "nav-dest": "Направления", "nav-tours": "VIP Туры",
    "nav-services": "Услуги", "nav-about": "О нас", "nav-book": "Забронировать",
    "hero-tag": "Анталья, Турция",
    "hero-title": "Откройте Турцию<br>в <span class='gold'>VIP Роскоши</span>",
    "hero-desc": "Откройте для себя самые захватывающие исторические достопримечательности, древние руины и природную красоту Турции — в премиальном комфорте с личным гидом.",
    "hero-btn1": "Смотреть VIP Туры", "hero-btn2": "Бесплатный расчёт",
    "stat1": "Довольных гостей", "stat2": "Направлений", "stat3": "Лет опыта",
    "scroll-down": "Листать вниз",
    "feat1-title": "Люксовые автомобили", "feat1-desc": "Mercedes Vito, Sprinter и VIP-минибусы с кондиционером, Wi-Fi и напитками",
    "feat2-title": "Частные туры", "feat2-desc": "Полностью персонализированные туры — никаких групп, только вы и ваш гид",
    "feat3-title": "Многоязычные гиды", "feat3-desc": "Профессиональные гиды на английском, немецком, русском и арабском языках",
    "feat4-title": "Трансфер из аэропорта", "feat4-desc": "VIP-трансфер из/в аэропорт 24/7 по всему региону Анталья",
    "dest-tag": "Чудеса Турции", "dest-title": "Знаковые направления",
    "dest-desc": "От древних городов до природных чудес — мы везём вас в самые незабываемые места Турции",
    "badge-pop": "Самый популярный",
    "dest1-name": "Эфес", "dest1-loc": "📍 Измир / Сельчук",
    "dest1-desc": "Один из лучших сохранившихся древних городов мира. Пройдите по тем же улицам, что и римляне — Библиотека Цельса, Большой театр и Храм Артемиды ждут вас.",
    "dest2-name": "Каппадокия", "dest2-loc": "📍 Невшехир",
    "dest2-desc": "Сказочные трубы, подземные города, воздушные шары на рассвете. Пейзаж, не похожий ни на что другое на Земле.",
    "dest3-name": "Памуккале", "dest3-loc": "📍 Денизли",
    "dest3-desc": "Знаменитые белые террасы с хлопкообразными кальциевыми бассейнами и древний спа-город Иераполис — объект Всемирного наследия ЮНЕСКО.",
    "dest4-name": "Старый город Анталья", "dest4-loc": "📍 Анталья",
    "dest4-desc": "Старый город Калейичи, ворота Адриана, римская гавань и лазурное средиземноморское побережье — история встречается с раем.",
    "dest5-name": "Троя и Чанаккале", "dest5-loc": "📍 Чанаккале",
    "dest5-desc": "Легендарный город Троянской войны, поля сражений Галлиполи и Дарданеллы — история, охватывающая тысячелетия.",
    "dest6-name": "Стамбул", "dest6-loc": "📍 Стамбул",
    "dest6-desc": "Собор Святой Софии, дворец Топкапы, Большой базар и Босфор — город, где Восток встречается с Западом на двух континентах.",
    "dest7-name": "Перге и Аспендос", "dest7-loc": "📍 Регион Анталья",
    "dest7-desc": "Великолепные римские руины у вашего порога — древний театр Аспендоса является одним из лучших сохранившихся в мире.",
    "dest8-name": "Конья и Мевляна", "dest8-loc": "📍 Конья",
    "dest8-desc": "Духовное сердце Анатолии — родина кружащихся дервишей, музея Мевляны и наследия Руми.",
    "dest-book": "Забронировать тур",
    "tours-tag": "Эксклюзивные пакеты", "tours-title": "VIP Турпакеты",
    "tours-desc": "Тщательно разработанные роскошные туры со всем включённым — транспорт, гид и незабываемые впечатления",
    "tour1-title": "Однодневные VIP-туры", "tour1-dur": "1 день",
    "tour1-f1": "✓ Старый город и водопады Антальи", "tour1-f2": "✓ Руины Перге и Аспендоса",
    "tour1-f3": "✓ Древний город Сиде", "tour1-f4": "✓ Однодневная поездка в Памуккале",
    "tour1-f5": "✓ Обед и напитки включены", "tour1-f6": "✓ Трансфер от/до отеля",
    "tour2-title": "Многодневные VIP-туры", "tour2-dur": "2 - 5 дней",
    "tour2-f1": "✓ Эфес + Памуккале (2 дня)", "tour2-f2": "✓ Открытие Каппадокии (2-3 дня)",
    "tour2-f3": "✓ Культурный тур по Стамбулу (3 дня)", "tour2-f4": "✓ Исследование Эгейского побережья (5 дней)",
    "tour2-f5": "✓ Проживание в 4-5 звёздочном отеле", "tour2-f6": "✓ Все питание и входные билеты",
    "tour3-title": "VIP-трансферы", "tour3-dur": "Аэропорт / Отель / Порт",
    "tour3-f1": "✓ Трансферы из аэропорта Анталья (AYT)", "tour3-f2": "✓ Трансферы между отелями",
    "tour3-f3": "✓ Встреча в круизном порту", "tour3-f4": "✓ Mercedes Vito / Sprinter",
    "tour3-f5": "✓ Встреча с табличкой с именем", "tour3-f6": "✓ Доступно 24/7",
    "badge-best": "Лучшее предложение", "tour-inquiry": "Отправить запрос",
    "book-tag": "Забронируйте место", "book-title": "Забронируйте VIP-тур",
    "book-desc": "Заполните форму, и мы свяжемся с вами в течение 2 часов с персональным предложением. Все запросы бесплатны и ни к чему не обязывают.",
    "c-phone": "Телефон / WhatsApp", "c-location": "Местонахождение", "c-loc-val": "Анталья, Турция",
    "c-hours": "Часы работы", "c-hours-val": "Доступно 24/7",
    "wa-btn": "Написать в WhatsApp",
    "form-title": "Запрос на бронирование",
    "form-name": "Полное имя *", "form-country": "Страна *",
    "form-email": "Эл. почта *", "form-phone": "Телефон / WhatsApp *",
    "form-date": "Дата тура *", "form-persons": "Количество человек *",
    "form-tour": "Тур / Направление *", "form-notes": "Особые пожелания / Примечания",
    "form-submit": "Отправить запрос на бронирование",
    "form-note": "* Мы ответим в течение 2 часов по электронной почте или WhatsApp",
    "success-title": "Спасибо!", "success-msg": "Ваш запрос на бронирование получен. Мы свяжемся с вами в течение 2 часов.",
    "about-tag": "Кто мы", "about-title": "Son Nokta VIP — Ваш надёжный партнёр по путешествиям в Турции",
    "about-p1": "Son Nokta VIP Туризм и Транспорт, базирующийся в Анталье, предоставляет премиальные туристические услуги международным гостям уже более десяти лет. Мы специализируемся на частных роскошных турах к самым знаковым историческим, культурным и природным чудесам Турции.",
    "about-p2": "Наша команда опытных гидов говорит на английском, немецком, русском и арабском языках, обеспечивая вам комфорт и полную информированность на протяжении всего путешествия.",
    "about-badge": "Лет совершенства",
    "val1": "Безопасно и лицензировано", "val2": "5-звёздочный сервис", "val3": "Роскошные автомобили", "val4": "Доверие 500+ гостей",
    "about-cta": "Спланировать тур",
    "test-tag": "Отзывы гостей", "test-title": "Что говорят наши гости",
    "test1-text": '"Абсолютно невероятный опыт. Наш водитель и гид был профессиональным, пунктуальным и очень осведомлённым. Поездка в Эфес стала изюминкой нашего отдыха в Турции!"',
    "test2-text": '"Мы заказали тур в Каппадокию и были в восторге. Очень профессиональный сервис, комфортный автомобиль и очень приветливый водитель. Абсолютно рекомендую!"',
    "test3-text": '"Тур в Памуккале был волшебным. Son Nokta организовал всё безупречно — трансфер из отеля, сам тур, обед, всё. Мы обязательно забронируем снова в следующем году!"',
    "foot-quick": "Быстрые ссылки", "foot-tours": "Популярные туры", "foot-contact": "Контакты",
    "foot-transfer": "Трансфер из аэропорта",
    "footer-desc": "Премиальные VIP-туры и трансферы по всей Турции. Базируемся в Анталье, обслуживаем гостей со всего мира с 2015 года.",
    "footer-copy": "© 2025 Son Nokta VIP Туризм и Транспорт. Все права защищены.",
    "footer-made": "Анталья, Турция 🇹🇷"
  }
};

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  applyTranslations(lang);
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });
}

// Mobile menu
function toggleMenu() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

// Sticky header shadow
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.4)' : 'none';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form submission (WhatsApp redirect)
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const country = form.country.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const date = form.date.value;
  const persons = form.persons.value;
  const tour = form.tour.value;
  const notes = form.notes.value;

  const msg = `Hello Son Nokta VIP! 👋\n\nNew Tour Request:\n👤 Name: ${name}\n🌍 Country: ${country}\n📧 Email: ${email}\n📞 Phone: ${phone}\n📅 Date: ${date}\n👥 Persons: ${persons}\n🗺️ Tour: ${tour}\n📝 Notes: ${notes || 'None'}`;

  // Show success message
  form.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';

  // Open WhatsApp after short delay
  setTimeout(() => {
    window.open('https://wa.me/905470600760?text=' + encodeURIComponent(msg), '_blank');
  }, 800);
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.dest-card, .tour-card, .test-card, .feature-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Set minimum date to today for date picker
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

// Initialize
setLang('en');
