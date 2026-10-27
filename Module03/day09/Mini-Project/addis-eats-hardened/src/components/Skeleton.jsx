export default function Skeleton() {
  return (
    <section className="skeleton" role="status" aria-live="polite">
      <h2>Loading page...</h2>

      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </section>
  );
}