# isaactillema.com

Personal portfolio for Isaac Tillema. Structurally inspired by
[brittanychiang.com](https://brittanychiang.com) v4.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, design tokens in `styles/tokens.css`)
- MDX blog via `next-mdx-remote` + `gray-matter` (posts in `content/blog/`)
- `@vercel/analytics` for visitor analytics
- Deployed on Vercel

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint
npm run build        # production build (runs next-sitemap on postbuild)
```

## Editing content

| What | Where |
| --- | --- |
| Bio / name / intro | `data/bio.ts` |
| Navigation links | `data/nav.ts` |
| Social links | `data/socials.ts` |
| Work history | `data/experience.ts` |
| Projects (featured & other) | `data/projects.ts` |
| Skill chips | `data/skills.ts` |
| Resume PDF | `public/resume.pdf` |
| Blog posts | `content/blog/*.mdx` |

## Visual identity

Color, typography, and spacing tokens live in `styles/tokens.css`. Edit the
CSS variables there to retheme the whole site — components reference these
via Tailwind utilities mapped in `app/globals.css` (`bg-bg`, `text-accent`,
`font-mono`, etc.).

## Deploy

1. Push to `main` on GitHub.
2. Import the repo into Vercel (framework auto-detected).
3. Add custom domain `isaactillema.com` (apex) and `www.isaactillema.com`
   (CNAME); set `www` → apex redirect.
