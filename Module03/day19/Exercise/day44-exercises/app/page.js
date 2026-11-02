import Link from "next/link";

export const metadata = {
  title: "Home",
  description:
    "Welcome to the Day 44 Next.js SEO exercises.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <section className="container page">
      <p className="eyebrow">DAY 44 EXERCISES</p>

      <h1>Learn Metadata and SEO with Next.js</h1>

      <p className="intro">
        Practice page metadata, dynamic metadata, social sharing
        previews, structured data, and search engine indexing.
      </p>

      <div className="card-grid">
        <article className="card">
          <h2>Page Metadata</h2>
          <p>
            Learn how titles and descriptions help search engines
            understand your pages.
          </p>
        </article>

        <article className="card">
          <h2>Dynamic Metadata</h2>
          <p>
            Generate a different page title and description for
            each product.
          </p>
          <Link href="/products/1">View product</Link>
        </article>

        <article className="card">
          <h2>About Page</h2>
          <p>
            Practice defining unique metadata for a separate route.
          </p>
          <Link href="/about">Visit about page</Link>
        </article>
      </div>
    </section>
  );
}