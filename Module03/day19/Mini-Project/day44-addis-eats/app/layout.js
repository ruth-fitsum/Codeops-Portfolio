import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
  ),

  title: {
    default: "Addis Eats | Ethiopian Food",
    template: "%s | Addis Eats",
  },

  description:
    "Explore Ethiopian favorites, traditional dishes, and fresh flavors with Addis Eats.",

  applicationName: "Addis Eats",

  keywords: [
    "Addis Eats",
    "Ethiopian food",
    "Doro Wat",
    "Shiro Wat",
    "Ethiopian restaurant",
    "Food ordering",
  ],

  openGraph: {
    title: "Addis Eats | Ethiopian Food",
    description:
      "Discover Ethiopian favorites and delicious traditional meals.",
    siteName: "Addis Eats",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Addis Eats Ethiopian food",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Ethiopian Food",
    description:
      "Discover Ethiopian favorites and traditional meals.",
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
            <a href="/" className="brand">
              Addis<span>Eats</span>
            </a>

            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/#menu">Menu</a>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Addis Eats</p>
            <p>Further flavors, closer to home.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}