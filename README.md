# Olive Young Beauty Lab

An interactive makeup studio and skincare discovery game built with React, TypeScript and Vite. Independent student concept; not an official Olive Young app.

## Run locally

Install Node.js 24 or newer, then run:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173). No API keys, database, backend or environment variables are required.

## Test and build

```bash
npm test
npm run build
npm run preview
```

The production build goes into `dist/`. Asset paths follow the `BASE_PATH` environment variable, which defaults to `/` for local use and root-domain hosting.

## Deploy to GitHub Pages

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site with `BASE_PATH=/olive-young-beauty-lab/` and publishes it. In the repository, open Settings > Pages and set Source to GitHub Actions once. The site then lives at https://yewon-emily-jung.github.io/olive-young-beauty-lab/. The separate `ci.yml` workflow runs the tests.

## Features

- Four fictional clients, one makeup and one skincare appointment per shift.
- Two shifts covering all four clients, plus a restart control.
- Live makeup and skincare previews, with opacity, softness and shine controls.
- Before/after comparisons and downloadable glow cards.
- 32 Olive Young US product families with 52 curated options.
- Warm styling suggestions for Chloe and cool suggestions for Rin; all shades remain available.
- Real product photos, shade/finish references and US shopping links.
- 2025 Awards labels distinguishing exact recognition from related shades/editions.
- Toner/mask, serum and cream steps.
- Fictional Glow Cash, demo coupons, local wishlists and local analytics.

Progress, wishlists and analytics use browser localStorage. Restart preserves the wishlist and analytics history. Avatar colors, textures and skincare changes are illustrative; they are not calibrated try-on or guaranteed results.

## Project layout

- `src/App.tsx`: app screens and interactions.
- `src/components/`: portrait renderer, product art, dialogs and controls.
- `src/data/`: clients, product catalogs, award evidence and effect profiles.
- `src/game/`: game rules and domain tests.
- `src/analytics/`: local event tracking.
- `src/styles.css` and `src/brand-refresh.css`: interface styling.
- `public/characters/`: client portraits and effects.
- `public/products/`: product photos and references.
- `tests/ui-check.tsx`: full four-client JSDOM interaction check.
- `.github/workflows/ci.yml`: GitHub build and test workflow.

The current selectable catalog is `src/data/usProducts.ts`. Earlier catalog records/assets remain to support historical saved results.

## Sources and assets

See [product sources](PRODUCT_SOURCES.md), [award sources](AWARDS_2025_SOURCES.md), [verification notes](VERIFICATION.md) and [asset credits](ASSETS.md).

Availability was checked November 8, 2026 and is not live inventory. The requested Dr.G set was out of stock when checked and is labeled accordingly. Browser visual QA remains pending; automated checks use JSDOM and do not replace real-browser visual testing.

## Upload to GitHub

Extract the ZIP. Create an empty GitHub repository, open a terminal inside this project folder and run:

```bash
git init
git add .
git commit -m "Initial Beauty Lab app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example URL with your repository URL. Alternatively, add this folder in GitHub Desktop and publish it. Upload the extracted project files, rather than only uploading the ZIP.

This export includes all app source, tests and runtime image assets. It excludes dependencies, build output, hosting credentials, account configuration, Git history and research scratch files.
