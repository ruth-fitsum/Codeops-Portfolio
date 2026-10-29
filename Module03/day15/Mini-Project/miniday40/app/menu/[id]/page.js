import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes, getDishById } from "../../../lib/data";
import AddToCartButton from "../../../components/AddToCartButton";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return { title: "Dish not found | Addis Eats" };
  }

  return {
    title: `${dish.name} | Addis Eats`,
    description: dish.description,
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <section className="container section">
      <Link href="/menu" className="text-link">
        ← Back to menu
      </Link>

      <article className="dish-detail">
        <div className="dish-detail-image">{dish.image}</div>

        <div className="dish-detail-content">
          <p className="eyebrow">{dish.category}</p>
          <h1>{dish.name}</h1>
          <p>{dish.description}</p>
          <p className="detail-price">{dish.price} ETB</p>
          <AddToCartButton dish={dish} />
        </div>
      </article>
    </section>
  );
}