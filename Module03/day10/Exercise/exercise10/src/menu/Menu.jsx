import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecipes } from "../api/recipes";
import useFetch from "../hooks/useFetch";
import Spinner from "../ui/Spinner";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

function Menu() {
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const fetchRecipes = useCallback(
    (signal) => getRecipes(signal),
    []
  );

  const { data: dishes, loading, error } = useFetch(fetchRecipes);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section className="message" role="alert">
        <h2>We could not load the menu</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (!dishes || dishes.length === 0) {
    return (
      <section className="message">
        <h2>The menu is empty</h2>
        <p>Please check again later.</p>
      </section>
    );
  }

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.tags?.includes(selectedCategory))
    : dishes;

  return (
    <section>
      <h1>Our Menu</h1>
      <p>Choose a dish to learn more or add it to your cart.</p>

      <CategoryBar dishes={dishes} />

      <DishList dishes={filteredDishes} />
    </section>
  );
}

export default Menu;