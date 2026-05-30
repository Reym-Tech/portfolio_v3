### DESIGN.md

# DESIGN.md — Elegant Portfolio Design System

> **Motto**: *“Effortless, deliberate, and luminous — refined down to the last pixel.”*

This document defines the visual language, tokens, and interaction principles. Any deviation must be justified.

> **Lineage**: The visual language evolved from a dark gold-on-black palette to the **Elegant** system (see `ELEGANT_DESIGN.md`, the upstream spec). Static attributes — color, typography, spacing, radii — now follow Elegant. The motion language, imagery treatment, and luxury interaction philosophy (subtlety, restraint, one signature accent) are unchanged. The intent remains *creativity, nobility, luxury* — now expressed through light, air, and delicate type rather than darkness and gold.

---

## 1. Color Palette

| Token Name       | Value     | Usage                                         |
|------------------|-----------|-----------------------------------------------|
| `primary`        | `#3B82F6` | Accent, links, key highlights, focus ring     |
| `secondary`      | `#8B5CF6` | Secondary accent — nobility note, used sparingly |
| `success`        | `#16A34A` | Positive / confirmation states                |
| `warning`        | `#D97706` | Caution states                                |
| `danger`         | `#DC2626` | Errors, destructive actions                   |
| `surface`        | `#FFFFFF` | Primary background                            |
| `surface-muted`  | `#F3F4F6` | Cards, plates, tag chips (derived elevation)¹ |
| `ink`            | `#111827` | Primary text                                  |
| `neutral`        | `#FFFFFF` | Text/icon on `primary` fills                  |

¹ `surface-muted` is derived: `ELEGANT_DESIGN.md` defines only `surface`/`neutral` (both `#FFFFFF`); cards and chips need one quiet step of elevation against the white page.

**Application rule**: Use `primary` only for a single focal element per viewport (a button, a heading underline, a cursor ring). Overuse kills exclusivity. Muted text uses `ink` with an alpha modifier (`text-ink/60` minimum for body-size text to hold WCAG AA contrast on white).

---

## 2. Typography

- **Display (Headings)**
  *Google Sans* — clean, refined sans-serif. Google Sans is proprietary and not served by Google Fonts; **Inter** is the loaded open substitute and the functional fallback. Delicate weights: `font-light` (300) for large display, `font-medium` (500) for section headings. Tracking: `-0.01em`.

- **Body**
  *Google Sans* (Inter fallback) — the same family as display, for a quiet, cohesive voice. Weights: 300–600. Line-height: 1.6.

- **Code / Captions**
  *Anonymous Pro* — monospace. Weights: 400, 700.

**Scale** — `14 / 16 / 18 / 24 / 32 / 40`, base 16px:
- sm: 0.875rem (14)
- base: 1rem (16)
- lg: 1.125rem (18)
- xl: 1.5rem (24)
- 2xl: 2rem (32)
- 3xl: 2.5rem (40 — h1 / hero ceiling)

Tailwind extends `fontFamily` and `fontSize` to exactly this scale; sizes above 40px are intentionally absent — presence comes from weight, tracking, and white space, not scale.

---

## 3. Spacing, Grid & Radii

- Base unit: **4px**. Rhythm: `4 / 8 / 12 / 16 / 24 / 32` (Tailwind `1/2/3/4/6/8`).
- Border radii: `sm` = 4px, `md` = 8px. Nothing rounder — restraint reads as precision.
- Section padding: `py-32` / `px-8` on desktop, `py-20` / `px-6` on mobile.
- Maximum content width: `max-w-7xl` (80rem), centered.
- Card gaps: exactly `gap-8`; never uneven.

**White space**: Generous negative space is the luxury signal. Never be afraid of large empty areas around a single, powerful element — on a white page, the air does the work.

---

## 4. Surfaces & Elevation

- **Background**: `surface` (`#FFFFFF`), clean and untextured. The calm of the white page is the matte canvas; nothing competes with the work.
- **Cards / Panels**:
  `bg-surface-muted/80 backdrop-blur-md border border-ink/10 rounded-md`.
  A whisper of elevation against the page — precision, not decoration.
- **Hover state**: a soft `shadow-elevate` and a subtle scale (`scale-[1.01]`).

---

## 5. Motion & Micro‑interactions

*(Unchanged — motion is the constant across the redesign.)*

### Presets (Framer Motion variants)

```ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
```

### Cursor
Replace default cursor with a custom `<CustomCursor />` component: a 20px circle that follows the mouse (using `useMotionValue`) and expands to 48px over links. Color: `primary` border with transparent fill.

### Scroll Behaviors
- Images gently scale up (`scale: [0.95, 1]`) as they enter the viewport.
- Section dividers are thin 1px lines (`bg-ink/10`) that animate width from 0 to 100% on scroll (use `whileInView`).

### Transition Easing
All motion must use the luxury bezier: `cubic-bezier(0.22, 1, 0.36, 1)`. It mimics the soft‑close of a high‑end cabinet.

---

## 6. Imagery & Multimedia

*(Unchanged.)*

- **Aspect ratios**: 16:9 for hero, 4:3 for project thumbnails, 1:1 for team/avatar.
- **Filters**: a uniform `contrast(1.02) brightness(0.98)` applied via Tailwind’s `filter` utility to give photos a cohesive, slightly muted editorial look.
- **Loading**: Blur‑up placeholder (Next.js `placeholder="blur"` with base64‑encoded `blurDataURL`).

---

## 7. Component‑Specific Guidelines

### Navigation
Fixed top bar, transparent background that transitions to `bg-surface/80 backdrop-blur-lg` after 80px scroll. Menu links: `text-ink/60` → `text-primary` on hover. Active page link has a 2px bottom border of `primary`.

### Project Cards
- Cover image with `aspect-[4/3]`, object-cover, `rounded-md`.
- Title in Google Sans, below the image, with a `primary` underline that grows on hover.
- Subtle tech tags (small Anonymous Pro text, `surface-muted` background).

### 3D Scene (optional)
- Light, neutral environment to keep reflections soft and clean.
- `ambientLight` intensity 0.2 + `spotLight` at `[10, 10, 10]`.
- Object: a smooth geometry with `meshStandardMaterial` (roughness 0.1, metalness 1, color `#3B82F6`).

---

## 8. Branding & Nobility

- **Logo**: Your name in Google Sans, weight 500, with a discreet `primary` dot.
- **Tone of voice**: Concise, confident, never boastful. Use phrases like “Selected Works” not “My Portfolio”; “Craft” not “Skills”.
- **Footer**: minimal, centered, with a single line: “Handcrafted with attention to every pixel — [Your Name] [Year]”.

---

**Living Document**: This DESIGN.md is the implementation source of truth, downstream of `ELEGANT_DESIGN.md`. Every visual decision must be traceable back to a token defined here. Elegance is consistency.
