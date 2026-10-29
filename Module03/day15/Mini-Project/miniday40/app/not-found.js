import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section empty-state">
      <p className="eyebrow">404 ERROR</p>
      <h1>We couldn't find that page.</h1>
      <p>The page or dish you're looking for may not exist.</p>
      <Link href="/menu" className="button button-primary">
        Browse the menu
      </Link>
    </section>
  );
}