# Addis Eats

Addis Eats is a React mini-project built for CodeOps Module 3,
Day 35.

The application allows users to explore recipes, filter dishes,
view recipe details, manage a shopping cart, and submit a demo order.

## Technologies

- React
- Vite
- React Router
- Zustand
- JavaScript
- CSS
- DummyJSON Recipes API

## Features

- Home page
- Menu fetched from an API
- Loading and error states
- Category filtering using URL query parameters
- Dish search
- Dynamic dish details
- Shared cart state using Zustand
- Quantity controls and item removal
- Protected checkout route
- Demo authentication
- Checkout form validation
- Touched-field tracking
- Order confirmation
- React error boundary
- Lazy-loaded dish details and checkout pages
- Responsive design
- 404 page

## Installation

Clone the repository and navigate to the project directory.

Install dependencies:

npm install

Start the development server:

npm run dev

## Build

Create a production build:

npm run build

Preview the production build:

npm run preview

## Routes

| Route | Purpose |
|---|---|
| / | Home page |
| /menu | Recipe menu |
| /menu/:id | Dish details |
| /cart | Shopping cart |
| /checkout | Protected checkout |
| * | Not found page |

## API

Recipes are retrieved from:

https://dummyjson.com/recipes

Individual recipes are retrieved from:

https://dummyjson.com/recipes/:id

The application uses generated sample prices in ETB because
the recipe API does not provide Ethiopian birr prices.

## Authentication and Checkout

Authentication is simulated with localStorage for learning purposes.
It is not suitable for production use.

Checkout validates the customer's information and displays a
simulated order confirmation. It does not process payments or send
orders to real restaurants.

## Limitations

- No database
- No real authentication
- No payment gateway
- No actual restaurant ordering
- Cart data is stored in memory and resets when the page is refreshed

## Future Improvements

- Add backend authentication
- Store cart data persistently
- Add a database for dishes and orders
- Integrate a payment gateway
- Add automated tests