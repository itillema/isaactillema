# isaactillema.com

Personal portfolio and writing space for Isaac Tillema.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, design tokens in `styles/tokens.css`)
- Inter via `next/font/google`
- MDX posts via `next-mdx-remote` + `gray-matter` (sources in `content/blog/`)
- Resend for the contact form (server actions in `lib/contact-action.ts`)
- `@vercel/analytics` for visitor analytics
- Deployed on Vercel

## Routes

| Path | Source | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Single-page portfolio: sticky sidebar + scrolling sections (About, Experience, Education, Projects, Version Control, Contact) |
| `/commits` | `app/commits/page.tsx` | Full-width archive of every post, rendered as a hierarchical card grid |
| `/commits/[slug]` | `app/commits/[slug]/page.tsx` | Individual post (MDX) with a smart back button |
| `/blog`, `/blog/[slug]` | `next.config.ts` redirects | 308-redirect to the `/commits` equivalent |

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
| Name, role, tagline, intro, resume link | `data/bio.ts` |
| Sidebar navigation entries | `data/nav.ts` |
| Sidebar social icons (GitHub, LinkedIn, …) | `data/socials.ts` |
| Work history | `data/experience.ts` |
| Education and certifications | `data/education.ts` |
| Projects (featured + other) | `data/projects.ts` |
| Resume PDF | `public/resume.pdf` |
| Posts | `content/blog/*.mdx` (frontmatter: `title`, `description`, `date`, optional `tags`, `draft`, `ogImage`) |

## Contact form

The contact section on the home page submits via a server action that emails through Resend. Configure these env vars in `.env.local` for dev and in Vercel project settings for production:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from your Resend account |
| `CONTACT_TO_EMAIL` | yes | Inbox that receives form submissions |
| `CONTACT_FROM_EMAIL` | no | `From:` header for outbound mail (e.g. `Contact <hello@yourdomain.com>`). Domain must be verified in Resend. Defaults to Resend's `onboarding@resend.dev` sandbox sender. |
| `RESEND_AUDIENCE_ID` | no | When set, opt-in checkbox writes submitters to this Resend audience. Submissions still go through if missing. |

The form gracefully shows an error message if `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing — no crash.

## Theming

Color, typography, and spacing tokens live in `styles/tokens.css`. Edit the CSS variables there to retheme the whole site — components consume them through Tailwind utilities mapped in `app/globals.css` (`bg-bg`, `text-accent`, `bg-glass`, etc.). The accent gradient (mint → cyan → sky-cyan) drives the cyan tag pills, focus rings, and gradient hover effects.

## Deploy

1. Push to `main` on GitHub.
2. Import the repo into Vercel (framework auto-detected).
3. Add the four contact-form env vars under Vercel → Settings → Environment Variables.
4. Add custom domain `isaactillema.com` (apex) and `www.isaactillema.com` (CNAME); set `www` → apex redirect.
