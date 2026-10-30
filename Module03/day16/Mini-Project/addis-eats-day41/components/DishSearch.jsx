"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function DishSearch() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/dishes?search=${encodeURIComponent(
      debouncedSearch
    )}&page=${page}&limit=6`,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: true,
    }
  );

  if (error) {
    return (
      <div className="message error">
        <p>Unable to load the menu.</p>
        <button onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="menu-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">OUR MENU</p>
          <h2>Find your favorite dish</h2>
          <p className="muted">
            Discover traditional Ethiopian food and more.
          </p>
        </div>

        <span className="menu-count">
          {data ? `${data.total} dishes` : "Loading menu..."}
        </span>
      </div>

      <div className="search-container">
        <span aria-hidden="true">🔎</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search dishes or categories..."
          aria-label="Search dishes"
        />

        {search && (
          <button
            className="clear-button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {isLoading && !data ? (
        <div className="message">Loading dishes...</div>
      ) : (
        <>
          {isValidating && (
            <p className="refresh-message">Updating menu...</p>
          )}

          {data?.dishes?.length > 0 ? (
            <div className="dish-grid">
              {data.dishes.map((dish) => (
                <article className="dish-card" key={dish.id}>
                  <div className="dish-image" aria-hidden="true">
                    {dish.image}
                  </div>

                  <div className="dish-content">
                    <span className="category-tag">
                      {dish.category}
                    </span>

                    <h3>{dish.name}</h3>

                    <p className="dish-description">
                      {dish.description}
                    </p>

                    <div className="dish-footer">
                      <strong>
                        {dish.price.toLocaleString()} ETB
                      </strong>
                      <span className="dish-id">
                        #{dish.id.toString().padStart(3, "0")}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="message empty-state">
              <span aria-hidden="true">🍽️</span>
              <h3>No dishes found</h3>
              <p>Try another dish name or category.</p>
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage((current) => current - 1)}
                disabled={page <= 1 || isValidating}
              >
                ← Previous
              </button>

              <span>
                Page {data.page} of {data.totalPages}
              </span>

              <button
                onClick={() => setPage((current) => current + 1)}
                disabled={
                  page >= data.totalPages || isValidating
                }
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}