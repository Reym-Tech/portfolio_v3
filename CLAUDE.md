# Project Instructions

Luxury portfolio: "Creativity, Nobility, Luxury" — Next.js + TypeScript + Tailwind + Framer Motion + Sanity.

## Commands

```bash
npm run dev              # start dev server (http://localhost:3000)
npm run build            # build for production
npm run lint:fix         # auto-fix linting issues
npm run typecheck        # check TS types
```

## Key Decisions

- **Design tokens in Tailwind config**: All colors, fonts, spacing derive from DESIGN.md. Hardcoding values is a code smell.
- **Server Components by default**: Use `"use client"` only for interactivity (Framer Motion, forms, hooks). Sanity queries in server components via `sanityFetch()`.
- **Luxury mindset over flashiness**: Motion uses the luxury bezier `cubic-bezier(0.22, 1, 0.36, 1)`. Images scaled 0.95→1, sections animated on scroll.

## Workflow

- Check DESIGN.md for every visual decision; it's the source of truth.
- Run `npm run typecheck` after series of changes.
- Component structure: PascalCase files, one component per file, props typed with interfaces.
