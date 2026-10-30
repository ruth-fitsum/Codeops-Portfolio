import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/users";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/checkout");
  }

  const user = getUserById(session.id);

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Checkout</h1>
        <p>Welcome, {user.name}.</p>
        <p>This page is protected by authentication.</p>
        <p>In this exercise, checkout is a demonstration page.</p>

        <Link href="/orders">View my orders</Link>
        <br />
        <Link href="/">Back home</Link>
      </section>
    </main>
  );
}