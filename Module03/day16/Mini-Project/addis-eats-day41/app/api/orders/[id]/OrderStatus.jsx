"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus({ id }) {
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/orders/${id}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  if (isLoading) {
    return (
      <div className="order-card">
        <p>Loading order status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-card">
        <h2>Unable to load your order</h2>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }

  const stages = ["Confirmed", "Preparing", "Ready", "Delivered"];
  const currentStage = stages.indexOf(data.status);

  return (
    <section className="order-card">
      <div className="order-header">
        <div>
          <p className="eyebrow">ORDER TRACKING</p>
          <h2>Order #{data.id}</h2>
        </div>

        <span className="live-badge">
          <span className="live-dot" />
          Live updates
        </span>
      </div>

      <div className="order-status">
        <span className="status-icon">
          {data.status === "Delivered"
            ? "🎉"
            : data.status === "Ready"
              ? "🛍️"
              : data.status === "Preparing"
                ? "👨‍🍳"
                : "✓"}
        </span>

        <div>
          <span className="muted">Current status</span>
          <h3>{data.status}</h3>
          <p>{data.message}</p>
        </div>
      </div>

      <div className="progress-track">
        {stages.map((stage, index) => (
          <div
            className={`progress-step ${
              index <= currentStage ? "completed" : ""
            }`}
            key={stage}
          >
            <div className="progress-circle">
              {index < currentStage ? "✓" : index + 1}
            </div>

            <span>{stage}</span>
          </div>
        ))}
      </div>

      <div className="order-footer">
        <span>
          Last updated:{" "}
          {new Date(data.updatedAt).toLocaleTimeString()}
        </span>

        <span>
          {isValidating ? "Checking..." : "Auto-refresh enabled"}
        </span>
      </div>

      <p className="demo-notice">
        Demo mode: order status changes automatically for learning
        purposes.
      </p>
    </section>
  );
}