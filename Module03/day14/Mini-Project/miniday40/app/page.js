import Link from "next/link";
import { dishes } from "../lib/data";
import AddToCartButton from "../components/AddToCartButton";

export default function HomePage() {
  const popularDishes = dishes.filter((dish) => dish.popular);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO ADDIS EATS</span>

          <h1>
            Good food.
            <br />
            <span>Good mood.</span>
          </h1>

          <p>
            Explore Ethiopian favorites and delicious meals, all in one place.
          </p>

          <div className="hero-actions">
            <Link href="/menu" className="button button-primary">
              Explore menu
            </Link>
            <Link href="/cart" className="button button-outline">
              View cart
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>Fresh</strong>
              <span>Every day</span>
            </div>
            <div>
              <strong>Local</strong>
              <span>Favorite dishes</span>
            </div>
            <div>
              <strong>Easy</strong>
              <span>Online ordering</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-food">🍛</div>
          <div className="floating-note">
            <span>❤️</span>
            <div>
              <strong>Made with care</strong>
              <p>Food worth sharing</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR FAVORITES</span>
            <h2>Popular dishes</h2>
            <p>Start with some of our most-loved meals.</p>
          </div>

          <Link href="/menu" className="text-link">
            View full menu →
          </Link>
        </div>

        <div className="dish-grid">
          {popularDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <Link
                href={`/menu/${dish.id}`}
                className="dish-image"
                aria-label={`View ${dish.name}`}
              >
                <span>{dish.image}</span>
              </Link>

              <div className="dish-content">
                <span className="dish-category">{dish.category}</span>
                <Link
                  href={`/menu/${dish.id}`}
                  className="dish-title-link"
                >
                  <h3>{dish.name}</h3>
                </Link>

                <p>{dish.description}</p>

                <div className="dish-footer">
                  <strong>{dish.price} ETB</strong>
                  <AddToCartButton dish={dish} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span className="eyebrow">READY TO EAT?</span>
          <h2>Your next favorite meal is waiting.</h2>
          <p>Browse our menu and put together your perfect order.</p>
        </div>

        <Link href="/menu" className="button button-light">
          Order now
        </Link>
      </section>
    </>
  );
}