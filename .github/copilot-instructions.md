# Copilot Instructions

`astro-theme-grace` — Astro 7 static personal-site template (Simplified Chinese UI) whose visual style is derived from https://www.gracecode.com/. No client-side framework and no client JS. Articles are Markdown in an Astro content collection; everything else is typed TypeScript data rendered by `.astro` components.

## Commands

The project uses Deno 2.9.6 or newer 2.x (`mise.toml` can install Deno locally; CI pins 2.9.6). `deno.json` defines npm-compatible dependencies and tasks; `deno.lock` pins versions, and Deno manages `node_modules` automatically. No Node.js or pnpm installation is needed.

```bash
deno install         # install dependencies and update deno.lock
deno task dev        # astro dev
deno task build      # runs `astro check` (type-check) BEFORE `astro build`; type errors fail the build
deno task check      # astro check only (TS + .astro type-check; there is no separate linter)
deno task test       # vitest run (only src/**/*.test.ts)

# Single test file / single test by name
deno task test src/lib/pagination.test.ts
deno task test src/lib/pagination.test.ts -t "ellipses"
```

## Architecture

Everything is imported through the `@/` alias (`@/*` → `src/*`, see `tsconfig.json`).

- **Content (`src/content.config.ts`, `src/content/notes/*.md`)** — the `notes` collection uses the `glob` loader; the file name is the entry `id` and the URL slug. The zod schema (`title`, `excerpt` ≥ 10 chars, `category` ∈ `思考 | 设计 | 生活`, `publishedAt` date, positive integer `readingMinutes`, optional `featured`) is enforced at build time. Article bodies use `##` headings (auto-numbered via a CSS counter on the article page) and `>` quotes.
- **Helpers (`src/lib/*.ts`)** — framework-free, unit-tested functions:
  - `notes.ts` — `getNotes()` (collection sorted newest first), `getNoteUrl()`, `Note` type. Always go through `getNotes()` instead of calling `getCollection('notes')` directly.
  - `format.ts` — `formatChineseDate(Date)` (Asia/Shanghai), `toISODate`, `formatPercent`, `padNumber` (use it for every `01`-style sequence number).
  - `pagination.ts` — `getPageUrl(basePath, page)` and `getPaginationItems()` (ellipsis windowing) used by `Pagination.astro`.
  - `urls.ts` — `withBase(path)` prefixes root-absolute internal links and public assets with Astro's `import.meta.env.BASE_URL`, while keeping anchors/external URLs intact.
  - `status.ts` — `StatusTone` (`healthy | warning | critical | neutral`), `HostStatus`, `statusLabels`, `getUsageTone` (≥90 critical, ≥70 warning).
- **Data (`src/data/*.ts`)** — static configuration and mock data:
  - `site.ts` — `profile`, `SITE` (name, description, locale, `themeColor`, `notesPerPage`), `navLinks`, `footerLinks`. Header, footer and `BaseLayout` read from here — don't hard-code the site name.
  - `dashboard.ts` — mock `hosts`, `activities`, `trafficTrend`, `storageSegments`, `getAverage`.
  - `icons.ts` — `iconPaths` registry (24×24 SVG path strings, `as const`) and `iconLabels` (Chinese a11y labels). `IconName` is derived from `iconPaths` keys, so `Icon.astro`'s `name` prop is type-checked.
  - `styleguide.ts` — section list and demo data for `/elements`.
- **Routing (all static)**:
  - `/notes`, `/notes/2`, … — `pages/notes/[...page].astro` uses Astro's `paginate()` with `SITE.notesPerPage`.
  - `/notes/[slug]` — `pages/notes/[slug].astro` renders the entry with `render()`; "next note" wraps around cyclically. Named params outrank the rest param, so the two routes coexist (avoid purely numeric note file names).
  - `/dashboard` renders dashboard data; `/elements` is a living style guide that showcases every reusable component — update it (and `data/styleguide.ts`) when adding or changing a component.
- **Layout**: every page wraps in `layouts/BaseLayout.astro` (optional `title`, `description`), which imports `styles/global.css` and emits title, description, canonical, Open Graph, sitemap and theme-color tags. Omit `title` on the home page to show just the site name.
- **Components (`src/components/<group>/`)**: `layout/` (SiteHeader, SiteFooter), `ui/` (Icon, Pill, Heading, Avatar, Tooltip, Dropdown), `forms/`, `feedback/`, `navigation/`, `content/` (incl. `Figure` — image with optional caption, `ratio` crop and `layout` = `full | narrow | start | end`), `data/` (dashboard widgets incl. `Panel`), `styleguide/` (`StyleguideSection`, `Specimen` — only for `/elements`).
- `astro.config.mjs`: `@astrojs/sitemap` integration, `prefetch: true`, `site` and `base` from the full `SITE_URL` env var (fallback `https://mingcheng.github.io/astro-theme-grace/`).
- `.github/workflows/deploy.yml`: GitHub Pages deployment (setup-deno → `deno ci` → `deno task test` → `deno task build`); PRs build only. Uses Pages' full `base_url` (including project path) unless `SITE_URL` is set.

