"use client";

import Link from "next/link";
import { useCart } from "../../components/CartProvider";

export default function CartPage() {
  const {
    cart,
    loaded,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (!loaded) {
    return <section className="container section">Loading cart...</section>;
  }

  return (
    <section className="container section">
      <div className="page-heading">
        <p className="eyebrow">YOUR SELECTION</p>
        <h1>Your cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Explore the menu and add something delicious.</p>
          <Link href="/menu" className="button button-primary">
            Browse menu
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-emoji">{item.image}</div>

                <div className="cart-item-info">
                  <h2>{item.name}</h2>
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
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{totalPrice} ETB</span>
            </div>
            <div className="summary-line">
              <span>Delivery</span>
              <span>Calculated separately</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{totalPrice} ETB</strong>
            </div>

            <Link
              href="/checkout"
              className="button button-primary button-full"
            >
              Continue to checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}