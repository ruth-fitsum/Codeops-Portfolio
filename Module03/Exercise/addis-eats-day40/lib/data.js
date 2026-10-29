export const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    category: "Traditional",
    price: 450,
    description:
      "A traditional Ethiopian chicken stew prepared with berbere, onions, and aromatic spices.",
    image: "🍗",
    popular: true,
  },
  {
    id: "2",
    name: "Shiro",
    category: "Traditional",
    price: 180,
    description:
      "A comforting Ethiopian stew made from ground chickpeas and traditional spices.",
    image: "🥘",
    popular: true,
  },
  {
    id: "3",
    name: "Beyaynet",
    category: "Vegetarian",
    price: 320,
    description:
      "A colorful combination of Ethiopian vegetarian stews served on injera.",
    image: "🥗",
    popular: true,
  },
  {
    id: "4",
    name: "Tibs",
    category: "Traditional",
    price: 380,
    description:
      "Tender pieces of meat sautéed with onions, peppers, and Ethiopian spices.",
    image: "🍖",
    popular: false,
  },
  {
    id: "5",
    name: "Chechebsa",
    category: "Breakfast",
    price: 160,
    description:
      "Pieces of flatbread mixed with spiced butter and berbere.",
    image: "🍳",
    popular: false,
  },
  {
    id: "6",
    name: "Fresh Juice",
    category: "Drinks",
    price: 100,
    description:
      "A refreshing fruit juice served fresh.",
    image: "🥤",
    popular: false,
  },
];

export function getDishes() {
  return dishes;
}

export function getDishById(id) {
  return dishes.find((dish) => dish.id === String(id));
}

export function getCategories() {
  return ["All", ...new Set(dishes.map((dish) => dish.category))];
}