# Component Boundary Audit

| Component / file | Server or client | Justification |
|---|---|---|
| `app/layout.js` | Server | Root document and shared layout; imports the client Providers boundary but remains server-rendered. |
| `components/Providers.js` | Client | Cart context uses React state and context. |
| `components/Header.js` | Server | Static navigation; renders `CartCount` as a client leaf. |
| `components/CartCount.js` | Client | Reads live cart context. |
| `app/menu/page.js` | Server | Async data loading and server-side category filtering. |
| `components/DishList.js` | Server | Maps dish data to markup without hooks. |
| `components/DishCard.js` | Server | Displays dish data; embeds the interactive AddToCartButton leaf. |
| `components/AddToCartButton.js` | Client | Handles click events and updates cart state. |
| `components/CategoryBar.js` | Client | Uses interactive category navigation state through URL links. |
| `components/FilterShell.js` | Client | Uses state to hide/show its `children` slot without importing the server DishList. |
| `app/menu/[id]/page.js` | Server | Fetches dish data and generates static params and metadata. |
| `app/cart/page.js` | Client | Reads and updates the cart context interactively. |
| `app/menu/error.js` | Client | Error boundary uses an event handler to reset the segment. |
| `app/menu/layout.js` | Server | Static nested shell and category navigation. |

## Bundle measurements

Fill these with real `npm run build` output. Do not invent figures.

- Before boundary cleanup — `/menu` First Load JS: **[enter measured value]**
- After boundary cleanup — `/menu` First Load JS: **[enter measured value]**
- Difference: **[before minus after]**

To measure fairly, use the same Node.js version, package versions, build command, and route in both project versions. The provided project is the after version; compare it against the original pre-cleanup build.
