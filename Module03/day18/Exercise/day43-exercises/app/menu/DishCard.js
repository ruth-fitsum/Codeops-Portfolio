import Image from "next/image";
import Link from "next/link";

export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <div className="dish-image">
        <Image
          src={dish.image}
          alt={dish.alt}
          width={400}
          height={300}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
        />
      </div>

      <div className="dish-content">
        <span className="category-tag">{dish.category}</span>

        <h2>{dish.name}</h2>

        <p>{dish.description}</p>

        <div className="dish-footer">
          <strong>{dish.price} ETB</strong>

          <Link href="/menu" className="button">
            View menu
          </Link>
        </div>
      </div>
    </article>
  );
}