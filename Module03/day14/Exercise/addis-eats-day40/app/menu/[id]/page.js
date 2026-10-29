import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "../../../lib/data";
import AddToCartButton from "../../../components/AddToCartButton";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDishes().map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return {
      title: "Dish not found | Addis Eats",
    };
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
    <div className="container detail-page">
      <Link href="/menu" className="text-link">
        ← Back to menu
      </Link>

      <article className="detail-card">
        <div className="detail-image" aria-hidden="true">
          {dish.image}
        </div>

        <div className="detail-content">
          <span className="dish-category">{dish.category}</span>
          <h1>{dish.name}</h1>
          <p>{dish.description}</p>

          <div className="detail-price">{dish.price} ETB</div>

          <AddToCartButton dish={dish} />

          <p className="detail-note">
            Prices are shown in Ethiopian birr (ETB).
          </p>
        </div>
      </article>
    </div>
  );
}