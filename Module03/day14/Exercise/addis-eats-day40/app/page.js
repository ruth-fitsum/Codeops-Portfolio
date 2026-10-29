import Link from "next/link";
import { getDishes } from "../lib/data";
import AddToCartButton from "../components/AddToCartButton";

export default function HomePage() {
  const specials = getDishes().filter((dish) => dish.popular);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <span className="eyebrow">AUTHENTIC ETHIOPIAN FLAVORS</span>
          <h1>Good food brings us together.</h1>
          <p>
            Discover your favorite Ethiopian dishes, prepared with care
            and delivered with a taste of home.
          </p>

          <Link href="/menu" className="button button-light">
            Explore our menu
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FRESH FROM OUR KITCHEN</span>
            <h2>Today&apos;s specials</h2>
          </div>

          <Link href="/menu" className="text-link">
            View full menu →
          </Link>
        </div>

        <div className="dish-grid">
          {specials.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <div className="dish-image" aria-hidden="true">
                {dish.image}
              </div>

              <div className="dish-content">
                <span className="dish-category">{dish.category}</span>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>

                <div className="dish-footer">
                  <strong>{dish.price} ETB</strong>
                  <Link href={`/menu/${dish.id}`} className="text-link">
                    Details
                  </Link>
                </div>

                <AddToCartButton dish={dish} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="callout">
        <div className="container callout-content">
          <div>
            <h2>Your next favorite meal is waiting.</h2>
            <p>Explore our full menu and find something delicious.</p>
          </div>

          <Link href="/menu" className="button button-primary">
            Browse menu
          </Link>
        </div>
      </section>
    </>
  );
}