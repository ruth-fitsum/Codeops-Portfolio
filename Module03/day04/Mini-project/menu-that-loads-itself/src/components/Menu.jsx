import { useEffect, useRef, useState } from "react";
import { getDishes } from "../api.js";
import DishList from "./DishList.jsx";

const categories = ["All", "Main", "Vegan", "Grill"];

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  // Focus the search input when the menu first appears.
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  // Fetch whenever the selected category changes.
  useEffect(() => {
    const controller = new AbortController();

    async function loadMenu() {
      setLoading(true);
      setError(null);

      try {
        const data = await getDishes(category, controller.signal);
        setDishes(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMenu();

    // Cancel the previous request when category changes or the component unmounts.
    return () => {
      controller.abort();
    };
  }, [category]);

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <section>
        <h1>Interactive Addis Eats Menu</h1>
        <p>Loading the menu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1>Interactive Addis Eats Menu</h1>
        <p className="error">{error}</p>
        <button onClick={() => setCategory(category)}>
          Try Again
        </button>
      </section>
    );
  }

  return (
    <main>
      <h1>Interactive Addis Eats Menu</h1>
      <p>Find your favorite Ethiopian dishes.</p>

      <label htmlFor="search">Search dishes</label>
      <input
        id="search"
        ref={searchRef}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by dish name..."
      />

      <h2>Categories</h2>

      <div className="category-bar">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <h2>Menu</h2>
      <DishList dishes={filteredDishes} />
    </main>
  );
}