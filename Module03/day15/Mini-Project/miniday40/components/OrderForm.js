"use client";

import { useActionState } from "react";
import { useCart } from "./CartProvider";
import { placeOrderAction } from "../app/actions";

const initialState = {
  fieldErrors: {},
  error: "",
};

export default function OrderForm() {
  const { cart, loaded } = useCart();
  const [state, formAction, pending] = useActionState(
    placeOrderAction,
    initialState
  );

  if (!loaded) {
    return <p>Loading your cart...</p>;
  }

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Add some dishes before checking out.</p>
      </div>
    );
  }

  const items = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  return (
    <form action={formAction} className="checkout-form">
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(items)}
      />

      <label htmlFor="name">Full name</label>
      <input id="name" name="name" required minLength={2} />
      {state.fieldErrors?.name && (
        <p className="field-error">{state.fieldErrors.name}</p>
      )}

      <label htmlFor="phone">Phone number</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder="0912345678"
        required
      />
      {state.fieldErrors?.phone && (
        <p className="field-error">{state.fieldErrors.phone}</p>
      )}

      <label htmlFor="address">Delivery address</label>
      <textarea
        id="address"
        name="address"
        required
        minLength={5}
        rows={3}
      />
      {state.fieldErrors?.address && (
        <p className="field-error">{state.fieldErrors.address}</p>
      )}

      <label htmlFor="paymentMethod">Payment method</label>
      <select
        id="paymentMethod"
        name="paymentMethod"
        defaultValue="Cash on Delivery"
        required
      >
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Mobile Money">Mobile Money</option>
      </select>
      {state.fieldErrors?.paymentMethod && (
        <p className="field-error">
          {state.fieldErrors.paymentMethod}
        </p>
      )}

      {state.error && <p className="field-error">{state.error}</p>}

      <button
        type="submit"
        className="button button-primary button-full"
        disabled={pending}
      >
        {pending ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}