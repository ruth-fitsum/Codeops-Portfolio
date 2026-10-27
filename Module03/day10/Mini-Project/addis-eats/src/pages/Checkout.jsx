import { useState } from "react";
import { Link } from "react-router-dom";

import useCartStore from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [touched, setTouched] = useState({});
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const errors = {
    fullName:
      form.fullName.trim().length < 2
        ? "Enter your full name."
        : "",

    email:
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? "Enter a valid email address."
        : "",

    phone:
      !/^(?:\+251|0)9\d{8}$/.test(form.phone.trim())
        ? "Enter a valid Ethiopian mobile number."
        : "",

    address:
      form.address.trim().length < 5
        ? "Enter an address of at least 5 characters."
        : "",
  };

  const hasErrors = Object.values(errors).some(Boolean);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
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
      email: true,
      phone: true,
      address: true,
    });

    if (hasErrors || items.length === 0) {
      return;
    }

    const order = {
      customer: { ...form },
      items: items.map((item) => ({ ...item })),
      total,
      orderNumber: `AE-${Date.now()}`,
    };

    setSubmittedOrder(order);
    clearCart();
  }

  if (submittedOrder) {
    return (
      <section className="success-box">
        <h1>Order Submitted Successfully!</h1>

        <p>
          Thank you, {submittedOrder.customer.fullName}.
        </p>

        <p>
          Your demo order number is{" "}
          <strong>{submittedOrder.orderNumber}</strong>.
        </p>

        <p>
          Order total:{" "}
          <strong>{formatPrice(submittedOrder.total)}</strong>
        </p>

        <p>
          This is a demonstration only. No payment was processed
          and no order was sent to a real restaurant.
        </p>

        <Link to="/menu" className="button">
          Back to Menu
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <h1>No Items to Checkout</h1>
        <p>Add dishes to your cart before placing an order.</p>

        <Link to="/menu" className="button">
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-layout">
      <div>
        <div className="page-heading">
          <h1>Checkout</h1>
          <p>Enter your details to submit your demo order.</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.fullName && errors.fullName)}
            />

            {touched.fullName && errors.fullName && (
              <p className="field-error">{errors.fullName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.email && errors.email)}
            />

            {touched.email && errors.email && (
              <p className="field-error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="09XXXXXXXX or +2519XXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.phone && errors.phone)}
            />

            {touched.phone && errors.phone && (
              <p className="field-error">{errors.phone}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>

            <textarea
              id="address"
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.address && errors.address)}
            />

            {touched.address && errors.address && (
              <p className="field-error">{errors.address}</p>
            )}
          </div>

          <button type="submit">
            Submit Demo Order
          </button>
        </form>
      </div>

      <aside className="order-summary">
        <h2>Order Summary</h2>

        {items.map((item) => (
          <div className="summary-row" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}

        <hr />

        <h3>Total: {formatPrice(total)}</h3>
      </aside>
    </section>
  );
}

export default Checkout;