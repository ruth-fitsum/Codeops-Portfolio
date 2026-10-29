import { getDishes } from "../../lib/data";
import MenuBrowser from "../../components/MenuBrowser";

export const revalidate = 3600;

export const metadata = {
  title: "Menu | Addis Eats",
  description: "Explore the Addis Eats menu.",
};

export default function MenuPage() {
  const dishes = getDishes();

  return (
    <div className="menu-results">
      <p className="result-count">
        Explore our {dishes.length} available dishes.
      </p>

      <MenuBrowser dishes={dishes} />
    </div>
  );
}