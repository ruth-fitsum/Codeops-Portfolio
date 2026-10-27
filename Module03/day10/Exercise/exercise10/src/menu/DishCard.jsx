import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";

function DishCard({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="dish-card">
      <img src={dish.image} alt={dish.name} loading="lazy" />

      <div className="dish-card-content">
        <h3>{dish.name}</h3>
        <p>{dish.cuisine}</p>
        <p className="price">{dish.price} ETB</p>

        <div className="card-actions">
          <Link to={`/menu/${dish.id}`} className="button">
            View dish
          </Link>

          <button onClick={() => addItem(dish)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;