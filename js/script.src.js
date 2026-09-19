// GA4 Event Tracking — клики по телефону, Telegram, Instagram
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

// Бургер-меню
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

// Закрытие мобильного меню при клике на ссылку
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
    });
});

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

// Staggered scroll animations with data-animate
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, delay);
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

// Apply staggered delays to groups of elements
function initAnimations() {
    document.querySelectorAll('[data-animate]').forEach(el => {
        animObserver.observe(el);
    });

    // Stagger sibling elements within grids
    const groups = ['.about-grid', '.seo-grid', '.steps', '.gallery-grid'];
    groups.forEach(selector => {
        document.querySelectorAll(selector).forEach(container => {
            container.querySelectorAll('[data-animate]').forEach((child, i) => {
                child.dataset.delay = i * 100;
            });
        });
    });

    // Also animate gallery items and faq items
    document.querySelectorAll('.gallery-item, .faq-item').forEach((el, i) => {
        if (!el.hasAttribute('data-animate')) {
            el.setAttribute('data-animate', 'fade-up');
            el.dataset.delay = (i % 4) * 80;
            animObserver.observe(el);
        }
    });
}

initAnimations();

// Navbar scroll: hide/show + glassmorphism glow
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    navbar.classList.toggle('scrolled', currentY > 50);
    lastScrollY = currentY;
}, { passive: true });

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

// Стрелки прокрутки карточек категорий
(function() {
    const track = document.getElementById('serviceCardsTrack');
    if (!track) return;
    const leftArr = document.querySelector('.service-cards-arrow-left');
    const rightArr = document.querySelector('.service-cards-arrow-right');
    const scrollAmount = 200;

    leftArr.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightArr.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
})();

// === Phase 2: Dropdown menu touch support ===
(function() {
    const dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    // Make toggle keyboard-focusable
    toggle.setAttribute('tabindex', '0');

    // Click/tap toggles open state
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close when a link inside is clicked (for navigation)
    dropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
})();
