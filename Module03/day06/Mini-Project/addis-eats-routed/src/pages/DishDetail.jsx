import { Link, useParams } from "react-router-dom";

import useFetch from "../useFetch";
import { useCart } from "../CartProvider";

export default function DishDetail() {
  const { id } = useParams();

  const { data, loading, error } = useFetch("/dishes.json");

  const { dispatch } = useCart();

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const dish = data.find(
    (item) => String(item.id) === id
  );

  if (!dish) {
    return (
      <section>
        <h2>Dish Not Found</h2>

        <p>
          We could not find a dish with ID "{id}".
        </p>

        <Link to="/menu">Return to Menu</Link>
      </section>
    );
  }

  function addToCart() {
    dispatch({
      type: "add",
      dish,
    });
  }

  return (
    <section>
      <h2>{dish.name}</h2>

      <p>{dish.description}</p>

      <p>Category: {dish.category}</p>

      <h3>Price: {dish.price} ETB</h3>

      <button onClick={addToCart}>
        Add to Cart
      </button>

      <p>
        <Link to="/menu">Back to Menu</Link>
      </p>
    </section>
  );
}