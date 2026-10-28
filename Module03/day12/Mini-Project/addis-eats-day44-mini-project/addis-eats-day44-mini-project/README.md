# Addis Eats — Day 44 Mini-Project: Metadata & SEO

A standalone Next.js App Router mini-project that demonstrates page metadata, dynamic dish SEO, Open Graph images, JSON-LD, sitemap generation, and robots rules.

## Start
Requirements: Node.js 20.9 or later.
```bash
npm install
cp .env.example .env.local
npm run dev
```
Windows PowerShell:
```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```
Open http://localhost:3000.

## Production verification
```bash
npm run build
npm run start
```

## Routes
- `/`
- `/menu`
- `/menu/doro-wat` (and other IDs in `app/menu/dishes.js`)
- `/menu/doro-wat/opengraph-image`
- `/opengraph-image`
- `/sitemap.xml`
- `/robots.txt`

## SEO features
- Root `metadataBase`, title template, default metadata, Open Graph, and Twitter card defaults.
- Unique metadata for homepage, menu, cart, checkout, and dish pages.
- `generateMetadata` uses the same dish records as the rendered page.
- Canonical URLs on menu and dish pages.
- Dynamic Open Graph images generated with `ImageResponse`.
- JSON-LD MenuItem data generated from visible dish information.
- Dynamic sitemap generated from real dish IDs.
- Robots file disallows crawling private/transactional paths.
- `.env.example` and `.gitignore` included.

## Before deployment
Set `NEXT_PUBLIC_SITE_URL` to the real deployed origin. Do not deploy with `localhost` as the canonical base. Check generated social images and rendered page source after deployment. Robots rules do not replace authentication.
