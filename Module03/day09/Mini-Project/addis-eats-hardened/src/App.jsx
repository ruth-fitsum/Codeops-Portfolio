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
import CartPanel from "./components/CartPanel";
import Skeleton from "./components/Skeleton";
import MenuPage from "./pages/MenuPage";

const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./pages/Receipt"));

function reportProfile(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log("Profiler result:", {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

function CartSummary({ cart }) {
  return <CartPanel cart={cart} />;
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

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <header className="site-header">
        <Link to="/menu" className="brand">
          Addis Eats
        </Link>

        <nav aria-label="Main navigation">
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </nav>
      </header>

      <main className="page-container">
        <div className="main-content">
          <Profiler
            id="AddisEatsRoutes"
            onRender={reportProfile}
          >
            <ErrorBoundary
              fallback={
                <div className="error-box" role="alert">
                  <h2>Page unavailable</h2>
                  <p>
                    We couldn't load this page. You can return to the menu.
                  </p>
                  <Link to="/menu">Return to menu</Link>
                </div>
              }
            >
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
                            <h2>Cart page unavailable</h2>
                            <p>
                              The cart page could not be displayed.
                            </p>
                            <Link to="/menu">Return to menu</Link>
                          </div>
                        }
                      >
                        <CartPageWithBoundary cart={cart} />
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

                  <Route
                    path="/receipt"
                    element={<Receipt />}
                  />

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
            </ErrorBoundary>
          </Profiler>
        </div>

        <aside className="sidebar">
          <ErrorBoundary
            fallback={
              <div className="error-box" role="alert">
                <h2>Cart panel unavailable</h2>
                <p>
                  The sidebar failed, but you can still open the cart page.
                </p>
                <Link to="/cart">Open cart page</Link>
              </div>
            }
          >
            <CartSummary cart={cart} />
          </ErrorBoundary>
        </aside>
      </main>

      <footer className="site-footer">
        Addis Eats — Day 34 Mini-Project
      </footer>
    </>
  );
}

function CartPageWithBoundary({ cart }) {
  return <CartPanel cart={cart} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}