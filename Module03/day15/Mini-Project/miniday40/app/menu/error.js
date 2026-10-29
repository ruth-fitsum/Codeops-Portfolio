"use client";

export default function MenuError({ error, reset }) {
  return (
    <section className="container section error-state">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>We couldn't load the menu.</h1>
      <p>Please try again.</p>
      <button className="button button-primary" onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
}