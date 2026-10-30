import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const user = await getSession();

  return (
    <main className="page-container">
      <section className="hero-card">
        <p className="eyebrow">CODEOPS · DAY 42</p>
        <h1>Middleware & Authentication</h1>

        <p>
          Learn how sessions, secure cookies, route protection,
          and authorization work together in Next.js.
        </p>

        {user ? (
          <>
            <p>
              Signed in as <strong>{user.name}</strong> (
              {user.role}).
            </p>

            <div className="action-row">
              <Link href="/checkout" className="button-primary">
                Checkout
              </Link>

              <Link href="/orders" className="button-secondary">
                My Orders
              </Link>

              {user.role === "staff" && (
                <Link href="/kitchen" className="button-secondary">
                  Kitchen
                </Link>
              )}

              <form action="/api/signout" method="post">
                <button className="button-secondary" type="submit">
                  Sign out
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="action-row">
            <Link href="/signin" className="button-primary">
              Sign in
            </Link>

            <Link href="/checkout" className="button-secondary">
              Try protected checkout
            </Link>
          </div>
        )}
      </section>

      <section className="content-card">
        <h2>What to test</h2>

        <ul>
          <li>Sign in with a customer account.</li>
          <li>Visit checkout and orders while signed out.</li>
          <li>Check that a customer cannot cancel another user's order.</li>
          <li>Sign in as staff and open the kitchen page.</li>
          <li>Test a malicious return destination.</li>
        </ul>
      </section>
    </main>
  );
}