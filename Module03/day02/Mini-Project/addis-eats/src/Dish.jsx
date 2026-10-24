import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false }) {
  return (
    <div className="dish">
      <div>
        <h3>
          {name}{" "}
          {Boolean(spicy) && (
            <span className="spicy-badge">• Spicy</span>
          )}
        </h3>
      </div>

      <p>
        {price} {currency}
      </p>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

export default Dish;