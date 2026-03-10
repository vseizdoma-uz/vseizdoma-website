# Plan: Visual Redesign + Google Standards Compliance

## PRIORITY 1: Google Standards & SEO Optimization

### Core Web Vitals (Google ranking factors):
- **LCP (Largest Contentful Paint)**: lazy-load images below fold, preload hero content
- **CLS (Cumulative Layout Shift)**: add width/height to all images, reserve space for dynamic content
- **INP (Interaction to Next Paint)**: optimize JS, use passive event listeners

### Semantic HTML fixes:
- Add `<main>` wrapper around page content
- Ensure proper heading hierarchy (h1 → h2 → h3, no skips)
- Add `role` and `aria-label` attributes for accessibility
- Add `lang` attribute updates when switching languages

### Image Optimization:
- Add `loading="lazy"` to all images below the fold
- Add explicit `width` and `height` attributes to prevent CLS
- Add descriptive `alt` text where missing

### Structured Data enhancements:
- Fix VideoObject (add `embedUrl`, proper `thumbnailUrl`)
- Verify LocalBusiness schema is complete
- Add BreadcrumbList schema for subpages
- Add `SiteNavigationElement` for nav links

### Meta & Accessibility:
- Add `<meta name="theme-color">` for mobile browsers
- Ensure all interactive elements are keyboard accessible
- Add `aria-expanded` to dropdown toggles
- Add `preconnect` for external resources
- Add `rel="noopener"` to external links

### Performance:
- Minify critical CSS inline (or keep as-is for GitHub Pages simplicity)
- Use `font-display: swap` for fonts
- Add `fetchpriority="high"` to hero elements
- Use `will-change` sparingly for animated elements

---

## PRIORITY 2: Visual Redesign

### 1. Animated Gradient Hero
- Animated gradient background (blue → purple → teal, slow movement)
- Floating decorative blob shapes (CSS-only)
- Gradient shimmer text on hero title

### 2. Glassmorphism Navbar
- `backdrop-filter: blur(20px)` + semi-transparent background
- Subtle bottom glow border on scroll

### 3. Modern Card Effects
- About cards: glassmorphism + gradient border hover + glow
- Gallery items: zoom + overlay with blur bg
- Service cards: gradient border animation
- SEO cards: left accent gradient border
- FAQ: smooth expand + accent highlight

### 4. Staggered Scroll Animations
- Elements appear with cascade delays (0.1s stagger)
- Multiple animation types: fadeUp, fadeLeft, fadeRight, scaleIn

### 5. Glowing CTA Buttons
- Pulse glow on primary buttons
- Gradient sweep shimmer effect
- Hover: scale + deeper glow

### 6. Floating Decorative Elements in Hero
- 3-4 gradient blobs with CSS animation (slow float)
- Adds visual depth without hurting performance

### 7. Enhanced Color System
- New gradient accent vars (blue→purple→teal)
- Glow shadows with color
- Richer dark mode with subtle glow effects

### 8. Wavy Section Dividers
- SVG wave shapes between sections for visual flow
- Works in both light and dark themes

### 9. Animated Steps (How it Works)
- Connected animated line
- Step numbers glow when visible

### 10. Micro-interactions
- Button hover: scale(1.05) with spring
- Links: underline slides from left
- Cards: subtle lift with shadow expansion
- Floating phone button: heartbeat pulse

### 11. Smooth Page Load
- CSS `@keyframes fadeInUp` for initial load
- Staggered header elements appearance

---

## Files to modify:

### `index.html`:
- Add `<main>` wrapper
- Add decorative divs in hero (floating blobs)
- Add SVG wave dividers between sections
- Add `loading="lazy"`, `width`, `height` to images
- Add `aria-*` attributes to interactive elements
- Add `<meta name="theme-color">`
- Add `rel="noopener"` to external links
- Verify heading hierarchy
- Add animation classes (data-animate="fade-up")

### `style.css`:
- New CSS variables (gradients, glows, animation durations)
- Glassmorphism navbar styles
- Animated gradient hero background
- Floating blob animations
- Enhanced card styles (glass, gradient borders, glows)
- Glowing button styles
- Wavy divider styles
- Animation keyframes (fadeUp, fadeLeft, scaleIn, shimmer, float, pulse)
- Enhanced dark mode
- Micro-interaction hover effects
- `will-change` for animated elements
- `font-display: swap` verification

### `script.js`:
- Staggered IntersectionObserver with delays per element
- data-animate attribute system
- Passive event listeners
- Enhanced scroll-based reveals

### `subpage.css`:
- Same glassmorphism navbar
- Same card and button styles
- Same micro-interactions

### 6 subpage HTML files:
- Add `<main>` wrapper
- Add `loading="lazy"` to images
- Add `aria-*` attributes
- Add `rel="noopener"` to external links
- Add `<meta name="theme-color">`

---

## Implementation order:
1. Google fixes in index.html (semantic HTML, meta, images, accessibility, structured data)
2. Google fixes in 6 subpages
3. CSS Variables & keyframes (new gradient system)
4. Glassmorphism navbar
5. Hero redesign (gradient bg, floating shapes, glow button)
6. Card effects (about, gallery, service, SEO, FAQ)
7. Wavy SVG section dividers
8. Steps section animation
9. Button glow & micro-interactions
10. Staggered scroll animations (JS)
11. Dark mode enhancements
12. Subpage CSS sync
13. Final test & push
