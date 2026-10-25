import { useState } from "react";

// Sample dishes used by the exercises
const dishes = [
  { id: 1, name: "Doro Wat", price: 350, category: "Main" },
  { id: 2, name: "Shiro", price: 180, category: "Vegan" },
  { id: 3, name: "Tibs", price: 300, category: "Grill" },
  { id: 4, name: "Misir Wat", price: 160, category: "Vegan" },
  { id: 5, name: "Kitfo", price: 320, category: "Main" },
];

const categories = ["All", "Main", "Vegan", "Grill"];

// Exercise 1: Dish count
function Exercise1() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>Exercise 1: Dish Count</h2>

      {dishes[0].name} — {count}

      <button onClick={() => setCount(count + 1)}>
        Add
      </button>
    </section>
  );
}

// Exercise 2: Category state and category chips
function Exercise2() {
  const [category, setCategory] = useState("All");

  return (
    <section>
      <h2>Exercise 2: Category Chips</h2>

      {categories.map((cat) => (
        <button
          key={cat}
          className={category === cat ? "chip on" : "chip"}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}

      <p>Selected category: {category}</p>
    </section>
  );
}

// Exercise 3: Category state is owned by Menu.
// CategoryBar receives selected and onSelect as props.
function CategoryBar({ selected, onSelect }) {
  return (
    <div>
      {categories.map((cat) => (
        <button
          key={cat}
          className={selected === cat ? "chip on" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function Exercise3() {
  const [category, setCategory] = useState("All");

  return (
    <section>
      <h2>Exercise 3: Lifting State Up</h2>

      <CategoryBar
        selected={category}
        onSelect={setCategory}
      />

      <p>The parent Menu controls the selected category: {category}</p>
    </section>
  );
}

// Exercise 4: Filter dishes and show an empty state
function Exercise4() {
  const [category, setCategory] = useState("All");

  const shown =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section>
      <h2>Exercise 4: Filter the Menu</h2>

      <CategoryBar
        selected={category}
        onSelect={setCategory}
      />

      {shown.length === 0 ? (
        <p>No dishes in this category yet.</p>
      ) : (
        <ul>
          {shown.map((dish) => (
            <li key={dish.id}>
              {dish.name} — {dish.price} ETB
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Exercise 5: Running order total
function Exercise5() {
  const [total, setTotal] = useState(0);

  function addToOrder(price) {
    setTotal((currentTotal) => currentTotal + price);
  }

  return (
    <section>
      <h2>Exercise 5: Order Total</h2>

      {dishes.map((dish) => (
        <div key={dish.id}>
          <span>
            {dish.name} — {dish.price} ETB
          </span>

          <button onClick={() => addToOrder(dish.price)}>
            Add to order
          </button>
        </div>
      ))}

      <h3>Total: {total} ETB</h3>
    </section>
  );
}

// Exercise 6: Controlled delivery form
function Exercise6() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert(`Delivery for ${form.name} in ${form.area}`);
  }

  return (
    <section>
      <h2>Exercise 6: Delivery Form</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
          />
        </label>

        <label>
          Area
          <select
            name="area"
            value={form.area}
            onChange={handleChange}
          >
            <option value="Bole">Bole</option>
            <option value="Piassa">Piassa</option>
            <option value="Mexico">Mexico</option>
            <option value="Kazanchis">Kazanchis</option>
          </select>
        </label>

        <button type="submit">Submit Delivery</button>
      </form>

      <p>Name: {form.name || "—"}</p>
      <p>Phone: {form.phone || "—"}</p>
      <p>Area: {form.area}</p>
    </section>
  );
}

// Exercise 7: Live TeleBirr phone validation
function Exercise7() {
  const [phone, setPhone] = useState("");

  const valid = /^(?:\+251|0)9\d{8}$/.test(phone);

  function handleSubmit(event) {
    event.preventDefault();

    if (valid) {
      alert("TeleBirr number is valid. You can continue.");
    }
  }

  return (
    <section>
      <h2>Exercise 7: TeleBirr Validation</h2>

      <form onSubmit={handleSubmit}>
        <label>
          TeleBirr Phone Number
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="0911223344"
          />
        </label>

        {phone && !valid && (
          <p className="error">
            Enter a valid number, such as 0911223344 or +251911223344.
          </p>
        )}

        {valid && (
          <p className="success">Valid TeleBirr number.</p>
        )}

        <button type="submit" disabled={!valid}>
          Submit
        </button>
      </form>
    </section>
  );
}

// Display all seven exercises
export default function App() {
  return (
    <div className="container">
      <h1>CodeOps Day 28: State & Events</h1>
      <p>React exercises using useState, events and controlled inputs.</p>

      <Exercise1 />
      <Exercise2 />
      <Exercise3 />
      <Exercise4 />
      <Exercise5 />
      <Exercise6 />
      <Exercise7 />
    </div>
  );
}