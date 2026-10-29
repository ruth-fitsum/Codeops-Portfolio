"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navigation() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <nav className="navigation container">
        <Link href="/" className="brand">
          Addis Eats
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart ({count})</Link>
        </div>
      </nav>
    </header>
  );
}