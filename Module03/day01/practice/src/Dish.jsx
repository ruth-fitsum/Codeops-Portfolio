
function Dish({ name, price }) {
  return (
    <div className="dish">
      <h2>{name}</h2>
      <p>{price} ETB</p>
    </div>
  );
}

export default Dish;
