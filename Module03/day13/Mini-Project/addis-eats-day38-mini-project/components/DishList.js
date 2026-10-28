import DishCard from "@/components/DishCard";
export default function DishList({dishes}){return <div className="grid">{dishes.map(dish=><DishCard key={dish.id} dish={dish}/>)}</div>}
