const categories = ["All", "Main", "Vegan", "Grill"];

export default function CategoryBar({ selected, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? "selected" : ""}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}