// ===== Burger Menu =====
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
    });
});

// ===== Theme Switching =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

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

// ===== Nav Menu Translations =====
const navTranslations = {
    ru: { services: 'Услуги', links: ['🪑 Мебель', '🔌 Техника', '❄️ Холодильники', '🌀 Стиралки', '❄️ Кондиционеры', '📺 Телевизоры'] },
    uz: { services: 'Xizmatlar', links: ['🪑 Mebel', '🔌 Texnika', '❄️ Muzlatgich', '🌀 Kir yuvish', '❄️ Konditsioner', '📺 Televizor'] },
    en: { services: 'Services', links: ['🪑 Furniture', '🔌 Appliances', '❄️ Fridges', '🌀 Washers', '❄️ ACs', '📺 TVs'] }
};

// ===== Language Switching =====
const langBtns = document.querySelectorAll('.lang-btn[data-lang]');
const savedLang = localStorage.getItem('lang') || 'ru';

// Only apply JS translations if buttons have data-lang (old button-based switcher)
if (langBtns.length > 0) {
    setLanguage(savedLang);
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('lang', lang);
        });
    });
}

function setLanguage(lang) {
    // Update active button
    langBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Use page-specific translations
    if (!window.PAGE_TRANSLATIONS || !window.PAGE_TRANSLATIONS[lang]) return;

    const t = window.PAGE_TRANSLATIONS[lang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            if (el.getAttribute('data-i18n-html') === 'true') {
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Update nav menu translations
    const nt = navTranslations[lang];
    if (nt) {
        const navServicesEl = document.querySelector('.nav-services-text');
        if (navServicesEl) navServicesEl.textContent = nt.services;
        document.querySelectorAll('.nav-menu-link').forEach((link, i) => { if (nt.links[i]) link.textContent = nt.links[i]; });
        document.querySelectorAll('.mobile-menu-link').forEach((link, i) => { if (nt.links[i]) link.textContent = nt.links[i]; });
    }
}

// ===== Navbar Hide/Show on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            navbar.classList.add('hidden');
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('open');
        } else {
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
}, { passive: true });

// ===== Scroll Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.advantage-card, .product-card, .sub-step, .sub-faq-item').forEach(el => {
    observer.observe(el);
});
