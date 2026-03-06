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
├── app/                        
│   ├── page.tsx                
│   ├── projects/
│   │   ├── page.tsx            
│   │   └── [slug]/page.tsx     
│   ├── the-studio/page.tsx     
│   ├── contact/page.tsx        
│   ├── fonts/                  
│   ├── layout.tsx              
│   ├── globals.css             
│   └── icon.tsx                
│
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx          
│   │   ├── MenuOverlay.tsx     
│   │   ├── Footer.tsx          
│   │   ├── FooterWrapper.tsx   
│   │   ├── NostLogo.tsx        
│   │   └── Providers.tsx       
│   │
│   ├── projects/
│   │   ├── ProjectsPageClient.tsx   
│   │   ├── ProjectCard.tsx          
│   │   ├── ProjectDetailClient.tsx  
│   │   ├── ProjectGallery.tsx       
│   │   └── ProjectInfoPanel.tsx     
│   │
│   └── studio/
│       ├── StudioIntroSection.tsx        
│       ├── StudioDescriptionSection.tsx  
│       ├── StudioTeamSection.tsx         
│       └── StudioWorkshopSection.tsx     
│
└── lib/
    ├── site.ts     
    ├── strapi.ts   
    ├── types.ts    
    └── utils.ts    
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
