import Link from "next/link";
const exercises=[
["1. Async server menu","app/menu/page.js is an async server component that awaits getDishes()."],
["2. Remove fetching hooks","The menu route uses no useEffect, useState, or useFetch hook to load data."],
["3. Audit directives","Search for 'use client' and review each result in the project."],
["4. Push boundaries down","Only interactive components such as CategoryBar, FilterShell, AddToCartButton and cart UI are client components."],
["5. Isolate providers","components/Providers.js owns the cart context; app/layout.js remains a server component."],
["6. Compose with children","FilterShell receives DishList as children instead of importing DishList itself."],
["7. Compare JavaScript","Run the build and record actual First Load JS figures in README.md; do not guess measurements."]
];
export default function ExercisesHome(){return <main className="container"><section className="hero"><p className="eyebrow">CodeOps · Module 3 · Day 38</p><h1>Server &amp; Client Components</h1><p className="lead">Exercises 1–7 for Addis Eats. Learn to keep data fetching on the server and limit browser JavaScript to components that need interactivity.</p><Link className="button" href="/menu">Open menu demo</Link></section><h2>Exercises — complete in order</h2><div className="grid">{exercises.map(([title,desc])=><article className="card" key={title}><h3>{title}</h3><p>{desc}</p></article>)}</div><h2>Build check</h2><p>Run <code>npm run build</code> and inspect the First Load JS table. Measurements must come from your own build environment.</p></main>}
