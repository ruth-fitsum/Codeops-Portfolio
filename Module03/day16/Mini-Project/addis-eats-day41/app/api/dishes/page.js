import DishSearch from "@/components/DishSearch";

export const metadata = {
  title: "Our Menu | Addis Eats",
  description: "Explore and search the Addis Eats menu.",
};

export default function DishesPage() {
  return (
    <main className="page-container">
      <DishSearch />
    </main>
  );
}