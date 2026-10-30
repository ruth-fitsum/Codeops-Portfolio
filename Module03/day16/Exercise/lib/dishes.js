export const dishes = [
  { id: 1, name: "Doro Wot", category: "Traditional", price: 450 },
  { id: 2, name: "Tibs", category: "Traditional", price: 380 },
  { id: 3, name: "Shiro", category: "Traditional", price: 180 },
  { id: 4, name: "Kitfo", category: "Traditional", price: 500 },
  { id: 5, name: "Burger", category: "Fast Food", price: 300 },
  { id: 6, name: "Pizza", category: "Fast Food", price: 400 },
  { id: 7, name: "Pasta", category: "Italian", price: 350 },
  { id: 8, name: "Firfir", category: "Traditional", price: 220 },
  { id: 9, name: "Chechebsa", category: "Breakfast", price: 160 },
  { id: 10, name: "Special Tibs", category: "Traditional", price: 550 },
];

export function getDishes({ query = "", page = 1, limit = 4 } = {}) {
  const filtered = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const start = (page - 1) * limit;

  return {
    dishes: filtered.slice(start, start + limit),
    page,
    totalPages,
    total: filtered.length,
  };
}