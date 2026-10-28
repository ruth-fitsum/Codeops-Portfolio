import Link from "next/link";import AddToCartButton from "@/components/AddToCartButton";
export default function DishCard({dish}){return <article className="card"><div className="dish-icon" aria-hidden="true">{dish.icon}</div><h3><Link href={`/menu/${dish.id}`}>{dish.name}</Link></h3><p>{dish.description}</p><p className="price">{dish.price} ETB</p><AddToCartButton dish={dish}/></article>}
