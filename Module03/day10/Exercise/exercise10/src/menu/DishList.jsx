import DishCard from "./DishCard";

function DishList({ dishes }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="message">
        <h2>No dishes found</h2>
        <p>Try selecting another category.</p>
      </div>
    );
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

export default DishList;