
import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency }) {
  return (
    <div className="dish">
      <div>
        <h3>{name}</h3>

        {Boolean(spicy) && (
          <span className="spicy-badge">Spicy</span>
        )}
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

Dish.defaultProps = {
  currency: "ETB",
};

export default Dish;
