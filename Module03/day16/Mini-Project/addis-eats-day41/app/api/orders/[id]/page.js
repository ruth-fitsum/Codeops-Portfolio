import OrderStatus from "./OrderStatus";

export const metadata = {
  title: "Track Order | Addis Eats",
  description: "Track your Addis Eats order status.",
};

export default async function OrderPage({ params }) {
  const { id } = await params;

  return (
    <main className="page-container order-page">
      <OrderStatus id={id} />
    </main>
  );
}