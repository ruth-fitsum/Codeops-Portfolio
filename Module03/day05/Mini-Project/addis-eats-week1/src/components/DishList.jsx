import { memo } from "react";

const DishList = memo(function DishList({
  dishes,
  onAdd
}) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish" key={dish.id}>
          <h3>{dish.name}</h3>

          <p>{dish.description}</p>

          <p className="category-label">
            {dish.category}
          </p>

          <strong>{dish.price} ETB</strong>

          <button onClick={() => onAdd(dish)}>
            Add to cart
          </button>
        </article>
      ))}
    </div>
  );
});

export default DishList;