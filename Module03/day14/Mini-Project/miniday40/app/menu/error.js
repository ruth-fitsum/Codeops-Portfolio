"use client";

export default function MenuError({ error, reset }) {
  return (
    <div className="error-page">
      <div className="error-icon">!</div>
      <h2>We couldn't load the menu.</h2>
      <p>{error.message || "Something went wrong."}</p>

      <button className="button button-primary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}