import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById } from "../api/recipes";
import useFetch from "../hooks/useFetch";
import Spinner from "../ui/Spinner";
import { useCartStore } from "../cart/cartStore";

function DishDetail() {
  const { id } = useParams();

  const fetchDish = useCallback(
    (signal) => getRecipeById(id, signal),
    [id]
  );

  const { data: dish, loading, error } = useFetch(fetchDish);

  const addItem = useCartStore((state) => state.addItem);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section className="message" role="alert">
        <h2>Unable to load this dish</h2>
        <p>{error}</p>
        <Link to="/menu" className="button">
          Back to menu
        </Link>
      </section>
    );
  }

  if (!dish) {
    return (
      <section className="message">
        <h2>Dish not found</h2>
        <p>We could not find a dish with that ID.</p>
        <Link to="/menu" className="button">
          Back to menu
        </Link>
      </section>
    );
  }

  return (
    <article className="dish-detail">
      <img src={dish.image} alt={dish.name} />

      <div>
        <h1>{dish.name}</h1>
        <p>{dish.description || "A delicious dish from our menu."}</p>
        <p>
          <strong>Cuisine:</strong> {dish.cuisine}
        </p>
        <p>
          <strong>Difficulty:</strong> {dish.difficulty}
        </p>
        <p>
          <strong>Preparation:</strong> {dish.prepTimeMinutes} minutes
        </p>
        <p>
          <strong>Cooking:</strong> {dish.cookTimeMinutes} minutes
        </p>
        <p>
          <strong>Price:</strong> {dish.price} ETB
        </p>

        <h3>Ingredients</h3>

        <ul>
          {dish.ingredients?.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>

        <button onClick={() => addItem(dish)}>Add to cart</button>

        <Link to="/cart" className="button">
          View cart
        </Link>
      </div>
    </article>
  );
}

export default DishDetail;