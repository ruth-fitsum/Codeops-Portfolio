import { notFound } from "next/navigation";

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 2500,
    description:
      "Comfortable wireless headphones for music, work, and everyday listening.",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 4200,
    description:
      "A smart watch for tracking daily activity and checking notifications.",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Laptop Backpack",
    price: 1800,
    description:
      "A practical backpack for carrying your laptop and everyday essentials.",
    category: "Accessories",
  },
];

function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: product.name,
    description: product.description,

    alternates: {
      canonical: `/products/${product.id}`,
    },

    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <section className="container page">
      <p className="eyebrow">{product.category}</p>

      <h1>{product.name}</h1>

      <p className="intro">{product.description}</p>

      <div className="product-panel">
        <h2>Product information</h2>

        <p>
          <strong>Product:</strong> {product.name}
        </p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Price:</strong> {product.price.toLocaleString()} ETB
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}