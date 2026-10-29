"use client";

import { useState } from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function MenuBrowser({ dishes }) {
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(dishes.map((dish) => dish.category)),
  ];

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <>
      <div className="category-list" aria-label="Filter dishes by category">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`category-button ${
              category === item ? "active" : ""
            }`}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <div className="dish-image" aria-hidden="true">
              {dish.image}
            </div>

            <div className="dish-content">
              <span className="dish-category">{dish.category}</span>
              <h2>{dish.name}</h2>
              <p>{dish.description}</p>

              <div className="dish-footer">
                <strong>{dish.price} ETB</strong>
                <Link className="text-link" href={`/menu/${dish.id}`}>
                  Details
                </Link>
              </div>

              <AddToCartButton dish={dish} />
            </div>
          </article>
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <p className="empty-state">No dishes found in this category.</p>
      )}
    </>
  );
}