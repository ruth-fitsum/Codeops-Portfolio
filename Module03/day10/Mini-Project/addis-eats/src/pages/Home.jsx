import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import DishCard from "../components/DishCard";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getDishPrice } from "../utils/formatPrice";

function Menu() {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/recipes?limit=50"
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCategory = searchParams.get("category") || "";

  const recipes = data?.recipes || [];

  const categories = useMemo(() => {
    const allTags = recipes.flatMap((recipe) => recipe.tags || []);

    return [...new Set(allTags)].sort();
  }, [recipes]);

  const dishes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        const matchesCategory =
          !selectedCategory ||
          (recipe.tags || []).includes(selectedCategory);

        const matchesSearch = recipe.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .map((recipe) => ({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        rating: recipe.rating,
        tags: recipe.tags || [],
        price: getDishPrice(recipe.id),
      }));
  }, [recipes, selectedCategory, searchTerm]);

  function handleCategoryChange(category) {
    const nextParams = new URLSearchParams(searchParams);

    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <section>
      <div className="page-heading">
        <p className="eyebrow">OUR MENU</p>
        <h1>Explore the Menu</h1>
        <p>Find a recipe that matches your taste.</p>
      </div>

      <div className="menu-controls">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="search-box">
          <label htmlFor="search">Search dishes:</label>

          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Enter a dish name"
          />
        </div>
      </div>

      {dishes.length === 0 ? (
        <div className="message">
          <h2>No dishes found</h2>
          <p>Try another search or category.</p>

          <button
            onClick={() => {
              setSearchTerm("");
              handleCategoryChange("");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="dish-grid">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;