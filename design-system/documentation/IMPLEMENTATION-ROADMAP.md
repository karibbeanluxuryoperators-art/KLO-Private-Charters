# KLO Private Charters — Implementation Roadmap
## Ultra-Luxury Edition · v2.0

---

## North Star Metric: Booking completion rate.
Everything else is in service of it.

---

## Phase 1 — Foundation (Week 1)
*Install the bones. No visible user-facing work ships this week — just the invisible infrastructure that makes everything else possible.*

### Day 1–2: Token Migration
- [ ] Replace `DESIGN-TOKENS.css` v1 with v2 globally
- [ ] Run codebase grep for all hardcoded hex values — replace with tokens
- [ ] Verify `--obsidian`, `--ivory`, `--oro` render correctly in all browsers
- [ ] Remove all teal, pearl, navy, and deep-sea references from CSS
- [ ] Set up `[data-theme="dark"]` toggle on `<html>` element

### Day 2–3: Typography
- [ ] Load Cormorant Garamond (weights 300, 400) via Google Fonts with `display=swap`
- [ ] Apply globally: display → Cormorant Garamond 300, body → Inter 300
- [ ] Audit every type instance in the codebase — map to new scale
- [ ] Set body: 16px, `--leading-body` (1.75), `--obsidian` at 88% opacity
- [ ] Enforce `max-width: 68ch` on all prose containers

### Day 3–4: Shape & Shadow Cleanup
- [ ] Global border-radius audit: set all cards, buttons, inputs to `0`
- [ ] Remove all heavy box-shadows (blur > 24px) from standard elements
- [ ] Replace with `--shadow-hair` and `--shadow-card` variants only
- [ ] Confirm no element uses bright `#D4AF37` gold — replace with `--oro` (`#B8963E`)

### Day 5: Motion Infrastructure
- [ ] Update all `transition-duration` values to v2 tokens (380ms floor)
- [ ] Replace all easing curves with `--ease-klo`
- [ ] Implement `useReveal` hook (see ANIMATIONS-GUIDE.md)
- [ ] Add scroll progress line (1px, `--oro`, fixed top)

**Gate:** Design and engineering review. No Phase 2 without sign-off.

---

## Phase 2 — Hero & Navigation (Week 2)
*The first 5 seconds. Make them count.*

### Hero Section
- [ ] Full-bleed photography — golden hour, water, vessel
- [ ] Implement 5-step hero reveal sequence (surface → overlay → eyebrow → headline → CTA)
- [ ] Total reveal time: ~2.4s from page load
- [ ] Headline: Cormorant Garamond, 112–144px, weight 300, tracking -0.04em
- [ ] Eyebrow: Inter, 11px, uppercase, `--tracking-ultra` (0.45em)
- [ ] Single CTA: "Begin Your Voyage" — obsidian background, ivory text, 0px radius
- [ ] Subtle parallax on hero image (30% scroll speed, `passive: true`)
- [ ] Static fallback for `prefers-reduced-motion`

### Navigation
- [ ] Reduce header height from 72px → 64px
- [ ] Logo: wordmark only, left-aligned, 100px max-width
- [ ] Nav links: 5 max, Inter 12px, `--tracking-caps`, uppercase
- [ ] On scroll: `rgba(12,12,12,0.80) + blur(24px)` + 1px `--oro` bottom border
- [ ] Hover: gold underline draw animation, 380ms
- [ ] Mobile overlay: full-screen Obsidian, Cormorant 48px links, 3-item stagger

---

## Phase 3 — Booking Flow (Week 2–3)
*Where conversion happens. No compromise.*

### Step Indicator (replace numbers)
- [ ] 4 steps: "Departure" → "Details" → "Preferences" → "Review"
- [ ] Active step: `--oro` fill circle + label below
- [ ] Complete steps: thin check, `--oro` border
- [ ] Pending: `--border` circle, muted label
- [ ] Transition between steps: translateX slide + opacity, 600ms

### Form Inputs — Concierge Style
- [ ] Remove all border boxes — bottom border only
- [ ] Height: 56px
- [ ] Labels: 11px, uppercase, `--tracking-caps`, above field
- [ ] Focus: `border-bottom-color: var(--oro)`, 380ms transition
- [ ] No red error states — use Obsidian at 50% opacity, em dash prefix
- [ ] Validate on blur, never on keystroke
- [ ] Tab order tested — full keyboard navigation through entire flow

### Vessel / Aircraft Selection
- [ ] Rebuild cards: 0px radius, `--shadow-card`, single 1px Oro border on hover
- [ ] Hover: `translateY(-8px)` + shadow + Oro border (600ms)
- [ ] Image zoom on hover: `scale(1.04)`, 600ms
- [ ] Price: Cormorant Garamond, `--text-3xl`, `--oro-dark` color
- [ ] "Recommended" badge: 1px Oro border, no background fill — restrained

### Confirmation Success
- [ ] Animated Oro hairline that draws across the screen (top, 1.2s)
- [ ] Then: headline fades up — "Your charter is arranged."
- [ ] Booking summary: clean typographic layout, `--shadow-hair` dividers
- [ ] Two actions only: "View Itinerary" and "Speak with Your Advisor"

---

## Phase 4 — Finish & Ship (Week 4)
*Performance, accessibility, and the details that guests feel but never see.*

### Image Optimization
- [ ] All images: AVIF first, WebP fallback, JPEG last
- [ ] Every `<img>` has explicit width and height (zero CLS tolerance)
- [ ] `loading="lazy"` on all below-fold images
- [ ] Hero image preloaded via `<link rel="preload">`
- [ ] Hero video: muted, loop, < 8MB, static fallback

### Accessibility Audit
- [ ] All text contrast ≥ 7:1 (above AA — we target AAA on body)
- [ ] Touch targets: 48×48px minimum
- [ ] Full keyboard navigation with visible focus (1px `--oro` outline, 3px offset)
- [ ] VoiceOver test: complete booking flow narrated correctly
- [ ] All images have descriptive alt text — never empty on content images
- [ ] Form: all fields labelled, errors announced via `role="alert"`

### Performance
- [ ] LCP < 2.0s
- [ ] CLS = 0.00
- [ ] INP < 100ms
- [ ] Initial JS bundle < 150KB gzipped
- [ ] Lighthouse Performance ≥ 90 · Accessibility ≥ 95

### Final Review
- [ ] The 10-second test (see UX Polish doc, Section 11) — pass on all key screens
- [ ] Device test: iPhone 15, Samsung Galaxy, iPad Pro, 27" desktop
- [ ] Browser test: Chrome, Safari, Firefox, Edge (latest 2 versions each)
- [ ] iOS Safari specifically — most charter guests are on iPhone

---

## Timeline

| Week | Phase | Outcome |
|------|-------|---------|
| 1 | Foundation | Tokens, type, shape, motion infrastructure |
| 2 | Hero & Nav | First impression completely redesigned |
| 2–3 | Booking Flow | Conversion path rebuilt |
| 4 | Finish & Ship | Performance, a11y, QA, launch |

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Booking completion rate | +15% vs. current baseline |
| Time-to-complete inquiry | < 4 minutes |
| LCP | < 2.0s |
| CLS | 0.00 |
| Lighthouse Accessibility | ≥ 95 |
| 10-second test pass rate | 9/10 testers identify "luxury private charter" |

---

*KLO Roadmap · v2.0 · 2026*
