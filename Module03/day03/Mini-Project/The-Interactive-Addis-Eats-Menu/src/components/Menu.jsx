import { useState } from "react";
import { dishes } from "../data.js";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import OrderForm from "./OrderForm.jsx";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

  function addToOrder(dish) {
    setTotal((previousTotal) => previousTotal + dish.price);
  }

  return (
    <div>
      <h1>Interactive Addis Eats Menu</h1>

      <p>Choose your favorite Ethiopian dishes.</p>

      <h2>Categories</h2>

      <CategoryBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <h2>Our Menu</h2>

      <DishList dishes={filteredDishes} onAdd={addToOrder} />

      <section>
        <h2>Your Order</h2>
        <p>Total: {total} ETB</p>

        <button onClick={() => setTotal(0)}>
          Clear Order Total
        </button>
      </section>

      <OrderForm total={total} />
    </div>
  );
}