"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("customer@addiseats.test");
  const [password, setPassword] = useState("Customer123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Sign-in failed.");
        return;
      }

      const next = searchParams.get("next") || "/";

      // Allow only local paths, not protocol-relative URLs.
      const safeNext =
        next.startsWith("/") && !next.startsWith("//")
          ? next
          : "/";

      router.replace(safeNext);
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">ADDIS EATS</p>
        <h1>Welcome back</h1>
        <p className="muted">
          Sign in to continue to your account.
        </p>

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button className="button-primary" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="demo-credentials">
          <strong>Demo accounts</strong>
          <p>Customer: customer@addiseats.test</p>
          <p>Password: Customer123!</p>
          <p>Staff: staff@addiseats.test</p>
          <p>Password: Staff123!</p>
        </div>
      </form>
    </main>
  );
}