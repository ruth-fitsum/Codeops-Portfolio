import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";

const initialValues = {
  fullName: "",
  phone: "",
  address: "",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!/^(\+251|0)9\d{8}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid Ethiopian mobile number.";
  }

  if (!values.address.trim()) {
    errors.address = "Delivery address is required.";
  }

  return errors;
}

function Checkout() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const errors = validate(values);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setTouched({
      fullName: true,
      phone: true,
      address: true,
    });

    if (items.length === 0 || Object.keys(errors).length > 0) {
      return;
    }

    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <section className="message">
        <h1>Order received!</h1>
        <p>
          Thank you, {values.fullName}. Your order total was {total} ETB.
        </p>
        <p>This is a demonstration checkout; no real order was sent.</p>
        <Link to="/menu" className="button">
          Continue shopping
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="message">
        <h1>Your cart is empty</h1>
        <p>Add dishes to your cart before checking out.</p>
        <Link to="/menu" className="button">
          Browse menu
        </Link>
      </section>
    );
  }

  function fieldError(name) {
    return touched[name] ? errors[name] : "";
  }

  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <p>Order total: {total} ETB</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>

          <input
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError("fullName"))}
            aria-describedby="fullName-error"
          />

          <p id="fullName-error" className="field-error" aria-live="polite">
            {fieldError("fullName")}
          </p>
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone number</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="09xxxxxxxx or +2519xxxxxxxx"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError("phone"))}
            aria-describedby="phone-error"
          />

          <p id="phone-error" className="field-error" aria-live="polite">
            {fieldError("phone")}
          </p>
        </div>

        <div className="form-field">
          <label htmlFor="address">Delivery address</label>

          <textarea
            id="address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(fieldError("address"))}
            aria-describedby="address-error"
          />

          <p id="address-error" className="field-error" aria-live="polite">
            {fieldError("address")}
          </p>
        </div>

        <button type="submit">Place order</button>
      </form>
    </section>
  );
}

export default Checkout;