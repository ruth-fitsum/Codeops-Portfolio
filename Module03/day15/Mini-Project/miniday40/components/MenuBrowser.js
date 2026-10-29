"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categories } from "../lib/data";
import AddToCartButton from "./AddToCartButton";

export default function MenuBrowser({ dishes }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" || dish.category === category;

      const matchesSearch = dish.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [dishes, category, search]);

  return (
    <div>
      <div className="menu-controls">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search dishes..."
          aria-label="Search dishes"
          className="search-input"
        />

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredDishes.length > 0 ? (
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
                <p className="dish-category">{dish.category}</p>
                <h2>
                  <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
                </h2>
                <p className="dish-description">{dish.description}</p>

                <div className="dish-footer">
                  <strong>{dish.price} ETB</strong>
                  <AddToCartButton dish={dish} />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-message">
          No dishes match your search.
        </p>
      )}
    </div>
  );
}