import DishCard from "./DishCard";

const dishes = [
  {
    id: 1,
    name: "Doro Wat",
    description: "Traditional Ethiopian chicken stew served with injera.",
    category: "Traditional",
    price: 450,
    image: "/dishes/doro-wat.jpg",
    alt: "Doro Wat served with injera on a plate",
  },
  {
    id: 2,
    name: "Tibs",
    description: "Sautéed beef prepared with onions and spices.",
    category: "Traditional",
    price: 380,
    image: "/dishes/tibs.jpg",
    alt: "Ethiopian tibs with sautéed meat and vegetables",
  },
  {
    id: 3,
    name: "Shiro",
    description: "A traditional chickpea stew served with injera.",
    category: "Vegetarian",
    price: 180,
    image: "/dishes/shiro.jpg",
    alt: "Traditional Ethiopian shiro stew",
  },
];

export default function MenuPage() {
  return (
    <main className="container">
      <header className="page-header">
        <p className="eyebrow">ADDIS EATS</p>
        <h1>Our Menu</h1>
        <p>Discover your favorite Ethiopian meals.</p>
      </header>

      <section className="dish-grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </section>
    </main>
  );
}