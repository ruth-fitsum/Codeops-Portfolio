import Link from "next/link";
import OrderForm from "../../components/OrderForm";

export const metadata = {
  title: "Checkout",
};

export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;
  const orderId = params?.success;

  if (orderId) {
    return (
      <div className="page-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <span className="eyebrow">ORDER RECEIVED</span>
          <h1>Thank you for your order!</h1>
          <p>Your demo order has been submitted successfully.</p>

          <div className="order-number">
            <span>Order reference</span>
            <strong>{orderId}</strong>
          </div>

          <p className="summary-note">
            This is a demonstration application. No real payment has been
            processed.
          </p>

          <Link href="/menu" className="button button-primary">
            Order more food
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <span className="eyebrow">ALMOST THERE</span>
        <h1>Checkout</h1>
        <p>Enter your delivery information to place your order.</p>
      </div>

      <OrderForm />
    </div>
  );
}