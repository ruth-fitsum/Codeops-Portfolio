import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import CartBadge from "../cart/CartBadge";

function Header() {
  const { isSignedIn, signIn, signOut } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="brand">
        Addis Eats
      </Link>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">
          Cart <CartBadge />
        </Link>

        {isSignedIn && <Link to="/checkout">Checkout</Link>}

        <button
          className="auth-button"
          onClick={isSignedIn ? signOut : signIn}
        >
          {isSignedIn ? "Sign out" : "Sign in"}
        </button>
      </nav>
    </header>
  );
}

export default Header;