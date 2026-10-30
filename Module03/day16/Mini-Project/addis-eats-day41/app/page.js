import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <nav className="navbar">
          <Link href="/" className="brand">
            <span className="brand-icon">A</span>
            Addis Eats
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/dishes">Our Menu</Link>
            <Link href="/orders/101">Track Order</Link>
          </div>
        </nav>

        <div className="hero-content">
          <span className="hero-label">
            FRESH FOOD. LOCAL FLAVORS.
          </span>

          <h1>
            A taste of Ethiopia,
            <br />
            <span>delivered with love.</span>
          </h1>

          <p>
            Discover your favorite Ethiopian dishes and explore
            delicious meals for every occasion.
          </p>

          <div className="hero-actions">
            <Link href="/dishes" className="button-primary">
              Explore Our Menu →
            </Link>

            <Link href="/orders/101" className="button-secondary">
              Track Demo Order
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>12+</strong>
              <span>Menu items</span>
            </div>

            <div>
              <strong>Fresh</strong>
              <span>Local flavors</span>
            </div>

            <div>
              <strong>ETB</strong>
              <span>Local pricing</span>
            </div>
          </div>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <span>🍲</span>
          <span>🍛</span>
          <span>🥘</span>
        </div>
      </section>

      <section className="home-features">
        <article>
          <span className="feature-icon">🔎</span>
          <h2>Easy Discovery</h2>
          <p>
            Search our menu and find dishes by name, category, or
            description.
          </p>
        </article>

        <article>
          <span className="feature-icon">⚡</span>
          <h2>Fast Updates</h2>
          <p>
            Explore how SWR updates menu data and keeps the interface
            responsive.
          </p>
        </article>

        <article>
          <span className="feature-icon">📦</span>
          <h2>Order Tracking</h2>
          <p>
            Watch a simulated order progress through its different
            stages.
          </p>
        </article>
      </section>

      <footer className="site-footer">
        <p>© 2026 Addis Eats. Built for CodeOps Day 41.</p>
      </footer>
    </main>
  );
}