import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const initial = {
    id,
    customer: "Abebe",
    status: "Preparing",
    items: ["Doro Wot", "Injera", "Tibs"],
    updatedAt: new Date().toISOString(),
  };

  return (
    <main className="container">
      <h1>Order Tracking</h1>

      <p>Follow your Addis Eats order.</p>

      <OrderStatus id={id} initial={initial} />
    </main>
  );
}