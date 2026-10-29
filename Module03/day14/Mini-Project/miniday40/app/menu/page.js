import { Suspense } from "react";
import MenuBrowser from "../../components/MenuBrowser";

export const metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <div className="page-container">
      <div className="page-heading">
        <span className="eyebrow">MADE FOR YOUR APPETITE</span>
        <h1>Explore our menu</h1>
        <p>
          Find your favorite meals, discover something new, and add it to your
          cart.
        </p>
      </div>

      <Suspense fallback={<p className="loading-message">Loading menu...</p>}>
        <MenuBrowser />
      </Suspense>
    </div>
  );
}