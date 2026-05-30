### SKILL.md


# SKILL.md — Portfolio Technical Blueprint & AI Development Guide

> **Project**: Personal Portfolio — “Creativity, Nobility, Luxury”
> **Role**: Senior Full‑Stack / Prompt Engineer / AI Engineer
> **Goal**: Craft a portfolio that feels exclusive, deliberate, and sublimely crafted.

> **Design source hierarchy**: `ELEGANT_DESIGN.md` (visual tokens) and `ELEGANT_SKILL.md` (design philosophy) are the **upstream specs** that define the Elegant system. `DESIGN.md` and this `SKILL.md` are the **implementation-facing** documents that translate those specs into the codebase (Tailwind tokens, conventions). When the two diverge, the ELEGANT files win for static visual attributes; DESIGN.md/SKILL.md win for motion, architecture, and engineering rules. Always read both layers before a visual change.


---

## 1. Core Tech Stack

| Layer           | Technology                        | Version Requirement      |
|-----------------|-----------------------------------|--------------------------|
| Framework       | Next.js (App Router)              | 14+                      |
| Language        | TypeScript                        | 5+                       |
| Styling         | Tailwind CSS                      | 3.4+ (with custom config)|
| Motion          | Framer Motion                     | 11+                      |
| 3D (optional)   | React Three Fiber + Drei          | 8+                       |
| Content (CMS)   | Sanity.io                         | latest                   |
| Deployment      | Vercel                            | —                        |

---

## 2. Project Structure & Conventions

```
/
├── app/
│   ├── layout.tsx          # Root layout, global fonts, metadata
│   ├── page.tsx            # Hero / intro
│   ├── work/
│   │   ├── page.tsx        # Project listing
│   │   └── [slug]/page.tsx # Individual project
│   └── about/page.tsx
├── components/
│   ├── ui/                 # Atomic luxury components (Button, Panel, etc.)
│   ├── layout/             # Header, Footer, Navigation
│   ├── home/               # Hero, FeaturedProjects, 3DScene
│   └── shared/             # AnimatedText, RevealSection, CustomCursor
├── lib/
│   ├── sanity.ts           # Sanity client
│   └── utils.ts
├── styles/
│   └── globals.css         # Tailwind directives, custom fonts, base styles
├── sanity/                 # Sanity Studio configuration
│   ├── schemas/
│   │   └── project.ts
│   └── sanity.config.ts
├── public/
│   └── images/             # Static fallback assets
├── tailwind.config.ts
└── DESIGN.md               # This project’s design authority
```

**Guiding principle**: Every file must have a clear, single responsibility. No sloppy imports; use barrel files when sensible.

---

## 3. Development Rules for AI Assistants

When generating, modifying, or reviewing code, strictly obey these rules:

1. **TypeScript every component**. All props must be typed with an interface; no `any`.
2. **App Router first**. Use `"use client"` only where interactivity (hooks, motion) is needed. Default to Server Components.
3. **Luxury mindset**: 
   - Code must be clean, readable, and well‑commented (JSDoc for major functions).
   - Avoid eager, flashy effects. Prefer subtle, physics‑based animations.
   - Images must use `<Image>` from `next/image` with explicit width/height.
4. **Design token enforcement**: Always reference Tailwind config tokens (e.g., `text-primary`, `bg-surface`, `text-ink`). Never hardcode hex values in components. The accent (`primary`) appears once per viewport; muted text is `ink` with an alpha modifier (`text-ink/60`+ for body-size copy to hold WCAG AA on white).
5. **Performance**: Keep client bundles lean. Use `next/dynamic` for heavy 3D scenes, lazy loading Framer Motion’s `AnimatePresence` only where required.
6. **Accessibility**: All interactive elements must have visible focus states, proper ARIA labels, and semantic HTML.

---

## 4. Core Architectural Patterns

### 4.1 Page Transitions (Layout‑level)
Use a template file (`template.tsx`) inside the `app` directory to wrap children with `AnimatePresence` and a fade/slide motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.div>
```

### 4.2 Scroll‑Based Storytelling
Use Framer Motion’s `useScroll` and `useTransform` for parallax and reveal sequences. Create a reusable `RevealSection` component that staggers children on scroll entry.

### 4.3 3D Hero (Optional)
- Load the 3D scene with `next/dynamic({ ssr: false })`.
- Use a lightweight Drei `<Float>` component for gentle rotation.
- Keep geometry minimal: a torus knot with metallic material, lit by a single spotlight.

### 4.4 Data Fetching (Sanity)
- Use Sanity’s GROQ queries inside server components.
- Implement Incremental Static Regeneration (`revalidate` option) for project pages.
- Fallback gracefully: if Sanity is unreachable, render hardcoded “coming soon” content.

---

## 5. Deployment & Quality Gates

- **Vercel**: Connect the repository; enable automatic previews.
- **Lighthouse targets**: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- **Pre‑commit**: Run `next lint` and `tsc --noEmit`. No errors allowed.

---

## 6. AI Prompt Engineering Custom Instructions

When asked to build a new feature, the AI must:
- First propose a plan describing the files and data flow.
- Then implement, strictly following the DESIGN.md token system.
- Include motion variants as exported constants (e.g., `fadeInUp`, `staggerContainer`).
- Ensure every component is responsive (mobile‑first) and respects `prefers-reduced-motion`.
---