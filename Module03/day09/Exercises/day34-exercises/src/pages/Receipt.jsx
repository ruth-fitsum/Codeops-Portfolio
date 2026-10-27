import { Link, useLocation } from "react-router-dom";

export default function Receipt() {
  const location = useLocation();
  const order = location.state;

  if (!order) {
    return (
      <section>
        <h2>No receipt available</h2>
        <p>Place an order to see your receipt.</p>
        <Link to="/menu">Return to menu</Link>
      </section>
    );
  }

  return (
    <section className="form-card">
      <h2>Order successful</h2>
      <p>Thank you for ordering from Addis Eats.</p>
      <p>Items: {order.itemCount}</p>
      <p>Total: {order.total.toLocaleString()} ETB</p>
      <Link to="/menu">Return to menu</Link>
    </section>
  );
}