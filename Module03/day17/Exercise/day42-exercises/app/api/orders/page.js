import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/orders";

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const orders = getOrdersFor(user.id);

  return (
    <main className="page-container">
      <section className="content-card">
        <p className="eyebrow">MY ACCOUNT</p>
        <h1>My Orders</h1>
        <p className="muted">
          These orders belong to {user.name}.
        </p>

        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <article className="order-row" key={order.id}>
                <div>
                  <h2>Order #{order.id}</h2>
                  <p>{order.dish}</p>
                </div>

                <div className="order-details">
                  <strong>{order.amount} ETB</strong>
                  <span>{order.status}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}