import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/users";
import { getOrdersFor } from "@/lib/orders";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/kitchen");
  }

  const user = getUserById(session.id);

  if (!user || user.role !== "staff") {
    return (
      <main className="container">
        <section className="card">
          <h1>Access denied</h1>
          <p>This page is only available to staff members.</p>
          <Link href="/">Back home</Link>
        </section>
      </main>
    );
  }

  const orders = getOrdersFor(user.id);

  return (
    <main className="container">
      <section className="card">
        <h1>Kitchen Dashboard</h1>
        <p>Welcome, {user.name}. You have staff access.</p>

        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>{order.dish}</p>
            <p>{order.total} ETB</p>
            <p>Status: {order.status}</p>
          </article>
        ))}

        <Link href="/">Back home</Link>
      </section>
    </main>
  );
}