export const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    category: "Ethiopian",
    price: 450,
    image: "🍗",
    description:
      "Traditional Ethiopian chicken stew prepared with berbere spices and served with egg.",
  },
  {
    id: "2",
    name: "Shiro Wat",
    category: "Ethiopian",
    price: 220,
    image: "🍲",
    description:
      "A comforting Ethiopian chickpea stew prepared with traditional spices.",
  },
  {
    id: "3",
    name: "Beyaynet",
    category: "Vegetarian",
    price: 300,
    image: "🥗",
    description:
      "A colorful selection of Ethiopian vegetarian dishes served with injera.",
  },
  {
    id: "4",
    name: "Tibs",
    category: "Ethiopian",
    price: 420,
    image: "🥩",
    description:
      "Sautéed meat with onions, peppers, and traditional Ethiopian spices.",
  },
  {
    id: "5",
    name: "Chechebsa",
    category: "Breakfast",
    price: 180,
    image: "🥞",
    description:
      "Pieces of flatbread mixed with spiced butter and berbere.",
  },
  {
    id: "6",
    name: "Fresh Juice",
    category: "Drinks",
    price: 100,
    image: "🥤",
    description:
      "Refreshing seasonal fruit juice served chilled.",
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === String(id));
}