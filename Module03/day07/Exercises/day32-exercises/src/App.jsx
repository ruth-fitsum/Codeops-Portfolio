import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

import { create } from "zustand";

import { persist } from "zustand/middleware";

// ==================================================
// EXERCISE 1: GUARDED CART CONTEXT
// ==================================================

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        items: [...state.items, action.dish],
      };

    case "remove":
      return {
        items: state.items.filter(
          (_, index) => index !== action.index
        ),
      };

    case "clear":
      return {
        items: [],
      };

    default:
      throw new Error(
        "Unknown cart action: " + action.type
      );
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  const total = state.items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        dispatch,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}

// ==================================================
// EXERCISE 2: SEPARATE AUTH AND THEME PROVIDERS
// ==================================================

const AuthContext = createContext(null);
const ThemeContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState("Ruth");

  function logout() {
    setUser(null);
  }

  function login() {
    setUser("Ruth");
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error(
      "useTheme must be used inside a ThemeProvider"
    );
  }

  return context;
}

// ==================================================
// EXERCISE 3: OBSERVE COMPONENT RE-RENDERS
// ==================================================

function RenderDemo() {
  const { items, dispatch } = useCart();

  const { user } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((count) => count + 1);
  }, [items, user, theme]);

  const sampleDish = {
    id: 1,
    name: "Doro Wat",
    price: 450,
  };

  return (
    <section className={`panel ${theme}`}>
      <h2>Exercise 3: Render Demo</h2>

      <p>Signed in as: {user ?? "Guest"}</p>

      <p>Cart items: {items.length}</p>

      <p>Theme: {theme}</p>

      <p>
        Render count: {renderCount}
      </p>

      <button
        onClick={() =>
          dispatch({
            type: "add",
            dish: sampleDish,
          })
        }
      >
        Add Doro Wat
      </button>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>

      <p className="note">
        Observe the component in React DevTools
        while adding items and changing the theme.
      </p>
    </section>
  );
}

// ==================================================
// EXERCISES 4, 5 AND 6: ZUSTAND CART STORE
// ==================================================

const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => ({
          items: [...state.items, dish],
        })),

      remove: (index) =>
        set((state) => ({
          items: state.items.filter(
            (_, itemIndex) => itemIndex !== index
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "day32-exercise-cart",
    }
  )
);

// ==================================================
// EXERCISE 4: ADD ITEMS TO THE ZUSTAND STORE
// ==================================================

const sampleDishes = [
  {
    id: 1,
    name: "Doro Wat",
    price: 450,
  },
  {
    id: 2,
    name: "Shiro",
    price: 180,
  },
  {
    id: 3,
    name: "Chechebsa",
    price: 160,
  },
];

// ==================================================
// EXERCISE 5: USE NARROW SELECTORS
// ==================================================

function DishList() {
  const addItem = useCartStore(
    (state) => state.addItem
  );

  return (
    <section className="panel">
      <h2>Exercise 4: Dish List</h2>

      {sampleDishes.map((dish) => (
        <div className="row" key={dish.id}>
          <span>
            {dish.name} — {dish.price} ETB
          </span>

          <button onClick={() => addItem(dish)}>
            Add
          </button>
        </div>
      ))}
    </section>
  );
}

function CartBadge() {
  const items = useCartStore(
    (state) => state.items
  );

  return (
    <p>
      Cart items: <strong>{items.length}</strong>
    </p>
  );
}

function CartTotal() {
  const items = useCartStore(
    (state) => state.items
  );

  const total = items.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  return (
    <p>
      Total: <strong>{total} ETB</strong>
    </p>
  );
}

// ==================================================
// EXERCISE 6: PERSISTENCE AND CART ACTIONS
// ==================================================

function ZustandCart() {
  const items = useCartStore(
    (state) => state.items
  );

  const remove = useCartStore(
    (state) => state.remove
  );

  const clear = useCartStore(
    (state) => state.clear
  );

  return (
    <section className="panel">
      <h2>Exercise 6: Persistent Cart</h2>

      <CartBadge />

      {items.length === 0 ? (
        <p>Your Zustand cart is empty.</p>
      ) : (
        items.map((dish, index) => (
          <div
            className="row"
            key={`${dish.id}-${index}`}
          >
            <span>
              {dish.name} — {dish.price} ETB
            </span>

            <button onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))
      )}

      <CartTotal />

      <button onClick={clear}>
        Clear Cart
      </button>

      <p className="note">
        Refresh the browser to check whether the
        cart survives.
      </p>
    </section>
  );
}

// ==================================================
// AUTH AND THEME CONTEXT DEMO
// ==================================================

function ContextDemo() {
  const { user, logout, login } = useAuth();

  const { theme, toggleTheme } = useTheme();

  return (
    <section className={`panel ${theme}`}>
      <h2>Exercises 1 and 2: Context</h2>

      <p>User: {user ?? "Signed out"}</p>

      <button onClick={logout}>
        Sign Out
      </button>

      <button onClick={login}>
        Sign In
      </button>

      <p>Theme: {theme}</p>

      <button onClick={toggleTheme}>
        Change Theme
      </button>
    </section>
  );
}

// ==================================================
// MAIN APP
// ==================================================

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <div className="container">
            <h1>Day 32 Exercises</h1>

            <p>
              Context API, Zustand, selectors,
              and persistence.
            </p>

            <ContextDemo />

            <RenderDemo />

            <DishList />

            <ZustandCart />

            <section className="panel">
              <h2>Exercise 7: Redux Toolkit</h2>

              <p>
                The Redux slice is in{" "}
                <code>cartSlice.js</code>.
              </p>

              <p>
                It is intentionally not connected
                to this app. The exercise is to
                build and compare the slice.
              </p>
            </section>
          </div>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}