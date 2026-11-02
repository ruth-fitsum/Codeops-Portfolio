import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://day44-exercises.example.com"),

  title: {
    default: "SEO Practice | Day 44",
    template: "%s | SEO Practice",
  },

  description:
    "Practice Next.js metadata, search engine optimization, and structured data.",

  applicationName: "Day 44 SEO Practice",

  keywords: [
    "Next.js",
    "SEO",
    "Metadata",
    "Open Graph",
    "JSON-LD",
  ],

  openGraph: {
    title: "SEO Practice | Day 44",
    description:
      "Learn how to configure metadata and SEO in Next.js.",
    siteName: "Day 44 SEO Practice",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Day 44 SEO Practice",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SEO Practice | Day 44",
    description:
      "Learn metadata and SEO with Next.js.",
    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav className="container navigation">
            <a href="/">SEO Practice</a>

            <div>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/products/1">Product</a>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            Day 44 — Next.js Metadata & SEO
          </div>
        </footer>
      </body>
    </html>
  );
}