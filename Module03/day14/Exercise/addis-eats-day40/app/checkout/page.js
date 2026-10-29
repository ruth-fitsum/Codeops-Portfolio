import Link from "next/link";
import { getDishes } from "../../lib/data";
import { placeOrder } from "../actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | Addis Eats",
  description: "Review your selections and place your order.",
};

export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;
  const dishes = getDishes();

  const orderId = params?.order;
  const error = params?.error;
  const cancelled = params?.cancelled;

  if (orderId) {
    return (
      <section className="container page-section">
        <div className="confirmation-card">
          <div className="confirmation-icon">✓</div>
          <span className="eyebrow">ORDER RECEIVED</span>
          <h1>Thank you for your order!</h1>
          <p>Your order has been submitted successfully.</p>

          <p className="order-reference">
            Order reference: <strong>{orderId}</strong>
          </p>

          <Link href="/menu" className="button button-primary">
            Back to menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">ALMOST THERE</span>
        <h1>Checkout</h1>
        <p>Enter your details and select the dishes you want to order.</p>
      </div>

      {error === "invalid" && (
        <div className="notice notice-error" role="alert">
          Please enter a valid name and Ethiopian mobile number, and
          select at least one dish with a valid quantity.
        </div>
      )}

      {error === "unauthorized" && (
        <div className="notice notice-error" role="alert">
          The order could not be cancelled because authorization failed.
        </div>
      )}

      {cancelled === "1" && (
        <div className="notice notice-success" role="status">
          Your order was cancelled.
        </div>
      )}

      <form action={placeOrder} className="checkout-form">
        <div className="form-section">
          <h2>Customer details</h2>

          <div className="form-field">
            <label htmlFor="customerName">Full name</label>
            <input
              id="customerName"
              name="customerName"
              type="text"
              minLength="2"
              maxLength="100"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Ethiopian mobile number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0912345678"
              pattern="(\\+251|0)9[0-9]{8}"
              title="Use a number like 0912345678 or +251912345678."
              autoComplete="tel"
              required
            />
            <small>
              Accepted formats: 0912345678 or +251912345678.
            </small>
          </div>
        </div>

        <div className="form-section">
          <h2>Select your dishes</h2>
          <p className="form-help">
            Select each dish you want. Set its quantity between 1 and 20.
          </p>

          <div className="checkout-dishes">
            {dishes.map((dish) => (
              <div className="checkout-dish" key={dish.id}>
                <label className="dish-select-label">
                  <input
                    type="checkbox"
                    name="dishId"
                    value={dish.id}
                  />

                  <span className="checkout-dish-icon" aria-hidden="true">
                    {dish.image}
                  </span>

                  <span className="checkout-dish-name">
                    <strong>{dish.name}</strong>
                    <small>{dish.price} ETB</small>
                  </span>
                </label>

                <div className="form-field quantity-field">
                  <label htmlFor={`quantity-${dish.id}`}>
                    Quantity
                  </label>
                  <input
                    id={`quantity-${dish.id}`}
                    name={`quantity-${dish.id}`}
                    type="number"
                    min="1"
                    max="20"
                    defaultValue="1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="button button-primary button-full"
        >
          Place order
        </button>

        <p className="form-help">
          Your order is validated and processed on the server.
        </p>
      </form>
    </section>
  );
}