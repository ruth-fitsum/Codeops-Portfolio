import Link from "next/link";
import { dishes } from "../lib/data";
import AddToCartButton from "../components/AddToCartButton";

export default function HomePage() {
  const popularDishes = dishes.filter((dish) => dish.popular);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">WELCOME TO ADDIS EATS</p>
          <h1>Good food brings us together.</h1>
          <p>
            Discover Ethiopian favorites, fresh flavors, and comforting
            meals made for sharing.
          </p>
          <Link href="/menu" className="button button-light">
            Explore the menu
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR FAVORITES</p>
            <h2>Popular dishes</h2>
          </div>
          <Link href="/menu" className="text-link">
            View all dishes →
          </Link>
        </div>

        <div className="dish-grid">
          {popularDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <Link href={`/menu/${dish.id}`} className="dish-image">
                <span>{dish.image}</span>
              </Link>

              <div className="dish-content">
                <p className="dish-category">{dish.category}</p>
                <h3>
                  <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
                </h3>
                <p className="dish-description">{dish.description}</p>
                <div className="dish-footer">
                  <strong>{dish.price} ETB</strong>
                  <AddToCartButton dish={dish} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}