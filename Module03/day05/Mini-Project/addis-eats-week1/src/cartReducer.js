export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existing = state.items.find(
        (item) => item.id === action.dish.id
      );

      const items = existing
        ? state.items.map((item) =>
            item.id === action.dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.dish, quantity: 1 }];

      return { ...state, items };
    }

    case "remove":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.id
        )
      };

    case "clear":
      return {
        ...state,
        items: []
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}