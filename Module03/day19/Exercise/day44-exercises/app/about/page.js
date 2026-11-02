export const metadata = {
  title: "About",
  description:
    "Learn about this Next.js metadata and SEO learning project.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About the SEO Practice Project",
    description:
      "Explore the purpose of the Day 44 SEO exercises.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className="container page">
      <p className="eyebrow">ABOUT THIS PROJECT</p>

      <h1>About the SEO Exercises</h1>

      <p className="intro">
        This project demonstrates how to configure search engine
        metadata with the Next.js App Router.
      </p>

      <div className="card">
        <h2>Topics covered</h2>

        <ul>
          <li>Page titles and descriptions</li>
          <li>Metadata inheritance and title templates</li>
          <li>Canonical URLs</li>
          <li>Open Graph social previews</li>
          <li>JSON-LD structured data</li>
          <li>XML sitemaps and robots.txt</li>
        </ul>
      </div>
    </section>
  );
}