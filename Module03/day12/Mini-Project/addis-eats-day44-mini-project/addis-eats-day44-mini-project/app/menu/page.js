import { dishes } from "./dishes";

export const metadata = {
  title: "Menu",
  description: "Explore Doro Wat, Tibs, Kitfo, Shiro, and other Ethiopian favorites on the Addis Eats menu.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Ethiopian Food Menu · Addis Eats",
    description: "Browse Ethiopian classics and find your next favorite dish.",
    url: "/menu",
    type: "website"
  }
};

export default function MenuPage() {
  return (
    <div className="container section">
      <p className="eyebrow">Explore the menu</p>
      <h1>Made to be shared.</h1>
      <p className="lead">Browse Ethiopian classics, comforting stews, and vegetarian favorites.</p>
      <div className="grid">
        {dishes.map((dish) => (
          <article className="card" key={dish.id}>
            <span className="pill">{dish.category}</span>
            <h2 style={{ marginTop: 14 }}>{dish.name}</h2>
            <p>{dish.summary}</p>
            <p className="price">{new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB" }).format(dish.price)}</p>
            <a className="button" href={`/menu/${dish.id}`}>View dish</a>
          </article>
        ))}
      </div>
    </div>
  );
}
