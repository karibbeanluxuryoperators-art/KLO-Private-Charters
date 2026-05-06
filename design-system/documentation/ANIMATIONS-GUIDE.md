# KLO Private Charters — Motion Guide
## Ultra-Luxury Edition · v2.0

> *"Motion is the difference between furniture and architecture. Furniture moves. Architecture settles."*

---

## The Standard

One reference for every animation decision: **watch a Rolls-Royce door close.**

It moves immediately when pushed. It decelerates over a long arc. It arrives with absolute precision. There is no bounce. No overshooting. No hurry.

That is the KLO motion standard.

---

## Core Values

### Duration — Nothing under 380ms for interactions

| Token | Value | Use |
|-------|-------|-----|
| `--dur-snap` | 80ms | Press/active state only — the physical click response |
| `--dur-micro` | 200ms | Color transitions (text, border, background on hover) |
| `--dur-base` | 380ms | Standard interactive elements |
| `--dur-enter` | 600ms | Elements sliding/fading into view |
| `--dur-reveal` | 900ms | Scroll-triggered reveals |
| `--dur-slow` | 1200ms | Hero text reveals, landmark transitions |
| `--dur-cinematic` | 2000ms | Full-page crossfades, opening sequences |

**Why 380ms is the floor:** Below 380ms, UI feels like an app. Above 380ms, it begins to feel like an experience. KLO is an experience.

### Easing — Always decelerate

```css
/* KLO Signature — immediate departure, long trailing arrival */
--ease-klo: cubic-bezier(0.16, 1, 0.3, 1);

/* For large reveals — even longer tail */
--ease-cinematic: cubic-bezier(0.12, 0.8, 0.2, 1);

/* Exits only */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

**Never use:**
- `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce/overshoot) on transactional UI
- Spring animations on booking flows
- Linear easing anywhere visible

---

## 1. Page Entrance

### Hero Reveal Sequence
The hero is the opening line. It sets the register for everything that follows.

```css
/* Step 1: background image fades in (2s) */
@keyframes hero-surface {
  from { opacity: 0; transform: scale(1.04); }
  to   { opacity: 1; transform: scale(1); }
}

/* Step 2: overlay appears (600ms, delayed 400ms) */
@keyframes hero-overlay {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Step 3: eyebrow text (600ms, delayed 600ms) */
@keyframes fade-up-sm {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Step 4: headline (900ms, delayed 900ms) */
@keyframes fade-up-lg {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Step 5: CTA (600ms, delayed 1400ms) */
/* Same as fade-up-sm */

.hero-bg     { animation: hero-surface 2000ms var(--ease-cinematic) both; }
.hero-overlay{ animation: hero-overlay  600ms var(--ease-out)       both; animation-delay: 400ms; }
.hero-eyebrow{ animation: fade-up-sm    600ms var(--ease-klo)       both; animation-delay: 600ms; }
.hero-title  { animation: fade-up-lg    900ms var(--ease-klo)       both; animation-delay: 900ms; }
.hero-cta    { animation: fade-up-sm    600ms var(--ease-klo)       both; animation-delay: 1400ms; }
```

**Total hero load time: ~2s.** The guest watches it arrive. That is intentional.

---

## 2. Scroll Reveals

### The Standard Reveal
```css
@keyframes klo-reveal {
  from {
    opacity: 0;
    transform: translateY(40px);
    /* Note: 40px, not 80px — we are not a landing page startup */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Applied via Intersection Observer */
.will-reveal {
  opacity: 0;
}

.will-reveal.revealed {
  animation: klo-reveal 900ms var(--ease-klo) both;
}
```

### Stagger Grid
```css
/* Grid items arrive in sequence — 120ms apart */
.stagger-grid .will-reveal:nth-child(1) { animation-delay:   0ms; }
.stagger-grid .will-reveal:nth-child(2) { animation-delay: 120ms; }
.stagger-grid .will-reveal:nth-child(3) { animation-delay: 240ms; }
.stagger-grid .will-reveal:nth-child(4) { animation-delay: 360ms; }
.stagger-grid .will-reveal:nth-child(5) { animation-delay: 480ms; }
/* Stop at 5. Never stagger more than 5 — the last item cannot wait too long. */
```

