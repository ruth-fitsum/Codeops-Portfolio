
import Header from "./Header";
import Dish from "./Dish";

// QUESTION 5: Store dishes in an array
const menu = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Shiro", price: 120 },
  { id: 3, name: "Tibs", price: 280 },
];

function App() {
  return (
    <div>
      {/* QUESTION 2: Your own JSX heading and paragraph */}
      {/* QUESTION 4: Compose Header and Dish components */}
      <Header />

      {/* QUESTION 5: Render dishes using map() and unique keys */}
      <div className="menu">
        {menu.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
