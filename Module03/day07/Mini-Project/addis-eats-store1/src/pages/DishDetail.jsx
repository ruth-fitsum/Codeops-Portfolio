import {
  Link,
  useParams,
} from "react-router-dom";

import useFetch from "../useFetch";
import { useCartStore } from "../cartStore";

export default function DishDetail() {
  const { id } = useParams();

  const { data, loading, error } =
    useFetch("/dishes.json");

  const addItem = useCartStore(
    (state) => state.addItem
  );

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

        <p>No dish found with ID "{id}".</p>

        <Link to="/menu">Return to Menu</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{dish.name}</h2>

      <p>{dish.description}</p>

      <p>Category: {dish.category}</p>

      <h3>{dish.price} ETB</h3>

      <button onClick={() => addItem(dish)}>
        Add to Cart
      </button>

      <p>
        <Link to="/menu">Back to Menu</Link>
      </p>
    </section>
  );
}