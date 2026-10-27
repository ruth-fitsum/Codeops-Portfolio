import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

function Navbar() {
  const items = useCartStore((state) => state.items);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        Addis Eats
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/checkout">Checkout</Link>

        {isAuthenticated ? (
          <button className="nav-button" onClick={logout}>
            Demo Logout
          </button>
        ) : (
          <button className="nav-button" onClick={login}>
            Demo Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;