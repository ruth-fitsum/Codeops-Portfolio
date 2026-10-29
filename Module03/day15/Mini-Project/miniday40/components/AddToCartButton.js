"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(dish);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <button className="button button-primary" onClick={handleAdd}>
      {added ? "Added to cart ✓" : "Add to cart"}
    </button>
  );
}