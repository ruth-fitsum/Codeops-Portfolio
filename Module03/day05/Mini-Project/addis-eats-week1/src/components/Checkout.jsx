import { useCart } from "../CartContext";

export default function Checkout() {
  const {
    items,
    dispatch,
    total
  } = useCart();

  return (
    <aside className="checkout">
      <h2>Your order</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  {item.price * item.quantity} ETB
                </span>

                <button
                  className="remove"
                  onClick={() =>
                    dispatch({
                      type: "remove",
                      id: item.id
                    })
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() =>
              dispatch({ type: "clear" })
            }
          >
            Clear cart
          </button>
        </>
      )}

      <h3>Total: {total} ETB</h3>
    </aside>
  );
}