# KLO Private Charters — Implementation Roadmap
## Caribbean Luxury Operators · Design System v1.0

> *"Build it right. Build it once. Build it for the guest."*

---

## Overview

This roadmap delivers the full KLO Luxury UX Polish in four focused weeks. Each phase builds on the last — foundational tokens and primitives first, complex patterns and delight layers after.

**Primary Success Metric:** Booking completion rate  
**Secondary Metrics:** Page load < 2.5s · Lighthouse accessibility ≥ 95 · Time-to-book –30%

---

## Phase 1 — Foundation (Week 1)
**Goal:** Install the design system bones. Every subsequent line of code builds on this.

### Design Tokens & Theme
- [ ] Import `DESIGN-TOKENS.css` globally (before any component styles)
- [ ] Verify CSS variables resolve correctly in all target browsers
- [ ] Configure dark mode toggle (`[data-theme="dark"]`)
- [ ] Set up Google Fonts: Playfair Display + Inter (preconnect, display=swap)
- [ ] Remove all hardcoded hex values from existing codebase

### Typography System
- [ ] Apply Playfair Display to all H1–H3 globally
- [ ] Set body font to Inter, 16px, line-height 1.8
- [ ] Create caption utility class (12px, uppercase, 1px tracking)
- [ ] Audit existing copy and apply [Copy Transformations](./KLO-LUXURY-UX-POLISH.md#brand-voice--copy)

### Button Components
- [ ] Build `<Button>` component (reference `COMPONENT-EXAMPLES.tsx`)
- [ ] Implement all 5 variants: Primary, Secondary, Ghost, Gold, Outline
- [ ] Implement all 3 sizes: sm (32px), md (40px), lg (48px)
- [ ] Add all states: Default, Hover, Active, Disabled, Loading
- [ ] Confirm 48×48px minimum touch targets on mobile

### Hero Section Redesign
- [ ] Swap background to high-res vessel/aircraft photography
- [ ] Apply `rgba(10, 17, 40, 0.4)` gradient overlay for text legibility
- [ ] Add subtle parallax effect (30% scroll speed, passive listener)
- [ ] Replace CTA button with luxury Gold variant
- [ ] Add fade-in entrance animation on page load (300ms ease-out)

### Navigation Refresh
- [ ] Implement sticky header (max-height: 70px)
- [ ] Add `backdrop-filter: blur(20px)` on scroll
- [ ] Apply Cinzel / Inter uppercase styling to nav links
- [ ] Add gold underline hover animation (300ms ease-in-out)
- [ ] Build mobile full-screen overlay menu (slide from right)

**Phase 1 Deliverables:**
- Design tokens active site-wide
- Button component shipped to production
- Hero and nav redesigned

---

## Phase 2 — Core Experience (Weeks 2–3)
**Goal:** Elevate the booking flow and fleet showcase — where conversion happens.

### Form Refinement
- [ ] Implement `<Input>` with floating labels (animate up on focus)
- [ ] Remove full-box borders — use bottom-border only style
- [ ] Add gold focus underline + subtle glow (`box-shadow: 0 2px 0 #D4AF37`)
- [ ] Build `<TextArea>` with same treatment
- [ ] Implement error state: shake animation + icon + accessible error message
- [ ] Implement success state: animated checkmark
- [ ] Add gold asterisk for required fields
- [ ] Validate on blur (not on keystroke)

### Booking Flow — Step Indicator
- [ ] Replace numbered steps with circular progress indicator
- [ ] Use descriptive labels: "Departure → Details → Preferences → Confirmation"
- [ ] Animate step transitions with slide-up (250ms luxury ease)
- [ ] Gold fill for completed steps, pearl for pending

### Date & Time Pickers
- [ ] Style calendar component: gold highlight on selected date
- [ ] Add preset shortcuts: "Next Week," "Next Month," "Custom"
- [ ] Replace time spinners with elegant dropdown

### Aircraft / Vessel Cards
- [ ] Build `<VesselCard>` component (reference `COMPONENT-EXAMPLES.tsx`)
- [ ] Add hover: 5px translateY + shadow expansion (300ms)
- [ ] Add hover overlay with "View Details" CTA
- [ ] Add status badges: "Recommended," "Most Popular" (gold background)
- [ ] Show price in Playfair Display, gold color, prominent
- [ ] Display specs as editorial typography (not table)

### Micro-Interactions
- [ ] Implement stagger-load for card grids (50ms delay per card)
- [ ] Add scroll progress indicator (thin gold line, fixed top)
- [ ] Implement section header fade-in (Intersection Observer, 15% threshold)
- [ ] Add `<Divider variant="ornamental">` between major sections

### Mobile Responsiveness Audit
- [ ] Test all Phase 1 + 2 components at 320px, 375px, 768px
- [ ] Confirm no horizontal scroll on any page
- [ ] Verify all touch targets ≥ 48×48px
- [ ] Confirm font-size scales properly (no text below 16px)

**Phase 2 Deliverables:**
- Complete booking flow redesigned
- Fleet showcase polished
- All form components shipped
- Mobile parity confirmed

---

## Phase 3 — Delight & Polish (Week 3–4)
**Goal:** Add the luxury layer — the details guests feel but can't name.

### Chat UI — Premium Styling
- [ ] User messages: right-aligned, gold-tinted background (15% opacity)
- [ ] AI responses: left-aligned, pearl background with subtle border
- [ ] Add typing indicator: three dots, 600ms stagger pulse animation
- [ ] Gold focus border on chat input field
- [ ] Context sidebar: selected flight details in navy with gold accents
- [ ] Quick-action buttons: "Confirm Booking," "Need Changes," "More Options"
- [ ] Smooth message entrance animation (fade-in + slide-up)

### Confirmation / Success Pages
- [ ] Animated SVG checkmark (draws in, 800ms ease-out)
- [ ] Headline: "Your charter awaits." (Playfair Display, 48px)
- [ ] Booking summary in clean typographic layout
- [ ] CTA pair: "View Itinerary" (primary) + "Need Assistance?" (ghost)
- [ ] Trigger email confirmation on success

### `<Modal>` Component
- [ ] Build `<Modal>` (reference `COMPONENT-EXAMPLES.tsx`)
- [ ] Backdrop fade-in (250ms)
- [ ] Panel slide-up + scale (250ms cubic-bezier(0.34, 1.56, 0.64, 1))
- [ ] Escape key closes
- [ ] Focus trap within modal while open
- [ ] Scroll lock on body while open

### Image Optimization Pass
- [ ] Convert all images to AVIF (WebP fallback, JPEG last resort)
- [ ] Add explicit `width` and `height` to all `<img>` tags
- [ ] Apply `loading="lazy"` to all below-fold images
- [ ] Add `srcset` at 1x, 2x, 3x densities
- [ ] Preload hero image via `<link rel="preload">`

### Animation Audit
- [ ] Add `prefers-reduced-motion` override to all animations
- [ ] Confirm no layout-triggering properties animated (width, height, margin)
- [ ] Test all animations at 0.25× speed — no jarring moments
- [ ] Verify GPU-compositable properties only (transform, opacity, filter)

**Phase 3 Deliverables:**
- Chat UI polished and shipped
- Confirmation flow complete
- All images optimized
- Animation layer finalized

---

## Phase 4 — Performance & Accessibility (Week 4)
**Goal:** Ship with confidence. Every metric in the green.

### Lighthouse Audit
- [ ] Run full Lighthouse audit: Performance, Accessibility, Best Practices, SEO
- [ ] Target scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95
- [ ] Fix all Critical and High severity issues
- [ ] Resolve any color contrast failures (target 7:1 for body text)

### Core Web Vitals
- [ ] LCP < 2.0s — optimize largest above-fold element
- [ ] CLS < 0.05 — fix any layout shift from fonts or images
- [ ] INP < 100ms — profile and fix any interaction delays

### Keyboard & Screen Reader Testing
- [ ] Complete tab-through of entire booking flow (no traps, no dead ends)
- [ ] Test with VoiceOver (macOS/iOS) — all interactive elements announced correctly
- [ ] Test with NVDA (Windows) — form validation errors read aloud
- [ ] Verify all images have descriptive alt text
- [ ] Confirm all form fields have visible labels + aria association

### Cross-Browser QA
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions) — including iOS Safari
- [ ] Edge (latest)
- [ ] Test on real devices: iPhone 14, Samsung Galaxy S23, iPad Pro