### Intersection Observer (React)
```tsx
const useReveal = (threshold = 0.12) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};
```

---

## 3. Interactive States

### Button — The Most Tested Element

```css
.btn {
  transition:
    background-color var(--dur-micro) var(--ease-out),
    border-color     var(--dur-micro) var(--ease-out),
    box-shadow       var(--dur-base)  var(--ease-klo),
    transform        var(--dur-base)  var(--ease-klo);
}

/* Hover: elevate, no scale — scale feels cheap */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(12, 12, 12, 0.14);
}

/* Active: settle back — the physical feedback */
.btn:active {
  transform: translateY(0);
  box-shadow: none;
  transition-duration: var(--dur-snap);
}
```

### Card Lift
```css
.card {
  transition:
    transform    var(--dur-enter)   var(--ease-klo),
    box-shadow   var(--dur-enter)   var(--ease-klo),
    border-color var(--dur-base)    var(--ease-out);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-float);
  border-color: var(--oro);
}
```

### Navigation Link — The Underline Draw
```css
.nav-link {
  position: relative;
  text-decoration: none;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--oro);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform var(--dur-base) var(--ease-klo);
}

.nav-link:hover::after,
.nav-link[aria-current="page"]::after {
  transform: scaleX(1);
  transform-origin: left center;
}
```

### Input Focus
```css
.input-field {
  border-bottom: 1px solid var(--border);
  transition: border-color var(--dur-base) var(--ease-klo);
}

.input-field:focus {
  border-bottom-color: var(--oro);
  outline: none;
}
```

---

## 4. Modal / Overlay

```css
/* Backdrop */
@keyframes backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Panel */
@keyframes panel-rise {
  from {
    opacity: 0;
    transform: translateY(48px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-backdrop {
  animation: backdrop-in var(--dur-enter) var(--ease-out) both;
}

.modal-panel {
  animation: panel-rise var(--dur-enter) var(--ease-klo) both;
  animation-delay: 80ms; /* Slight delay — backdrop appears first */
}
```

---

## 5. Skeleton / Loading States

```css
/* Pearl shimmer — barely perceptible movement */
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--ivory-warm) 25%,
    var(--ivory)      50%,
    var(--ivory-warm) 75%
  );
  background-size: 1200px 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  /* Slower than typical — luxury doesn't flicker */
}
```

---

## 6. Scroll Progress Indicator

```css
.scroll-line {
  position: fixed;
  top: 0;
  left: 0;
  height: 1px;           /* 1px — a hairline, not a progress bar */
  background: var(--oro);
  transform-origin: left;
  transform: scaleX(0);
  z-index: var(--z-cursor);
  transition: transform 80ms linear;
}
```

```tsx
// Tied to scroll via requestAnimationFrame, not scroll event
const updateScrollLine = () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.querySelector<HTMLElement>('.scroll-line')!.style.transform
    = `scaleX(${Math.min(progress, 1)})`;
};
requestAnimationFrame(function tick() {
  updateScrollLine();
  requestAnimationFrame(tick);
});
```

---

## 7. Page Transition (Next.js / React Router)

```tsx
// Crossfade — the current page does not slide away
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      animation: `klo-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) both`,
    }}
  >
    {children}
  </div>
);
```

---

## 8. Rules — Non-Negotiable

**Always:**
- Use GPU-compositable properties: `transform`, `opacity`, `filter`
- Provide `will-change: transform` on elements with continuous animation (parallax, scroll line)
- Include `prefers-reduced-motion` override (see tokens — all durations become 0ms)
- Test at 0.25× speed. If it looks wrong in slow motion, it is wrong.

**Never:**
- Animate `width`, `height`, `top`, `left`, `margin`, or `padding` — these cause layout reflow
- Use more than 3 simultaneous animations on a single element
- Use bounce or spring easing in booking, payment, or confirmation flows
- Play entrance animations on elements below the fold before the user scrolls to them
- Use `transition: all` — be explicit about which properties transition

---

*KLO Motion Guide · v2.0 · 2026*
