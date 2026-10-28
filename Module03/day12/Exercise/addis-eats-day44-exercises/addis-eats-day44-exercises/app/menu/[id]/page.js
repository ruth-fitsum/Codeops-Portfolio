import { notFound } from "next/navigation";
import { dishes, getDish } from "../dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested dish could not be found.",
      robots: { index: false, follow: false }
    };
  }

  const description = `${dish.name}: ${dish.description} Price: ${dish.price} ETB.`;
  return {
    title: dish.name,
    description,
    alternates: { canonical: `/menu/${dish.id}` },
    openGraph: {
      title: `${dish.name} · Addis Eats`,
      description,
      url: `/menu/${dish.id}`,
      type: "website",
      images: [{ url: `/menu/${dish.id}/opengraph-image`, width: 1200, height: 630, alt: `${dish.name} from Addis Eats` }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${dish.name} · Addis Eats`,
      description,
      images: [`/menu/${dish.id}/opengraph-image`]
    }
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDish(id);
  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB"
    }
  };

  return (
    <div className="container section">
      <p className="eyebrow">{dish.category}</p>
      <h1>{dish.name}</h1>
      <p className="lead">{dish.description}</p>
      <p className="price">{new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB" }).format(dish.price)}</p>
      <div className="notice">This page includes dish-specific metadata and JSON-LD generated from the same dish record displayed here.</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p style={{ marginTop: 28 }}><a href="/menu">← Back to menu</a></p>
    </div>
  );
}
