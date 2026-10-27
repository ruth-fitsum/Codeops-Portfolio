import CartPanel from "../components/CartPanel";

export default function CartPage({ cart }) {
  return (
    <section>
      <h2>Your Cart</h2>
      <CartPanel cart={cart} />
    </section>
  );
}