# Success V3 — Premium Web Studio Site

Welcome to the marketing site for a boutique web studio. It’s built to look premium, load fast, and make it effortless for leads to reach you via WhatsApp.

> TL;DR: Modern React + Vite + Tailwind + Framer Motion stack, conversion-focused layout, WhatsApp handoff out of the box.

## What you get (in plain English)
- A polished hero that states what you do in seconds
- Services grid with trust badges (popular, best value, new, top-rated)
- Project carousel with social proof and drag/swipe controls
- WhatsApp contact form that pre-fills the message and opens chat instantly
- Thoughtful animations (purposeful, not distracting) and mobile-first spacing

## Who it’s for
Agencies, freelancers, or in-house teams that want a “premium SaaS” look without rebuilding the front end from scratch.

## Live + Preview
- Local dev: `npm run dev` → http://localhost:3000
- Hosted (GitHub Pages): https://dylan-gorrah.github.io/Success-V3

## Tech stack
| Tech | Why it’s here |
| --- | --- |
| React 18.2 | Component-driven UI |
| Vite 5 | Fast dev server + lean builds |
| Tailwind CSS 3.3 | Utility-first styling, custom palette |
| Framer Motion 10 | Smooth, spring-based animations |
| Lucide React 0.294 | Crisp, lightweight icons |

## Quick start
1) Install deps
```bash
npm install
```
2) Run locally
```bash
npm run dev
```
3) Build for production
```bash
npm run build
```
4) Preview the production build
```bash
npm run preview
```

## Make it yours
- Services: `src/components/Services.jsx`
- Projects: `src/components/Projects.jsx`
- WhatsApp number: `src/components/ContactForm.jsx` (default: +27 677 020 221)
- Company name: `src/components/Navigation.jsx`
- Colors & fonts: `tailwind.config.js` + Google Fonts link in `index.html`

### House palette (neutral luxe)
```
Milk      #FBF7F4
Oat       #E5DED2
Taupe     #A39382
Mocha     #685D54
Charcoal  #232323
```

## Why it converts
- Clear headline + dual CTAs in the hero
- Badges that build trust and signal popularity/value
- Carousel that supports swipe, drag, buttons, and dots
- Low-friction contact: prefilled WhatsApp handoff
- F-pattern layout and responsive spacing tuned for mobile

## Performance + UX notes
- GPU-friendly animations (transform/opacity only)
- Intersection Observer to trigger animations on view
- Lazy loading for images; Vite-optimized bundle
- Mobile polish: scaled typography, relaxed spacing, larger tap targets

## Project structure
```
business-website/
├── src/
│   ├── components/ (Navigation, Hero, Services, KeywordsSidebar, Projects, ContactForm)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Support
Questions or custom tweaks? WhatsApp: **(+27) 677 020 221**

## License
Private project — All rights reserved.
