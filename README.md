# Akshit Negi — Portfolio

A dark, animated personal portfolio for **Akshit Negi**, AI Engineer. Single‑page site with a two‑column hero, tech‑stack marquee, scroll‑reveal about, experience, scroll‑stacking project cards, skills, an IEEE publication highlight, and contact.

## Tech stack

- **React 18 + TypeScript** (Vite)
- **Tailwind CSS** (Kanit font, `#0C0C0C` dark theme)
- **Framer Motion** — reveals, scroll‑stacking, reduced‑motion support
- **Lucide React** — icons
- **Vercel Web Analytics** — privacy‑friendly visitor counts (see [`analytics.md`](analytics.md))

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Structure

- `src/data/profile.ts` — all content (bio, experience, projects, skills, publication) in one place
- `src/sections/` — page sections (Hero, Marquee, About, Experience, Projects, Skills, Publication, Contact)
- `src/components/` — reusable UI (Navbar, FadeIn, ContactButton, EmailOptions, AbstractArt, …)
- `public/avatar.png` — profile photo · `public/Akshit_Negi_Resume.pdf` — résumé

Edit `src/data/profile.ts` to update copy, links, and projects.
