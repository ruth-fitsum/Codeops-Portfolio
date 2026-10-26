import { useState } from "react";

const TELEBIRR_REGEX = /^(?:\+251|0)9\d{8}$/;

export default function OrderForm({ total }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  const [message, setMessage] = useState("");

  const isPhoneValid = TELEBIRR_REGEX.test(form.phone);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isPhoneValid) {
      setMessage("Please enter a valid TeleBirr number.");
      return;
    }

    if (total <= 0) {
      setMessage("Please add a dish to your order first.");
      return;
    }

    setMessage(
      `Thank you, ${form.name}! Your order total is ${total} ETB.`
    );
  }

  return (
    <section>
      <h2>Delivery Details</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">TeleBirr Phone Number</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0911223344"
          required
        />

        {form.phone && (
          <p className={isPhoneValid ? "valid" : "invalid"}>
            {isPhoneValid
              ? "Valid TeleBirr number"
              : "Enter a valid number, e.g. 0911223344"}
          </p>
        )}

        <label htmlFor="area">Delivery Area</label>
        <select
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
        >
          <option value="Bole">Bole</option>
          <option value="Piazza">Piazza</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="CMC">CMC</option>
        </select>

        <p>Order Total: {total} ETB</p>

        <button
          type="submit"
          disabled={!isPhoneValid || !form.name.trim() || total <= 0}
        >
          Submit Order
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}