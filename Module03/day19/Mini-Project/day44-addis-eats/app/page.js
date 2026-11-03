import Link from "next/link";
import { dishes } from "../lib/dishes";

export const metadata = {
  title: "Home",
  description:
    "Explore the menu at Addis Eats and discover Ethiopian favorites, traditional stews, and fresh drinks.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Welcome to Addis Eats",
    description:
      "Discover Ethiopian food and traditional favorites.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">WELCOME TO ADDIS EATS</p>

          <h1>Discover the taste of Ethiopia.</h1>

          <p>
            From traditional Doro Wat to fresh juice, explore
            delicious meals inspired by Ethiopian flavors.
          </p>

          <a href="#menu" className="button">
            Explore the menu
          </a>
        </div>
      </section>

      <section className="container section" id="menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR MENU</p>
            <h2>Find your next favorite</h2>
          </div>

          <p>
            Explore our dishes and learn more about each meal.
          </p>
        </div>

        <div className="dish-grid">
          {dishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <Link
                href={`/menu/${dish.id}`}
                className="dish-image"
                aria-label={`Learn about ${dish.name}`}
              >
                <span>{dish.image}</span>
              </Link>

              <div className="dish-content">
                <p className="dish-category">{dish.category}</p>

                <h3>
                  <Link href={`/menu/${dish.id}`}>
                    {dish.name}
                  </Link>
                </h3>

                <p className="dish-description">
                  {dish.description}
                </p>

                <div className="dish-footer">
                  <strong>{dish.price} ETB</strong>

                  <Link
                    href={`/menu/${dish.id}`}
                    className="text-link"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}