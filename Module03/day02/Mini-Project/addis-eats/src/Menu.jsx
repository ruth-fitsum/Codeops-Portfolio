import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

function Menu({ dishes, category }) {
  const filteredDishes = dishes.filter(
    (dish) => dish.category === category
  );

  if (filteredDishes.length === 0) {
    return (
      <section className="menu">
        <h2>{category}</h2>
        <p>No dishes found in this category.</p>
      </section>
    );
  }

  return (
    <section className="menu">
      <h2>{category}</h2>

      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        </Card>
      ))}
    </section>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool.isRequired,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
};

export default Menu;