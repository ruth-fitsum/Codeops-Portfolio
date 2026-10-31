import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <nav className="navbar">
        <Link href="/" className="brand">
          Addis Eats
        </Link>

        <div className="nav-links">
          <Link href="/menu">Menu</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">FRESH · LOCAL · DELICIOUS</p>

          <h1>Good food brings us together.</h1>

          <p>
            Discover traditional Ethiopian favorites and
            delicious meals prepared for sharing.
          </p>

          <Link href="/menu" className="button">
            Explore the menu
          </Link>
        </div>

        <div className="hero-image">
          <Image
            src="/dishes/doro-wat.jpg"
            alt="Traditional Ethiopian Doro Wat served with injera"
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      <section className="container intro-section">
        <p className="eyebrow">MADE FOR YOUR TABLE</p>
        <h2>Explore the flavors of Addis.</h2>

        <p>
          From traditional stews to familiar favorites,
          find something delicious on our menu.
        </p>

        <Link href="/menu" className="button">
          Browse all dishes
        </Link>
      </section>

      <footer className="footer">
        Addis Eats · Performance optimization project
      </footer>
    </main>
  );
}