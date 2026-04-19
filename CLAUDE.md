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
- **10 RU + 10 UZ + 7 EN + 1 Blog = 28 публичных HTML** (+ analytics/dash/404/review служебные)
- 2 CSS: `style.css` (главные), `subpage.css` (подстраницы)
- 2 JS: `script.js` (главные), `subpage.js` (подстраницы)
- Подстраницы: skupka-mebeli, skupka-mebeli-sssr, skupka-tehniki, kupit-holodilnik, kupit-stiralnuyu, kupit-posudomoechnuyu, kupit-mikrovolnovku, kupit-konditsioner, kupit-televizor, kupit-mebel, kupit-gazplitu, kupit-shkaf
- Блог: blog/kak-prodat-mebel-tashkent.html

## Правила работы
- После изменений — **всегда пушить** (`git add` + `git commit` + `git push`)
- 94% трафика мобильный — приоритет мобильная оптимизация
- При изменении адреса/телефона — менять во ВСЕХ 23 HTML + script.js + schema.org
- Не добавлять тяжёлые файлы (>500KB) в шапку/навбар
- Секция "Другие услуги" (catalog-nav) — добавлять на все подстраницы

## Автодеплой
- Push в main → GitHub Pages собирает сайт (~30-90 сек) → обновляется vseizdoma.store
- После каждого деплоя Telegram-уведомление в чат 5403400682 (через @mreferral_bot)
- Workflow: `.github/workflows/telegram-notify.yml`, триггер `workflow_run` на "pages build and deployment"
- Секреты в GitHub: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- Откат: GitHub Pages сам держит предыдущую версию если билд упадёт

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
- Schema.org на всех страницах (LocalBusiness, Service, FAQPage, BreadcrumbList, Product, Review, BlogPosting и др.)
- AggregateRating 5.0/17 + Review entries — **с видимым блоком на странице** (Google policy compliance)
- Google Search Console + Yandex Webmaster + Bing Webmaster Tools подключены
- GA4 Property ID: 526885505
- Microsoft Clarity ID: `wdhcx90w1t` (heatmaps + session recordings, на 34 публичных HTML)
- **Title до 55 символов** на всех страницах (не обрезаются на мобильных)
- **Description 135-160 символов** с телефоном на всех страницах
- Бренд "ВсёИзДома" / "VseIzDoma" (НЕ "VsyoIzDoma") — единое написание
- Подстраницы RU начинаются с "Куплю" (поисковое намерение)
- Главная RU: "ВсёИзДома —" первым (совпадает с запросом "все из дома")

## AEO (AI Engine Optimization)
- **Wikidata Q139396140** в `sameAs` на 3 главных (LocalBusiness + Organization)
- **alternateName массивы** на 3 главных (9 schema-блоков): VseIzDoma, Vse Iz Doma, Vsyo Iz Doma, Всё Из Дома, ВсёИзДома, Куплю Всё Из Дома, Kuplyu Vse Iz Doma, vseizdoma.store, vseizdoma
- **robots.txt** разрешает GPTBot, Claude-Web, Google-Extended (фикс 15.03.2026)
- **GBP короткая ссылка для CTA "отзывы":** `https://maps.app.goo.gl/LN59uJURUwJa7eXd9`
- При обновлении бизнес-данных (адрес/телефон) — **также обновлять в Wikidata** (https://www.wikidata.org/wiki/Q139396140)

## Google Indexing API
- Сервис-аккаунт добавлен как владелец в GSC (14 марта 2026)
- Можно отправлять URL на переиндексацию через `google.oauth2` + `indexing.googleapis.com/v3/urlNotifications:publish`
- 23 URL отправлены на переиндексацию 14 марта 2026

## Bing IndexNow (Bing/Yandex/Naver/Seznam/Yep)
- API ключ: `38beab8d753a4b6f94dc9c055f068492`
- Verification файл: `https://vseizdoma.store/38beab8d753a4b6f94dc9c055f068492.txt`
- Скрипт: `scripts/indexnow-submit.py` (директория в .gitignore, локально)
- Использование:
  - Все URL: `python scripts/indexnow-submit.py`
  - Конкретные: `python scripts/indexnow-submit.py "URL1" "URL2"`
- Лимит: 10 000 URL в день
- Endpoint: `https://api.indexnow.org/IndexNow`

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
- **18.04.2026** ⭐ МЕГА-СЕССИЯ AEO:
  - Reviews compliance fix: видимые блоки отзывов на 27 страницах (3 главных + 24 подстраниц), schema = visible 1-в-1
  - Removed self-serving reviews ("Business Automation", "Podderjka") с RU index
  - reviewCount 14→17 на 25 страницах, +6 новых GBP отзывов в schema
  - **Wikidata Q139396140 создан** + добавлен в sameAs на 3 главных
  - alternateName расширен (Kuplyu Vse Iz Doma, vseizdoma.store) — для ChatGPT/Claude/Gemini связи бренд↔домен
  - **FAQ schema синхронизирована с HTML на 31 странице** (rich snippets вернутся)
  - **Microsoft Clarity подключен** (ID wdhcx90w1t) на 34 страницах
  - **Bing IndexNow подключен** (ключ 38beab8d...), 36 URL отправлены
  - GBP CTA-кнопка с реальной короткой ссылкой `maps.app.goo.gl/LN59uJURUwJa7eXd9`
  - Бэкап-тег: `git tag backup-before-faq-fix` (для отката если что)
  - 70+ коммитов, всё запушено
- **19.03.2026**: mebelimport.store перенесён на GitHub Pages (Maks27428/mebelimport-website), HTTPS включён
- **18.03.2026**: Исправлена ошибка GSC 404 — speculationrules `"/*"` → `"/*.html"` на всех 27 HTML (Google сканировал `/*` буквально, источник: kupit-konditsioner.html)
- **18.03.2026**: Отправлены на индексацию 2 UZ-страницы: uz/kupit-gazplitu.html, uz/kupit-shkaf.html
- **17.03.2026**: Добавлены страницы kupit-shkaf.html (RU + UZ), отправлены на индексацию
- **17.03.2026**: Дубликат Google Business Profile удалён
- **15.03.2026**: Добавлены страницы kupit-gazplitu.html (RU + UZ)
- **14.03.2026**: CTR-оптимизация title/description на всех 23 страницах, 23 URL отправлены на переиндексацию
- **10.03.2026**: Адрес сменён на Abdurauf Fitrat ko'chasi 313 (26 файлов)
