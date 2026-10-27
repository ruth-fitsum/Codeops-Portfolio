import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";

function DishCard({ dish }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const price = dish.price;

  function handleAddToCart() {
    addToCart({
      id: dish.id,
      name: dish.name,
      image: dish.image,
      price,
    });
  }

  return (
    <article className="dish-card">
      <img src={dish.image} alt={dish.name} />

      <div className="dish-card-content">
        <h3>{dish.name}</h3>

        <p>⭐ {dish.rating ?? "Not rated"}</p>

        <p className="price">{formatPrice(price)}</p>

        <div className="card-actions">
          <Link to={`/menu/${dish.id}`} className="button secondary">
            Details
          </Link>

          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;