## Conventions

- Components declare an `interface Props` in frontmatter and use scoped `<style>` blocks; conditional classes use `class:list`. Wrapper components that should accept arbitrary attributes extend `HTMLAttributes<'tag'>` from `astro/types` and spread `...attrs` (this also forwards the parent's scope attribute, so a parent can style them via a passed `class`). Style elements rendered by Markdown or slots with `:global()`.
- Styles live in `src/styles/`: `tokens.css` (all design variables), `base.css` (element defaults, reduced motion), `utilities.css`, `controls.css` (`.button`, `.control`), `prose.css` (long-form text); `global.css` only `@import`s them.
- All colors are CSS custom properties in `tokens.css` — never hard-code hex/rgb values in components or pages (only `SITE.themeColor` and `favicon.svg` repeat literals). Tokens: paper `--paper` / `--paper-deep` / `--surface`; ink `--ink` / `--muted`; borders `--line` / `--line-strong`; crimson accent `--accent` / `--accent-dark` / `--accent-soft`, plus `--accent-light` for use on ink backgrounds; on-ink helpers `--ink-muted` / `--ink-line`; status `--healthy` / `--warning` / `--critical`; chart series `--chart-1`…`--chart-4`; fonts `--serif` / `--sans` / `--mono`. The palette swatches in `data/styleguide.ts` mirror these tokens.
- Heading sizes come only from the `--h1`…`--h6` scale in `tokens.css` (h1 max `3.5rem`, h6 = body `1rem`, geometric steps in between, fluid between 375px and 1180px); `base.css` applies them to `h1`–`h6`, `.display` = `--h1`, `.section-title` / `.prose h2` = `--h2`, and `Heading` sizes map `display | section | title | subtitle | label` → `--h1 | --h2 | --h3 | --h4 | --h6`. Never hard-code a heading `font-size`; small label-style headings use `--h5` / `--h6`. All other text uses `--text-xs` (0.75rem: meta, pills, eyebrows, labels, captions, table heads) / `--text-sm` (0.875rem: buttons, controls, nav, menus, tables, alerts, code) / `--text-md` (1rem body) / `--text-lg` (1.125rem: lead, article paragraphs, emphasis); don't introduce ad-hoc `rem` sizes (relative `em` sizes for inline `code`/`kbd` and a few display numerals are the exceptions). `.button` and `.control` share `min-height: var(--control-height)` so they align in a row.
- Status colors: set `data-tone={tone}` on an element and use `var(--tone)` in CSS; `tokens.css` maps each `StatusTone` to its color. Don't write per-tone class rules.
- Shared utility classes: `.container`, `.eyebrow`, `.display`, `.section-title`, `.inverse` (ink section with paper text and light-accent eyebrow), `.button` (ink filled), `.button.quiet` (outlined; both support `disabled`), `.control` (text input / select / textarea appearance), `.prose` (headings, paragraphs, lists, inline code, blockquotes and image-only Markdown paragraphs in long-form text; shared by Markdown articles, `Quote` and `Figure`; clears `Figure` floats) and `.visually-hidden`. `base.css` also styles `hr`, `mark`, `kbd`, `abbr[title]`, `del` and a global `:focus-visible` ring. Corners are square (only small status/legend dots are round); tag-like elements use `ui/Pill.astro` (`tone` = `default | accent | quiet`).
- For new headings prefer `ui/Heading.astro` (`level` sets the `h1`–`h6` tag, `size` = `display | section | title | subtitle | label` sets the visual scale independently; optional `eyebrow`, `description`, `align`, and an `actions` slot). Body text is serif; UI chrome (pills, badges, meta) uses `var(--sans)`. Respect the existing `prefers-reduced-motion` handling.
- Interactive components stay zero-JS by building on native HTML: `Accordion` / `Dropdown` use `<details>`, `Dialog` uses the `popover` attribute with `popovertarget` buttons, `Tooltip` is CSS `:hover`/`:focus-within`. Form components compose `forms/Field.astro` (label/legend, hint, error with `aria-describedby`/`aria-invalid` wiring); `RadioGroup` renders `Choice` (`type` = `checkbox | radio | switch`). Components with a tone (`Alert`, `Timeline`, `StatusBadge`, `MetricCard`, `ProgressBar`) take a `StatusTone`.
- All user-facing copy is Simplified Chinese, including `aria-label`s and icon labels. Decorative SVGs get `aria-hidden="true"`; `Icon` becomes `role="img"` only when a `label` is passed. Dates render inside `<time datetime={toISODate(date)}>`.
- Tests enforce invariants — keep them passing:
  - Note file names are kebab-case (`src/content/notes.test.ts`); frontmatter is validated by the collection schema during `astro check`/`build`.
  - Host `cpu`/`memory` are 0–100 percentages and `storageSegments` sum to 100.
  - Every `iconPaths` key must have a matching `iconLabels` entry **in the same key order**, and at least 16 icons must exist.
