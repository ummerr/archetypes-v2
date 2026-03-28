# KWML Archetype Explorer

An interactive site for exploring the archetypes of the mature masculine from *King, Warrior, Magician, Lover* by Robert Moore & Douglas Gillette (1990).

Starting with Boy and Man Psychology archetypes and their positive/negative poles, with a vision to scale toward archetype maps, tarot decks, and more.

## Overview

The framework maps the masculine psyche into two tiers -- **Boy Psychology** (immature) and **Man Psychology** (mature) -- with 4 archetypes each. Every archetype has a healthy fullness pole and two shadow poles (active/inflated and passive/deflated), forming Moore's bipolar shadow system.

**Boy Psychology &rarr; Man Psychology:**

| Boy | Man | Energy |
|---|---|---|
| Divine Child | King | Wonder &rarr; Sovereign ordering & blessing |
| Precocious Child | Magician | Curiosity &rarr; Deep knowledge & transformation |
| Oedipal Child | Lover | Warmth &rarr; Passionate embodiment & connection |
| Hero | Warrior | Courage &rarr; Disciplined, purposeful action |

8 archetypes &times; 3 poles each = **24 psychological positions** to explore.

## Features

- **Radial quadrant map** -- Home page with King (top), Warrior (left), Lover (right), Magician (bottom) arranged around a central "Self" node with animated SVG connecting lines
- **8 archetype detail pages** -- Full descriptions, key characteristics, access markers, and evolution arrows linking boy/man counterparts
- **Interactive SVG shadow triangles** -- Click to explore the fullness (apex), active shadow (bottom-left), and passive shadow (bottom-right) for each archetype
- **Sovereign Gold design system** -- Dark warm-black base, archetype-mapped accent colors (gold, crimson, emerald, rose), film grain texture, ambient glow effects
- **Fully static** -- All pages pre-rendered at build time via `generateStaticParams`

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for page transitions and SVG animations
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Inter](https://fonts.google.com/specimen/Inter) via `next/font`

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to explore.

## Project Structure

```
src/
  app/
    page.tsx                    # Home -- radial quadrant map
    about/page.tsx              # Framework overview
    archetype/[slug]/page.tsx   # Dynamic archetype detail (8 pages)
    layout.tsx                  # Root layout, fonts, nav/footer
    globals.css                 # Tailwind theme, noise texture, glow utilities
  components/
    QuadrantMap.tsx             # Radial map with SVG lines and center node
    ShadowTriangle.tsx          # Interactive SVG triangle (fullness + shadows)
    EvolutionArrow.tsx          # Boy-to-Man visual connector
    NavBar.tsx                  # Fixed top nav with blur backdrop
    Footer.tsx                  # Attribution footer
    PageTransition.tsx          # Framer Motion fade/slide wrapper
  data/
    archetypes.ts               # All 8 archetypes, colors, family groups, lookups
  types/
    archetype.ts                # TypeScript type definitions
  lib/
    utils.ts                    # Color utilities
```

## Routes

| Route | Page |
|---|---|
| `/` | Radial quadrant map |
| `/about` | Framework overview |
| `/archetype/the-king` | King detail |
| `/archetype/the-warrior` | Warrior detail |
| `/archetype/the-magician` | Magician detail |
| `/archetype/the-lover` | Lover detail |
| `/archetype/the-divine-child` | Divine Child detail |
| `/archetype/the-hero` | Hero detail |
| `/archetype/the-precocious-child` | Precocious Child detail |
| `/archetype/the-oedipal-child` | Oedipal Child detail |

## Design

**Palette** -- Sovereign Gold + Deep Archive

| Role | Color | Hex |
|---|---|---|
| Background | Warm black | `#08080A` |
| Surface | Dark surface | `#111113` |
| Text | Off-white | `#EDEDEC` |
| Gold (King) | Sovereign gold | `#D4AF37` |
| Crimson (Warrior) | Deep red | `#C0392B` |
| Emerald (Magician) | Forest green | `#1B9E6B` |
| Rose (Lover) | Warm rose | `#D4828F` |

**Typography** -- Cormorant Garamond for serif headlines, Inter for sans body text.

## Deploy

Static export works with any host. For Vercel:

```bash
npm run build
# Deploy .next output to Vercel, Netlify, or any static host
```

## Research

See [KWML-Research.md](./KWML-Research.md) for the comprehensive research document covering all archetypes, shadow systems, Jungian foundations, and structural mappings.

## License

MIT
