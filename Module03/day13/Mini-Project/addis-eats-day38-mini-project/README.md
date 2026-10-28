# Addis Eats — Day 38 Mini-Project

Standalone Next.js App Router project demonstrating deliberate Server/Client Component boundaries.

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Production build
```bash
npm run build
npm run start
```

## Included requirements
- Menu and dish routes are server components; they use async data helpers without fetching hooks.
- `use client` is limited to interactive components.
- `components/Providers.js` isolates cart context; `app/layout.js` remains a server component.
- `FilterShell` receives server-rendered `DishList` through `children` rather than importing it.
- No callback is passed from a server component to a client component.
- `BOUNDARY.md` documents component boundaries and has placeholders for actual before/after First Load JS measurements.

The baseline JavaScript figure must be measured from the original project version. The sample project cannot truthfully invent that measurement. The cart is in-memory, and checkout does not submit orders or process payments.
