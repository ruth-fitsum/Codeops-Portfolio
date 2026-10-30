import Link from "next/link";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/users";

export default async function HomePage() {
  const session = await getSession();
  const user = session ? getUserById(session.id) : null;

  return (
    <main className="container">
      <section className="hero card">
        <h1>Addis Eats</h1>
        <p>
          Day 42 exercises: middleware, authentication,
          authorization, and secure redirects.
        </p>

        {user ? (
          <>
            <p>
              Signed in as <strong>{user.name}</strong> (
              {user.role})
            </p>

            <nav className="links">
              <Link href="/checkout">Checkout</Link>
              <Link href="/orders">My Orders</Link>

              {user.role === "staff" && (
                <Link href="/kitchen">Kitchen</Link>
              )}
            </nav>

            <form action="/api/signout" method="post">
              <button type="submit">Sign out</button>
            </form>
          </>
        ) : (
          <Link className="button-link" href="/signin">
            Sign in
          </Link>
        )}
      </section>
    </main>
  );
}