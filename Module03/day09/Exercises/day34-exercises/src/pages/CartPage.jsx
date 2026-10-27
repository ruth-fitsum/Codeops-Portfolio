import CartPanel from "../components/CartPanel";

export default function CartPage({ cart }) {
  return (
    <div>
      <h2>Cart</h2>
      <CartPanel cart={cart} />
    </div>
  );
}