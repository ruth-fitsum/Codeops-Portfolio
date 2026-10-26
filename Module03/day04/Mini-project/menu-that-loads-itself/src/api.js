export async function getDishes(category, signal) {
  const response = await fetch(
    `/dishes.json?category=${encodeURIComponent(category)}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("We could not load the menu. Please try again.");
  }

  const data = await response.json();

  if (category === "All") {
    return data;
  }

  return data.filter((dish) => dish.category === category);
}