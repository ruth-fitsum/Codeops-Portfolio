"use client";

import Script from "next/script";
import { useState } from "react";

export default function PerformanceDemo() {
  const [status, setStatus] = useState("Script has not loaded yet.");

  return (
    <section className="script-demo">
      <h2>Third-party script demonstration</h2>

      <p>{status}</p>

      <Script
        src="https://analytics.example/s.js"
        strategy="lazyOnload"
        onLoad={() => setStatus("The script has loaded.")}
        onError={() => setStatus("The example script is unavailable.")}
      />
    </section>
  );
}