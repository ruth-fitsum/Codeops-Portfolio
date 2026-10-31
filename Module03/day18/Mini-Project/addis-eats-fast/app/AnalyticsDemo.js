"use client";

import Script from "next/script";
import { useState } from "react";

export default function AnalyticsDemo() {
  const [status, setStatus] = useState(
    "The example script has not loaded."
  );

  return (
    <section className="analytics-demo">
      <h2>Analytics demonstration</h2>

      <p>{status}</p>

      <Script
        src="https://analytics.example/s.js"
        strategy="lazyOnload"
        onLoad={() => {
          setStatus("The example script loaded.");
        }}
        onError={() => {
          setStatus("The example script is unavailable.");
        }}
      />
    </section>
  );
}