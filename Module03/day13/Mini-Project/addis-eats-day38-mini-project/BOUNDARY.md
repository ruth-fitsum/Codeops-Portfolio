# Addis Eats — Component Boundary Map

| Component / file | Runs on | Why |
|---|---|---|
| `app/layout.js` | Server | Owns html/body and global CSS; wraps children with Providers. |
| `components/Providers.js` | Client | Cart context requires state and React context. |
| `components/Header.js` | Server | Static site navigation; nests CartCount client leaf. |
| `components/CartCount.js` | Client | Displays live count from cart context. |
| `app/page.js` | Server | Renders featured dish data without hooks. |
| `app/menu/page.js` | Server | Async server component loads and filters dishes. |
| `components/CategoryBar.js` | Client | Category navigation is interactive. |
| `components/FilterShell.js` | Client | Controls visibility with state and accepts server-rendered children. |
| `components/DishList.js` | Server | Produces dish markup from data. |
| `components/DishCard.js` | Server | Displays dish details and embeds AddToCartButton. |
| `components/AddToCartButton.js` | Client | Click handler updates the cart provider. |
| `app/menu/[id]/page.js` | Server | Loads dish details and generates static parameters. |
| `app/cart/page.js` | Client | Reads and removes items from the cart. |
| `app/menu/error.js` | Client | Error boundary requires reset event handler. |
| `app/menu/layout.js` | Server | Static nested menu shell. |

## First Load JS measurements

Fill in from actual builds using the same environment:

- Before cleanup `/menu`: **[measured baseline]**
- After cleanup `/menu`: **[measured result]**
- Difference: **[baseline minus result]**

The baseline was not supplied with the project brief, so these values are intentionally left for measurement rather than fabricated.
