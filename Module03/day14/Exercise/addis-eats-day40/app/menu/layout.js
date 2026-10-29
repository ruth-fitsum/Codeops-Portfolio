import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <section className="menu-section">
      <div className="container">
        <div className="menu-intro">
          <span className="eyebrow">MADE WITH CARE</span>
          <h1>Our Menu</h1>
          <p>
            Explore traditional favorites, vegetarian meals, breakfast,
            and refreshing drinks.
          </p>
          <Link href="/cart" className="text-link">
            View your cart →
          </Link>
        </div>

        {children}
      </div>
    </section>
  );
}