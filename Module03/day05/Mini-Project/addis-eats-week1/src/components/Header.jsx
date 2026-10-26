import { useCart } from "../CartContext";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div>
        <h1>Addis Eats</h1>
        <p>Order your favourites</p>
      </div>

      <strong className="badge">
        Cart: {itemCount}
      </strong>
    </header>
  );
}