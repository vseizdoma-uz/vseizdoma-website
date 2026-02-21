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

// Переключение языка
const langBtns = document.querySelectorAll('.lang-btn');

const translations = {
    ru: {
        heroTitle: '<span class="highlight">Куплю</span> всё из дома',
        heroSubtitle: 'Скупка бытовой техники по лучшим ценам.<br>Быстрый выезд, честная оценка, оплата сразу!',
        heroBadge: 'Ташкент и область',
        featuresTitle: 'Почему выбирают нас',
        fast: 'Быстро',
        fastDesc: 'Приедем в течение часа в любой район Ташкента и области',
        profitable: 'Выгодно',
        profitableDesc: 'Честная оценка техники. Цены выше, чем у конкурентов',
        convenient: 'Удобно',
        convenientDesc: 'Бесплатный вывоз техники. Оплата наличными на месте',
        categoriesTitle: 'Что мы скупаем',
        refrigerators: 'Холодильники',
        washingMachines: 'Стиральные машины',
        tvs: 'Телевизоры',
        airConditioners: 'Кондиционеры',
        microwaves: 'Микроволновки',
        furniture: 'Мебель',
        computers: 'Компьютеры',
        gasStoves: 'Газовые плиты',
        carpets: 'Ковры',
        kitchenSet: 'Кухонный гарнитур',
        andMore: 'И многое другое',
        galleryTitle: 'Наши услуги',
        howItWorksTitle: 'Как это работает',
        step1: 'Позвоните нам',
        step1Desc: 'Свяжитесь с нами любым удобным способом',
        step2: 'Опишите технику',
        step2Desc: 'Расскажите, что хотите продать',
        step3: 'Получите оценку',
        step3Desc: 'Мы назовём предварительную цену',
        step4: 'Получите деньги',
        step4Desc: 'Заберём технику и оплатим на месте',
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
        featuresTitle: 'Nega bizni tanlashadi',
        fast: 'Tez',
        fastDesc: 'Toshkent va viloyatning istalgan tumaniga bir soat ichida yetib boramiz',
        profitable: 'Foydali',
        profitableDesc: 'Texnikani halol baholash. Raqobatchilardan yuqori narxlar',
        convenient: 'Qulay',
        convenientDesc: 'Bepul olib ketish. Joyida naqd pul bilan to\'lov',
        categoriesTitle: 'Nimani sotib olamiz',
        refrigerators: 'Muzlatgichlar',
        washingMachines: 'Kir yuvish mashinalari',
        tvs: 'Televizorlar',
        airConditioners: 'Konditsionerlar',
        microwaves: 'Mikroto\'lqinli pechlar',
        furniture: 'Mebel',
        computers: 'Kompyuterlar',
        gasStoves: 'Gaz plitalari',
        carpets: 'Gilamlar',
        kitchenSet: 'Oshxona garnituri',
        andMore: 'Va boshqa ko\'p narsalar',
        galleryTitle: 'Bizning xizmatlar',
        howItWorksTitle: 'Bu qanday ishlaydi',
        step1: 'Bizga qo\'ng\'iroq qiling',
        step1Desc: 'Qulay usulda biz bilan bog\'laning',
        step2: 'Texnikani tasvirlang',
        step2Desc: 'Nimani sotmoqchi ekanligingizni ayting',
        step3: 'Baho oling',
        step3Desc: 'Dastlabki narxni aytamiz',
        step4: 'Pul oling',
        step4Desc: 'Texnikani olib ketamiz va joyida to\'laymiz',
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
        featuresTitle: 'Why choose us',
        fast: 'Fast',
        fastDesc: 'We arrive within an hour to any district of Tashkent and the region',
        profitable: 'Profitable',
        profitableDesc: 'Fair equipment evaluation. Prices higher than competitors',
        convenient: 'Convenient',
        convenientDesc: 'Free pickup. Cash payment on the spot',
        categoriesTitle: 'What we buy',
        refrigerators: 'Refrigerators',
        washingMachines: 'Washing machines',
        tvs: 'TVs',
        airConditioners: 'Air conditioners',
        microwaves: 'Microwaves',
        furniture: 'Furniture',
        computers: 'Computers',
        gasStoves: 'Gas stoves',
        carpets: 'Carpets',
        kitchenSet: 'Kitchen set',
        andMore: 'And much more',
        galleryTitle: 'Our services',
        howItWorksTitle: 'How it works',
        step1: 'Call us',
        step1Desc: 'Contact us in any convenient way',
        step2: 'Describe the equipment',
        step2Desc: 'Tell us what you want to sell',
        step3: 'Get an estimate',
        step3Desc: 'We will give a preliminary price',
        step4: 'Get paid',
        step4Desc: 'We will pick up the equipment and pay on the spot',
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

    // Обновляем контент
    document.querySelector('.hero-title').innerHTML = t.heroTitle;
    document.querySelector('.hero-subtitle').innerHTML = t.heroSubtitle;
    document.querySelector('.hero-badge').textContent = t.heroBadge;

    // Преимущества
    document.querySelector('.features .section-title').textContent = t.featuresTitle;
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards[0].querySelector('h3').textContent = t.fast;
    featureCards[0].querySelector('p').textContent = t.fastDesc;
    featureCards[1].querySelector('h3').textContent = t.profitable;
    featureCards[1].querySelector('p').textContent = t.profitableDesc;
    featureCards[2].querySelector('h3').textContent = t.convenient;
    featureCards[2].querySelector('p').textContent = t.convenientDesc;

    // Категории
    document.querySelector('.categories .section-title').textContent = t.categoriesTitle;
    const categoryItems = document.querySelectorAll('.category-item');
    const categoryNames = [t.refrigerators, t.washingMachines, t.tvs, t.airConditioners, t.gasStoves, t.furniture, t.computers, t.carpets, t.kitchenSet, t.andMore];
    categoryItems.forEach((item, i) => {
        item.querySelector('span:last-child').textContent = categoryNames[i];
    });

    // Галерея
    document.querySelector('.gallery .section-title').textContent = t.galleryTitle;

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
document.querySelectorAll('.feature-card, .category-item, .gallery-item, .step').forEach(el => {
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
