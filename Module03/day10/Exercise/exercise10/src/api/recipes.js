const BASE_URL = "https://dummyjson.com/recipes";

function addPrice(recipe) {
  return {
    ...recipe,
    price: Math.round(100 + recipe.id * 5),
  };
}

export async function getRecipes(signal) {
  const response = await fetch(`${BASE_URL}?limit=30`, { signal });

  if (!response.ok) {
    throw new Error("Unable to load the menu. Please try again.");
  }

  const data = await response.json();

  return data.recipes.map(addPrice);
}

export async function getRecipeById(id, signal) {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load this dish. Please try again.");
  }

  const recipe = await response.json();

  return addPrice(recipe);
}