# Nost Interiors — Web Frontend

Official website for **Nost Interiors**, a Barcelona-based interior design studio specialising in residential, corporate and hospitality projects.

Built with Next.js 15 and connected to a Strapi v4 CMS backend for all dynamic content.

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 15 (App Router)                       |
| Language   | TypeScript                                    |
| Styling    | Tailwind CSS v4                               |
| Animations | Framer Motion                                 |
| CMS        | Strapi v4                                     |
| Fonts      | Stanley (headings), Apercu (UI) — self-hosted |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing — full-screen hero image
│   ├── projects/
│   │   ├── page.tsx            # Projects listing grid
│   │   └── [slug]/page.tsx     # Project detail
│   ├── the-studio/page.tsx     # Studio — team, description, workshop
│   ├── contact/page.tsx        # Contact info
│   ├── fonts/                  # Self-hosted font files (woff/woff2)
│   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   ├── globals.css             # Tailwind base + CSS variables
│   └── icon.tsx                # App icon
│
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx          # Fixed top nav — breadcrumb, center slot, menu/info buttons
│   │   ├── MenuOverlay.tsx     # Slide-in navigation panel
│   │   ├── Footer.tsx          # Footer — back to top, copyright, social links
│   │   ├── FooterWrapper.tsx   # Server wrapper — fetches contact info for footer
│   │   ├── NostLogo.tsx        # SVG logo component
│   │   └── Providers.tsx       # Client providers — menu state context
│   │
│   ├── projects/
│   │   ├── ProjectsPageClient.tsx   # Projects listing with responsive grid
│   │   ├── ProjectCard.tsx          # Project thumbnail card
│   │   ├── ProjectDetailClient.tsx  # Project detail layout + info panel trigger
│   │   ├── ProjectGallery.tsx       # Gallery blocks renderer
│   │   └── ProjectInfoPanel.tsx     # Slide-in project info panel
│   │
│   └── studio/
│       ├── StudioIntroSection.tsx        # Hero image + tagline
│       ├── StudioDescriptionSection.tsx  # Two-column description text
│       ├── StudioTeamSection.tsx         # Team members grid
│       └── StudioWorkshopSection.tsx     # Workshop/atelier images
│
└── lib/
    ├── site.ts     # Site-wide constants (name, colours, UI strings)
    ├── strapi.ts   # Strapi API client — all data fetching functions
    ├── types.ts    # TypeScript interfaces for all Strapi content types
    └── utils.ts    # Utility helpers (e.g. social handle formatting)
```

---

## CMS — Strapi

All content is managed through a **Strapi v4** backend. The frontend fetches data server-side at request time (development) or with 1-hour revalidation (production).

### Content Types

| Collection     | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `projects`     | Portfolio projects — name, slug, category, cover image, gallery blocks, metadata |
| `landing`      | Homepage hero images                                                             |
| `studio`       | Studio page — tagline, description, team members, workshop images                |
| `contact-info` | Contact details — phone, email, social links                                     |

### Gallery Architecture

Each project has an array of **GalleryBlocks**. Every block contains:

- `images` — array of `GalleryImage` with layout (`small` / `medium` / `large` / `xl`) and optional grid position overrides
- `blockText` — optional text shown below the image grid
- `blockTextAlign` — text alignment (`left` / `center` / `right`)

### Populate Queries

Strapi's `populate=*` only does shallow population — it does not populate media inside nested components. For nested component media, explicit field paths are required:

```
/projects?populate[galleryBlocks][fields][0]=blockText
         &populate[galleryBlocks][fields][1]=blockTextAlign
         &populate[galleryBlocks][populate][images][populate]=*
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
# Strapi backend URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Site identity
NEXT_PUBLIC_SITE_NAME=Nost Interiors
NEXT_PUBLIC_SITE_SHORT_NAME=Nost
NEXT_PUBLIC_SITE_TAGLINE=Barcelona Interior Design Studio
NEXT_PUBLIC_SITE_DESCRIPTION=Barcelona-based interior design studio...
NEXT_PUBLIC_CONTACT_EMAIL=info@bynost.com
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Strapi v4 backend running (see backend repo)

### Development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. If the Strapi backend is not available, pages render gracefully with empty content — a `console.error` is logged in development.

### Production build

```bash
npm run build
npm start
```

---

## Design System

**Colours**

| Token        | Value     | Usage                        |
| ------------ | --------- | ---------------------------- |
| `navy`       | `#13136B` | Primary — backgrounds, text  |
| `navy-muted` | `#9999BB` | Secondary text, placeholders |
| `bg`         | `#F5F4F1` | Page background              |

**Fonts**

- `Stanley` — display headings (`var(--font-stanley)`)
- `Apercu` — UI labels, navigation, captions (`var(--font-apercu)`)
- Body text uses system font-light weight via Tailwind

**Layout**

- NavBar uses a CSS grid (`50% 1fr`) so content always starts at the horizontal midpoint of the viewport
- Gallery grid uses a 12-column CSS grid with four layout presets mapped to column spans
