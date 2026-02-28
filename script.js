// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Проверяем сохранённую тему
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Боковая панель mebelimport
const sideTab = document.getElementById('sideTab');
const sidePanel = document.getElementById('sidePanel');
const sidePanelClose = document.getElementById('sidePanelClose');
const sidePanelOverlay = document.getElementById('sidePanelOverlay');

function openSidePanel() {
    sidePanel.classList.add('open');
    sidePanelOverlay.classList.add('open');
    sideTab.classList.add('hidden');
}

function closeSidePanel() {
    sidePanel.classList.remove('open');
    sidePanelOverlay.classList.remove('open');
    sideTab.classList.remove('hidden');
}

setTimeout(() => sideTab.classList.add('pulse'), 2000);
sideTab.addEventListener('animationend', () => sideTab.classList.remove('pulse'));

sideTab.addEventListener('click', openSidePanel);
sidePanelClose.addEventListener('click', closeSidePanel);
sidePanelOverlay.addEventListener('click', closeSidePanel);

// Фильтрация галереи по табам
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        galleryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Переключение языка
const langBtns = document.querySelectorAll('.lang-btn');

const translations = {
    ru: {
        heroTitle: '<span class="highlight">Куплю</span> всё из дома',
        heroSubtitle: 'Скупка бытовой техники по лучшим ценам.<br>Быстрый выезд, честная оценка, оплата сразу!',
        heroBadge: 'Ташкент и область',
        aboutTitle: '8 лет на рынке Ташкента',
        galleryTitle: 'Наши услуги',
        tabAll: 'Все',
        tabTech: 'Техника',
        tabFurniture: 'Мебель',
        tabInterior: 'Интерьер',
        howItWorksTitle: 'Как это работает',
        step1: 'Позвоните нам',
        step1Desc: 'Свяжитесь с нами любым удобным способом',
        step2: 'Опишите технику',
        step2Desc: 'Расскажите, что хотите продать',
        step3: 'Получите оценку',
        step3Desc: 'Мы назовём предварительную цену',
        step4: 'Получите деньги',
        step4Desc: 'Заберём технику и оплатим на месте',
        promoBadge: 'Наш партнёрский проект',
        promoTitle: 'Покупаем дорого импортную элитную мебель',
        promoDesc: 'Есть импортная мебель барокко, рококо, классика? Мы купим её дорого! Оценка за 30 минут, быстрый выезд, оплата на месте.',
        promoFeat1: 'Оценка за 30 минут по фото',
        promoFeat2: 'Быстрый выезд на осмотр',
        promoFeat3: 'Оплата наличными и переводом',
        promoBtn: 'Перейти на сайт',
        sideTabText: 'Элитная мебель',
        sidePanelTitle: 'Покупаем дорого импортную мебель',
        sidePanelDesc: 'Барокко, рококо, классика — оценим за 30 минут и купим по лучшей цене!',
        sidePanelFeat1: '⏱️ Оценка за 30 минут',
        sidePanelFeat2: '🚗 Быстрый выезд',
        sidePanelFeat3: '💰 Оплата на месте',
        sidePanelBtn: 'Перейти на сайт →',
        contactTitle: 'Свяжитесь с нами',
        location: 'ул. Lutufiy, Ташкент, 100131',
        schedule: 'Ежедневно: 9:00 — 21:00',
        callNow: 'Позвонить сейчас',
        motto: 'Честно • Быстро • Выгодно',
        scrollMore: 'Подробнее',
        videoHeading: 'Смотрите<br><span class="highlight">как мы работаем</span>',
        videoDesc: 'Быстро, честно и удобно. Нажмите play и убедитесь сами!',
        videoFeat1: 'Реальная работа',
        videoFeat2: 'Без постановки',
        videoFeat3: 'Как есть',
        seoTitle: 'Скупка техники и мебели в Ташкенте',
        seoCard1Title: 'Скупка бытовой техники',
        seoCard1Text: 'Покупаем б/у технику в Ташкенте и области: холодильники, стиральные машины, кондиционеры, телевизоры, газовые плиты, микроволновки и другую бытовую технику. Принимаем технику любых марок — Samsung, LG, Bosch, Artel, Atlant и другие. Оценка по рыночным ценам, выезд в день обращения.',
        seoCard2Title: 'Скупка мебели б/у',
        seoCard2Text: 'Куплю мебель б/у в Ташкенте: диваны, кровати, шкафы, столы, стулья, кресла, комоды и кухонные гарнитуры. Покупаем как отечественную, так и импортную мебель. Если вы переезжаете или делаете ремонт — мы заберём всё сами и оплатим на месте наличными или переводом.',
        seoCard3Title: 'Продать технику и мебель быстро',
        seoCard3Text: 'Хотите быстро продать б/у технику или мебель в Ташкенте? Звоните — приедем за 1-2 часа, оценим честно и заплатим сразу. Никакого ожидания покупателей на OLX, никаких торгов. Мы работаем 8 лет и знаем реальные цены на вторичном рынке Ташкента.',
        seoCard4Title: 'Вывоз старой техники и мебели',
        seoCard4Text: 'Бесплатный вывоз техники и мебели при скупке. Работаем по всему Ташкенту и Ташкентской области — Чирчик, Алмалык, Ангрен, Нурафшон. Грузчики, транспорт, демонтаж — всё берём на себя. Вам нужно только позвонить по номеру +998 99 111 23 23.',
        seoCard5Title: 'Куплю холодильник б/у в Ташкенте',
        seoCard5Text: 'Скупаем холодильники б/у всех марок: Samsung, LG, Bosch, Indesit, Artel, Atlant, Beko. Однокамерные, двухкамерные, side-by-side — покупаем любые в рабочем состоянии. Куплю холодильник б/у дорого с выездом на дом. Оценка бесплатно, оплата сразу наличными.',
        seoCard6Title: 'Куплю стиральную машину б/у',
        seoCard6Text: 'Покупаем стиральные машины б/у в Ташкенте: автомат, полуавтомат, с вертикальной и фронтальной загрузкой. Samsung, LG, Artel, Bosch, Indesit и другие марки. Продать стиральную машину б/у можно за 1 час — звоните, приедем и заплатим на месте.',
        seoCard7Title: 'Скупка кондиционеров б/у',
        seoCard7Text: 'Куплю кондиционер б/у в Ташкенте — настенные сплит-системы, напольные, кассетные. Покупаем кондиционеры Artel, Samsung, LG, Midea, Haier, Gree, Cooper&Hunter. Демонтаж кондиционера за наш счёт. Скупка кондиционеров дорого с выездом по всему городу.',
        seoCard8Title: 'Куплю дорого мебель в Ташкенте',
        seoCard8Text: 'Куплю дорого б/у мебель — спальные гарнитуры, гостиные, прихожие, кухонные гарнитуры. Особенно ценим импортную элитную мебель: итальянскую, турецкую, малайзийскую. Мебель в стиле барокко, рококо, классика — покупаем по максимальным ценам. Выезд оценщика бесплатно.',
        seoCard9Title: 'Скупка стройматериалов б/у',
        seoCard9Text: 'Покупаем б/у стройматериалы в Ташкенте: двери, окна, сантехнику, радиаторы, трубы, ламинат, плитку и другие материалы после ремонта или демонтажа. Скупка стройматериалов по выгодным ценам — не выбрасывайте, продайте нам! Вывезем сами.',
        seoCard10Title: 'Куплю телевизор б/у Ташкент',
        seoCard10Text: 'Скупаем телевизоры б/у: LED, Smart TV, UHD 4K, OLED. Покупаем телевизоры Samsung, LG, Sony, Artel, Shivaki и другие марки. Куплю телевизор б/у в Ташкенте дорого — от 32 до 75 дюймов. Приедем, проверим, заплатим сразу.',
        seoCard11Title: 'Куплю газовую плиту б/у',
        seoCard11Text: 'Покупаем газовые и электрические плиты б/у в Ташкенте. Artel, Shivaki, Indesit, Bosch, Gefest — любые марки и модели. Продать газовую плиту б/у легко — один звонок и мы приедем с оплатой. Также покупаем духовые шкафы и варочные панели.',
        seoCard12Title: 'Скупка мебели и техники при переезде',
        seoCard12Text: 'Переезжаете и не хотите везти старую мебель и технику? Мы выкупим всё за один визит: мебель, бытовую технику, стройматериалы. Скупка при переезде — быстро, выгодно, без хлопот. Работаем по всему Ташкенту, Чирчику, Алмалыку, Нурафшону.',
        seoCard13Title: 'Скупка мебели по районам Ташкента',
        seoCard13Text: 'Работаем по всем районам Ташкента: Чиланзар, Юнусабад, Мирзо Улугбек, Сергели, Яшнабад, Мирабад, Шайхантаур, Алмазар, Учтепа, Бектемир. Скупка б/у мебели и техники в вашем районе — выезд за 1-2 часа. Звоните: +998 99 111 23 23.',
        faqTitle: 'Частые вопросы',
        faq1Q: 'Какую технику вы покупаете?',
        faq1A: 'Мы покупаем холодильники, стиральные машины, кондиционеры, телевизоры, газовые и электрические плиты, микроволновые печи, посудомоечные машины и другую бытовую технику в рабочем состоянии.',
        faq2Q: 'Какую мебель вы скупаете?',
        faq2A: 'Покупаем диваны, кровати, шкафы, комоды, столы, стулья, кресла, кухонные гарнитуры, прихожие. Особенно ценим импортную элитную мебель — барокко, рококо, классика.',
        faq3Q: 'Как быстро вы приедете?',
        faq3A: 'По Ташкенту — в течение 1-2 часов после звонка. По области — в тот же день или на следующий день, в зависимости от времени обращения.',
        faq4Q: 'Как происходит оплата?',
        faq4A: 'Оплачиваем на месте сразу после осмотра и согласования цены. Принимаем наличные (сум, доллар) и безналичный перевод на карту.',
        faq5Q: 'Вы покупаете нерабочую технику?',
        faq5A: 'Да, покупаем технику в нерабочем состоянии, но по сниженной цене. Холодильники, стиральные машины, кондиционеры — даже если не работают, мы можем их выкупить. Звоните для оценки.',
        faq6Q: 'Скупаете ли вы стройматериалы?',
        faq6A: 'Да, покупаем б/у стройматериалы: двери, окна, сантехнику, радиаторы, ламинат, плитку, трубы и другие материалы после ремонта или демонтажа.',
        faq7Q: 'В каких районах Ташкента вы работаете?',
        faq7A: 'Работаем по всему Ташкенту: Чиланзар, Юнусабад, Мирзо Улугбек, Сергели, Яшнабад, Мирабад, Шайхантаур, Алмазар, Учтепа, Бектемир. Также выезжаем в Чирчик, Алмалык, Ангрен, Нурафшон.',
        faq8Q: 'Сколько стоит вывоз мебели и техники?',
        faq8A: 'Вывоз бесплатный при скупке. Мы приезжаем со своими грузчиками и транспортом. Демонтаж мебели и кондиционеров тоже за наш счёт.',
        faq9Q: 'Как продать холодильник б/у в Ташкенте?',
        faq9A: 'Позвоните нам по номеру +998 99 111 23 23, опишите марку и состояние. Мы назовём примерную цену, приедем, осмотрим и заплатим на месте. Весь процесс — 1-2 часа.',
        faq10Q: 'Покупаете ли вы элитную импортную мебель?',
        faq10A: 'Да, это наша специализация! Покупаем дорого итальянскую, турецкую, малайзийскую мебель. Барокко, рококо, классика — оцениваем по максимуму.',
        faq11Q: 'Можно ли продать всю квартиру сразу — мебель и технику?',
        faq11A: 'Конечно! При переезде мы выкупим всё за один визит: мебель, технику, стройматериалы. Удобнее и быстрее чем продавать по отдельности на OLX.'
    },
    uz: {
        heroTitle: 'Uydan <span class="highlight">hammani</span> sotib olaman',
        heroSubtitle: 'Maishiy texnikani eng yaxshi narxlarda sotib olish.<br>Tez chiqish, halol baho, darhol to\'lov!',
        heroBadge: 'Toshkent va viloyat',
        aboutTitle: 'Toshkent bozorida 8 yil',
        galleryTitle: 'Bizning xizmatlar',
        tabAll: 'Hammasi',
        tabTech: 'Texnika',
        tabFurniture: 'Mebel',
        tabInterior: 'Interer',
        howItWorksTitle: 'Bu qanday ishlaydi',
        step1: 'Bizga qo\'ng\'iroq qiling',
        step1Desc: 'Qulay usulda biz bilan bog\'laning',
        step2: 'Texnikani tasvirlang',
        step2Desc: 'Nimani sotmoqchi ekanligingizni ayting',
        step3: 'Baho oling',
        step3Desc: 'Dastlabki narxni aytamiz',
        step4: 'Pul oling',
        step4Desc: 'Texnikani olib ketamiz va joyida to\'laymiz',
        promoBadge: 'Hamkor loyihamiz',
        promoTitle: 'Import elit mebelni qimmat sotib olamiz',
        promoDesc: 'Import mebel — barokko, rokoko, klassika bormi? Biz uni qimmat sotib olamiz! 30 daqiqada baholash, tez chiqish, joyida to\'lov.',
        promoFeat1: 'Foto orqali 30 daqiqada baholash',
        promoFeat2: 'Tez chiqish ko\'rikka',
        promoFeat3: 'Naqd va o\'tkazma orqali to\'lov',
        promoBtn: 'Saytga o\'tish',
        sideTabText: 'Elit mebel',
        sidePanelTitle: 'Import mebelni qimmat sotib olamiz',
        sidePanelDesc: 'Barokko, rokoko, klassika — 30 daqiqada baholaymiz va eng yaxshi narxda sotib olamiz!',
        sidePanelFeat1: '⏱️ 30 daqiqada baholash',
        sidePanelFeat2: '🚗 Tez chiqish',
        sidePanelFeat3: '💰 Joyida to\'lov',
        sidePanelBtn: 'Saytga o\'tish →',
        contactTitle: 'Biz bilan bog\'laning',
        location: 'Lutufiy ko\'chasi, Toshkent, 100131',
        schedule: 'Har kuni: 9:00 — 21:00',
        callNow: 'Hozir qo\'ng\'iroq qilish',
        motto: 'Halol • Tez • Foydali',
        scrollMore: 'Batafsil',
        videoHeading: 'Ko\'ring<br><span class="highlight">qanday ishlaymiz</span>',
        videoDesc: 'Tez, halol va qulay. Play bosing va o\'zingiz ishonch hosil qiling!',
        videoFeat1: 'Haqiqiy ish',
        videoFeat2: 'Sahnalashtirmasiz',
        videoFeat3: 'Boricha',
        seoTitle: 'Toshkentda texnika va mebel sotib olish',
        seoCard1Title: 'Maishiy texnika sotib olish',
        seoCard1Text: 'Toshkent va viloyatda ishlatilgan texnikani sotib olamiz: muzlatgichlar, kir yuvish mashinalari, konditsionerlar, televizorlar, gaz plitalar va boshqa maishiy texnika. Samsung, LG, Bosch, Artel, Atlant — barcha brendlar. Bozor narxida baholash, murojaat kunida chiqish.',
        seoCard2Title: 'Ishlatilgan mebel sotib olish',
        seoCard2Text: 'Toshkentda ishlatilgan mebel sotib olamiz: divanlar, karavotlar, shkaflar, stollar, stullar, kresellar, komodlar va oshxona mebellar. Ko\'chib o\'tayotgan yoki ta\'mir qilayotgan bo\'lsangiz — o\'zimiz olib ketamiz va joyida to\'laymiz.',
        seoCard3Title: 'Texnika va mebelni tez sotish',
        seoCard3Text: 'Toshkentda ishlatilgan texnika yoki mebelni tez sotmoqchimisiz? Qo\'ng\'iroq qiling — 1-2 soat ichida kelamiz, halol baholaymiz va darhol to\'laymiz. OLXda xaridor kutish shart emas. 8 yillik tajriba.',
        seoCard4Title: 'Eski texnika va mebelni olib ketish',
        seoCard4Text: 'Sotib olishda texnika va mebelni bepul olib ketamiz. Butun Toshkent va viloyatda ishlaymiz — Chirchiq, Olmaliq, Angren, Nurafshon. Yuk tashuvchilar, transport — barchasini o\'zimiz hal qilamiz.',
        seoCard5Title: 'Toshkentda ishlatilgan muzlatgich sotib olaman',
        seoCard5Text: 'Barcha brendlarning ishlatilgan muzlatgichlarini sotib olamiz: Samsung, LG, Bosch, Indesit, Artel, Atlant, Beko. Bir kamerali, ikki kamerali — barchasini qimmat sotib olamiz. Uyga chiqish bepul.',
        seoCard6Title: 'Ishlatilgan kir yuvish mashinasi sotib olaman',
        seoCard6Text: 'Toshkentda ishlatilgan kir yuvish mashinalarini sotib olamiz: avtomat, yarim avtomat. Samsung, LG, Artel, Bosch, Indesit. 1 soat ichida kelamiz va joyida to\'laymiz.',
        seoCard7Title: 'Ishlatilgan konditsioner sotib olish',
        seoCard7Text: 'Toshkentda ishlatilgan konditsionerlarni sotib olamiz — devorga o\'rnatiladigan split-sistemalar, polga qo\'yiladigan. Artel, Samsung, LG, Midea, Haier, Gree. Demontaj biz hisobimizga.',
        seoCard8Title: 'Toshkentda mebelni qimmat sotib olaman',
        seoCard8Text: 'Ishlatilgan mebelni qimmat sotib olamiz — yotoqxona, mehmonxona, oshxona mebellari. Import elit mebel: italyan, turk, malayziya. Barokko, rokoko, klassika — eng yuqori narxda baholaymiz.',
        seoCard9Title: 'Ishlatilgan qurilish materiallari sotib olish',
        seoCard9Text: 'Toshkentda ishlatilgan qurilish materiallarini sotib olamiz: eshiklar, derazalar, santexnika, radiatorlar, quvurlar, laminat, plitka. Tashlab yubormang — bizga soting!',
        seoCard10Title: 'Toshkentda ishlatilgan televizor sotib olaman',
        seoCard10Text: 'Ishlatilgan televizorlarni sotib olamiz: LED, Smart TV, UHD 4K, OLED. Samsung, LG, Sony, Artel, Shivaki. 32 dan 75 dyuymgacha — qimmat sotib olamiz.',
        seoCard11Title: 'Ishlatilgan gaz plita sotib olaman',
        seoCard11Text: 'Toshkentda ishlatilgan gaz va elektr plitalarni sotib olamiz. Artel, Shivaki, Indesit, Bosch, Gefest. Duhovka va pishirish panellarini ham sotib olamiz.',
        seoCard12Title: 'Ko\'chib o\'tishda mebel va texnika sotib olish',
        seoCard12Text: 'Ko\'chib o\'tayapsizmi? Biz bir tashrifda hammasini sotib olamiz: mebel, texnika, qurilish materiallari. Tez, foydali, hech qanday tashvishsiz.',
        seoCard13Title: 'Toshkent tumanlarida mebel sotib olish',
        seoCard13Text: 'Toshkentning barcha tumanlarida ishlaymiz: Chilonzor, Yunusobod, Mirzo Ulug\'bek, Sergeli, Yashnobod, Mirobod, Shayxontohur, Olmazor, Uchtepa, Bektemir. 1-2 soat ichida chiqamiz.',
        faqTitle: 'Ko\'p beriladigan savollar',
        faq1Q: 'Qanday texnikani sotib olasiz?',
        faq1A: 'Muzlatgichlar, kir yuvish mashinalari, konditsionerlar, televizorlar, gaz va elektr plitalar, mikroto\'lqinli pechlar va boshqa ishlaydigan maishiy texnikani sotib olamiz.',
        faq2Q: 'Qanday mebelni sotib olasiz?',
        faq2A: 'Divanlar, karavotlar, shkaflar, komodlar, stollar, stullar, kresellar, oshxona mebellarini sotib olamiz. Ayniqsa import elit mebel — barokko, rokoko, klassika qadrlanadi.',
        faq3Q: 'Qanchalik tez kelasiz?',
        faq3A: 'Toshkent bo\'yicha — qo\'ng\'iroqdan 1-2 soat ichida. Viloyat bo\'yicha — o\'sha kuni yoki ertasi kuni.',
        faq4Q: 'To\'lov qanday amalga oshiriladi?',
        faq4A: 'Ko\'rik va narxni kelishgandan so\'ng joyida darhol to\'laymiz. Naqd pul (so\'m, dollar) va kartaga o\'tkazma qabul qilamiz.',
        faq5Q: 'Ishlamaydigan texnikani sotib olasizmi?',
        faq5A: 'Ha, ishlamaydigan texnikani ham sotib olamiz, lekin arzonroq narxda. Muzlatgich, kir yuvish mashinasi, konditsioner — ishlamasa ham sotib olishimiz mumkin.',
        faq6Q: 'Qurilish materiallarini sotib olasizmi?',
        faq6A: 'Ha, ishlatilgan qurilish materiallarini sotib olamiz: eshiklar, derazalar, santexnika, radiatorlar, laminat, plitka, quvurlar.',
        faq7Q: 'Toshkentning qaysi tumanlarida ishlaysiz?',
        faq7A: 'Butun Toshkentda ishlaymiz: Chilonzor, Yunusobod, Mirzo Ulug\'bek, Sergeli, Yashnobod, Mirobod, Shayxontohur, Olmazor, Uchtepa, Bektemir. Chirchiq, Olmaliq, Angren, Nurafshonga ham chiqamiz.',
        faq8Q: 'Mebel va texnikani olib ketish qancha turadi?',
        faq8A: 'Sotib olishda bepul olib ketamiz. Yuk tashuvchilar va transport biz tomondan. Mebel va konditsioner demontaji ham biz hisobimizga.',
        faq9Q: 'Toshkentda ishlatilgan muzlatgichni qanday sotish mumkin?',
        faq9A: '+998 99 111 23 23 raqamiga qo\'ng\'iroq qiling, brend va holatni tasvirlang. Biz taxminiy narxni aytamiz, kelamiz, ko\'rib chiqamiz va joyida to\'laymiz. 1-2 soat davom etadi.',
        faq10Q: 'Elit import mebelni sotib olasizmi?',
        faq10A: 'Ha, bu bizning ixtisosligimiz! Italyan, turk, malayziya mebelini qimmat sotib olamiz. Barokko, rokoko, klassika — eng yuqori narxda baholaymiz.',
        faq11Q: 'Butun kvartirani — mebel va texnikani birdan sotsa bo\'ladimi?',
        faq11A: 'Albatta! Ko\'chib o\'tishda biz bir tashrifda hammasini sotib olamiz: mebel, texnika, qurilish materiallari. OLXda alohida sotishdan ko\'ra tezroq va qulayroq.'
    },
    en: {
        heroTitle: '<span class="highlight">Buy</span> everything from home',
        heroSubtitle: 'Buying household appliances at the best prices.<br>Fast arrival, fair evaluation, instant payment!',
        heroBadge: 'Tashkent and region',
        aboutTitle: '8 years in Tashkent market',
        galleryTitle: 'Our services',
        tabAll: 'All',
        tabTech: 'Appliances',
        tabFurniture: 'Furniture',
        tabInterior: 'Interior',
        howItWorksTitle: 'How it works',
        step1: 'Call us',
        step1Desc: 'Contact us in any convenient way',
        step2: 'Describe the equipment',
        step2Desc: 'Tell us what you want to sell',
        step3: 'Get an estimate',
        step3Desc: 'We will give a preliminary price',
        step4: 'Get paid',
        step4Desc: 'We will pick up the equipment and pay on the spot',
        promoBadge: 'Our partner project',
        promoTitle: 'We buy imported premium furniture at top prices',
        promoDesc: 'Have imported baroque, rococo, or classic furniture? We buy it at the best prices! Evaluation in 30 minutes, fast inspection, instant payment.',
        promoFeat1: 'Photo evaluation in 30 minutes',
        promoFeat2: 'Fast on-site inspection',
        promoFeat3: 'Cash and bank transfer payment',
        promoBtn: 'Visit website',
        sideTabText: 'Premium furniture',
        sidePanelTitle: 'We buy imported furniture at top prices',
        sidePanelDesc: 'Baroque, rococo, classic — we evaluate in 30 minutes and buy at the best price!',
        sidePanelFeat1: '⏱️ Evaluation in 30 min',
        sidePanelFeat2: '🚗 Fast visit',
        sidePanelFeat3: '💰 Payment on the spot',
        sidePanelBtn: 'Visit website →',
        contactTitle: 'Contact us',
        location: 'Lutufiy st., Tashkent, 100131',
        schedule: 'Daily: 9:00 AM — 9:00 PM',
        callNow: 'Call now',
        motto: 'Honest • Fast • Profitable',
        scrollMore: 'Learn more',
        videoHeading: 'See<br><span class="highlight">how we work</span>',
        videoDesc: 'Fast, honest and convenient. Press play and see for yourself!',
        videoFeat1: 'Real work',
        videoFeat2: 'No staging',
        videoFeat3: 'As it is',
        seoTitle: 'Buying appliances and furniture in Tashkent',
        seoCard1Title: 'Buying household appliances',
        seoCard1Text: 'We buy used appliances in Tashkent and the region: refrigerators, washing machines, air conditioners, TVs, gas stoves, microwaves, and more. All brands accepted — Samsung, LG, Bosch, Artel, Atlant. Market price evaluation, same-day pickup.',
        seoCard2Title: 'Buying used furniture',
        seoCard2Text: 'We buy used furniture in Tashkent: sofas, beds, wardrobes, tables, chairs, armchairs, dressers, and kitchen sets. Moving or renovating? We pick up everything and pay on the spot — cash or bank transfer.',
        seoCard3Title: 'Sell your items fast',
        seoCard3Text: 'Want to quickly sell used appliances or furniture in Tashkent? Call us — we arrive in 1-2 hours, give a fair price, and pay immediately. No waiting for buyers on OLX. 8 years of experience in the Tashkent market.',
        seoCard4Title: 'Pickup and removal service',
        seoCard4Text: 'Free pickup of appliances and furniture when selling to us. We serve all of Tashkent and the region — Chirchik, Almalyk, Angren, Nurafshon. Movers, transport, disassembly — we handle everything. Just call +998 99 111 23 23.',
        seoCard5Title: 'Buy used refrigerator in Tashkent',
        seoCard5Text: 'We buy used refrigerators of all brands: Samsung, LG, Bosch, Indesit, Artel, Atlant, Beko. Single-door, double-door, side-by-side — we buy any working refrigerator at a good price. Free home visit.',
        seoCard6Title: 'Buy used washing machine',
        seoCard6Text: 'We buy used washing machines in Tashkent: automatic, semi-automatic, top and front loading. Samsung, LG, Artel, Bosch, Indesit. We arrive within 1 hour and pay on the spot.',
        seoCard7Title: 'Buy used air conditioners',
        seoCard7Text: 'We buy used air conditioners in Tashkent — wall-mounted split systems, floor-standing, cassette. Artel, Samsung, LG, Midea, Haier, Gree. Dismounting at our expense.',
        seoCard8Title: 'Buy furniture at top prices in Tashkent',
        seoCard8Text: 'We buy used furniture at the best prices — bedroom sets, living rooms, hallways, kitchen sets. We especially value imported premium furniture: Italian, Turkish, Malaysian. Baroque, rococo, classic styles.',
        seoCard9Title: 'Buy used building materials',
        seoCard9Text: 'We buy used building materials in Tashkent: doors, windows, plumbing, radiators, pipes, laminate, tiles and other materials after renovation. Don\'t throw them away — sell to us!',
        seoCard10Title: 'Buy used TV in Tashkent',
        seoCard10Text: 'We buy used TVs: LED, Smart TV, UHD 4K, OLED. Samsung, LG, Sony, Artel, Shivaki and other brands. From 32 to 75 inches — we pay top prices.',
        seoCard11Title: 'Buy used gas stove',
        seoCard11Text: 'We buy used gas and electric stoves in Tashkent. Artel, Shivaki, Indesit, Bosch, Gefest — any brand. We also buy ovens and cooktops.',
        seoCard12Title: 'Buy furniture and appliances when moving',
        seoCard12Text: 'Moving and don\'t want to take old furniture and appliances? We buy everything in one visit: furniture, appliances, building materials. Fast, profitable, hassle-free.',
        seoCard13Title: 'Buying furniture across Tashkent districts',
        seoCard13Text: 'We work in all Tashkent districts: Chilanzar, Yunusabad, Mirzo Ulugbek, Sergeli, Yashnaabad, Mirabad, Shaykhantaur, Almazar, Uchtepa, Bektemir. We arrive in 1-2 hours.',
        faqTitle: 'Frequently asked questions',
        faq1Q: 'What appliances do you buy?',
        faq1A: 'We buy refrigerators, washing machines, air conditioners, TVs, gas and electric stoves, microwaves, dishwashers, and other working household appliances.',
        faq2Q: 'What furniture do you buy?',
        faq2A: 'We buy sofas, beds, wardrobes, dressers, tables, chairs, armchairs, kitchen sets, and hallway furniture. We especially value imported premium furniture — baroque, rococo, classic.',
        faq3Q: 'How fast can you arrive?',
        faq3A: 'In Tashkent — within 1-2 hours of your call. In the region — same day or next day, depending on the time.',
        faq4Q: 'How does payment work?',
        faq4A: 'We pay on the spot right after inspection and price agreement. We accept cash (som, dollar) and bank transfers.',
        faq5Q: 'Do you buy non-working appliances?',
        faq5A: 'Yes, we buy non-working appliances at a reduced price. Refrigerators, washing machines, air conditioners — even if broken, we can buy them.',
        faq6Q: 'Do you buy building materials?',
        faq6A: 'Yes, we buy used building materials: doors, windows, plumbing, radiators, laminate, tiles, pipes and other materials after renovation or demolition.',
        faq7Q: 'Which Tashkent districts do you cover?',
        faq7A: 'We cover all of Tashkent: Chilanzar, Yunusabad, Mirzo Ulugbek, Sergeli, Yashnaabad, Mirabad, Shaykhantaur, Almazar, Uchtepa, Bektemir. Also Chirchik, Almalyk, Angren, Nurafshon.',
        faq8Q: 'How much does furniture pickup cost?',
        faq8A: 'Pickup is free when selling to us. We come with our own movers and transport. Furniture and AC dismounting is also at our expense.',
        faq9Q: 'How to sell a used refrigerator in Tashkent?',
        faq9A: 'Call us at +998 99 111 23 23, describe the brand and condition. We\'ll give an estimate, come, inspect, and pay on the spot. The whole process takes 1-2 hours.',
        faq10Q: 'Do you buy premium imported furniture?',
        faq10A: 'Yes, that\'s our specialty! We buy Italian, Turkish, Malaysian furniture at top prices. Baroque, rococo, classic — we evaluate at maximum prices.',
        faq11Q: 'Can I sell the entire apartment — furniture and appliances?',
        faq11A: 'Of course! When moving, we buy everything in one visit: furniture, appliances, building materials. It\'s faster and more convenient than selling separately on OLX.'
    }
};

