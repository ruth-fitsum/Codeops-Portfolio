import {getDishes} from "@/lib/dishes";import DishList from "@/components/DishList";import CategoryBar from "@/components/CategoryBar";import FilterShell from "@/components/FilterShell";
export const revalidate=3600;
export default async function MenuPage({searchParams}) {
  const [dishes, query] = await Promise.all([getDishes(), searchParams]);
  const category = query?.category || "All";
  const filtered = category==="All" ? dishes : dishes.filter(dish=>dish.category===category);
  return <section><p className="eyebrow">Made for sharing</p><h1>Our menu</h1><p className="lead">Browse favorites from the Ethiopian table.</p><CategoryBar selected={category}/><FilterShell><DishList dishes={filtered}/></FilterShell></section>;
}
