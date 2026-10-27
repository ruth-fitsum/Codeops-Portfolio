import { Link } from "react-router-dom";

export default function CartPanel({ cart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-panel">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                {(item.price * item.quantity).toLocaleString()} ETB
              </span>
            </div>
          ))}

          <h3>Total: {total.toLocaleString()} ETB</h3>

          <Link className="button" to="/checkout">
            Proceed to checkout
          </Link>
        </>
      )}
    </section>
  );
}