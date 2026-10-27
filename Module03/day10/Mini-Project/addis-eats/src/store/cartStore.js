import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addToCart: (dish) =>
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
        items: [
          ...state.items,
          {
            id: dish.id,
            name: dish.name,
            image: dish.image,
            price: dish.price,
            quantity: 1,
          },
        ],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) => {
    const validQuantity = Math.floor(Number(quantity));

    if (!Number.isFinite(validQuantity)) {
      return;
    }

    if (validQuantity < 1) {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: validQuantity }
          : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;