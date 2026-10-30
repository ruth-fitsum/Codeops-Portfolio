import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/orders";

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  if (user.role !== "staff") {
    return (
      <main className="page-container">
        <section className="content-card">
          <h1>Access denied</h1>
          <p>You need the staff role to access the kitchen.</p>
          <Link href="/" className="button-primary">
            Return home
          </Link>
        </section>
      </main>
    );
  }

  const orders = getOrdersFor(user.id);

  return (
    <main className="page-container">
      <section className="content-card">
        <p className="eyebrow">STAFF AREA</p>
        <h1>Kitchen Dashboard</h1>
        <p>Welcome, {user.name}.</p>

        <p>
          This demonstration lists orders associated with the
          signed-in staff account.
        </p>

        {orders.map((order) => (
          <article className="order-row" key={order.id}>
            <div>
              <h2>Order #{order.id}</h2>
              <p>{order.dish}</p>
            </div>
            <strong>{order.status}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}