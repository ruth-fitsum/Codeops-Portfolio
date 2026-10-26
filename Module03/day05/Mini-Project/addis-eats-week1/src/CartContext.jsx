import {
  createContext,
  useContext,
  useMemo,
  useReducer
} from "react";

import { cartReducer } from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Memoize the context value when its dependencies are unchanged.
  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
      itemCount
    }),
    [state.items, total, itemCount]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}