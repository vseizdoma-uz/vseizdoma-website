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
- **10 RU + 10 UZ + 7 EN = 27 HTML**
- 2 CSS: `style.css` (главные), `subpage.css` (подстраницы)
- 2 JS: `script.js` (главные), `subpage.js` (подстраницы)
- Подстраницы: skupka-mebeli, skupka-tehniki, kupit-holodilnik, kupit-stiralnuyu, kupit-konditsioner, kupit-televizor, kupit-mebel, kupit-gazplitu, kupit-shkaf

## Правила работы
- После изменений — **всегда пушить** (`git add` + `git commit` + `git push`)
- 94% трафика мобильный — приоритет мобильная оптимизация
- При изменении адреса/телефона — менять во ВСЕХ 23 HTML + script.js + schema.org
- Не добавлять тяжёлые файлы (>500KB) в шапку/навбар
- Секция "Другие услуги" (catalog-nav) — добавлять на все подстраницы

## Еженедельный план
- Каждую неделю **2 новые страницы** (RU + UZ)
- Добавлять в sitemap.xml, hreflang, footer-nav

## План новых подстраниц (апрель-май 2026)

### Неделя 1 (10-16 апреля) — в работе
- **skupka-mebeli-sssr.html** (RU + UZ) — советская мебель, антиквариат
- Целевые: "продать мебель ссср", "скупка советской мебели", "старые вещи покупаем ташкент", "скупка антиквариата", "куплю стенку ссср"
- Контент: стенки, серванты, буфеты, полированные столы, что ценится дороже

### Неделя 2 (17-23 апреля)
- **kuplyu-vse-iz-doma.html** (RU + UZ) — главный брендовый запрос (157 показов/мес)
- Целевые: "куплю все из дома", "все из дома дорого", "покупаю все из дома"
- Контент: процесс, примеры работ, цены, FAQ

### Неделя 3 (24-30 апреля)
- **skupka-pri-pereezde.html** (RU + UZ)
- Целевые: "куплю все из дома и гаража ташкент", "выкуп квартиры", "скупка при переезде"

### Неделя 4 (1-7 мая)
- **skupka-posudy.html** (RU + UZ) — "куплю все из дома ташкент посуда" (уже поз 2.3, 15 показов)
- Целевые: "скупка посуды", "скупка хрусталя", "хрусталь посуда в ташкенте", "куплю чайный сервиз"

### Бонус-контент (блог-статьи)
1. "OLX vs скупка — что выгоднее?" (покрывает "куплю все из дома олх")
2. "Как продать советскую мебель в Ташкенте"
3. "Что можно продать из гаража: полный список"

### Идеи на май-июнь
- skupka-samarkand.html (если реально ездите)
- skupka-instrumentov.html
- skupka-kovrov.html
- skupka-kofemashin.html
- skupka-antikvariata.html (отдельно от мебели СССР)

## SEO
- Schema.org на всех страницах (LocalBusiness, Service, FAQPage, BreadcrumbList и др.)
- AggregateRating + Reviews — звёзды в выдаче
- Google Search Console + Yandex Webmaster подключены
- GA4 Property ID: 526885505
- **Title до 55 символов** на всех 23 страницах (не обрезаются на мобильных)
- **Description 135-160 символов** с телефоном на всех 23 страницах
- Бренд "ВсёИзДома" / "VseIzDoma" (НЕ "VsyoIzDoma") — единое написание
- Подстраницы RU начинаются с "Куплю" (поисковое намерение)
- Главная RU: "ВсёИзДома —" первым (совпадает с запросом "все из дома")

## Google Indexing API
- Сервис-аккаунт добавлен как владелец в GSC (14 марта 2026)
- Можно отправлять URL на переиндексацию через `google.oauth2` + `indexing.googleapis.com/v3/urlNotifications:publish`
- 23 URL отправлены на переиндексацию 14 марта 2026

## SEO-аудитор (агент)
- Агент `seo-qa-auditor` — полный SEO-аудит всех 23 HTML
- Путь: `C:/Users/Muslim/.claude/agents/seo-qa-auditor.md`
- Запускать **после создания/изменения HTML страниц** для проверки Schema.org, мета-тегов, ссылок и консистентности данных
- Проверяет: Schema.org JSON-LD, мета-теги, внутренние ссылки, контактные данные, hreflang, canonical, OG/Twitter Card

## Google Ads
- Google Ads **НЕ связан** с GA4 — ключевые слова показывают "(not set)"
- TODO: связать GA4 → Admin → Product Links → Google Ads Links → Link
- Реклама работала 8–15 марта: 2460 сессий Paid Search, 2212 Paid Social
- Без связки данные по ключевым словам доступны только в Google Ads напрямую

## mebelimport.store (партнёр)
- Репо: **Maks27428/mebelimport-website** (GitHub Pages)
- Локальные файлы: `D:/Rashad BOT/landing/`
- Домен верифицирован в аккаунте Maks27428, HTTPS включён

## Google Business Profile
- Профиль получен (10 марта 2026)
- Дубликат удалён (17 марта 2026)

## Changelog
- **19.03.2026**: mebelimport.store перенесён на GitHub Pages (Maks27428/mebelimport-website), HTTPS включён
- **18.03.2026**: Исправлена ошибка GSC 404 — speculationrules `"/*"` → `"/*.html"` на всех 27 HTML (Google сканировал `/*` буквально, источник: kupit-konditsioner.html)
- **18.03.2026**: Отправлены на индексацию 2 UZ-страницы: uz/kupit-gazplitu.html, uz/kupit-shkaf.html
- **17.03.2026**: Добавлены страницы kupit-shkaf.html (RU + UZ), отправлены на индексацию
- **17.03.2026**: Дубликат Google Business Profile удалён
- **15.03.2026**: Добавлены страницы kupit-gazplitu.html (RU + UZ)
- **14.03.2026**: CTR-оптимизация title/description на всех 23 страницах, 23 URL отправлены на переиндексацию
- **10.03.2026**: Адрес сменён на Abdurauf Fitrat ko'chasi 313 (26 файлов)
