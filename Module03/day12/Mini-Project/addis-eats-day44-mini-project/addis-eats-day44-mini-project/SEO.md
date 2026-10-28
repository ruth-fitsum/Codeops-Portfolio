# Addis Eats SEO Report

## Implemented
- Root metadata with `metadataBase`, default title, and title template.
- Page-specific metadata for homepage, menu, cart, and checkout.
- Dynamic dish metadata with canonical URLs.
- Site-wide and dish-specific Open Graph image generation.
- JSON-LD MenuItem structured data.
- Sitemap generated from menu data.
- Robots rules for private and transactional routes.
- Environment example and Git ignore rules.

## Verification checklist
- [ ] `npm run build` passes.
- [ ] Homepage title and description are correct.
- [ ] Menu has a canonical URL.
- [ ] Every dish page has unique title and description.
- [ ] Unknown dish ID displays the 404 page.
- [ ] `/opengraph-image` returns an image.
- [ ] `/menu/doro-wat/opengraph-image` returns a dish image.
- [ ] `/sitemap.xml` contains only intended public URLs.
- [ ] `/robots.txt` points to the sitemap and excludes private routes.
- [ ] JSON-LD matches the dish name, description, and price shown on screen.
- [ ] Deployed metadata uses the real production URL.

## Before/after notes
Record actual verification results here. Do not claim indexing or rich results without testing them.
