import {
  useCallback,
  useMemo,
  useState
} from "react";

import { useCart } from "../CartContext";
import { useFetch } from "../useFetch";
import DishList from "./DishList";

const categories = ["All", "Main", "Vegan", "Grill"];

export default function Menu() {
  const [category, setCategory] = useState("All");

  const {
    data,
    loading,
    error
  } = useFetch(
    `/dishes.json?c=${encodeURIComponent(category)}`
  );

  const { dispatch } = useCart();

  const shown = useMemo(() => {
    const allDishes = data ?? [];

    const filtered =
      category === "All"
        ? allDishes
        : allDishes.filter(
            (dish) => dish.category === category
          );

    return [...filtered].sort(
      (a, b) => a.price - b.price
    );
  }, [data, category]);

  const addToCart = useCallback((dish) => {
    dispatch({
      type: "add",
      dish
    });
  }, [dispatch]);

  return (
    <section>
      <h2>Menu</h2>

      <div className="category-bar">
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item ? "selected" : ""
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {loading && <p>Loading menu...</p>}

      {error && (
        <p className="error">
          Could not load menu: {error}
        </p>
      )}

      {!loading && !error && (
        <DishList
          dishes={shown}
          onAdd={addToCart}
        />
      )}
    </section>
  );
}