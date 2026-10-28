"use client";
import Link from "next/link";
export default function CategoryBar({selected="All"}) {
  const categories=["All","Vegetarian","Specials","Stews"];
  return <div className="filter-row" aria-label="Dish categories">
    {categories.map(category=><Link key={category} className={`filter-button ${selected===category?"active":""}`} href={category==="All"?"/menu":`/menu?category=${encodeURIComponent(category)}`}>{category}</Link>)}
  </div>;
}
