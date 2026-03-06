# SEO-оптимизация сайта: Полное руководство

Практическое руководство на примере vseizdoma.store — мультиязычный сайт скупки мебели и техники в Ташкенте (RU/UZ/EN, GitHub Pages).

---

## Оглавление
1. [Структура проекта](#1-структура-проекта)
2. [On-Page SEO: мета-теги](#2-on-page-seo-мета-теги)
3. [Мультиязычность и hreflang](#3-мультиязычность-и-hreflang)
4. [Schema.org — структурированные данные](#4-schemaorg--структурированные-данные)
5. [Sitemap.xml и robots.txt](#5-sitemapxml-и-robotstxt)
6. [Core Web Vitals и производительность](#6-core-web-vitals-и-производительность)
7. [Локальное SEO](#7-локальное-seo)
8. [Контентные секции для ранжирования](#8-контентные-секции-для-ранжирования)
9. [Безопасность и технические сигналы](#9-безопасность-и-технические-сигналы)
10. [Чеклист перед деплоем](#10-чеклист-перед-деплоем)

---

## 1. Структура проекта

Типичная структура мультиязычного статического сайта:

```
/                        ← RU (основной язык)
  index.html
  skupka-mebeli.html
  skupka-tehniki.html
  kupit-holodilnik.html
  ...
  style.css              ← стили главных страниц
  subpage.css            ← стили подстраниц
  sitemap.xml
  robots.txt
  manifest.json
/uz/                     ← UZ версия
  index.html
  skupka-mebeli.html
  ...
/en/                     ← EN версия
  index.html
  skupka-mebeli.html
  ...
/images/
/promo/
```

**Правило:** Каждая языковая версия — зеркало структуры основного языка. Одинаковые имена файлов, одинаковые секции.

---

## 2. On-Page SEO: мета-теги

### 2.1 Обязательные мета-теги в `<head>`

```html
<head>
    <!-- Google Analytics — первым, чтобы не терять данные -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>

    <!-- DNS-prefetch для быстрой загрузки аналитики -->
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">

    <!-- Security мета-теги — Google учитывает безопасность -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Title: 50-60 символов, главный ключ + бренд -->
    <title>Скупка мебели б/у в Ташкенте — продать дорого | ВсёИзДома</title>

    <!-- Description: 150-160 символов, включить CTA и ключевые слова -->
    <meta name="description" content="Скупка б/у мебели в Ташкенте. Продать мебель дорого. Бесплатный выезд за 1-2 часа, оплата наличными. 8 лет на рынке.">

    <!-- Canonical URL — обязателен для каждой страницы -->
    <link rel="canonical" href="https://vseizdoma.store/skupka-mebeli.html">

    <!-- Robots -->
    <meta name="robots" content="index, follow, max-image-preview:large">

    <!-- Автор и гео -->
    <meta name="author" content="ВсёИзДома">
    <meta name="geo.region" content="UZ-TO">
    <meta name="geo.placename" content="Tashkent">
    <meta name="geo.position" content="41.2995;69.2401">
    <meta name="ICBM" content="41.2995, 69.2401">
    <meta name="language" content="ru">

    <!-- Keywords: 10-15 ключей через запятую -->
    <meta name="keywords" content="скупка мебели Ташкент, продать мебель б/у ...">
</head>
```

### 2.2 Open Graph (для Telegram, WhatsApp, Facebook)

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://vseizdoma.store/">
<meta property="og:title" content="Скупка мебели б/у в Ташкенте | ВсёИзДома">
<meta property="og:description" content="Продать б/у мебель дорого. Бесплатный выезд, оплата наличными.">
<meta property="og:image" content="https://vseizdoma.store/promo/banner2.png">
<meta property="og:image:width" content="1080">
<meta property="og:image:height" content="1080">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="ВсёИзДома">
```

**Важно:** Изображение OG должно быть минимум 1200x630px для красивого превью.

### 2.3 Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Скупка мебели б/у в Ташкенте | ВсёИзДома">
<meta name="twitter:description" content="Продать б/у мебель дорого. Бесплатный выезд.">
<meta name="twitter:image" content="https://vseizdoma.store/promo/banner2.png">
```

---

## 3. Мультиязычность и hreflang

### 3.1 hreflang-теги на КАЖДОЙ странице

```html
<!-- На ru/skupka-mebeli.html -->
<link rel="alternate" hreflang="ru" href="https://vseizdoma.store/skupka-mebeli.html">
<link rel="alternate" hreflang="uz" href="https://vseizdoma.store/uz/skupka-mebeli.html">
<link rel="alternate" hreflang="en" href="https://vseizdoma.store/en/skupka-mebeli.html">
<link rel="alternate" hreflang="x-default" href="https://vseizdoma.store/skupka-mebeli.html">
```

**Правила:**
- `x-default` указывает на основной язык (RU)
- Эти теги должны быть на ВСЕХ языковых версиях одной страницы
- Ссылки должны быть взаимными (A ссылается на B, B ссылается на A)
- `hreflang` влияет на показ правильной версии в разных странах

### 3.2 Атрибут lang на `<html>`

```html
<html lang="ru">   <!-- для RU -->
<html lang="uz">   <!-- для UZ -->
<html lang="en">   <!-- для EN -->
```

---

## 4. Schema.org — структурированные данные

Schema.org — главный инструмент для Rich Results (звёзды, FAQ, карточки в выдаче Google).

### 4.1 LocalBusiness (главная страница)

Самый важный блок для локального бизнеса. Даёт карточку в Google.

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ВсёИзДома — Скупка техники и мебели",
    "alternateName": "VseIzDoma",
    "inLanguage": "ru",
    "url": "https://vseizdoma.store",
    "telephone": "+998991112323",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lutufiy",
        "addressLocality": "Ташкент",
        "addressRegion": "Ташкент",
        "postalCode": "100131",
        "addressCountry": "UZ"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.2995,
        "longitude": 69.2401
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "09:00",
        "closes": "21:00"
    },
    "priceRange": "$$",
    "image": "https://vseizdoma.store/images/favicon.jpg",
    "description": "Скупка б/у мебели и бытовой техники в Ташкенте...",
    "foundingDate": "2018",
    "paymentAccepted": "Cash, Bank Transfer",
    "currenciesAccepted": "UZS, USD",
    "knowsLanguage": ["ru", "uz", "en"],
    "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 41.2995,
            "longitude": 69.2401
        },
        "geoRadius": "80000"
    },
    "sameAs": [
        "https://t.me/bu_iz_doma",
        "https://instagram.com/mebel.tashkent.77"
    ],
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "127"
    },
    "review": [
        {
            "@type": "Review",
            "author": {"@type": "Person", "name": "Азиз К."},
            "datePublished": "2026-02-15",
            "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
            "reviewBody": "Продал старую мебель при переезде. Приехали за 2 часа, заплатили сразу наличными."
        }
    ]
}
</script>
```

**aggregateRating** — даёт звёзды в поисковой выдаче. Огромный рост CTR (до +35%).

### 4.2 Service (подстраницы)

Каждая подстраница (skupka-mebeli.html и т.д.) получает свою Service schema:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Service",
    "inLanguage": "ru",
    "name": "Скупка мебели б/у в Ташкенте",
    "description": "Покупаем б/у мебель: диваны, шкафы, кровати...",
    "provider": {
        "@type": "LocalBusiness",
        "name": "ВсёИзДома",
        "telephone": "+998991112323",
        "url": "https://vseizdoma.store",
        "address": {"@type": "PostalAddress", "streetAddress": "Lutufiy", "addressLocality": "Ташкент", "addressCountry": "UZ"},
        "areaServed": [
            {"@type": "City", "name": "Ташкент"},
            {"@type": "City", "name": "Чирчик"},
            {"@type": "AdministrativeArea", "name": "Ташкентская область"}
        ]
    },
    "serviceType": "Скупка мебели б/у",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "127"
    }
}
</script>
```

### 4.3 FAQPage

Даёт выпадающие ответы прямо в Google:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "ru",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Какую мебель вы покупаете?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Покупаем диваны, кровати, шкафы, комоды..."
            }
        }
    ]
}
</script>
```

**Правило:** Текст в FAQ schema ДОЛЖЕН совпадать с текстом в видимых FAQ на странице. Иначе Google может расценить как спам.

### 4.4 VideoObject

Если есть видео на странице:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Как мы работаем — скупка техники",
    "description": "Реальное видео процесса работы...",
    "contentUrl": "https://vseizdoma.store/video.mp4",
    "thumbnailUrl": "https://vseizdoma.store/promo/thumb.png",
    "uploadDate": "2026-02-25T00:00:00+05:00",
    "duration": "PT1M"
}
</script>
```

### 4.5 BreadcrumbList (для подстраниц)

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Главная", "item": "https://vseizdoma.store/"},
        {"@type": "ListItem", "position": 2, "name": "Скупка мебели", "item": "https://vseizdoma.store/skupka-mebeli.html"}
    ]
}
</script>
```

### 4.6 WebSite (главная)

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ВсёИзДома",
    "alternateName": ["VseIzDoma", "Vsyo Iz Doma", "Всё Из Дома", "vseizdoma"],
    "url": "https://vseizdoma.store"
}
</script>
```

