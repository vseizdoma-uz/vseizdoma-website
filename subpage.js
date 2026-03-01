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

// ===== Language Switching =====
const langBtns = document.querySelectorAll('.lang-btn');
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
}

// ===== Navbar Hide/Show on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

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
