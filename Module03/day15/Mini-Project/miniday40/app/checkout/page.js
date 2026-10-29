import Link from "next/link";
import OrderForm from "../../components/OrderForm";
import { getOrderById } from "../../lib/orders";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | Addis Eats",
  description: "Complete your Addis Eats order.",
};

export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;
  const successId = params?.success;
  const order = successId ? getOrderById(successId) : null;

  if (successId && order) {
    return (
      <section className="container section">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <p className="eyebrow">ORDER RECEIVED</p>
          <h1>Thank you for your order!</h1>
          <p>Your order has been recorded in this demo application.</p>

          <div className="order-confirmation">
            <div className="summary-line">
              <span>Order number</span>
              <strong>{order.id}</strong>
            </div>
            <div className="summary-line">
              <span>Payment method</span>
              <strong>{order.customer.paymentMethod}</strong>
            </div>
            <div className="summary-line">
              <span>Status</span>
              <strong>{order.status}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{order.total} ETB</strong>
            </div>
          </div>

          <Link href="/menu" className="button button-primary">
            Back to menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section">
      <div className="page-heading">
        <p className="eyebrow">ALMOST THERE</p>
        <h1>Checkout</h1>
        <p>Enter your details to place your order.</p>
      </div>

      <div className="checkout-layout">
        <div className="checkout-panel">
          <h2>Delivery details</h2>
          <OrderForm />
        </div>
      </div>
    </section>
  );
}