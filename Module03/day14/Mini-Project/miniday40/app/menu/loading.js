export default function LoadingMenu() {
  return (
    <div className="page-container">
      <p className="loading-message">Loading the menu...</p>

      <div className="dish-grid">
        {[1, 2, 3, 4].map((item) => (
          <div className="dish-card skeleton" key={item}>
            <div className="skeleton-image" />
            <div className="skeleton-content">
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}