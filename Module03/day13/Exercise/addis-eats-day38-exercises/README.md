# Addis Eats — Day 38 Exercises

Standalone Next.js App Router project for Server & Client Components.

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build and measure
```bash
npm run build
```
Record the actual `/menu` First Load JS in this README after comparing against your original project. The earlier baseline is not included, so this project does not invent a before value.

## Included
- Async server menu and dish routes.
- Server-side data loading from local sample data.
- Client-only cart provider and interactive leaf components.
- `FilterShell` client component receiving server-rendered content through `children`.
- `BOUNDARY.md` audit and `EXERCISES.md`.

Cart state is in-memory and resets on a full page refresh. Checkout is a demo and does not submit orders or process payments.
