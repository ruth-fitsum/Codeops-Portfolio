import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import cartReducer from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const total = state.items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      "useCart must be used inside CartProvider."
    );
  }

  return context;
}