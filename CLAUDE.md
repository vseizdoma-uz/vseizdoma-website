# CLAUDE.md — Инструкции для Claude Code

## Проект: vseizdoma.store
- Скупка и продажа б/у мебели и техники в Ташкенте
- GitHub: vseizdoma-uz/vseizdoma-website (GitHub Pages)
- Аккаунт для пуша: **vseizdoma-uz** (`gh auth switch --user vseizdoma-uz`)
- 3 языка: RU / UZ / EN
- Тёмная/светлая тема

## Контакты
- Телефон: +998 99 111 23 23 (Нариман)
- Адрес: Abdurauf Fitrat ko'chasi 313, Ташкент, 100060
- Координаты: 41.2735, 69.2824
- Партнёр: mebelimport.store (+998 77 129-99-55)

## Структура
- **8 RU + 8 UZ + 7 EN = 23 HTML**
- 2 CSS: `style.css` (главные), `subpage.css` (подстраницы)
- 2 JS: `script.js` (главные), `subpage.js` (подстраницы)
- Подстраницы: skupka-mebeli, skupka-tehniki, kupit-holodilnik, kupit-stiralnuyu, kupit-konditsioner, kupit-televizor, kupit-mebel

## Правила работы
- После изменений — **всегда пушить** (`git add` + `git commit` + `git push`)
- 94% трафика мобильный — приоритет мобильная оптимизация
- При изменении адреса/телефона — менять во ВСЕХ 23 HTML + script.js + schema.org
- Не добавлять тяжёлые файлы (>500KB) в шапку/навбар
- Секция "Другие услуги" (catalog-nav) — добавлять на все подстраницы

## Еженедельный план
- Каждую неделю **2 новые страницы** (RU + UZ)
- Добавлять в sitemap.xml, hreflang, footer-nav

## SEO
- Schema.org на всех страницах (LocalBusiness, Service, FAQPage, BreadcrumbList и др.)
- AggregateRating + Reviews — звёзды в выдаче
- Google Search Console + Yandex Webmaster подключены
- GA4 Property ID: 526885505

## Google Business Profile
- Профиль получен (10 марта 2026)
- TODO: удалить дубликат профиля
