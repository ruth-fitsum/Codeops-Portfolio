const dishes = [
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const requestedPage = Number(searchParams.get("page")) || 1;
  const page = Math.max(1, requestedPage);
  const limit = 4;

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(query)
  );

  const totalPages = Math.ceil(filteredDishes.length / limit);
  const start = (page - 1) * limit;

  return Response.json({
    dishes: filteredDishes.slice(start, start + limit),
    page,
    totalPages,
    total: filteredDishes.length,
  });
}