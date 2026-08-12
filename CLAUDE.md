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
- Workflow: `.github/workflows/telegram-notify.yml`, триггер `workflow_run` на `pages-build-deployment`
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
- Google Search Console + Yandex Webmaster подключены
- **Bing Webmaster Tools** верифицирован 30.05.2026 (meta tag, аккаунт businessaut222@gmail.com), sitemap переотправлен
- GA4 Property ID: 526885505
- Microsoft Clarity ID: `wdhcx90w1t` (heatmaps + session recordings, на 34 публичных HTML)
- **Title до 55 символов** на всех страницах (не обрезаются на мобильных)
- **Description 135-160 символов** с телефоном на всех страницах
- Бренд "ВсеИзДома" / "VseIzDoma" (НЕ "VsyoIzDoma") — единое написание
- Подстраницы RU начинаются с "Куплю" (поисковое намерение)
- Главная RU: "ВсеИзДома —" первым (совпадает с запросом "все из дома")

## AEO (AI Engine Optimization)
- **Wikidata Q139979277** в `sameAs` на 3 главных (LocalBusiness + Organization)
- **alternateName массивы** на 3 главных (9 schema-блоков): VseIzDoma, Vse Iz Doma, Vsyo Iz Doma, Все Из Дома, ВсеИзДома, Куплю Все Из Дома, Kuplyu Vse Iz Doma, vseizdoma.store, vseizdoma
- **robots.txt** разрешает GPTBot, Claude-Web, Google-Extended (фикс 15.03.2026)
- **GBP короткая ссылка для CTA "отзывы":** `https://maps.app.goo.gl/LN59uJURUwJa7eXd9`
- При обновлении бизнес-данных (адрес/телефон) — **также обновлять в Wikidata** (https://www.wikidata.org/wiki/Q139979277)

## Google Indexing API
- **Ключ (ПОСТОЯННОЕ место, не терять):** `~/.secrets/gen-lang-client-0396513680-fd0c81ba9a9d.json` (создан 28.07.2026; старые ключи в GCP не удалять — один зашит в Vercel ga-api-psi)
- Сервис-аккаунт добавлен как владелец в GSC (14 марта 2026)
- Можно отправлять URL на переиндексацию через `google.oauth2` + `indexing.googleapis.com/v3/urlNotifications:publish`
- 23 URL отправлены на переиндексацию 14 марта 2026
- ⚠️ Indexing API официально поддерживает только JobPosting/BroadcastEvent — для обычных страниц возвращает 200, но Google не обязан слушать. Надёжнее продублировать вручную: GSC → «Проверка URL» → «Запросить индексирование» (лимит ~10-12 URL/день)

## Как читать данные GSC (ВАЖНО — не наступать на грабли)
- ❌ **НЕ использовать `curl https://ga-api-psi.vercel.app/api/search-console` для свежих данных.** Этот эндпоинт не ставит `dataState` и **отстаёт на 2-3 дня** — последних дней в нём просто нет. Годится только для быстрого обзора за прошлый период.
- ✅ **Правильно — напрямую через GSC API сервис-аккаунтом** (тот же ключ `~/.secrets/gen-lang-client-*.json`, scope `webmasters.readonly`), обязательно с **`"dataState": "all"`** в теле запроса — иначе Google отдаёт только «финализированные» данные и режет последние 2-3 дня.
- Готовый скрипт: **`scripts/gsc.py`** (директория в .gitignore, живёт локально). Использование:
  - `python scripts/gsc.py sites` — список ресурсов
  - `python scripts/gsc.py <site> <start> <end> <dims> <limit>` — например `python scripts/gsc.py https://vseizdoma.store/ 2026-08-01 2026-08-10 date 100`
  - dims: `date` / `query` / `page` / `query,page` / `device`. Пустая строка = сводка за период.
- Если скрипта нет — воссоздать: `google.oauth2.service_account` + `build("searchconsole","v1")` + `searchanalytics().query(siteUrl=..., body={...,"dataState":"all"})`. Зависимости: `pip install google-auth google-api-python-client` (системный python3.9 их не содержит — ставить в venv).
- **Диагностика «страница просела»:** всегда брать срез `dimensions=["query","page"]` за оба периода. Падение средней позиции страницы часто означает, что её запросы перехватила более сильная страница — это успех, а не деградация (проверено 10.08.2026 на `skupka-mebeli`). Метрика успеха — клики и позиции конкретных запросов, НЕ средняя позиция.
- Проверка мобильного рендера: `resize_window` в Chrome **не меняет viewport** при fullscreen-окне. Мерить через iframe шириной 390px — в нём медиазапросы срабатывают честно.
- 🚫 **НЕ сравнивать показы / CTR / среднюю позицию через границу 27.04.2026.** Официальный баг GSC (support.google.com/webmasters/answer/9679690, раздел «April 3»): с 13.05.2025 по 27.04.2026 показы логировались **завышенно**, вместе с ними искажены CTR и средняя позиция. **Клики не затронуты — их можно сравнивать за любой период.** Следствия: (1) вывод старого аудита 19.06.2026 «55% показов на поз. 4–10» построен на грязных данных, не опираться; (2) «скачок 28.05 +98% показов» сравнивал май с раздутым апрелем — реальный рост был больше, но точную цифру не восстановить; (3) аудит 10.08.2026 (окна с мая по август) чист, его выводы валидны.
- Прочие аномалии GSC 2026 (Discover 07-08.05, 21.05, 24.06; Job listing 16-27.04; Bulk export 28.02 и 01.03) сайта не касаются — нет трафика из Discover, нет вакансий, Bulk export не используется. FAQ rich results отключены с 07.05.2026 — подтверждено официально.

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
- **10.08.2026** ⭐ **UZ-пакет: 13 страниц выровнены с RU.** Обнаружено, что всё углубление RU-подстраниц (батчи 10.06 / 19.06 / 21.06 / 13.07 / 28.07) **ни разу не переносилось на UZ** — UZ-версии были 52–69% от RU по количеству слов. Дефект системный и одинаковый: отсутствовали ровно 2 секции «эталона стиралки» — «От чего зависит цена X» (`advantages`, 6 карточек) и «Сколько стоит б/у X в Ташкенте» (`seo-text` + таблица цен), плюс FAQ короче на 2–5 вопросов и финальный seo-блок из 2 абзацев вместо 4–5. Перенесено на 13 страниц, **все 16 UZ теперь 81–111% от RU**. Отдельно: `uz/skupka-mebeli-sssr` перевёрстана с бэспоук-шаблона `arc-*` на стандартный (RU перевели 13.07, UZ забыли) — H1 «Davrdan omon qolgan mebel» → «Eski sovet mebelini va antikvariatni Toshkentda qimmat sotib olamiz», удалён мёртвый inline-CSS 98 строк и шрифты Cormorant Garamond + JetBrains Mono, FAQ 12→16. `uz/index` получил секцию цен `#prices` (перенос с RU-главной от 28.07). Попутно исправлено: дубль FAQ-вопроса в `uz/kupit-mebel` (в HTML и schema), орфография узбекской латиницы — 17 замен в 4 файлах (`trümo`→`tryumo`, `furnituralı`→`furniturali`, `garnituraları`→`garniturlari`, `tumbochaları`→`tumbochalari`; букв ü/ı в алфавите нет). Проверено: 390px без переполнения на всех 16, JSON-LD валиден, FAQ==FAQPage schema везде, все картинки существуют. Запушено + IndexNow (14 URL) + Google Indexing API (13 URL).
- **10.08.2026** **Аудит эффекта правок 28.07 по GSC** (11 дней до / 11 после). Клики +61% (165→266), показы +28%, CTR 5.1%→6.4%, **средняя позиция не изменилась (7.71→7.70)**. Вывод: сработала не ранжирующая, а **CTR-часть** пакета («дорого» в title, 5.0★ в description, блок цен) — главная 132→199 кликов при неизменной позиции 6.7. При этом позиции товарных подстраниц реально выросли (mikrovolnovku 11.9→7.8, tehniki 17.8→11.8, holodilnik 20.5→13.8, stiralnuyu 11.0→9.5). 8 августа — рекорд за всю историю: 32 клика / 413 показов; все 6 лучших дней приходятся на период после 29.07. **«Деградация» `skupka-mebeli` (поз. 14.7→30) оказалась ложной тревогой:** её запросы («скупка мебели ташкент», «скупка мебели», «куплю мебель дорого») перехватила главная и ранжируется по ним лучше — поз. 50→9, 40→8, 12→8. Суммарно мебельные запросы 10→29 кликов (+190%). Сама подстраница давала 0 кликов и до, и после. **Средняя позиция страницы — обманчивая метрика**, смотреть клики и позиции конкретных запросов. `kupit-posudomoechnuyu` тоже не деградировала: поз. 33.4→25.2 (улучшение).
- **28.07.2026 (3)** «eski»-фикс всех 13 существующих UZ-страниц (пакет 3 из аудита): «eski» стал главным ключом в title (все ≤55), H1 и первом слове description; «ishlatilgan» сохранён в теле как вторичный синоним. Затронуты uz/index + 10 товарных + skupka-mebeli/tehniki/sssr. H1 брендовой uz/kuplyu-vse-iz-doma не тронут. JSON-LD валиден. Запушено + IndexNow (17 UZ URL).
- **28.07.2026 (2)** Пакет 3, пара №1: созданы **skupka-posudy.html** (RU+UZ) и **skupka-kovrov.html** (RU+UZ) по эталону televizor. Посуда: хрусталь СССР/Bohemia, сервизы «Мадонна», фарфор ЛФЗ/Дулёво, мельхиор, самовары (запрос «куплю все из дома ташкент посуда» был на поз. 6.1 БЕЗ страницы). Ковры: ручная работа (иранские/туркменские/кавказские/бухарские), советские фабричные, паласы + гайд «как отличить ручную работу». Обе: таблица цен, «от чего зависит цена», 13 FAQ = FAQPage schema 1:1, Service+BreadcrumbList+Product+HowTo, оценка по фото в Telegram как CTA. **UZ-версии — первые с «eski» как главным ключом** в title/H1 (стратегия из аудита: спрос сидит на «eski», не «ishlatilgan»). Перелинковка: +2 пункта в nav/mobile всех 28 RU/UZ страниц (итого 15 пунктов), футеры главных, контекстные ссылки с карточек главной, sitemap 40→44 URL. Проверено: 390px без переполнения (все 4), JSON-LD валиден, FAQ==schema. Запушено + IndexNow.
- **28.07.2026** ⭐ Главная углублена по итогам 6-агентного SEO-аудита (on-page, schema, SERP, семантика, техничка, CTR) + сайтвайд-пакет ссылок. **Главная:** title → «ВсеИзДома — скупка мебели и техники б/у дорого, Ташкент» (55, добавлено «дорого»), description → «…5.0★ 17 отзывов…» (160, «выезд 1-2 часа» синхрон с FAQ), новая секция «Примерные цены скупки в Ташкенте» (#prices: таблица 8 позиций + «От чего зависит цена» + бренды), H2 «Наши услуги»→«Что мы покупаем: техника и мебель в Ташкенте», «Как это работает»→«Как продать мебель и технику в Ташкенте — 4 шага», карточка «8 лет опыта»→«Работаем с 2018 года», 6 seo-карточек получили ссылки-анкоры (holodilnik/stiralnuyu/konditsioner/televizor/gazplitu/**kuplyu-vse-iz-doma** — снятие каннибализации: главная=бренд-хаб, подстраница=точный запрос), карточка «Микроволновки»→kupit-mikrovolnovku, blog/kak-prodat впервые получил ссылки с главной (footer+контекст), rel="sponsored" на 3 ссылки mebelimport.store, дата «Обновлено» 28.07. **Сайтвайд:** пункт «📦 Куплю всё из дома» в nav+mobile-меню всех RU/UZ страниц (27 файлов); meta keywords удалён отовсюду (36 файлов); **favicon-фикс** — старый favicon.jpg 1059×1068 (не квадрат, риск отсутствия иконки в мобильной выдаче) → квадратные favicon-96/192/512.png + apple-touch-icon.png + /favicon.ico, manifest.json исправлен (заявленные размеры теперь совпадают). Выводы аудита: FAQ rich results отключены Google для всех с 07.05.2026, HowTo мёртв, звёзды self-serving не показываются — JSON-LD не расширять ради SERP, рычаг = видимый контент + новые точки входа (посуда, ковры, переезд, UZ «eski mebel», 8 недостающих EN-страниц). Проверено: 390px без переполнения, JSON-LD валиден. ⚠️ Ключ сервис-аккаунта Indexing API утерян (~/Downloads пуст) — reindex только IndexNow, скачать новый ключ из GCP.
- **13.07.2026** Углублены последние 2 RU-товарные страницы по эталону стиралки: `kupit-televizor` (телевизоры) и `skupka-mebeli-sssr` (советская мебель/антиквариат). Рецепт: бренд-бейдж «ВсеИзДома · Ташкент и область», «дорого» в H1, секция «От чего зависит цена», таблица цен, гайд, +FAQ (televizor 14, sssr 16) с синхроном FAQPage schema 1:1. ⚠️ **sssr перевёрстана** со старого бэспоук «архивного» премиум-дизайна (arc-* классы, кастомные шрифты, H1 без ключа) на стандартный `subpage.css`-шаблон — ради SEO-рычагов и консистентности; UZ-версия sssr пока осталась архивной (RU/UZ разошлись, синхронизировать позже). Обе: рендер 390px без переполнения, JSON-LD валиден. sitemap lastmod → 13.07. Запушено + Google reindex + IndexNow. Этим закрыт полный проход углубления всех RU-товарных подстраниц.
- **21.06.2026** Эксперимент 3-й батч: углублены `skupka-mebeli` (поз 21.8), `kupit-holodilnik` (17.5), `kupit-konditsioner` (21.4) по эталону стиралки. Причина расширения: 1-й батч подтвердился — стиралка/газ попали в топ роста Google (июнь: 270 кликов / 8.3K показов, +76% к маю). Берём застрявшие на поз 17–22 (показы растут, позиция не двигается). Запушено + Google reindex + IndexNow.
- **21.06.2026** AEO-дизамбигуация Instagram: Google AI Overview начал цитировать ВсеИзДома (название, сайт, телефон — верно), но цеплял ЧУЖОЙ Instagram (@kuplyu_vse_iz_doma) вместо официального. Причина: конкуренты держат фразу «куплю все из дома» в @-хэндле, а наш @mebel.tashkent.77 — нет. Фикс: в `llms.txt`+`llms-full.txt` явно прописана связка «официальный Instagram @mebel.tashkent.77 + телефон +998 99 111 23 23 = ВсеИзДома». Главную/schema не трогали (там sameAs+phone+contactPoint уже верные). Параллельно владелец правит имя/ссылку в самом Instagram-профиле (главный сигнал).
- **19.06.2026** Эксперимент на мёртвых страницах (2-й батч): углублены `kupit-mebel` (поз 18.5, 513 показов застряли) и `kupit-shkaf` (поз 10.2, 4 клика) по тому же рецепту. Запушено + Google reindex + IndexNow.
- **19.06.2026** Эксперимент на мёртвых страницах (1-й батч): углублены `kupit-mikrovolnovku`, `kupit-posudomoechnuyu`, `skupka-tehniki` по эталону стиралки (бренд «ВсеИзДома · Ташкент» в бейдж, «дорого» в H1, секция «От чего зависит цена», таблица цен, гайд, +4 FAQ + синхрон FAQPage schema, +абзацы seo-text). Логика: трогаем только дохлые (старые + застряли/падают + клики≈0), хорошие и растущие НЕ трогаем. Запушено, Google Indexing API + IndexNow. Проверить эффект ~через 2 нед.
- **19.06.2026** 3-месячный аудит (GSC API за 90д + git-таймлайн). Выводы: (1) **бренд «все из дома» = 72% кликов**, товарные запросы 28% но показов больше (висят на низких позициях); (2) **55% показов на поз 4–10** — главный рычаг подъёма; (3) **глубина контента → позиция** (углублённые stiralnuyu/gazplitu на поз 8–12, тонкие skupka-tehniki/posudomoechnuyu на 23–32); (4) скачок 28.05 (+98% показов) = дозревание апрельской AI-разблокировки + майский AEO-заход (Wikidata, llms.txt, дизамбигуация, бренд-страница).
- **19.06.2026** Подключён **Google Indexing API** для переиндексации: сервис-аккаунт `mamed-bookkeeping@gen-lang-client-0396513680` (Owner в GSC обоих сайтов), скрипт-паттерн `reindex.py`. Ключ: `~/Downloads/gen-lang-client-0396513680-3ca6df9ab4fc.json`. См. память google-indexing-api-setup.
- **10.06.2026** Углублены `kupit-stiralnuyu` + `kupit-gazplitu` до уровня главной (контент: «от чего зависит цена», таблица цен, гайд, +4 FAQ) + бренд «ВсеИзДома» в hero-бейдж и «дорого» в H1 (research-based: H1 ключ-первый, бренд в бейдж, «дорого» = CTR-модификатор). Эффект по GSC: показы +25–40%, позиция ↑ (стиралка 9.7→8.5, плита 12.2→9.9).
- **04.06.2026** Мобилка: убран горизонтальный сдвиг ~11px (`.contact-map min-width` на мобиле) + скрыта плашка «Элитная мебель» (`.side-tab`) — только @media ≤768px, десктоп не тронут.
- **29.05.2026** SEO Round 3:
  - **Wikidata Q139979277** полностью заполнен: EN labels/aliases + 8 claims (instance of, country, located in, official website, phone, industry, inception 2018, coordinates, operating area)
  - Старый ID Q139396140 (удалён) заменён на Q139979277 в 6 файлах
  - Новая блог-статья: `blog/skolko-stoit-mebel-tashkent.html` — гид по ценам б/у мебели и техники 2026
  - Privacy Policy ссылка добавлена в футеры всех 28 подстраниц (RU/UZ/EN/blog)
- **29.05.2026** SEO Round 2:
  - JS минифицирован: script.js 48KB→39KB, subpage.js 6.4KB→4.2KB (исходники .src.js)
  - Создана **privacy-policy.html** (E-E-A-T сигнал доверия)
  - Ссылка на Privacy Policy в футере 3 главных страниц
  - Cache-bust обновлён v=20260529 на 34 HTML файлах
  - sitemap.xml обновлён: lastmod на 3 главных, добавлен privacy-policy.html
- **29.05.2026** SEO+AEO улучшения:
  - Создан **llms.txt + llms-full.txt** (новый стандарт для AI-краулеров — Claude, Gemini, Perplexity)
  - `<link rel="help" href="/llms.txt">` добавлен в `<head>` 3 главных страниц
  - sameAs расширен Google Maps ссылкой на 6 schema-блоках (3 страницы × 2 блока)
  - Google Maps iframe получил `width="100%" height="300"` (фикс CLS на 3 страницах)
  - robots.txt: добавлены Amazonbot, Bytespider, cohere-ai + комментарии к llms.txt
  - Бэкап-тег: `backup-before-seo-improvements-2026-05-29`
- **18.04.2026** ⭐ МЕГА-СЕССИЯ AEO:
  - Reviews compliance fix: видимые блоки отзывов на 27 страницах (3 главных + 24 подстраниц), schema = visible 1-в-1
  - Removed self-serving reviews ("Business Automation", "Podderjka") с RU index
  - reviewCount 14→17 на 25 страницах, +6 новых GBP отзывов в schema
  - **Wikidata Q139979277 создан** + добавлен в sameAs на 3 главных
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
