import { memo, useState } from "react";
import { dishes } from "../data/dishes";
import DishModal from "./DishModal";

const DishCard = memo(function DishCard({
  dish,
  onAdd,
  onView,
  simulateError,
}) {
  if (simulateError && dish.id === 2) {
    throw new Error("Deliberate test error inside the Shiro dish.");
  }

  return (
    <article className="dish-card">
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p className="price">{dish.price.toLocaleString()} ETB</p>

      <div className="dish-actions">
        <button type="button" onClick={() => onView(dish)}>
          View details
        </button>

        <button type="button" onClick={() => onAdd(dish)}>
          Add to cart
        </button>
      </div>
    </article>
  );
});

export default function Menu({ onAdd, simulateError }) {
  const [selectedDish, setSelectedDish] = useState(null);

  function closeModal() {
    setSelectedDish(null);
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAdd={onAdd}
            onView={setSelectedDish}
            simulateError={simulateError}
          />
        ))}
      </div>

      <DishModal dish={selectedDish} onClose={closeModal} />
    </section>
  );
}