import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <h1>CodeOps — Day 41</h1>

      <p>Data Fetching with SWR and Next.js</p>

      <section className="link-list">
        <Link href="/orders/101">
          Exercises 1–4: Order Tracking and Polling
        </Link>

        <Link href="/exercises">
          Exercises 5–6: Debounced Search
        </Link>

        <Link href="/dishes?page=1">
          Exercise 7: Server-Side Pagination
        </Link>
      </section>
    </main>
  );
}