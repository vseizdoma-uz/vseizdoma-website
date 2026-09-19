// ===== GA4 Event Tracking =====
document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) {
        gtag('event', 'phone_click', { event_category: 'contact', event_label: href });
    } else if (href.indexOf('t.me') !== -1) {
        gtag('event', 'telegram_click', { event_category: 'contact', event_label: href });
    } else if (href.indexOf('instagram') !== -1) {
        gtag('event', 'instagram_click', { event_category: 'contact', event_label: href });
    }
});

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

// === Phase 2: Dropdown menu touch support ===
(function() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    toggle.setAttribute('tabindex', '0');
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
    dropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
})();