**alternateName как массив** — помогает Google связать разные написания бренда.

### 4.7 Organization

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ВсёИзДома",
    "url": "https://vseizdoma.store",
    "logo": "https://vseizdoma.store/images/favicon.jpg",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+998991112323",
        "contactType": "customer service",
        "availableLanguage": ["Russian", "Uzbek", "English"]
    },
    "sameAs": ["https://t.me/bu_iz_doma", "https://instagram.com/mebel.tashkent.77"]
}
</script>
```

### 4.8 SiteNavigationElement

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": ["Мебель", "Техника", "Холодильники"],
    "url": [
        "https://vseizdoma.store/skupka-mebeli.html",
        "https://vseizdoma.store/skupka-tehniki.html",
        "https://vseizdoma.store/kupit-holodilnik.html"
    ]
}
</script>
```

### Где размещать schema-блоки

- **Перед `</body>`** — рекомендуемое место
- Можно иметь несколько `<script type="application/ld+json">` на одной странице
- Каждый блок — отдельный JSON-объект

---

## 5. Sitemap.xml и robots.txt

### 5.1 sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Главная RU — максимальный приоритет -->
  <url>
    <loc>https://vseizdoma.store/</loc>
    <lastmod>2026-03-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- RU подстраницы — высокий приоритет -->
  <url>
    <loc>https://vseizdoma.store/skupka-mebeli.html</loc>
    <lastmod>2026-03-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- UZ/EN — средний приоритет -->
  <url>
    <loc>https://vseizdoma.store/uz/</loc>
    <lastmod>2026-03-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**Правила приоритетов:**
