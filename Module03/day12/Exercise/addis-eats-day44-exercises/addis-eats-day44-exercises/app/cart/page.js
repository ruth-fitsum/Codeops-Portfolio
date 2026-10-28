export const metadata = {
  title: "Cart",
  description: "Review your selected dishes before continuing with Addis Eats.",
  robots: { index: false, follow: false }
};

export default function CartPage() {
  return (
    <div className="container section">
      <p className="eyebrow">Your order</p>
      <h1>Cart</h1>
      <p className="lead">This exercise page demonstrates route-specific metadata. The full interactive cart can be connected in the capstone.</p>
      <a className="button" href="/menu">Browse menu</a>
    </div>
  );
}
