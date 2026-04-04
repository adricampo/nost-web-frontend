# CLAUDE.md — Nost Web Frontend

## Working relationship

You are the project lead. All decisions — design, architecture, direction — are yours.
My role is to execute them with precision, honesty and craftsmanship.

**What this means in practice:**

- I will never make changes beyond what you ask for. No "while I'm at it" refactors.
- If I spot something wrong or suboptimal that you haven't mentioned, I flag it — I don't fix it silently.
- If a request is technically risky (e.g. destructive git operations, breaking changes to APIs), I explain the risk and ask before proceeding.
- I always commit and push only when you explicitly ask me to.
- If I'm unsure what you want, I ask one focused question rather than guessing.
- I am honest when something I've done isn't working well. I don't defend bad code.

**Quality bar:** This is a professional portfolio project. Code should be something you're proud to show. That means clean structure, consistent patterns, no shortcuts, and no dead code.

---

## Stack

- **Next.js 15** — App Router, server components by default, client only when needed
- **TypeScript** — strict, no `any`, interfaces in `src/lib/types.ts`
- **Tailwind CSS v4** — use theme tokens, never hardcode brand values
- **Framer Motion** — animations only in `'use client'` components
- **Strapi v4** — CMS backend, `http://localhost:1337` in dev

---

## Architecture rules

### Server vs Client components

- Pages are **server components** — they fetch data and pass it down as props.
- Interactive components (animations, state, event handlers) are **client components** — marked `'use client'` at the top.
- Never fetch data inside a client component. Pass it as props from the server.

### Data fetching

All Strapi calls live in `src/lib/strapi.ts`. Never call the Strapi API directly from a component.

In dev: `cache: 'no-store'` (always fresh).
In prod: `revalidate: 3600` (1-hour ISR).

Strapi errors are caught at the page level and logged with `console.error('[Strapi]', e)` in non-production. Pages degrade gracefully — never crash.

### Types

All content types are defined in `src/lib/types.ts`. Strapi response shapes go here and nowhere else.

---

## File map

```
src/
├── app/                         # Pages (server components)
│   ├── page.tsx                 # Landing — hero image
│   ├── projects/page.tsx        # Project listing grid
│   ├── projects/[slug]/page.tsx # Project detail (SSG via generateStaticParams)
│   ├── the-studio/page.tsx      # Studio page
│   ├── contact/page.tsx         # Contact page
│   ├── layout.tsx               # Root layout — fonts, metadata, providers
│   ├── globals.css              # Tailwind base + @theme tokens
│   └── fonts/                   # Self-hosted Stanley + Apercu (woff/woff2)
│
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx           # Fixed nav — grid layout, MENU/INFO buttons
│   │   ├── MenuOverlay.tsx      # Slide-in nav panel (Framer Motion)
│   │   ├── Footer.tsx           # Footer (client — scroll to top)
│   │   ├── FooterWrapper.tsx    # Server wrapper — fetches socials for Footer
│   │   ├── NostLogo.tsx         # SVG logo
│   │   └── Providers.tsx        # Menu state context (client)
│   ├── projects/
│   │   ├── ProjectsPageClient.tsx   # Listing layout (client)
│   │   ├── ProjectCard.tsx          # Thumbnail card
│   │   ├── ProjectDetailClient.tsx  # Detail layout + info panel trigger (client)
│   │   ├── ProjectGallery.tsx       # Gallery blocks renderer (server)
│   │   └── ProjectInfoPanel.tsx     # Slide-in info panel (client, Framer Motion)
│   └── studio/
│       ├── StudioIntroSection.tsx
│       ├── StudioDescriptionSection.tsx
│       ├── StudioTeamSection.tsx
│       └── StudioWorkshopSection.tsx
│
└── lib/
    ├── site.ts     # All site-wide constants and UI strings
    ├── strapi.ts   # API client — the only place Strapi is called
    ├── types.ts    # TypeScript interfaces for all content types
    └── utils.ts    # Pure utility functions
```

---

## Design system

### Colours — always use tokens, never hex in components

