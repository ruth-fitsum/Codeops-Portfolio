"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initial,
      refreshInterval: 5000,
    }
  );

  if (isLoading) {
    return <p>Loading order...</p>;
  }

  if (error) {
    return <p>Could not load the order. Please try again.</p>;
  }

  return (
    <section className="order-card">
      <h2>Order #{data.id}</h2>

      <p>
        <strong>Customer:</strong> {data.customer}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className="status">{data.status}</span>
      </p>

      <h3>Items</h3>

      <ul>
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="muted">
        Last updated: {new Date(data.updatedAt).toLocaleTimeString()}
      </p>

      <p className="muted">
        {isValidating ? "Checking for updates..." : "Automatic updates enabled"}
      </p>
    </section>
  );
}