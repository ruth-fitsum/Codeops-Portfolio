"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { validateOrder } from "../lib/validation";

export default function OrderForm() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateOrder(values);
    setErrors(validationErrors);
    setServerError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (cart.length === 0) {
      setServerError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: values,
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not place your order.");
      }

      clearCart();

      router.push(
        `/checkout?success=${encodeURIComponent(result.order.id)}`
      );
    } catch (error) {
      setServerError(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Add dishes before proceeding to checkout.</p>
        <button
          className="button button-primary"
          onClick={() => router.push("/menu")}
        >
          Browse menu
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <h2>Delivery information</h2>

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Your full name"
          autoComplete="name"
        />
        {errors.name && <p className="field-error">{errors.name}</p>}

        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX or +2519XXXXXXXX"
          autoComplete="tel"
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}

        <label htmlFor="address">Delivery address</label>
        <textarea
          id="address"
          name="address"
          value={values.address}
          onChange={handleChange}
          placeholder="Enter your delivery address"
          rows={4}
          autoComplete="street-address"
        />
        {errors.address && (
          <p className="field-error">{errors.address}</p>
        )}

        <label htmlFor="paymentMethod">Payment method</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={values.paymentMethod}
          onChange={handleChange}
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Mobile Money">Mobile Money (demo)</option>
        </select>
        {errors.paymentMethod && (
          <p className="field-error">{errors.paymentMethod}</p>
        )}

        {serverError && (
          <p className="field-error" role="alert">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          className="button button-primary button-full"
          disabled={submitting}
        >
          {submitting ? "Placing order..." : "Place order"}
        </button>
      </form>

      <aside className="order-summary">
        <h2>Order summary</h2>

        {cart.map((item) => (
          <div className="summary-item" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <strong>{item.price * item.quantity} ETB</strong>
          </div>
        ))}

        <div className="summary-total">
          <span>Total</span>
          <strong>{totalPrice} ETB</strong>
        </div>
      </aside>
    </div>
  );
}