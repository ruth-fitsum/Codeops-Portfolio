import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { useMemo } from "react";

import useFetch from "../useFetch";
import { useCartStore } from "../cartStore";

export default function Menu() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const category =
    searchParams.get("category") ?? "All";

  const { data, loading, error } =
    useFetch("/dishes.json");

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const filteredDishes = useMemo(() => {
    if (!data) {
      return [];
    }

    if (category === "All") {
      return data;
    }

    return data.filter(
      (dish) => dish.category === category
    );
  }, [data, category]);

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (selectedCategory === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", selectedCategory);
    }

    setSearchParams(nextParams);
  }

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <label htmlFor="category">
        Filter by category:
      </label>

      <select
        id="category"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="All">All Dishes</option>
        <option value="Traditional">Traditional</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
      </select>

      {filteredDishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div className="dish-list">
          {filteredDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <h3>
                <Link to={`/menu/${dish.id}`}>
                  {dish.name}
                </Link>
              </h3>

              <p>{dish.description}</p>

              <p>Category: {dish.category}</p>

              <p>{dish.price} ETB</p>

              <button onClick={() => addItem(dish)}>
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}