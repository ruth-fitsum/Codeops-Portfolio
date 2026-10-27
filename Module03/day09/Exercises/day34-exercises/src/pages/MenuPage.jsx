import { useState } from "react";
import Menu from "../components/Menu";
import ErrorBoundary from "../components/ErrorBoundary";

export default function MenuPage({ onAdd }) {
  const [simulateError, setSimulateError] = useState(false);
  const [menuKey, setMenuKey] = useState(0);

  function retryMenu() {
    setSimulateError(false);
    setMenuKey((current) => current + 1);
  }

  return (
    <div>
      <div className="test-controls">
        <button
          type="button"
          onClick={() => setSimulateError((current) => !current)}
        >
          {simulateError
            ? "Disable test error"
            : "Enable test error"}
        </button>
      </div>

      <ErrorBoundary
        key={menuKey}
        fallback={
          <div className="error-box" role="alert">
            <h2>Menu unavailable</h2>
            <p>We couldn't display the menu. Your cart is still available.</p>
            <button type="button" onClick={retryMenu}>
              Try again
            </button>
          </div>
        }
      >
        <Menu onAdd={onAdd} simulateError={simulateError} />
      </ErrorBoundary>
    </div>
  );
}