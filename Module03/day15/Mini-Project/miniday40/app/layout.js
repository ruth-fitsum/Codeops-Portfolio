import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Navigation from "../components/Navigation";

export const metadata = {
  title: "Addis Eats | Ethiopian Food",
  description: "Discover Ethiopian favorites and order food with Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navigation />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="container">
              <p>© {new Date().getFullYear()} Addis Eats</p>
              <p>Good food, delivered with care.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}