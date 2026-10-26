# Addis Eats, Routed

A React food-ordering application built with React Router v6, React Context, and useReducer.

## Features

- Landing page with today's specials.
- Menu with shareable category filters.
- Individual dish pages using dynamic route parameters.
- Cart shared between pages using React Context.
- Cart actions managed by useReducer.
- Checkout protected by a simulated authentication system.
- Redirect to the originally requested page after login.
- Order receipt after checkout.
- Shared layout using nested routes and Outlet.
- Custom useFetch hook with loading, error, and request cancellation.

## Routes

| Path | Purpose |
|---|---|
| `/` | Landing page |
| `/menu` | Full menu |
| `/menu?category=Breakfast` | Filtered menu |
| `/menu/:id` | Individual dish |
| `/cart` | Shopping cart |
| `/checkout` | Protected checkout |
| `/login` | Sign-in page |
| `/orders/:id` | Order receipt |
| `*` | Not found |

## Technologies

- React
- Vite
- React Router DOM v6
- JavaScript
- CSS
- JSON

## Run the project

```bash
npm install
npm run dev
```

The menu data is stored in `public/dishes.json`. Authentication and order storage are simulated for learning purposes; there is no backend or database.