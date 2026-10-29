import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="not-found-code">404</span>
      <h1>Dish not found</h1>
      <p>Sorry, we couldn't find the page you requested.</p>

      <Link href="/menu" className="button button-primary">
        Return to menu
      </Link>
    </section>
  );
}