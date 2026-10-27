import { useState } from "react";
import { validate } from "./utils/validate";

const ORDER_TOTAL = 640;

const initialForm = {
  name: "",
  phone: "",
  area: "Bole",
  notes: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const errors = validate(form);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setServerError("");
    setSuccess(false);
  }

  function handleBlur(e) {
    const { name } = e.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  }

  function showError(field) {
    return Boolean(touched[field] && errors[field]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    const currentErrors = validate(form);
    const firstError = Object.keys(currentErrors)[0];

    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    setSubmitting(true);
    setServerError("");
    setSuccess(false);

    try {
      const order = await placeOrder({
        ...form,
        phone: form.phone.replace(/\s/g, ""),
        total: ORDER_TOTAL,
      });

      console.log("Order created:", order);
      setSuccess(true);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="container">
        <h1>Addis Eats</h1>

        <section className="panel" role="status">
          <h2>Order submitted successfully!</h2>
          <p>Total: {ORDER_TOTAL} ETB</p>

          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setTouched({});
              setSuccess(false);
              setServerError("");
            }}
          >
            Start a new order
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Addis Eats</h1>
      <h2>Checkout — Exercises 1–7</h2>

      <form className="panel" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Full name</label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("name")}
            aria-describedby={
              showError("name") ? "name-error" : undefined
            }
            disabled={submitting}
          />

          {showError("name") && (
            <p id="name-error" className="error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="phone">TeleBirr phone number</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="tel"
            aria-invalid={showError("phone")}
            aria-describedby={
              showError("phone") ? "phone-error" : undefined
            }
            disabled={submitting}
          />

          {showError("phone") && (
            <p id="phone-error" className="error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="area">Delivery area</label>

          <select
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="notes">Delivery notes (optional)</label>

          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="4"
            disabled={submitting}
          />
        </div>

        {serverError && (
          <p className="error" role="alert">
            {serverError}
          </p>
        )}

        <div className="total">
          <span>Total</span>
          <strong>{ORDER_TOTAL} ETB</strong>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting
            ? "Sending your order..."
            : `Order — ${ORDER_TOTAL} ETB`}
        </button>

        <details>
          <summary>View form state for learning</summary>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </details>
      </form>
    </main>
  );
}

function placeOrder(orderData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly simulate success or a network failure.
      if (Math.random() < 0.5) {
        reject(
          new Error(
            "The ordering service is unavailable. Your details are still here."
          )
        );
      } else {
        resolve({
          id: `AE-${Date.now()}`,
          ...orderData,
        });
      }
    }, 1500);
  });
}

export default App;