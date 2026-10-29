"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories, dishes } from "../lib/data";
import AddToCartButton from "./AddToCartButton";

export default function MenuBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [search, setSearch] = useState("");

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" || dish.category === category;

      const matchesSearch =
        dish.name.toLowerCase().includes(search.toLowerCase()) ||
        dish.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <section>
      <div className="menu-controls">
        <input
          type="search"
          placeholder="Search dishes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search dishes"
        />

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <div className="empty-state">
          <h3>No dishes found</h3>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <Link
                href={`/menu/${dish.id}`}
                className="dish-image"
                aria-label={`View ${dish.name}`}
              >
                <span>{dish.image}</span>
              </Link>

              <div className="dish-content">
                <div className="dish-meta">
                  <span className="dish-category">{dish.category}</span>
                  {dish.popular && (
                    <span className="popular-label">Popular</span>
                  )}
                </div>

                <Link
                  href={`/menu/${dish.id}`}
                  className="dish-title-link"
                >
                  <h3>{dish.name}</h3>
                </Link>

                <p>{dish.description}</p>

                <div className="dish-footer">
                  <strong>{dish.price} ETB</strong>
                  <AddToCartButton dish={dish} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}