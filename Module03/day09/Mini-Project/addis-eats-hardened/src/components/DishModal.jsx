import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function DishModal({ dish, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!dish) return;

    const panel = panelRef.current;
    const previousFocus = document.activeElement;

    function getFocusableElements() {
      return panel.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
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

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
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

    const elements = getFocusableElements();

    if (elements.length > 0) {
      elements[0].focus();
    } else {
      panel.focus();
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
  }, [dish, onClose]);

  if (!dish) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

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
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dish details"
        >
          ×
        </button>

        <h2 id="dish-modal-title">{dish.name}</h2>

        <p>{dish.description}</p>

        <p className="price">
          {dish.price.toLocaleString()} ETB
        </p>

        <button type="button" onClick={onClose}>
          Close details
        </button>
      </section>
    </div>,
    modalRoot
  );
}