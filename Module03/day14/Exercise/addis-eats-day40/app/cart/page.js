"use client";

import Link from "next/link";
import { useCart } from "../../components/CartProvider";

export default function CartPage() {
  const {
    items,
    total,
    ready,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!ready) {
    return (
      <section className="container page-section">
        <p>Loading your cart...</p>
      </section>
    );
  }

  return (
    <section className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">YOUR ORDER</span>
        <h1>Shopping Cart</h1>
        <p>Review your selections before checkout.</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty.</h2>
          <p>Explore our menu and add something delicious.</p>

          <Link href="/menu" className="button button-primary">
            Explore menu
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.dishId}>
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>{item.price} ETB each</p>
                </div>

                <div className="quantity-control">
                  <label htmlFor={`quantity-${item.dishId}`}>
                    Quantity
                  </label>

                  <input
                    id={`quantity-${item.dishId}`}
                    type="number"
                    min="1"
                    max="20"
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.dishId, event.target.value)
                    }
                  />
                </div>

                <strong>
                  {item.price * item.quantity} ETB
                </strong>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeItem(item.dishId)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{total} ETB</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Calculated separately</span>
            </div>

            <div className="summary-total">
              <span>Subtotal</span>
              <strong>{total} ETB</strong>
            </div>

            <Link
              href="/checkout"
              className="button button-primary button-full"
            >
              Continue to checkout
            </Link>

            <Link href="/menu" className="text-link back-to-menu">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}