import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { CartProvider } from "./CartProvider";
import { AuthProvider } from "./AuthContext";

import Layout from "./Layout";
import RequireAuth from "./RequireAuth";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import OrderReceipt from "./pages/OrderReceipt";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Landing page */}
              <Route index element={<Home />} />

              {/* Menu and individual dishes */}
              <Route path="menu" element={<Menu />} />

              <Route
                path="menu/:id"
                element={<DishDetail />}
              />

              {/* Cart */}
              <Route path="cart" element={<Cart />} />

              {/* Protected checkout */}
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />

              {/* Authentication */}
              <Route path="login" element={<Login />} />

              {/* Order receipt */}
              <Route
                path="orders/:id"
                element={<OrderReceipt />}
              />

              {/* Unknown URLs */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}