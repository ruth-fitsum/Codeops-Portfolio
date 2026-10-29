"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navigation() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="brand">
          <span className="brand-icon">🍽️</span>
          <span>Addis Eats</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart" className="cart-link">
            Cart <span className="cart-count">{totalItems}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}