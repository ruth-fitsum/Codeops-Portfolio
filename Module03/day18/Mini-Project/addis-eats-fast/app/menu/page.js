import Link from "next/link";
import DishCard from "./DishCard";

const dishes = [
  {
    id: 1,
    name: "Doro Wat",
    description: "Traditional chicken stew with Ethiopian spices.",
    category: "Traditional",
    price: 450,
    image: "/dishes/doro-wat.jpg",
    alt: "Doro Wat with injera served on a plate",
  },
  {
    id: 2,
    name: "Tibs",
    description: "Sautéed beef with onions, peppers, and spices.",
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
        <p className="eyebrow">OUR MENU</p>
        <h1>Find your favorite meal.</h1>

        <p>
          Explore our selection of traditional Ethiopian dishes.
        </p>
      </header>

      <section className="dish-grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </section>

      <p className="back-link">
        <Link href="/">← Back home</Link>
      </p>
    </main>
  );
}