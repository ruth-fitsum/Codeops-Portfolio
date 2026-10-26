import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../CartProvider";
import { useAuth } from "../AuthContext";

export default function Checkout() {
  const { items, total, dispatch } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (items.length === 0 || !address.trim()) {
      return;
    }

    const orderId = Date.now();

    const order = {
      id: orderId,
      phone: user.phone,
      address: address.trim(),
      items,
      total,
    };

    sessionStorage.setItem(
      `addis-eats-order-${orderId}`,
      JSON.stringify(order)
    );

    dispatch({ type: "clear" });

    navigate(`/orders/${orderId}`, {
      replace: true,
    });
  }

  return (
    <section>
      <h2>Checkout</h2>

      <p>Signed in as: {user.phone}</p>

      {items.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/menu">Browse the menu</Link>
        </>
      ) : (
        <>
          <h3>Order Summary</h3>

          {items.map((dish, index) => (
            <p key={`${dish.id}-${index}`}>
              {dish.name} — {dish.price} ETB
            </p>
          ))}

          <h3>Total: {total} ETB</h3>

          <form onSubmit={handleSubmit}>
            <label htmlFor="address">
              Delivery address
            </label>

            <textarea
              id="address"
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              required
              rows="3"
            />

            <button type="submit">
              Place Order
            </button>
          </form>
        </>
      )}
    </section>
  );
}