import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function CheckoutPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/checkout");
  }

  return (
    <main className="page-container">
      <section className="content-card">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Ready to complete your order?</h1>

        <p>
          Signed in as <strong>{user.name}</strong>.
        </p>

        <p>
          This exercise demonstrates a protected checkout page.
          It does not process payments or create real orders.
        </p>

        <Link href="/orders" className="button-primary">
          View my orders
        </Link>
      </section>
    </main>
  );
}