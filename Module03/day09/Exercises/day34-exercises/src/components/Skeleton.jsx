export default function Skeleton() {
  return (
    <div className="skeleton" role="status" aria-live="polite">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
      <p>Loading page...</p>
    </div>
  );
}