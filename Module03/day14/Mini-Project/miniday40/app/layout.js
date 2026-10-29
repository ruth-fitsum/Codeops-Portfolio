import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Navigation from "../components/Navigation";

export const metadata = {
  title: {
    default: "Addis Eats | Ethiopian Food Ordering",
    template: "%s | Addis Eats",
  },
  description:
    "Discover Ethiopian favorites and order delicious meals with Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navigation />
          <main>{children}</main>

          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Addis Eats</p>
            <p>Made with love for food lovers in Ethiopia.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}