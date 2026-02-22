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
        promoTitle: 'Элитная мебель из Китая на заказ',
        promoDesc: 'Продали старую мебель? Закажите новую! Премиальная мебель напрямую из Китая с доставкой по Узбекистану.',
        promoFeat1: 'Оценка за 30 минут',
        promoFeat2: 'Бесплатная доставка',
        promoFeat3: 'Премиум качество',
        promoBtn: 'Перейти на сайт',
        contactTitle: 'Свяжитесь с нами',
        location: 'Ташкент, Узбекистан',
        schedule: 'Ежедневно: 9:00 — 21:00',
        callNow: 'Позвонить сейчас',
        motto: 'Честно • Быстро • Выгодно',
        scrollMore: 'Подробнее'
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
        promoTitle: 'Xitoydan zakazga elit mebel',
        promoDesc: 'Eski mebelni sotdingizmi? Yangisini buyurtma bering! Xitoydan to\'g\'ridan-to\'g\'ri premium mebel, O\'zbekiston bo\'ylab yetkazib berish.',
        promoFeat1: '30 daqiqada baholash',
        promoFeat2: 'Bepul yetkazib berish',
        promoFeat3: 'Premium sifat',
        promoBtn: 'Saytga o\'tish',
        contactTitle: 'Biz bilan bog\'laning',
        location: 'Toshkent, O\'zbekiston',
        schedule: 'Har kuni: 9:00 — 21:00',
        callNow: 'Hozir qo\'ng\'iroq qilish',
        motto: 'Halol • Tez • Foydali',
        scrollMore: 'Batafsil'
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
        promoTitle: 'Premium furniture from China to order',
        promoDesc: 'Sold your old furniture? Order new! Premium furniture directly from China with delivery across Uzbekistan.',
        promoFeat1: 'Evaluation in 30 minutes',
        promoFeat2: 'Free delivery',
        promoFeat3: 'Premium quality',
        promoBtn: 'Visit website',
        contactTitle: 'Contact us',
        location: 'Tashkent, Uzbekistan',
        schedule: 'Daily: 9:00 AM — 9:00 PM',
        callNow: 'Call now',
        motto: 'Honest • Fast • Profitable',
        scrollMore: 'Learn more'
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
document.querySelectorAll('.about-card, .gallery-item, .step, .promo-container').forEach(el => {
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
