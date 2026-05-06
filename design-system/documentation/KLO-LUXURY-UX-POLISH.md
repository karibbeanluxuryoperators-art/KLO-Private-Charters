# KLO Private Charters — Ultra-Luxury UX Standard
## v2.0 · The Definitive Edition

> *"The best luxury is invisible. The guest never notices the design — they only feel the experience."*

Reference tier: **Rolls-Royce Bespoke · NetJets · Chanel · Cartier · Six Senses**

---

## The Governing Principle

Every screen must pass one question before it ships:

> **"Would a guest who just paid $80,000 for a charter feel embarrassed showing this to a friend?"**

If there is any doubt — it goes back.

---

## 1. Palette — Three Colors

Ultra-luxury brands are defined by their restraint. Rolls-Royce uses black, white, and silver. Chanel uses black and white. Cartier uses red and white.

KLO uses three:

| Role | Token | Value | Philosophy |
|------|-------|-------|------------|
| Ground | `--obsidian` | `#0C0C0C` | Not pure black — black is cheap. This has warmth. |
| Field | `--ivory` | `#F4EFE6` | Not white — white is sterile. Ivory says *aged linen*. |
| Accent | `--oro` | `#B8963E` | Not bright gold — this is antique, patinated, old money. |

**The 10% Rule:** Oro appears on no more than 10% of any screen. It marks the important thing. One important thing per screen.

**What was removed and why:**
- Teal/turquoise → too Caribbean resort, not enough ultra-private
- Navy blue → too corporate aviation, too generic
- Multiple grays → replaced by opacity variants of Obsidian
- Pearl variations → replaced by single Ivory tone

---

## 2. Typography — The Display Serif Is Everything

The single most important design decision for ultra-lux is the headline typeface. Every other choice follows from it.

**The KLO Display: Cormorant Garamond**

```css
font-family: 'Cormorant Garamond', Didot, 'Bodoni MT', Georgia, serif;
font-weight: 300;         /* Light — never Bold for headlines */
letter-spacing: -0.04em;  /* Tight tracking on large display */
line-height: 1.05;        /* Cinematic — almost no air between lines */
```

Why Cormorant Garamond:
- High contrast between thick and thin strokes (the Didot quality, free)
- Extremely elegant at 88–144px
- Used by luxury houses globally because it reads as *earned*
- The hairline strokes read as restraint — you earn the right to use a font this delicate

**Scale in practice:**

| Use | Size | Weight | Tracking |
|-----|------|--------|----------|
| Hero headline | 112–144px | 300 | -0.04em |
| Section title | 64–88px | 300 | -0.03em |
| Card title | 36–48px | 400 | -0.02em |
| Eyebrow labels | 11–12px | 400 | 0.40em (UPPERCASE) |
| Body copy | 16–18px | 300 | 0 |
| Fine print | 12px | 400 | 0.05em |

**Never:**
- Bold or Black weight for display — this is a private charter, not a sale
- Mix a third typeface into any single screen
- Set body copy below 16px
- Use all-caps on anything larger than 14px

---

## 3. Space — The Most Expensive Material

In ultra-luxury, whitespace is not empty space. It is the primary luxury signal.

**Section padding (desktop):**
- Hero: 256px top, 192px bottom
- Standard sections: 160px top and bottom
- Compact (stats, testimonials): 96px top and bottom

**Mobile:** Divide by 2. Still generous. Never collapse below 48px vertical padding.

**Content max-width:** 1100px. Tighter than most sites. Lines of body text should be ≤ 68 characters. Long line lengths are for newspapers, not private aviation.

**The silence test:** After designing a section, reduce all content by 20% — can it breathe more? Usually yes.

---

## 4. Shape Language — Sharp, Architectural, Deliberate

Ultra-lux brands use zero or near-zero border radius. Sharp corners are:
- Architectural (refer to Cartier jewellery cases)
- Deliberate (nothing happened by accident)
- Authoritative (rounded corners say approachable, sharp corners say certain)

```
Cards:    border-radius: 0
Buttons:  border-radius: 0   (or 1px — the merest softening)
Inputs:   border-radius: 0
Modals:   border-radius: 0
Images:   border-radius: 0
```

The only exception: avatar images and circular indicators (booking steps).

---

## 5. Shadows — Barely There

Ultra-lux doesn't need drop shadows to communicate elevation. If your layout needs heavy shadows to feel three-dimensional, the layout is the problem.

**Permitted shadows:**
- `--shadow-hair` — a single 1px hairline separator
- `--shadow-subtle` — for floating elements (nav on scroll)
- `--shadow-card` — barely visible card lift, only on hover

**Forbidden:**
- Dark, dramatic drop shadows
- Colored glows on standard elements
- `box-shadow` with blur > 48px unless it's `--shadow-modal`

---

## 6. Motion — The Rolls-Royce Standard

When a Rolls-Royce door closes, it doesn't slam. It settles. That is the sensation every animation should produce.

