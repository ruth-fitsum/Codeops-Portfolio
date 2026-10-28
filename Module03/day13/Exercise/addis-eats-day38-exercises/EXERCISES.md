# Day 38 exercises

1. Convert the menu to an async server component that awaits dish data.
2. Remove fetching hooks and route-level loading/error state.
3. Search for every `use client` directive.
4. Move directives to the smallest components that need state, events, or browser APIs.
5. Keep the cart provider in `components/Providers.js`; root `app/layout.js` stays a server component.
6. Pass server-rendered `DishList` into client `FilterShell` as `children`.
7. Record First Load JS for `/menu` from your own build before and after boundary cleanup.

Run `npm run build` after each exercise. This package shows the completed structure; the exact First Load JS measurements cannot be truthfully supplied without a measured baseline from your earlier version.
