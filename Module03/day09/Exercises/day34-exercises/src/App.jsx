import {
  lazy,
  Profiler,
  Suspense,
  useCallback,
  useState,
} from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";
import Skeleton from "./components/Skeleton";
import MenuPage from "./pages/MenuPage";

const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./pages/Receipt"));
const CartPage = lazy(() => import("./pages/CartPage"));

function reportProfile(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log("React Profiler:", {
    component: id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

function AppContent() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((dish) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === dish.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...dish, quantity: 1 }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <>
      <header className="site-header">
        <Link to="/menu" className="brand">
          Addis Eats
        </Link>

        <nav aria-label="Main navigation">
          <Link to="/menu">Menu</Link>
          <Link to="/cart">
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>
        </nav>
      </header>

      <main className="page-container">
        <div className="main-content">
          <Profiler id="AddisEatsRoutes" onRender={reportProfile}>
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/menu" replace />}
                />

                <Route
                  path="/menu"
                  element={<MenuPage onAdd={addToCart} />}
                />

                <Route
                  path="/cart"
                  element={
                    <ErrorBoundary
                      fallback={
                        <div className="error-box" role="alert">
                          <h2>Cart unavailable</h2>
                          <p>
                            Your cart could not be displayed. You can
                            return to the menu and continue browsing.
                          </p>
                          <Link to="/menu">Return to menu</Link>
                        </div>
                      }
                    >
                      <CartPage cart={cart} />
                    </ErrorBoundary>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <Checkout
                      cart={cart}
                      onClearCart={clearCart}
                    />
                  }
                />

                <Route path="/receipt" element={<Receipt />} />

                <Route
                  path="*"
                  element={
                    <section>
                      <h2>Page not found</h2>
                      <Link to="/menu">Return to menu</Link>
                    </section>
                  }
                />
              </Routes>
            </Suspense>
          </Profiler>
        </div>

        <aside className="sidebar">
          <ErrorBoundary
            fallback={
              <div className="error-box" role="alert">
                <h2>Cart unavailable</h2>
                <p>The cart panel could not be displayed.</p>
                <Link to="/cart">Open the cart page</Link>
              </div>
            }
          >
            <CartSummary cart={cart} />
          </ErrorBoundary>
        </aside>
      </main>

      <footer className="site-footer">
        Addis Eats — Day 34 React practice
      </footer>
    </>
  );
}

function CartSummary({ cart }) {
  const total = cart.reduce(
    (sum, dish) => sum + dish.price * dish.quantity,
    0
  );

  return (
    <section className="cart-panel">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((dish) => (
          <div className="cart-item" key={dish.id}>
            <span>
              {dish.name} × {dish.quantity}
            </span>
            <span>
              {(dish.price * dish.quantity).toLocaleString()} ETB
            </span>
          </div>
        ))
      )}

      <h3>Total: {total.toLocaleString()} ETB</h3>

      <Link className="button" to="/checkout">
        Checkout
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}