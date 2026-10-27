import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

function CartPanel() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="message">
        <h1>Your cart is empty</h1>
        <p>Explore the menu and add something delicious.</p>
        <Link to="/menu" className="button">
          Browse menu
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>

      <div className="cart-list">
        {items.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{item.price} ETB each</p>

              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.id, Number(event.target.value))
                  }
                />
              </label>
            </div>

            <div>
              <p>
                <strong>{item.price * item.quantity} ETB</strong>
              </p>

              <button
                className="danger-button"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-total">
        <h2>Total: {total} ETB</h2>
        <Link to="/checkout" className="button">
          Proceed to checkout
        </Link>
      </div>
    </section>
  );
}

export default CartPanel;