// Загружаем сохранённый язык
const savedLang = localStorage.getItem('lang') || 'ru';
setLanguage(savedLang);

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        localStorage.setItem('lang', lang);
    });
});

function setLanguage(lang) {
    // Обновляем активную кнопку
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const t = translations[lang];

    // Hero
    document.querySelector('.hero-title').innerHTML = t.heroTitle;
    document.querySelector('.hero-subtitle').innerHTML = t.heroSubtitle;
    document.querySelector('.hero-badge').textContent = t.heroBadge;

    // О нас
    document.querySelector('.about-us .section-title').textContent = t.aboutTitle;

    // Галерея
    document.querySelector('.gallery .section-title').textContent = t.galleryTitle;
    const tabs = document.querySelectorAll('.gallery-tab');
    if (tabs.length >= 4) {
        tabs[0].textContent = t.tabAll;
        tabs[1].textContent = t.tabTech;
        tabs[2].textContent = t.tabFurniture;
        tabs[3].textContent = t.tabInterior;
    }

    // Как это работает
    document.querySelector('.how-it-works .section-title').textContent = t.howItWorksTitle;
    const steps = document.querySelectorAll('.step');
    const stepData = [
        { title: t.step1, desc: t.step1Desc },
        { title: t.step2, desc: t.step2Desc },
        { title: t.step3, desc: t.step3Desc },
        { title: t.step4, desc: t.step4Desc }
    ];
    steps.forEach((step, i) => {
        step.querySelector('h3').textContent = stepData[i].title;
        step.querySelector('p').textContent = stepData[i].desc;
    });

    // Промо mebelimport
    const promoSection = document.querySelector('.partner-promo');
    if (promoSection) {
        promoSection.querySelector('.promo-badge').textContent = t.promoBadge;
        promoSection.querySelector('h2').textContent = t.promoTitle;
        promoSection.querySelector('.promo-left > p').textContent = t.promoDesc;
        const feats = promoSection.querySelectorAll('.promo-features li');
        if (feats.length >= 3) {
            feats[0].lastChild.textContent = ' ' + t.promoFeat1;
            feats[1].lastChild.textContent = ' ' + t.promoFeat2;
            feats[2].lastChild.textContent = ' ' + t.promoFeat3;
        }
        const promoBtn = promoSection.querySelector('.promo-btn');
        if (promoBtn) {
            promoBtn.firstChild.textContent = t.promoBtn + ' ';
        }
    }

    // Боковая панель mebelimport
    const sideTabEl = document.getElementById('sideTab');
    const sidePanelEl = document.getElementById('sidePanel');
    if (sideTabEl) sideTabEl.querySelector('span').textContent = t.sideTabText;
    if (sidePanelEl) {
        sidePanelEl.querySelector('.side-panel-title').textContent = t.sidePanelTitle;
        sidePanelEl.querySelector('.side-panel-desc').textContent = t.sidePanelDesc;
        const spFeats = sidePanelEl.querySelectorAll('.side-panel-features li');
        if (spFeats.length >= 3) {
            spFeats[0].textContent = t.sidePanelFeat1;
            spFeats[1].textContent = t.sidePanelFeat2;
            spFeats[2].textContent = t.sidePanelFeat3;
        }
        sidePanelEl.querySelector('.side-panel-btn').textContent = t.sidePanelBtn;
    }

    // Видео-секция
    const videoSection = document.querySelector('.video-showcase');
    if (videoSection) {
        videoSection.querySelector('.video-heading').innerHTML = t.videoHeading;
        videoSection.querySelector('.video-desc').textContent = t.videoDesc;
        const vFeats = videoSection.querySelectorAll('.video-feat');
        if (vFeats.length >= 3) {
            vFeats[0].lastChild.textContent = ' ' + t.videoFeat1;
            vFeats[1].lastChild.textContent = ' ' + t.videoFeat2;
            vFeats[2].lastChild.textContent = ' ' + t.videoFeat3;
        }
    }

    // SEO-блок
    const seoSection = document.querySelector('.seo-content');
    if (seoSection) {
        seoSection.querySelector('.section-title').textContent = t.seoTitle;
        const seoCards = seoSection.querySelectorAll('.seo-card');
        const seoData = [];
        for (let i = 1; i <= 13; i++) {
            if (t['seoCard'+i+'Title']) seoData.push({ title: t['seoCard'+i+'Title'], text: t['seoCard'+i+'Text'] });
        }
        seoCards.forEach((card, i) => {
            if (seoData[i]) {
                card.querySelector('h3').textContent = seoData[i].title;
                card.querySelector('p').textContent = seoData[i].text;
            }
        });
        seoSection.querySelector('.seo-faq > h3').textContent = t.faqTitle;
        const faqItems = seoSection.querySelectorAll('.faq-item');
        const faqData = [];
        for (let i = 1; i <= 11; i++) {
            if (t['faq'+i+'Q']) faqData.push({ q: t['faq'+i+'Q'], a: t['faq'+i+'A'] });
        }
        faqItems.forEach((item, i) => {
            if (faqData[i]) {
                item.querySelector('summary').textContent = faqData[i].q;
                item.querySelector('p').textContent = faqData[i].a;
            }
        });
    }

    // Контакты
    document.querySelector('.contact-left h2').textContent = t.contactTitle;
    const contactItems = document.querySelectorAll('.contact-info-item');
    contactItems[0].querySelector('span:last-child').textContent = t.location;
    contactItems[1].querySelector('span:last-child').textContent = t.schedule;
    document.querySelector('.cta-btn span').textContent = t.callNow;
    document.querySelector('.contact-motto').textContent = t.motto;

    // Прокрутка
    document.querySelector('.scroll-indicator span').textContent = t.scrollMore;
}

