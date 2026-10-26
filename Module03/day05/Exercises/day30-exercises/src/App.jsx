import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState
} from "react";

import { ThemeContext } from "./ThemeContext";
import { useFetch } from "./useFetch";
import { cartReducer } from "./cartReducer";

const CartContext = createContext(null);

const dishes = [
  { id: 1, name: "Doro Wat", category: "Main", price: 280 },
  { id: 2, name: "Shiro", category: "Vegan", price: 160 },
  { id: 3, name: "Tibs", category: "Grill", price: 320 }
];

function Section({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// Exercise 1: useContext
function DeepGreeting() {
  const theme = useContext(ThemeContext);

  return (
    <p className={`theme-box ${theme}`}>
      The deeply nested component uses the {theme} theme.
    </p>
  );
}

function MiddleLayer() {
  return (
    <div className="nested">
      <DeepGreeting />
    </div>
  );
}

function ThemeExercise() {
  const [theme, setTheme] = useState("light");

  function switchTheme() {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  }

  return (
    <Section title="1. useContext — ThemeContext">
      <button onClick={switchTheme}>Switch theme</button>

      <ThemeContext.Provider value={theme}>
        <MiddleLayer />
      </ThemeContext.Provider>
    </Section>
  );
}

// Exercise 2: useFetch in two components
function FetchPreview() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Preview: Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return <p>Preview: Loaded {data.length} dishes.</p>;
}

function FetchList() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Dish list: Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <p>
      Dish list: {data.map((dish) => dish.name).join(", ")}
    </p>
  );
}

function FetchExercise() {
  return (
    <Section title="2. Custom useFetch Hook">
      <FetchPreview />
      <FetchList />

      <small>
        Each component has its own data, loading, and error state.
      </small>
    </Section>
  );
}

// Exercise 3: cartReducer
function ReducerExercise() {
  const initialState = { items: [] };

  const doroWat = {
    id: 1,
    name: "Doro Wat",
    price: 280
  };

  const afterAdd = cartReducer(initialState, {
    type: "add",
    dish: doroWat
  });

  const afterRemove = cartReducer(afterAdd, {
    type: "remove",
    id: 1
  });

  const afterClear = cartReducer(
    { items: [doroWat] },
    { type: "clear" }
  );

  return (
    <Section title="3. Test cartReducer">
      <pre>
        {JSON.stringify(
          { afterAdd, afterRemove, afterClear },
          null,
          2
        )}
      </pre>
    </Section>
  );
}

// Exercise 4: useReducer for a related group of form values
function formReducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };

    case "phone":
      return { ...state, phone: action.value };

    case "area":
      return { ...state, area: action.value };

    case "reset":
      return { name: "", phone: "", area: "" };

    default:
      return state;
  }
}

function ThreeUseStateVersion() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  return (
    <div className="subcard">
      <h3>Three useState calls</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />

      <p>{name || "Name"} · {phone || "Phone"} · {area || "Area"}</p>
    </div>
  );
}

function UseReducerVersion() {
  const [form, dispatch] = useReducer(formReducer, {
    name: "",
    phone: "",
    area: ""
  });

  return (
    <div className="subcard">
      <h3>One useReducer call</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          dispatch({ type: "name", value: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          dispatch({ type: "phone", value: e.target.value })
        }
      />

      <input
        placeholder="Area"
        value={form.area}
        onChange={(e) =>
          dispatch({ type: "area", value: e.target.value })
        }
      />

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset form
      </button>

      <p>
        {form.name || "Name"} · {form.phone || "Phone"} ·{" "}
        {form.area || "Area"}
      </p>
    </div>
  );
}

function CompareStateExercise() {
  return (
    <Section title="4. Compare useState and useReducer">
      <div className="columns">
        <ThreeUseStateVersion />
        <UseReducerVersion />
      </div>
    </Section>
  );
}

// Exercises 5 and 6: CartProvider and useMemo
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  const total = state.items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  // useMemo keeps the context value object stable
  // when its dependencies have not changed.
  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total
    }),
    [state.items, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function CartConsumer() {
  const { items, dispatch, total } = useContext(CartContext);

  const doroWat = {
    id: 1,
    name: "Doro Wat",
    price: 280
  };

  return (
    <div>
      <p>Items in cart: {items.length}</p>
      <p>Total: {total} ETB</p>

      <button
        onClick={() =>
          dispatch({ type: "add", dish: doroWat })
        }
      >
        Add Doro Wat
      </button>

      <button
        onClick={() =>
          dispatch({ type: "remove", id: 1 })
        }
      >
        Remove Doro Wat
      </button>

      <button onClick={() => dispatch({ type: "clear" })}>
        Clear cart
      </button>
    </div>
  );
}

function ProviderExercise() {
  return (
    <Section title="5–6. CartProvider and useMemo">
      <CartProvider>
        <CartConsumer />
      </CartProvider>

      <small>
        Memoizing the value avoids creating a new context value
        object when its dependencies have not changed.
      </small>
    </Section>
  );
}

// Exercise 7: React.memo and useCallback
const MemoDishList = memo(function MemoDishList({
  dishes,
  onAdd
}) {
  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>
          {dish.name} — {dish.price} ETB

          <button onClick={() => onAdd(dish)}>
            Add
          </button>
        </li>
      ))}
    </ul>
  );
});

function MemoExercise() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  const stableDishes = useMemo(() => dishes, []);

  const addDish = useCallback((dish) => {
    setCart((items) => [...items, dish]);
  }, []);

  return (
    <Section title="7. React.memo and useCallback">
      <p>Counter: {count}</p>

      <button onClick={() => setCount((value) => value + 1)}>
        Increase counter
      </button>

      <MemoDishList
        dishes={stableDishes}
        onAdd={addDish}
      />

      <p>Items added: {cart.length}</p>

      <small>
        React.memo can skip rendering the list when its props
        have not changed. useCallback keeps addDish stable.
      </small>
    </Section>
  );
}

export default function App() {
  return (
    <main className="page">
      <h1>Day 30 — React Exercises</h1>

      <ThemeExercise />
      <FetchExercise />
      <ReducerExercise />
      <CompareStateExercise />
      <ProviderExercise />
      <MemoExercise />
    </main>
  );
}