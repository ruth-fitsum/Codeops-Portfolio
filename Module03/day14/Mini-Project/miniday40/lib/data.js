export const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    category: "Ethiopian",
    price: 450,
    image: "🍗",
    description: "Traditional Ethiopian chicken stew with berbere spices and egg.",
    popular: true,
  },
  {
    id: "2",
    name: "Shiro Wat",
    category: "Ethiopian",
    price: 220,
    image: "🍲",
    description: "A comforting chickpea stew prepared with Ethiopian spices.",
    popular: true,
  },
  {
    id: "3",
    name: "Beyaynet",
    category: "Vegetarian",
    price: 300,
    image: "🥗",
    description: "A colorful combination of Ethiopian vegetarian dishes served with injera.",
    popular: true,
  },
  {
    id: "4",
    name: "Tibs",
    category: "Ethiopian",
    price: 420,
    image: "🥩",
    description: "Sautéed meat with onions, peppers, and traditional spices.",
    popular: false,
  },
  {
    id: "5",
    name: "Chechebsa",
    category: "Breakfast",
    price: 180,
    image: "🥞",
    description: "Pieces of flatbread mixed with spiced butter and berbere.",
    popular: false,
  },
  {
    id: "6",
    name: "Fresh Juice",
    category: "Drinks",
    price: 100,
    image: "🥤",
    description: "Refreshing seasonal fruit juice served chilled.",
    popular: false,
  },
  {
    id: "7",
    name: "Pasta",
    category: "International",
    price: 280,
    image: "🍝",
    description: "Pasta with tomato sauce and herbs.",
    popular: false,
  },
  {
    id: "8",
    name: "Burger",
    category: "International",
    price: 350,
    image: "🍔",
    description: "A burger served with fresh vegetables and sauce.",
    popular: true,
  },
];

export const categories = [
  "All",
  "Ethiopian",
  "Vegetarian",
  "Breakfast",
  "Drinks",
  "International",
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === String(id));
}