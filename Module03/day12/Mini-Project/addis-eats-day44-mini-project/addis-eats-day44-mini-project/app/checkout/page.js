export const metadata = {
  title: "Checkout",
  description: "Review your order details and continue to checkout.",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <div className="container section">
      <p className="eyebrow">Almost there</p>
      <h1>Checkout</h1>
      <p className="lead">This demo page is not connected to payments. Keep checkout protected by server-side authentication in a real application.</p>
    </div>
  );
}