### Bundle Optimization
- [ ] Implement route-based code splitting
- [ ] Confirm initial JS bundle < 150KB gzipped
- [ ] Remove unused CSS (PurgeCSS or equivalent)
- [ ] Enable gzip / Brotli compression on server

### A/B Test Setup
- [ ] Baseline metrics captured: booking completion rate, time-to-book
- [ ] A/B test configured for: new booking flow vs. current
- [ ] UTM tracking verified on all CTAs
- [ ] Analytics events firing for: step completions, form errors, charter confirmations

**Phase 4 Deliverables:**
- All Lighthouse scores green
- Full accessibility sign-off
- Cross-browser QA passed
- A/B tests live

---

## Timeline Summary

| Week | Phase | Focus |
|------|-------|-------|
| 1 | Foundation | Tokens, typography, buttons, hero, nav |
| 2 | Core Experience | Forms, booking flow, vessel cards |
| 3 | Delight & Polish | Chat UI, animations, image optimization |
| 4 | Performance & QA | Lighthouse, a11y, cross-browser, A/B tests |

---

## Success Criteria

At end of Week 4, the following must be true:

| Metric | Target | Owner |
|--------|--------|-------|
| Booking completion rate | +10% vs. baseline | Product |
| Time-to-book | –30% vs. baseline | Product |
| Page load time | < 2.5s (P75) | Engineering |
| LCP | < 2.0s | Engineering |
| CLS | < 0.05 | Engineering |
| Lighthouse Accessibility | ≥ 95 / 100 | Engineering |
| Mobile conversion parity | ± 5% of desktop | Product |
| Zero critical a11y failures | 0 | Design / Eng |

---

## Team & Ownership

| Area | Responsible |
|------|-------------|
| Design tokens & component library | Frontend Lead |
| Booking flow & forms | Frontend + Product |
| Chat UI | Frontend + AI Integration |
| Image optimization | DevOps / Frontend |
| Accessibility audit | QA + Design |
| Performance & Lighthouse | Engineering |
| A/B test setup | Growth / Analytics |

---

*KLO Design System — Implementation Roadmap*
*Version 1.0 | Last updated: 2026*
