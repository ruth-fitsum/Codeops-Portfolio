"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("addis-eats-cart");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      localStorage.removeItem("addis-eats-cart");
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("addis-eats-cart", JSON.stringify(items));
    }
  }, [items, ready]);

  function addItem(dish) {
    setItems((current) => {
      const existing = current.find((item) => item.dishId === dish.id);

      if (existing) {
        return current.map((item) =>
          item.dishId === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
        },
      ];
    });
  }

  function updateQuantity(dishId, quantity) {
    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount < 1 || amount > 20) {
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.dishId === dishId
          ? { ...item, quantity: amount }
          : item
      )
    );
  }

  function removeItem(dishId) {
    setItems((current) =>
      current.filter((item) => item.dishId !== dishId)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((total, item) => total + item.quantity, 0);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        ready,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}