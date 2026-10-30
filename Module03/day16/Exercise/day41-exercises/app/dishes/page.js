import Link from "next/link";
import { getDishes } from "@/lib/dishes";

export default async function DishesPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const data = getDishes({ page });

  return (
    <main className="container">
      <h1>Dish Menu</h1>

      <div className="dish-grid">
        {data.dishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <h2>{dish.name}</h2>
            <p>{dish.category}</p>
            <p>{dish.price} ETB</p>
          </article>
        ))}
      </div>

      <div className="pagination">
        {page > 1 && (
          <Link href={`/dishes?page=${page - 1}`}>
            Previous
          </Link>
        )}

        <span>
          Page {page} of {Math.max(1, data.totalPages)}
        </span>

        {page < data.totalPages && (
          <Link href={`/dishes?page=${page + 1}`}>
            Next
          </Link>
        )}
      </div>
    </main>
  );
}