**Duration floor:** Nothing interactive animates in less than 380ms. Below that, it feels like a web app, not a charter.

**The KLO ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- Sharp departure (things respond immediately)
- Very long deceleration tail (they arrive with inevitability)
- Never use bounce. Never use spring on transactional UI.

**Scroll reveals:** 900ms, KLO ease, translateY(40px) → 0. Stagger grid items at 120ms intervals. Maximum 5 items in any stagger group — don't make guests wait.

**Page transitions:** Cross-fade, 600ms. The next page appears; the last page doesn't "fly away."

**What was slowed down vs. v1:**
- Hover: 200ms → 380ms
- Card lift: 300ms → 600ms
- Scroll reveals: 400ms → 900ms
- Page transition: 200ms → 600ms

---

## 7. Copy — The Register of Absolute Confidence

Ultra-luxury copy does not ask. It does not persuade. It informs, with total certainty that the reader is already in.

### The Voice Test
Read your copy out loud. Imagine you are a 60-year-old Barbadian in a white linen jacket, standing on a dock, who has been arranging private voyages for 30 years. Would he say this? If not, rewrite it.

### Transformations

| Generic | KLO Ultra-Lux |
|---------|--------------|
| "Book a Charter" | "Begin Your Voyage" |
| "Select Aircraft" | "Choose Your Vessel" |
| "Continue" | "Proceed" |
| "Thank you for your booking" | "Your charter is arranged." |
| "Loading..." | *(nothing — show a progress line)* |
| "Error — please try again" | "One moment. We're attending to this." |
| "Submit" | "Send Enquiry" |
| "Sign Up" | "Request Access" |
| "Login" | "Enter" |
| "Contact Us" | "Speak with an Advisor" |
| "Learn More" | *(remove — show more directly)* |
| "View Details" | "Explore" |
| "Add to Cart" | *(never exists)* |

### Copy length
- Hero headline: 3–6 words. Never a sentence.
- Hero subhead: One sentence. Maximum 12 words.
- Body paragraphs: Maximum 4 sentences. Then a new paragraph.
- CTA labels: 1–3 words.

---

## 8. Navigation

**Desktop header:**
- Max height: 64px (tighter than before — less visual weight)
- Logo: wordmark only, left-aligned, 100px wide
- Nav: center, 5 items max, Inter 12px, `0.30em` letter-spacing, uppercase
- Right: Single CTA — "Begin Your Voyage" or just a thin gold horizontal line + "Enquire"
- Background: transparent on hero, `rgba(12,12,12,0.80) + blur(24px)` on scroll
- On scroll: add a 1px Oro bottom border (`--border-accent`) — ultra-subtle brand signature

**Mobile:**
- Full-screen take-over, Obsidian background
- Cormorant Garamond headlines, 48px, one per line
- 3-second stagger animation — they arrive one at a time
- Logo stays top-left, close target top-right (48×48px)

---

## 9. Forms — The Concierge Intake

The charter inquiry form is not a form. It is the first concierge interaction. Design it that way.

**Layout rule:** One field visible at a time on mobile. On desktop, a maximum of two fields per row.

**Input style:**
- No border box. Bottom border only: `border-bottom: 1px solid var(--border)`
- On focus: bottom border becomes Oro: `border-bottom-color: var(--oro)`
- Background: transparent (inherits page surface)
- Label: above, 11px, uppercase, `0.30em` tracking
- Height: 56px (more generous than before)
- No border-radius

**Messaging:**
- Placeholder: light, helpful, disappears on first keystroke
- Error: below field, 12px, Obsidian at 50% opacity + a em dash: "— Please enter a valid date"
- Never red. Error copy in the same family as body copy, slightly reduced.

---

## 10. The Imagery Standard

Photography is 70% of ultra-luxury perception. The design system supports the photography — it does not compete with it.

**Direction for all hero photography:**
- Time of day: golden hour or blue hour. Never midday.
- Water: always present. Must show the quality of light on water.
- People: if present, hands only, or turned away. Never faces.
- Color grade: lifted blacks (not crushed), slightly warm, desaturated highlights.
- Aspect ratio: 16:9 for full-bleed heroes. Never crop tighter than 4:3 for cards.

**Overlay rule:** Dark hero images: no overlay needed. Light/bright images: `rgba(12,12,12,0.45)` overlay. Never more — it buries the photography, which is why they came.

**Image sizing:** All images declare explicit width and height in HTML. No layout shift, ever. Cumulative Layout Shift of 0 is non-negotiable.

---

## 11. The 10-Second Test

Before shipping any screen, hand it to someone who has never seen it and give them 10 seconds.

Ask: "What does this company do? What do they stand for?"

If the answer includes the words *"expensive," "private," "exclusive," or "Caribbean"* without any prompting — the screen passes.

If they say *"travel booking"* or *"nice website"* — it goes back.

---

*KLO Design System — Ultra-Luxury UX Standard*
*Version 2.0 | 2026 | For internal use only*
