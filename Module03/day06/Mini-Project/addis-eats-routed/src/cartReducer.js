export default function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        items: [...state.items, action.dish],
      };

    case "remove":
      return {
        ...state,
        items: state.items.filter(
          (_, index) => index !== action.index
        ),
      };

    case "clear":
      return {
        items: [],
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}