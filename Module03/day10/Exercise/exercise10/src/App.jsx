import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Menu from "./menu/Menu";
import DishDetail from "./pages/DishDetail";
import CartPanel from "./cart/CartPanel";
import NotFound from "./pages/NotFound";
import RequireAuth from "./auth/RequireAuth";
import Spinner from "./ui/Spinner";

const Checkout = lazy(() => import("./checkout/Checkout"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:id" element={<DishDetail />} />
        <Route path="cart" element={<CartPanel />} />

        <Route
          path="checkout"
          element={
            <RequireAuth>
              <Suspense fallback={<Spinner />}>
                <Checkout />
              </Suspense>
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;