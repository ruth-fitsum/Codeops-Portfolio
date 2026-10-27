import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, onClearCart }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, dish) => sum + dish.price * dish.quantity,
    0
  );

  async function handleCheckout(event) {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/receipt", {
        state: {
          total,
          itemCount: cart.reduce(
            (sum, dish) => sum + dish.quantity,
            0
          ),
        },
      });

      onClearCart();
    } catch {
      setError("Checkout failed. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="form-card">
      <h2>Checkout</h2>
      <p>Total: {total.toLocaleString()} ETB</p>

      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleCheckout}>
        <button type="submit" disabled={sending || cart.length === 0}>
          {sending ? "Processing..." : "Place order"}
        </button>
      </form>
    </section>
  );
}