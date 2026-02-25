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
        faqTitle: 'Частые вопросы',
        faq1Q: 'Какую технику вы покупаете?',
        faq1A: 'Мы покупаем холодильники, стиральные машины, кондиционеры, телевизоры, газовые и электрические плиты, микроволновые печи, посудомоечные машины и другую бытовую технику в рабочем состоянии.',
        faq2Q: 'Какую мебель вы скупаете?',
        faq2A: 'Покупаем диваны, кровати, шкафы, комоды, столы, стулья, кресла, кухонные гарнитуры, прихожие. Особенно ценим импортную элитную мебель — барокко, рококо, классика.',
        faq3Q: 'Как быстро вы приедете?',
        faq3A: 'По Ташкенту — в течение 1-2 часов после звонка. По области — в тот же день или на следующий день, в зависимости от времени обращения.',
        faq4Q: 'Как происходит оплата?',
        faq4A: 'Оплачиваем на месте сразу после осмотра и согласования цены. Принимаем наличные (сум, доллар) и безналичный перевод на карту.'
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
        faqTitle: 'Ko\'p beriladigan savollar',
        faq1Q: 'Qanday texnikani sotib olasiz?',
        faq1A: 'Muzlatgichlar, kir yuvish mashinalari, konditsionerlar, televizorlar, gaz va elektr plitalar, mikroto\'lqinli pechlar va boshqa ishlaydigan maishiy texnikani sotib olamiz.',
        faq2Q: 'Qanday mebelni sotib olasiz?',
        faq2A: 'Divanlar, karavotlar, shkaflar, komodlar, stollar, stullar, kresellar, oshxona mebellarini sotib olamiz. Ayniqsa import elit mebel — barokko, rokoko, klassika qadrlanadi.',
        faq3Q: 'Qanchalik tez kelasiz?',
        faq3A: 'Toshkent bo\'yicha — qo\'ng\'iroqdan 1-2 soat ichida. Viloyat bo\'yicha — o\'sha kuni yoki ertasi kuni.',
        faq4Q: 'To\'lov qanday amalga oshiriladi?',
        faq4A: 'Ko\'rik va narxni kelishgandan so\'ng joyida darhol to\'laymiz. Naqd pul (so\'m, dollar) va kartaga o\'tkazma qabul qilamiz.'
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
        faqTitle: 'Frequently asked questions',
        faq1Q: 'What appliances do you buy?',
        faq1A: 'We buy refrigerators, washing machines, air conditioners, TVs, gas and electric stoves, microwaves, dishwashers, and other working household appliances.',
        faq2Q: 'What furniture do you buy?',
        faq2A: 'We buy sofas, beds, wardrobes, dressers, tables, chairs, armchairs, kitchen sets, and hallway furniture. We especially value imported premium furniture — baroque, rococo, classic.',
        faq3Q: 'How fast can you arrive?',
        faq3A: 'In Tashkent — within 1-2 hours of your call. In the region — same day or next day, depending on the time.',
        faq4Q: 'How does payment work?',
        faq4A: 'We pay on the spot right after inspection and price agreement. We accept cash (som, dollar) and bank transfers.'
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
        const seoData = [
            { title: t.seoCard1Title, text: t.seoCard1Text },
            { title: t.seoCard2Title, text: t.seoCard2Text },
            { title: t.seoCard3Title, text: t.seoCard3Text },
            { title: t.seoCard4Title, text: t.seoCard4Text }
        ];
        seoCards.forEach((card, i) => {
            card.querySelector('h3').textContent = seoData[i].title;
            card.querySelector('p').textContent = seoData[i].text;
        });
        seoSection.querySelector('.seo-faq > h3').textContent = t.faqTitle;
        const faqItems = seoSection.querySelectorAll('.faq-item');
        const faqData = [
            { q: t.faq1Q, a: t.faq1A },
            { q: t.faq2Q, a: t.faq2A },
            { q: t.faq3Q, a: t.faq3A },
            { q: t.faq4Q, a: t.faq4A }
        ];
        faqItems.forEach((item, i) => {
            item.querySelector('summary').textContent = faqData[i].q;
            item.querySelector('p').textContent = faqData[i].a;
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
