import { Link, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import useCartStore from "../store/cartStore";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import {
  formatPrice,
  getDishPrice,
} from "../utils/formatPrice";

function DishDetails() {
  const { id } = useParams();

  const {
    data: dish,
    loading,
    error,
  } = useFetch(`https://dummyjson.com/recipes/${id}`);

  const addToCart = useCartStore((state) => state.addToCart);

  if (loading) {
    return <Loading />;
  }

  if (error || !dish || !dish.id) {
    return (
      <ErrorMessage
        message={error || "Dish not found."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const price = getDishPrice(dish.id);

  function handleAddToCart() {
    addToCart({
      id: dish.id,
      name: dish.name,
      image: dish.image,
      price,
    });
  }

  return (
    <section className="details-layout">
      <img
        className="details-image"
        src={dish.image}
        alt={dish.name}
      />

      <div className="details-content">
        <p className="eyebrow">DISH DETAILS</p>

        <h1>{dish.name}</h1>

        <p>⭐ Rating: {dish.rating ?? "Not rated"}</p>

        <p>Preparation time: {dish.prepTimeMinutes ?? "N/A"} minutes</p>

        <p>Cooking time: {dish.cookTimeMinutes ?? "N/A"} minutes</p>

        <p>Servings: {dish.servings ?? "N/A"}</p>

        <p className="price">{formatPrice(price)}</p>

        <h2>Ingredients</h2>

        <ul>
          {(dish.ingredients || []).map((ingredient, index) => (
            <li key={`${ingredient}-${index}`}>{ingredient}</li>
          ))}
        </ul>

        <h2>Instructions</h2>

        <ol>
          {(dish.instructions || []).map((instruction, index) => (
            <li key={`${instruction}-${index}`}>{instruction}</li>
          ))}
        </ol>

        <div className="hero-actions">
          <button onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link to="/menu" className="button secondary">
            Back to Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DishDetails;