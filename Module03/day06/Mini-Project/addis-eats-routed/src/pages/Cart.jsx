import { Link } from "react-router-dom";

import { useCart } from "../CartProvider";

export default function Cart() {
  const { items, dispatch, total } = useCart();

  function removeItem(index) {
    dispatch({
      type: "remove",
      index,
    });
  }

  return (
    <section>
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/menu">Browse the Menu</Link>
        </>
      ) : (
        <>
          {items.map((dish, index) => (
            <article
              className="cart-item"
              key={`${dish.id}-${index}`}
            >
              <div>
                <h3>{dish.name}</h3>
                <p>{dish.price} ETB</p>
              </div>

              <button onClick={() => removeItem(index)}>
                Remove
              </button>
            </article>
          ))}

          <h3>Total: {total} ETB</h3>

          <button
            onClick={() => dispatch({ type: "clear" })}
          >
            Clear Cart
          </button>

          <p>
            <Link to="/checkout">
              Proceed to Checkout
            </Link>
          </p>
        </>
      )}
    </section>
  );
}