- `1.0` — главная страница основного языка
- `0.8` — подстраницы основного языка
- `0.7` — альтернативные языковые версии
- `changefreq: weekly` — для активно обновляемых страниц
- `changefreq: monthly` — для стабильных страниц
- `lastmod` — обновлять при каждом деплое (триггерит повторный краулинг)

### 5.2 robots.txt

```
User-agent: *
Allow: /

Sitemap: https://vseizdoma.store/sitemap.xml
```

---

## 6. Core Web Vitals и производительность

### 6.1 content-visibility (CSS)

Секции ниже первого экрана (fold) не нужно рендерить сразу:

```css
.seo-content,
.video-showcase,
.partner-promo,
.how-it-works {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px;
}
```

**Эффект:** Браузер пропускает рендер скрытых секций, ускоряя LCP.

### 6.2 Reduced Motion

Отключаем тяжёлые анимации для пользователей с настройкой в ОС:

```css
@media (prefers-reduced-motion: reduce) {
    .hero-blob { animation: none !important; }
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

### 6.3 Containment для анимированных элементов

```css
.hero-blob {
    contain: layout style paint;
}
```

**Эффект:** Браузер не пересчитывает layout всей страницы при каждом кадре анимации.

### 6.4 Speculationrules API (мгновенные переходы)

Добавить перед `</body>` на каждой странице:

```html
<script type="speculationrules">
{
    "prerender": [{"where": {"href_matches": "/*"}, "eagerness": "moderate"}],
    "prefetch": [{"where": {"href_matches": "/*"}, "eagerness": "moderate"}]
}
</script>
```

**Эффект:** При наведении на ссылку браузер начинает предзагрузку/пререндер. Переход ощущается мгновенным.

- `moderate` — начинает загрузку при hover (200ms)
- Поддерживается в Chrome 109+
- Для старых браузеров — просто игнорируется

### 6.5 Оптимизация загрузки шрифтов

```html
<!-- Preconnect к серверу шрифтов -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Асинхронная загрузка шрифта -->
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</noscript>
```

### 6.6 Оптимизация изображений

```html
<!-- Первое изображение — fetchpriority="high" -->
<img src="images/hero.jpg" alt="Описание" width="600" height="450" fetchpriority="high">

