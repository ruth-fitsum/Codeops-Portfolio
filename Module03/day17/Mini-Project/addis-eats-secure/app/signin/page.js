"use client";

import { useState } from "react";

function getSafeNextPath() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  if (
    next &&
    next.startsWith("/") &&
    !next.startsWith("//") &&
    !next.includes("\\")
  ) {
    return next;
  }

  return "/";
}

export default function SignInPage() {
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

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sign-in failed.");
        return;
      }

      window.location.assign(getSafeNextPath());
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <section className="card auth-card">
        <h1>Sign in</h1>
        <p>Sign in to access your Addis Eats account.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
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

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="demo-accounts">
          <p>
            <strong>Customer:</strong> customer@addiseats.test
          </p>
          <p>
            <strong>Password:</strong> Customer123!
          </p>
          <hr />
          <p>
            <strong>Staff:</strong> staff@addiseats.test
          </p>
          <p>
            <strong>Password:</strong> Staff123!
          </p>
        </div>
      </section>
    </main>
  );
}