import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes, getDishById } from "../../../lib/dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: dish.name,

    description: dish.description,

    alternates: {
      canonical: `/menu/${dish.id}`,
    },

    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      url: `/menu/${dish.id}`,
      type: "website",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${dish.name} from Addis Eats`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <section className="container section">
      <Link href="/#menu" className="text-link">
        ← Back to menu
      </Link>

      <article className="dish-detail">
        <div className="dish-detail-image">
          <span>{dish.image}</span>
        </div>

        <div className="dish-detail-content">
          <p className="eyebrow">{dish.category}</p>

          <h1>{dish.name}</h1>

          <p>{dish.description}</p>

          <p className="detail-price">
            {dish.price} ETB
          </p>

          <p className="note">
            This page demonstrates dynamic SEO metadata for
            individual menu items.
          </p>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}