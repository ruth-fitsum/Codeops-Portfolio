"use client";

export default function MenuError({ error, reset }) {
  return (
    <div className="error-state">
      <h2>We couldn't load the menu.</h2>
      <p>Please try again.</p>

      <button
        type="button"
        className="button button-primary"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}