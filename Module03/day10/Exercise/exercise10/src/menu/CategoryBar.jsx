import { useSearchParams } from "react-router-dom";

function CategoryBar({ dishes }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const categories = [
    ...new Set(dishes.flatMap((dish) => dish.tags || [])),
  ].sort();

  function selectCategory(category) {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className="category-bar" aria-label="Filter menu by category">
      <button
        className={!selectedCategory ? "active" : ""}
        onClick={() => selectCategory("")}
        aria-pressed={!selectedCategory}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => selectCategory(category)}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;