"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navigation() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <nav className="navigation container">
        <Link href="/" className="brand">
          Addis<span>Eats</span>
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart" className="cart-link">
            Cart <span className="cart-count">{totalItems}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}