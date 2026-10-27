import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../utils/checkoutSchema";

const ORDER_TOTAL = 640;

const initialValues = {
  name: "",
  phone: "",
  area: "Bole",
  notes: "",
};

function Checkout() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  // Prevent two requests from starting before React updates isSubmitting.
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  async function placeOrder(data) {
    if (submittingRef.current) return;

    submittingRef.current = true;
    setServerError("");
    setSuccess(false);

    try {
      const order = await simulateOrderRequest({
        ...data,
        total: ORDER_TOTAL,
      });

      console.log("Order created:", order);
      setSuccess(true);
    } catch (error) {
      setServerError(
        error.message || "We could not submit your order. Please try again."
      );

      // Example server-side field validation:
      // setError("phone", {
      //   type: "server",
      //   message: "This number could not be verified.",
      // });
      // setFocus("phone");
    } finally {
      submittingRef.current = false;
    }
  }

  function handleInvalidSubmit(formErrors) {
    const firstField = Object.keys(formErrors)[0];

    if (firstField) {
      setFocus(firstField);
    }
  }

  function startNewOrder() {
    reset(initialValues);
    setServerError("");
    setSuccess(false);
  }

  return (
    <section className="checkout">
      <h1>Addis Eats Checkout</h1>
      <p>Review your details before submitting your order.</p>

      {success ? (
        <div className="success-panel" role="status">
          <h2>Order submitted successfully!</h2>
          <p>Your total is {ORDER_TOTAL} ETB.</p>
          <p>Your order request was accepted by the simulated service.</p>

          <button type="button" onClick={startNewOrder}>
            Start a new order
          </button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit(placeOrder, handleInvalidSubmit)}
        >
          <div className="form-field">
            <label htmlFor="name">Full name</label>

            <input
              id="name"
              autoComplete="name"
              {...register("name")}
              aria-invalid={Boolean(touchedFields.name && errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              disabled={isSubmitting}
            />

            {errors.name && (
              <p id="name-error" className="field-error" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="phone">TeleBirr phone number</label>

            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="0911234567"
              {...register("phone")}
              aria-invalid={Boolean(touchedFields.phone && errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              disabled={isSubmitting}
            />

            {errors.phone && (
              <p id="phone-error" className="field-error" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="area">Delivery area</label>

            <select
              id="area"
              {...register("area")}
              aria-invalid={Boolean(touchedFields.area && errors.area)}
              aria-describedby={errors.area ? "area-error" : undefined}
              disabled={isSubmitting}
            >
              <option value="Bole">Bole</option>
              <option value="Kazanchis">Kazanchis</option>
              <option value="Megenagna">Megenagna</option>
              <option value="Piassa">Piassa</option>
            </select>

            {errors.area && (
              <p id="area-error" className="field-error" role="alert">
                {errors.area.message}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="notes">Delivery notes (optional)</label>

            <textarea
              id="notes"
              rows="4"
              {...register("notes")}
              aria-invalid={Boolean(touchedFields.notes && errors.notes)}
              aria-describedby={errors.notes ? "notes-error" : undefined}
              disabled={isSubmitting}
            />

            {errors.notes && (
              <p id="notes-error" className="field-error" role="alert">
                {errors.notes.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="server-error" role="alert">
              {serverError}
            </p>
          )}

          <div className="order-total">
            <span>Order total</span>
            <strong>{ORDER_TOTAL} ETB</strong>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Sending your order..."
              : `Order — ${ORDER_TOTAL} ETB`}
          </button>
        </form>
      )}
    </section>
  );
}

function simulateOrderRequest(orderData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        reject(
          new Error(
            "We could not reach the ordering service. Your details are still here. Please try again."
          )
        );
      } else {
        resolve({
          id: `AE-${Date.now()}`,
          ...orderData,
          createdAt: new Date().toISOString(),
        });
      }
    }, 1500);
  });
}

export default Checkout;