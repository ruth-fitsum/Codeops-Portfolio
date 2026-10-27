import { Link } from "react-router-dom";

import useCartStore from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";

function Cart() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h1>Your Cart Is Empty</h1>
        <p>Explore the menu and add some dishes.</p>

        <Link to="/menu" className="button">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Your Cart</h1>
        <p>Review your selected dishes before checkout.</p>
      </div>

      <div className="cart-list">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <h2>{item.name}</h2>
              <p>{formatPrice(item.price)} each</p>

              <div className="quantity-controls">
                <label htmlFor={`quantity-${item.id}`}>
                  Quantity:
                </label>

                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  step="1"
                  value={item.quantity}
                  onChange={(event) => {
                    const value = event.target.value;

                    if (value === "") {
                      return;
                    }

                    updateQuantity(item.id, value);
                  }}
                />
              </div>

              <button
                className="danger-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>

            <p className="price">
              {formatPrice(item.price * item.quantity)}
            </p>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: {formatPrice(total)}</h2>

        <Link to="/menu" className="button secondary">
          Continue Shopping
        </Link>

        <Link to="/checkout" className="button">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;