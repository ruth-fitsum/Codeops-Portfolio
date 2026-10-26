import { useEffect, useRef, useState } from "react";

const categories = ["All", "Main", "Vegan", "Grill"];

// Shared component used by the exercises.
function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>
          {dish.name} — {dish.category} — {dish.price} ETB
        </li>
      ))}
    </ul>
  );
}

// Exercise 1: Update document.title when the number of shown dishes changes.
function Exercise1() {
  const [selected, setSelected] = useState("All");

  const shownDishes =
    selected === "All"
      ? sampleDishes
      : sampleDishes.filter((dish) => dish.category === selected);

  useEffect(() => {
    document.title = `Addis Eats — ${shownDishes.length} dishes`;
  }, [shownDishes.length]);

  return (
    <section>
      <h2>Exercise 1: Document Title</h2>

      <label>
        Category:
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>

      <p>Dishes shown: {shownDishes.length}</p>
      <DishList dishes={shownDishes} />
    </section>
  );
}

// Sample data is used only for Exercise 1.
const sampleDishes = [
  { id: 1, name: "Doro Wat", category: "Main", price: 450 },
  { id: 2, name: "Shiro", category: "Vegan", price: 180 },
  { id: 3, name: "Tibs", category: "Main", price: 350 },
  { id: 4, name: "Misir Wat", category: "Vegan", price: 160 },
  { id: 5, name: "Kitfo", category: "Main", price: 400 },
  { id: 6, name: "Grilled Chicken", category: "Grill", price: 320 },
];

// Exercise 2: Fetch dishes once when the component first appears.
function Exercise2() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function loadDishes() {
      const response = await fetch("/dishes.json");
      const data = await response.json();
      setDishes(data);
    }

    loadDishes();
  }, []);

  return (
    <section>
      <h2>Exercise 2: Fetch Menu</h2>
      <DishList dishes={dishes} />
    </section>
  );
}

// Exercise 3 and 4: Loading state, error state, and checking response.ok.
function Exercise3And4() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDishes() {
      try {
        const response = await fetch("/dishes.json");

        if (!response.ok) {
          throw new Error("Could not load the menu.");
        }

        const data = await response.json();
        setDishes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDishes();
  }, []);

  if (loading) {
    return (
      <section>
        <h2>Exercises 3 and 4: Loading and Errors</h2>
        <p>Loading the menu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2>Exercises 3 and 4: Loading and Errors</h2>
        <p className="error">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Exercises 3 and 4: Loading and Errors</h2>
      <DishList dishes={dishes} />
    </section>
  );
}

// Exercises 5 and 6: Refetch by category and cancel old requests.
function Exercise5And6() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      setLoading(true);
      setError(null);

      try {
        // The query changes when the selected category changes.
        const response = await fetch(
          `/dishes.json?category=${encodeURIComponent(category)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Could not load the menu.");
        }

        const data = await response.json();

        // public/dishes.json is a static file, so filtering happens here.
        const filtered =
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category);

        setDishes(filtered);
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

    loadDishes();

    return () => {
      controller.abort();
    };
  }, [category]);

  return (
    <section>
      <h2>Exercises 5 and 6: Category Fetching and Cleanup</h2>

      <label>
        Choose Category:
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>

      {loading && <p>Loading the menu...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <DishList dishes={dishes} />}
    </section>
  );
}

// Exercise 7: Focus the search input when the component mounts.
function Exercise7() {
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const filteredDishes = sampleDishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <h2>Exercise 7: Focus Search with useRef</h2>

      <input
        ref={searchRef}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search dishes..."
      />

      <DishList dishes={filteredDishes} />
    </section>
  );
}

export default function App() {
  return (
    <main className="container">
      <h1>Day 29: Side Effects</h1>
      <p>CodeOps — Module 3 — React</p>

      <Exercise1 />
      <Exercise2 />
      <Exercise3And4 />
      <Exercise5And6 />
      <Exercise7 />
    </main>
  );
}