| Tailwind class          | Value     | Use                          |
| ----------------------- | --------- | ---------------------------- |
| `bg-navy` / `text-navy` | `#00065C` | Primary backgrounds, text    |
| `text-navy-muted`       | `#9999BB` | Secondary text, placeholders |
| `bg-bg`                 | `#F5F4F1` | Page background              |

`PAGE_BG` in `src/lib/site.ts` holds `#F5F4F1` for use in JS contexts (e.g. NavBar `pageBackground` prop).

### Typography

| Font    | CSS var          | Tailwind class | Use                              |
| ------- | ---------------- | -------------- | -------------------------------- |
| Stanley | `--font-stanley` | `font-stanley` | Body default (set on `body`)     |
| Apercu  | `--font-apercu`  | `font-apercu`  | NavBar, Footer, labels, captions |

Font files are in `src/app/fonts/` and loaded via `next/font/local` in `layout.tsx`.

### Layout

The **50vw split** is the core layout principle of this site:

- NavBar: `grid-cols-[50%_1fr]` — left half empty, right half contains content
- Page content: `paddingLeft: '50vw'` or `style={{ gridTemplateColumns: '50% 1fr' }}`
- This ensures all content starts at exactly the **horizontal midpoint** of the viewport
- Standard page padding: `px-9` (36px) outer margins

---

## NavBar conventions

**Props:** `breadcrumb?`, `centerSlot?`, `showInfoButton?`, `onInfoClick?`, `pageBackground?`, `paddingBottom?`

**Never pass:** removed props (`projectCode`, `projectTitle`, `breadcrumbAlign`, `centerSlotLeft`)

**Grid:** `grid-cols-[50%_1fr] items-stretch`

- Left cell: empty spacer
- Right cell: `flex justify-between items-start h-full`
  - Left side: breadcrumb or `centerSlot` (starts at 50vw)
  - Right side: MENU/CLOSE toggle + optional `[+] Info`

**INFO button alignment:** when `showInfoButton=true`, the right button container uses `flex-col justify-between h-full` so MENU sits at the top and INFO anchors to the bottom of the nav area.

**pageBackground:** when set, the nav gets a solid background + bottom padding. Use `paddingBottom` prop to override the default 65px (e.g. `paddingBottom={20}` on project detail pages).

---

## Strapi populate — critical rules

`populate=*` is **shallow**. It does NOT populate media inside nested components.

For gallery blocks with nested images:

```
populate[galleryBlocks][fields][0]=blockText
&populate[galleryBlocks][fields][1]=blockTextAlign
&populate[galleryBlocks][populate][images][populate]=*
```

Mixing `populate=*` with `populate[x][populate]=*` in the same query causes a **400 error**.
Always use explicit field paths when dealing with nested components.

---

## Constants — where strings live

| What                                                 | Where                                                    |
| ---------------------------------------------------- | -------------------------------------------------------- |
| Site name, tagline, description, email               | `src/lib/site.ts` (from `NEXT_PUBLIC_*` env vars)        |
| Page background colour                               | `src/lib/site.ts` → `PAGE_BG`                            |
| UI messages (no content, copyright, back to top)     | `src/lib/site.ts`                                        |
| Component-specific UI labels (Menu, Close, [+] Info) | Module-level constants at the top of each component file |

Never write hardcoded strings or hex values directly inside JSX.

---

## Git conventions

- Commits only when explicitly asked
- Commit messages: `type: short description` (feat / fix / refactor / docs / chore)
- Never `--force` push, never `--no-verify`, never amend published commits
- Stage files individually — never `git add .` blindly
- `.env.local` is never committed

---

## Known limitations / things to watch

- **NavBar height is not dynamic.** The `[−] Info` button position in `ProjectInfoPanel` is hardcoded to `h-20` to match the NavBar's visual height. If the NavBar height changes (e.g. the center slot wraps to more lines), this value needs manual adjustment.
- **Gallery grid auto-rows** uses `calc((100vw - 72px - 176px) / 12)` — this is calibrated for the current layout. If outer padding changes, this formula needs updating.
- **Strapi populate for deeply nested components** requires explicit field paths. Adding new nested fields to a content type means updating the populate query in `strapi.ts`.
- **`next/image` remote patterns** in `next.config.ts` are set for `localhost:1337` and `*.onrender.com`. A different production Strapi host will need adding here.
