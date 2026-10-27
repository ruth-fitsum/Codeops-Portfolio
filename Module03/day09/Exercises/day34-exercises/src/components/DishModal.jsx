import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function DishModal({ dish, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) return;

    const previousFocus = document.activeElement;

    const getFocusableElements = () =>
      panel.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

    const focusableElements = getFocusableElements();

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      panel.focus();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const elements = getFocusableElements();

        if (elements.length === 0) {
          event.preventDefault();
          panel.focus();
          return;
        }

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  if (!dish) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close dish details"
        >
          ×
        </button>

        <h2 id="dish-modal-title">{dish.name}</h2>
        <p>{dish.description}</p>
        <p className="price">{dish.price.toLocaleString()} ETB</p>

        <button type="button" onClick={onClose}>
          Close details
        </button>
      </section>
    </div>,
    document.getElementById("modal-root")
  );
}