# KLO Private Charters — Animations Guide
## Caribbean Luxury Operators · Design System v1.0

> *"Motion should feel like the ocean — unhurried, inevitable, and breathtaking."*

---

## Philosophy

Animation at KLO is not decoration. Every motion serves a purpose:
1. **Orient** — show where elements come from and go to
2. **Affirm** — confirm that an action was received
3. **Delight** — create moments of unexpected beauty
4. **Guide** — direct attention to what matters next

**The Luxury Motion Rule:** If an animation can be removed without degrading the experience, it probably should be. Motion earns its place.

---

## Core Animation Values

### Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--duration-instant` | 50ms | Immediate feedback (press states) |
| `--duration-fast` | 150ms | Micro-interactions, hover color shifts |
| `--duration-normal` | 250ms | Standard UI transitions |
| `--duration-slow` | 400ms | Page elements entering viewport |
| `--duration-slower` | 600ms | Hero content reveals |
| `--duration-slowest` | 900ms | Full-page transitions |
| `--duration-reveal` | 1200ms | Signature staggered reveals |
| `--duration-cinematic` | 2000ms | Hero video fades, opening sequences |

### Easing Functions

```css
/* KLO Signature Ease — the most important easing curve */
--ease-luxury: cubic-bezier(0.22, 1, 0.36, 1);
/*
  Starts quickly, decelerates with elegance.
  Inspired by how a yacht comes to rest in calm water.
  Use for: entrances, reveals, card lifts, modal opens
*/

--ease-out: cubic-bezier(0, 0, 0.2, 1);
/* Use for: elements entering the screen */

--ease-in: cubic-bezier(0.4, 0, 1, 1);
/* Use for: elements leaving the screen */

--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
/* Use for: elements that start and end in place */

--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
/* Use for: playful confirmations, success states — sparingly */
```

---

## 1. Entrance Animations

### Fade Up (Primary Entrance)
The signature KLO entrance. Used for content blocks, cards, and headings.

```css
@keyframes klo-fade-up {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: klo-fade-up var(--duration-slow) var(--ease-luxury) forwards;
  opacity: 0; /* Initial state — prevents FOUC */
}
```

### Fade In (Subtle Entrance)
For content that doesn't need vertical movement — overlays, tooltips, secondary content.

```css
@keyframes klo-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-fade-in {
  animation: klo-fade-in var(--duration-normal) var(--ease-out) forwards;
  opacity: 0;
}
```

### Reveal Left (Horizontal Entrance)
For feature highlights, split-layout sections.

```css
@keyframes klo-reveal-left {
  from {
    opacity: 0;
    transform: translateX(-48px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-reveal-left {
  animation: klo-reveal-left var(--duration-slow) var(--ease-luxury) forwards;
  opacity: 0;
}
```

### Scale Reveal (Hero Elements)
For logos, icons, and focal images.

```css
@keyframes klo-scale-reveal {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-reveal {
  animation: klo-scale-reveal var(--duration-slower) var(--ease-luxury) forwards;
  opacity: 0;
}
```

---

## 2. Stagger System

Multiple elements entering in sequence create a sense of choreography. Always use stagger for lists, grids, and feature rows.

```css
/* Stagger utility — apply to parent */
.stagger-children > * {
  opacity: 0;
  animation: klo-fade-up var(--duration-slow) var(--ease-luxury) forwards;
}

/* Stagger delay increments */
.stagger-children > *:nth-child(1) { animation-delay: 0ms;   }
.stagger-children > *:nth-child(2) { animation-delay: 100ms; }
.stagger-children > *:nth-child(3) { animation-delay: 200ms; }
.stagger-children > *:nth-child(4) { animation-delay: 300ms; }
.stagger-children > *:nth-child(5) { animation-delay: 400ms; }
.stagger-children > *:nth-child(6) { animation-delay: 500ms; }

/* For longer lists, reset the pattern every 6 items */
.stagger-children > *:nth-child(n+7) {
  animation-delay: calc((var(--stagger-index, 1) - 1) * 80ms);
}
```

**React usage with Intersection Observer:**
```tsx
// Trigger animations only when elements enter the viewport
const useStaggerReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return ref;
};
```

---

## 3. Scroll-Driven Animations

### Parallax Hero
```css
.hero-parallax {
  will-change: transform;
  /* Controlled via JS scroll handler */
}

/* JS implementation */
/*
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero-parallax');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
}, { passive: true });
*/
```

