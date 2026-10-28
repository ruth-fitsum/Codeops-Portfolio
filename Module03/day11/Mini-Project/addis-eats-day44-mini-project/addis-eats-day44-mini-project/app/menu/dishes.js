export const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 320,
    category: "Stew",
    summary: "Slow-cooked chicken stew with berbere, served with injera.",
    description: "A rich Ethiopian chicken stew simmered with berbere and aromatic spices, traditionally served with injera."
  },
  {
    id: "kitfo",
    name: "Kitfo",
    price: 380,
    category: "Classic",
    summary: "A beloved Ethiopian minced beef dish with warming spices.",
    description: "Ethiopian minced beef seasoned with mitmita and niter kibbeh, served with traditional accompaniments."
  },
  {
    id: "shiro",
    name: "Shiro",
    price: 180,
    category: "Vegetarian",
    summary: "Comforting chickpea stew with Ethiopian spices.",
    description: "A smooth chickpea flour stew cooked with Ethiopian spices and served with injera."
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 350,
    category: "Classic",
    summary: "Sautéed beef with onion, herbs, and aromatic spices.",
    description: "Tender pieces of beef sautéed with onion, herbs, and Ethiopian spices."
  },
  {
    id: "misir-wat",
    name: "Misir Wat",
    price: 160,
    category: "Vegetarian",
    summary: "Red lentils simmered in a berbere-spiced sauce.",
    description: "A comforting red lentil stew seasoned with berbere and traditional Ethiopian spices."
  },
  {
    id: "beyaynetu",
    name: "Beyaynetu",
    price: 240,
    category: "Vegetarian",
    summary: "A colorful combination of Ethiopian vegetarian dishes.",
    description: "A mixed platter of Ethiopian vegetarian stews and vegetables served together with injera."
  }
];

export function getDish(id) {
  return dishes.find((dish) => String(dish.id) === String(id)) ?? null;
}