// Плавное появление элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Добавляем анимацию к карточкам
document.querySelectorAll('.about-card, .gallery-item, .step, .promo-container, .video-layout, .seo-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Скрытие/показ навигации при скролле
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

navbar.style.transition = 'transform 0.3s ease';

// Видеоплеер
(function() {
    const video = document.getElementById('showcaseVideo');
    const screen = video?.closest('.phone-screen');
    const overlay = document.getElementById('videoPlayOverlay');
    const muteBtn = document.getElementById('vbMute');
    const progress = document.getElementById('vbProgress');
    const progressFilled = document.getElementById('vbProgressFilled');

    if (!video) return;

    video.muted = true;

    function playVideo() {
        video.play();
        overlay.classList.add('hidden');
    }

    function togglePlay() {
        if (video.paused) {
            playVideo();
        } else {
            video.pause();
            overlay.classList.remove('hidden');
        }
    }

    overlay.addEventListener('click', playVideo);

    // Тап по видео — пауза/плей
    screen.addEventListener('click', (e) => {
        if (e.target.closest('.video-play-overlay') || e.target.closest('.vb-controls') || e.target.closest('.vb-progress')) return;
        if (!overlay.classList.contains('hidden')) return;
        togglePlay();
    });

    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const pct = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = pct + '%';
        }
    });

    progress.addEventListener('click', (e) => {
        const rect = progress.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        video.currentTime = pct * video.duration;
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        screen.classList.toggle('unmuted', !video.muted);
    });
})();
