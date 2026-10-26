import { Link } from "react-router-dom";

import useFetch from "../useFetch";

export default function Home() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p>Loading today's specials...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h2>Welcome to Addis Eats</h2>

      <p>
        Discover traditional Ethiopian dishes and
        your favorite meals.
      </p>

      <h3>Today's Specials</h3>

      <div className="dish-list">
        {data.slice(0, 3).map((dish) => (
          <article className="dish-card" key={dish.id}>
            <h3>{dish.name}</h3>

            <p>{dish.description}</p>

            <p>
              <strong>{dish.price} ETB</strong>
            </p>

            <Link to={`/menu/${dish.id}`}>
              View Dish
            </Link>
          </article>
        ))}
      </div>

      <p>
        <Link to="/menu">Explore the full menu</Link>
      </p>
    </section>
  );
}