<!-- Остальные — lazy loading -->
<img src="images/product.jpg" alt="Описание" loading="lazy" width="400" height="250">
```

**Правила:**
- Всегда указывать `width` и `height` — предотвращает CLS (Cumulative Layout Shift)
- `fetchpriority="high"` — только для LCP-изображения (первое видимое)
- `loading="lazy"` — для всех изображений ниже fold
- Описательный `alt` с ключевыми словами

---

## 7. Локальное SEO

### 7.1 Google Maps embed

```html
<div class="contact-map">
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0!2d69.2401!3d41.2995..."
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="ВсёИзДома на карте">
    </iframe>
</div>
```

**Зачем:** Сигнал для Google о физическом расположении бизнеса. Помогает в Local Pack.

### 7.2 Гео мета-теги

```html
<meta name="geo.region" content="UZ-TO">
<meta name="geo.placename" content="Tashkent">
<meta name="geo.position" content="41.2995;69.2401">
<meta name="ICBM" content="41.2995, 69.2401">
```

### 7.3 Районы обслуживания с Place microdata

```html
<section class="districts-section" id="districts">
    <div class="container">
        <h2 class="section-title">Районы обслуживания в Ташкенте</h2>
        <div class="districts-grid">
            <div class="district-card" itemscope itemtype="https://schema.org/Place">
                <div class="district-name" itemprop="name">Чиланзар</div>
                <div class="district-desc">Выезд за 1 час</div>
            </div>
            <!-- ... остальные районы -->
        </div>
    </div>
</section>
```

**Зачем:** Усиливает локальные запросы типа "скупка мебели Юнусабад", "продать технику Чиланзар".

### 7.4 areaServed в LocalBusiness schema

```json
"areaServed": [
    {"@type": "City", "name": "Ташкент"},
    {"@type": "City", "name": "Чирчик"},
    {"@type": "AdministrativeArea", "name": "Ташкентская область"}
]
```

---

## 8. Контентные секции для ранжирования

### 8.1 Секция отзывов

Видимые отзывы на странице, которые соответствуют schema AggregateRating:

```html
<section class="reviews-section" id="reviews">
    <div class="container">
        <h2 class="section-title">Отзывы наших клиентов</h2>
        <div class="reviews-grid">
            <div class="review-card">
                <div class="review-stars">★★★★★</div>
                <p class="review-text">«Текст отзыва...»</p>
                <div class="review-author">
                    <div class="review-avatar">А</div>
                    <div class="review-author-info">
                        <span class="review-author-name">Имя Ф.</span>
                        <span class="review-author-date">15 февраля 2026</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="reviews-summary">
            <div class="reviews-summary-stars">★★★★★</div>
            <p class="reviews-summary-text">Средняя оценка 4.9 из 5 на основе 127 отзывов</p>
        </div>
    </div>
</section>
```

**Важно:** Google требует, чтобы AggregateRating schema отражала реальные видимые отзывы на странице. Нельзя ставить звёзды в schema без визуальных отзывов.

### 8.2 FAQ секция

```html
<section class="faq" id="faq">
    <div class="container">
        <h2 class="section-title">Частые вопросы</h2>
        <div class="faq-list">
            <details class="faq-item">
                <summary>Вопрос?</summary>
                <p>Ответ с ключевыми словами.</p>
            </details>
        </div>
    </div>
</section>
```

**Советы по FAQ:**
- 6-10 вопросов на страницу
- Включать ключевые слова естественно
- Добавить 1-2 вопроса на узбекском (для мультиязычного охвата)
- Текст в `<details>` ДОЛЖЕН совпадать с FAQPage schema

### 8.3 SEO-текст

```html
<section class="seo-content" id="services">
    <div class="container">
        <p>Длинный текст с ключевыми словами, районами, услугами...</p>
    </div>
</section>
```

**Правила:**
- 200-400 слов
- Естественное вхождение 5-10 ключевых слов
- Упомянуть географию (районы, город)
- Дублировать на втором языке (RU+UZ) для охвата

### 8.4 Дата обновления

```html
<div class="last-updated">
    <time datetime="2026-03-05">Обновлено: 5 марта 2026</time>
