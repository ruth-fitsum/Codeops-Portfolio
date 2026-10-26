import { Link, useParams } from "react-router-dom";

export default function OrderReceipt() {
  const { id } = useParams();

  const savedOrder = sessionStorage.getItem(
    `addis-eats-order-${id}`
  );

  if (!savedOrder) {
    return (
      <section>
        <h2>Order Not Found</h2>

        <Link to="/menu">Return to Menu</Link>
      </section>
    );
  }

  const order = JSON.parse(savedOrder);

  return (
    <section>
      <h2>Order Confirmed!</h2>

      <p>Thank you for ordering from Addis Eats.</p>

      <p>Order number: {order.id}</p>

      <p>Phone: {order.phone}</p>

      <p>Delivery address: {order.address}</p>

      <h3>Items</h3>

      {order.items.map((dish, index) => (
        <p key={`${dish.id}-${index}`}>
          {dish.name} — {dish.price} ETB
        </p>
      ))}

      <h3>Total: {order.total} ETB</h3>

      <Link to="/menu">Continue Shopping</Link>
    </section>
  );
}