### Scroll Progress Indicator
```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-gold-400),
    var(--color-turquoise-400)
  );
  transform-origin: left;
  z-index: var(--z-top);
  transition: transform var(--duration-fast) var(--ease-linear);
}
```

---

## 4. Interactive State Animations

### Button Hover
```css
.btn-primary {
  transition:
    transform var(--duration-fast) var(--ease-luxury),
    box-shadow var(--duration-normal) var(--ease-luxury),
    background-color var(--duration-fast) var(--ease-out);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

.btn-primary:active {
  transform: translateY(0) scale(0.97);
  box-shadow: var(--shadow-sm);
  transition-duration: var(--duration-instant);
}
```

### Card Lift
```css
.card {
  transition:
    transform var(--duration-normal) var(--ease-luxury),
    box-shadow var(--duration-normal) var(--ease-luxury);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}
```

### Link Underline Draw
```css
.link-draw {
  position: relative;
  text-decoration: none;
}

.link-draw::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--duration-normal) var(--ease-luxury);
}

.link-draw:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### Gold Border Accent on Hover
```css
.feature-card {
  border: 1px solid var(--border-subtle);
  transition:
    border-color var(--duration-normal) var(--ease-luxury),
    box-shadow var(--duration-normal) var(--ease-luxury);
}

.feature-card:hover {
  border-color: var(--color-gold-400);
  box-shadow: var(--shadow-gold);
}
```

---

## 5. Page Transitions

### Route Change (Next.js / React Router)
```tsx
// Wrap page content with this component
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      animation: `klo-fade-up ${400}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
    }}
  >
    {children}
  </div>
);
```

### Modal Open / Close
```css
/* Modal backdrop */
@keyframes backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Modal panel */
@keyframes modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-backdrop {
  animation: backdrop-in var(--duration-normal) var(--ease-out) forwards;
}

.modal-panel {
  animation: modal-slide-up var(--duration-slow) var(--ease-luxury) forwards;
}
```

---

## 6. Loading & Skeleton States

### Pearl Shimmer (Skeleton Loading)
```css
@keyframes klo-shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-pearl-300) 25%,
    var(--color-pearl-200) 37%,
    var(--color-pearl-300) 63%
  );
  background-size: 800px 100%;
  animation: klo-shimmer 1.4s ease infinite;
  border-radius: var(--radius-sm);
}

.skeleton-text    { height: 1em; margin-bottom: 0.5em; }
.skeleton-title   { height: 1.5em; width: 60%; }
.skeleton-image   { height: 240px; width: 100%; }
.skeleton-button  { height: 48px; width: 160px; border-radius: var(--radius-full); }
```

---

## 7. Reduced Motion Compliance

```css
/* All KLO animations MUST include this override */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep opacity transitions — they're safe */
  .animate-fade-in {
    animation: klo-fade-in 200ms var(--ease-out) forwards !important;
  }
}
```

---

## 8. Animation Do's and Don'ts

### ✅ Do
- Animate `opacity`, `transform`, and `filter` — they use the GPU compositor
- Keep simultaneous animations to ≤ 3 properties
- Always define an initial opacity: 0 to prevent flash of unstyled content
- Test animations at 0.25x speed to catch unintended motion
- Provide `will-change: transform` on elements that animate continuously

### ❌ Don't
- Animate `width`, `height`, `top`, `left`, `margin`, or `padding` — they trigger layout
- Use `all` in transitions on complex elements (performance cost)
- Play more than 2 entrance animations simultaneously in a single viewport
- Use bounce or spring easing on serious/transactional moments (e.g., payment confirmation)
- Run animations on page load before critical content is visible

---

## 9. Animation Audit Checklist

Before shipping any animated component:

- [ ] Tested at 0.25x speed — no jarring moments
- [ ] `prefers-reduced-motion` fallback implemented
- [ ] GPU-compositable properties only (transform, opacity, filter)
- [ ] Duration uses design token (no magic numbers)
- [ ] Easing uses `--ease-luxury` or justified alternative
- [ ] Does not block interactivity during animation
- [ ] Skeleton state shown for async content
- [ ] Stagger delay ≤ 500ms total for any group

---

*KLO Design System — Animations Guide*
*Version 1.0 | Last updated: 2026*
