"use client";

import Link from "next/link";
import { useCart } from "../../components/CartProvider";

export default function CartPage() {
  const {
    cart,
    loaded,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  if (!loaded) {
    return (
      <div className="page-container">
        <p className="loading-message">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <span className="eyebrow">YOUR SELECTION</span>
        <h1>Your cart</h1>
        <p>Review your items before proceeding to checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>You haven't added any dishes yet.</p>

          <Link href="/menu" className="button button-primary">
            Browse menu
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image">{item.image}</div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price} ETB each</p>

                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-end">
                  <strong>{item.price * item.quantity} ETB</strong>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <h2>Order summary</h2>

            <div className="summary-total">
              <span>Total</span>
              <strong>{totalPrice} ETB</strong>
            </div>

            <p className="summary-note">
              Delivery charges are not included in this demo.
            </p>

            <Link
              href="/checkout"
              className="button button-primary button-full"
            >
              Proceed to checkout
            </Link>

            <Link href="/menu" className="continue-link">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}