"use client";

import { useCart } from "./CartProvider";

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className="button button-primary"
      onClick={() => addItem(dish)}
    >
      Add to cart
    </button>
  );
}