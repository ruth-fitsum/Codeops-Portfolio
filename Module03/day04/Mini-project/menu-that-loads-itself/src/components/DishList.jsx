export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <h3>{dish.name}</h3>
          <p>Category: {dish.category}</p>
          <p>Price: {dish.price} ETB</p>
        </article>
      ))}
    </div>
  );
}