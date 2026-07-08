# Camp Flaneuse

A moving camp for field notes, letters, soft rebellion, and wonder.

This is the MVP website for **Camp Flaneuse** — part travel journal, part artist archive, part correspondence project, part tiny online camp. Built with [Astro](https://astro.build), TypeScript, and Markdown. Static, fast, no backend, no CMS — the first cabin, not the whole village.

## Commands

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Start the dev server at `http://localhost:4321` |
| `npm run build`   | Build the static site into `dist/`              |
| `npm run preview` | Preview the built site locally                  |

> Requires Node 18.17+ (Node 20+ recommended). If you use nvm-windows: `nvm use 24.18.0`.

## How to add a field note

Create a Markdown file in `src/content/field-notes/en/` (or `pt/` for Portuguese). The file name becomes the URL slug.

```yaml
---
title: "Road Note: Something You Noticed"
date: "2026-07-15"
location: "Wherever you were"
category: "road"          # road | creature | studio | camp | weather | soft-footsteps
excerpt: "One or two sentences that appear on the card."
tags: ["road life", "example"]
language: "en"            # en | pt — must match the folder
translationKey: "my-note" # optional — connects EN and PT versions of the same note
draft: false              # true hides it from the site
---

The note itself, in Markdown. Paragraphs, lists, *emphasis*, headings — all work.
```

That's it. The archive page, homepage cards, prev/next navigation, and metadata all update automatically on the next build.

## How to add a letter (Correspondence)

Same idea, in `src/content/correspondence/en/` or `pt/`:

```yaml
---
number: "002"
title: "Correspondence No. 002"
subtitle: "A short subtitle"
date: "2026-08-01"
location: "Somewhere"
excerpt: "The line shown on the envelope card."
language: "en"
translationKey: "correspondence-002"
drawingPlaceholder: true   # shows the dashed "drawing lives here" box
draft: false
---

Dear reader, ...
```

## Languages

- English is the default (`/`, `/about`, `/field-notes`, …).
- Portuguese lives under `/pt/` (`/pt/sobre`, `/pt/notas-de-campo`, …).
- The language switcher in the header links to the matching translated page when one exists (via `translationKey`), otherwise to the other language's homepage.
- Not every post needs a translation. Untranslated posts simply don't appear in the other language's archive — nothing breaks.
- All shared UI strings live in `src/lib/i18n.ts`. Page copy lives in the pages themselves.

## Where things live

```
src/
  content/            ← all posts and letters (Markdown) — edit here most often
    field-notes/{en,pt}/
    correspondence/{en,pt}/
  content.config.ts   ← content schemas (frontmatter validation)
  pages/              ← one file per page; pt/ mirrors the English pages
  components/
    layout/           ← BaseLayout, Header, Footer
    content/          ← FieldNoteCard, LetterCard, MetadataLine, TagList, ImagePlaceholder
    sections/         ← Hero, SectionIntro, ExploreCard, CTASection, StudioPackageCard, PageTitle
  lib/
    i18n.ts           ← languages, routes, UI strings, category labels
    content.ts        ← content collection helpers
  styles/
    tokens.css        ← the design system: colors, fonts, spacing (change the look here)
    global.css        ← base styles, prose, buttons, labels
```

## Design system

All colors, fonts, and spacing are CSS variables in `src/styles/tokens.css` — change them once, the whole site follows. Palette: warm paper, deep ink, moss, faded olive, dusty clay, river blue, dark forest. Fonts: Fraunces (headings), Karla (body), IBM Plex Mono (field labels) — self-hosted via Fontsource, no external requests.

## Before going live

A few placeholders to swap:

- [ ] Real domain in `astro.config.mjs` (`site: 'https://campflaneuse.com'`)
- [ ] Real email address in `src/pages/contact.astro` and `src/pages/pt/contato.astro`
- [ ] Real Open Graph image (currently `public/og-placeholder.svg`)
- [ ] Drawings for the `ImagePlaceholder` boxes, whenever the deer agrees to be drawn

## Deploying

The site is fully static. Any of these work with zero configuration:

- **Netlify / Vercel / Cloudflare Pages**: connect the repo, build command `npm run build`, output directory `dist`.
- **GitHub Pages**: build and publish `dist/` (set `site` and `base` in `astro.config.mjs` if using a project page).

## Later (deliberately not built yet)

Newsletter, snail-mail subscriptions, shop, member area, map navigation, full bilingual parity, Obsidian workflow. The structure leaves room for all of it — content collections can grow, routes are language-aware, and nothing here needs to be torn down first.
