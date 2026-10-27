import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import Menu from "../components/Menu";

export default function MenuPage({ onAdd }) {
  const [simulateError, setSimulateError] = useState(false);
  const [boundaryKey, setBoundaryKey] = useState(0);

  function retryMenu() {
    setSimulateError(false);
    setBoundaryKey((current) => current + 1);
  }

  return (
    <section>
      <div className="test-controls">
        <button
          type="button"
          onClick={() => setSimulateError((current) => !current)}
        >
          {simulateError ? "Disable test error" : "Test menu error"}
        </button>
      </div>

      <ErrorBoundary
        key={boundaryKey}
        fallback={
          <div className="error-box" role="alert">
            <h2>Menu unavailable</h2>
            <p>
              We couldn't display the menu. Your cart is still available.
            </p>

            <button type="button" onClick={retryMenu}>
              Try again
            </button>

            <p>
              <Link to="/cart">Open your cart</Link>
            </p>
          </div>
        }
      >
        <Menu
          onAdd={onAdd}
          simulateError={simulateError}
        />
      </ErrorBoundary>
    </section>
  );
}