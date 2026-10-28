# Addis Eats — Day 44 Exercises

A complete Next.js App Router exercise project for Metadata & SEO.

## Requirements
- Node.js 20.9 or later
- npm

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
On Windows PowerShell, use:
```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## Production check
```bash
npm run build
npm run start
```

## Routes
- `/` — homepage metadata
- `/menu` — menu metadata and canonical URL
- `/menu/1` — dynamic dish metadata and JSON-LD
- `/menu/1/opengraph-image` — generated dish social image
- `/opengraph-image` — site-wide social image
- `/sitemap.xml` — generated sitemap
- `/robots.txt` — crawler instructions
- `/cart` — non-indexed cart information
- `/checkout` — non-indexed checkout information

## Day 44 exercise coverage
1. Root metadata, metadataBase, default title, and title template.
2. Static page metadata.
3. `generateMetadata` for dish routes.
4. Site-wide and dish-specific Open Graph images.
5. JSON-LD generated from the same dish object rendered on the page.
6. Dynamic sitemap and robots rules that exclude private routes.

The sample domain is `localhost` by default. Set `NEXT_PUBLIC_SITE_URL` to your actual deployed origin before publishing. No real production domain is assumed.