</div>
```

**Зачем:** Google ценит свежий контент. Тег `<time>` с `datetime` — семантическая разметка даты.

---

## 9. Безопасность и технические сигналы

### 9.1 Security мета-теги

```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```

### 9.2 DNS-prefetch

```html
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
```

Ускоряет DNS-резолв для внешних ресурсов.

### 9.3 Preconnect для шрифтов

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 9.4 HTTPS

Обязателен. GitHub Pages даёт бесплатно. Google отдаёт предпочтение HTTPS-сайтам.

---

## 10. Чеклист перед деплоем

### Мета-теги (каждая страница)
- [ ] `<title>` уникальный, 50-60 символов, с ключевым словом
- [ ] `<meta name="description">` уникальный, 150-160 символов
- [ ] `<link rel="canonical">` указывает на текущую страницу
- [ ] `<meta name="robots" content="index, follow">`
- [ ] Open Graph теги (og:title, og:description, og:image, og:url)
- [ ] Twitter Card теги
- [ ] hreflang теги для всех языковых версий
- [ ] `<html lang="xx">` соответствует языку
- [ ] dns-prefetch для внешних ресурсов
- [ ] Security meta (X-Content-Type-Options, Referrer-Policy)

### Schema.org
- [ ] LocalBusiness на главных (3 шт.)
- [ ] AggregateRating + Reviews в LocalBusiness
- [ ] Service на подстраницах (18 шт.)
- [ ] AggregateRating в Service
- [ ] FAQPage на страницах с FAQ
- [ ] VideoObject если есть видео
- [ ] BreadcrumbList на подстраницах
- [ ] WebSite с alternateName[]
- [ ] Organization с contactPoint
- [ ] SiteNavigationElement
- [ ] Проверить через [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Проверить через [Schema Markup Validator](https://validator.schema.org/)

### Производительность
- [ ] content-visibility на секциях ниже fold
- [ ] prefers-reduced-motion в CSS
- [ ] contain: layout style paint на анимациях
- [ ] Speculationrules перед `</body>`
- [ ] Изображения: width/height, lazy loading, fetchpriority
- [ ] Шрифты: preconnect + preload
- [ ] Проверить [PageSpeed Insights](https://pagespeed.web.dev/)

### Контент
- [ ] Секция отзывов на главных (RU/UZ/EN)
- [ ] Секция районов обслуживания
- [ ] FAQ с 6-10 вопросами
- [ ] SEO-текст с ключевыми словами
- [ ] `<time datetime>` дата обновления
- [ ] Описательные alt на всех `<img>`

### Локальное SEO
- [ ] Google Maps embed в контактах
- [ ] Гео мета-теги (geo.region, geo.position, ICBM)
- [ ] areaServed в LocalBusiness
- [ ] Place microdata на районах

### Файлы
- [ ] sitemap.xml с priority и changefreq
- [ ] robots.txt с Sitemap
- [ ] manifest.json для PWA
- [ ] favicon.ico / favicon.jpg

### Регистрации
- [ ] Google Search Console — отправить sitemap
- [ ] Google Analytics — проверить трекинг
- [ ] Yandex Webmaster — верификация

---

## Инструменты для проверки

| Инструмент | URL | Что проверяет |
|-----------|-----|--------------|
| Google Rich Results Test | search.google.com/test/rich-results | Schema.org, звёзды, FAQ |
| PageSpeed Insights | pagespeed.web.dev | Core Web Vitals, производительность |
| Schema Markup Validator | validator.schema.org | Валидность JSON-LD |
| Google Search Console | search.google.com/search-console | Индексация, ошибки, позиции |
| Mobile-Friendly Test | search.google.com/test/mobile-friendly | Мобильная адаптивность |
| Ahrefs/SEMrush | ahrefs.com / semrush.com | Позиции, конкуренты, бэклинки |

---

## Частые ошибки

1. **Дублированные title/description** — каждая страница должна быть уникальной
2. **AggregateRating без видимых отзывов** — Google может заблокировать Rich Results
3. **hreflang без взаимных ссылок** — если A→B, то B→A тоже обязательно
4. **Изображения без width/height** — вызывают CLS (Layout Shift)
5. **Слишком длинный title** — Google обрежет после ~60 символов
6. **schema отличается от видимого контента** — расценивается как спам
7. **Забыть обновить lastmod в sitemap** — Google не перекраулит страницу
8. **keywords мета-тег** — Google его игнорирует, но Yandex учитывает
