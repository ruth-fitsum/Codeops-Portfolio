import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],

  addItem: (dish) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...dish, quantity: 1 }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity < 1
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
    })),

  clearCart: () => set({ items: [] }),
}));