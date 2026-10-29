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
    return { title: "Dish not found" };
  }

  return {
    title: dish.name,
    description: dish.description,
  };
}

export default async function DishDetailsPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="page-container">
      <Link href="/menu" className="back-link">
        ← Back to menu
      </Link>

      <section className="detail-layout">
        <div className="detail-image">
          <span>{dish.image}</span>
        </div>

        <div className="detail-content">
          <span className="dish-category">{dish.category}</span>
          <h1>{dish.name}</h1>
          <p>{dish.description}</p>
          <div className="detail-price">{dish.price} ETB</div>
          <AddToCartButton dish={dish} />

          <div className="detail-note">
            <span>✓</span>
            <p>Freshly prepared with care.</p>
          </div>
        </div>
      </section>
    </div>
  );
}