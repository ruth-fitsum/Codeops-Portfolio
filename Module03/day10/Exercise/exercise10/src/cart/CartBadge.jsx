import { useCartStore } from "./cartStore";

function CartBadge() {
  const items = useCartStore((state) => state.items);

  const count = items.reduce((total, item) => total + item.quantity, 0);

  return <span className="cart-badge">{count}</span>;
}

export default CartBadge;