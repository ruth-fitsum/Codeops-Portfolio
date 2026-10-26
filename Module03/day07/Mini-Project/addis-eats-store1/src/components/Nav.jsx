import { NavLink } from "react-router-dom";

import { useCartStore } from "../cartStore";
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext";

export default function Nav() {
  const items = useCartStore(
    (state) => state.items
  );

  const { user, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`nav ${theme}`}>
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

      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
}