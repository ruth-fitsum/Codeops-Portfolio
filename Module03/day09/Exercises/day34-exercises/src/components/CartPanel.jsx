import { Link } from "react-router-dom";

export default function CartPanel({ cart }) {
  const total = cart.reduce(
    (sum, dish) => sum + dish.price * dish.quantity,
    0
  );

  return (
    <section className="cart-panel">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((dish) => (
            <div className="cart-item" key={dish.id}>
              <span>
                {dish.name} × {dish.quantity}
              </span>

              <span>
                {(dish.price * dish.quantity).toLocaleString()} ETB
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