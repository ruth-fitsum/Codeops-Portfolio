import { NavLink } from "react-router-dom";

import { useCart } from "../CartProvider";
import { useAuth } from "../AuthContext";

export default function Nav() {
  const { items } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <NavLink to="/" end>
        Home
      </NavLink>

      <NavLink to="/menu">
        Menu
      </NavLink>

      <NavLink to="/cart">
        Cart ({items.length})
      </NavLink>

      <NavLink to="/checkout">
        Checkout
      </NavLink>

      {user ? (
        <button onClick={logout}>
          Sign Out
        </button>
      ) : (
        <NavLink to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
}