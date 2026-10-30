import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/users";
import { getOrdersFor } from "@/lib/orders";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const user = getUserById(session.id);

  if (!user) {
    redirect("/signin");
  }

  const orders = getOrdersFor(user.id);

  return (
    <main className="container">
      <section className="card">
        <h1>My Orders</h1>
        <p>Only orders belonging to your account are displayed.</p>

        {orders.length === 0 ? (
          <p>You do not have any orders yet.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <h2>Order #{order.id}</h2>
                <p>Dish: {order.dish}</p>
                <p>Total: {order.total} ETB</p>
                <p>Status: {order.status}</p>
              </article>
            ))}
          </div>
        )}

        <Link href="/">Back home</Link>
      </section>
    </main>
  );
}