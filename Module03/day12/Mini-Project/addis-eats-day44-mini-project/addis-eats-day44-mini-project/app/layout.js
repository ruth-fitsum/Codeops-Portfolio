import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Addis Eats — Ethiopian Food Discovery",
    template: "%s · Addis Eats"
  },
  description: "Discover Ethiopian dishes, explore their stories, and browse the Addis Eats menu.",
  applicationName: "Addis Eats",
  openGraph: {
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
    title: "Addis Eats — Ethiopian Food Discovery",
    description: "Discover Ethiopian dishes and explore the Addis Eats menu."
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats — Ethiopian Food Discovery",
    description: "Discover Ethiopian dishes and explore the Addis Eats menu."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a className="brand" href="/">Addis Eats</a>
          <nav className="nav" aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/cart">Cart</a>
            <a href="/checkout">Checkout</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">Addis Eats · Ethiopian food discovery · Day 44 SEO exercise</div>
        </footer>
      </body>
    </html>
  );
}
