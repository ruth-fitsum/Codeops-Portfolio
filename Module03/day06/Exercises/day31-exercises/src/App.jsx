import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useSearchParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import { CartProvider, useCart } from "./CartProvider";
import { AuthProvider, useAuth } from "./AuthContext";
import useFetch from "./useFetch";

// EXERCISE 1: BrowserRouter, Routes and Route

// EXERCISE 2: Link and NavLink

function Header() {
  const { items } = useCart();

  return (
    <header>
      <h1>Addis Eats</h1>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Menu
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Cart ({items.length})
        </NavLink>

        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Checkout
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}

// EXERCISE 3: Layout with Outlet

function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Addis Eats — Day 31 Routing Exercises</p>
      </footer>
    </>
  );
}

// EXERCISE 4: Index route and NotFound

function Home() {
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Loading today's specials...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Welcome to Addis Eats</h2>
      <p>Discover your favorite Ethiopian dishes.</p>

      <h3>Today's Specials</h3>

      {data.slice(0, 3).map((dish) => (
        <p key={dish.id}>
          <Link to={`/menu/${dish.id}`}>
            {dish.name} — {dish.price} ETB
          </Link>
        </p>
      ))}

      <Link to="/menu">Explore the full menu</Link>
    </section>
  );
}

function NotFound() {
  return (
    <section>
      <h2>Page Not Found</h2>
      <p>The page or dish you requested does not exist.</p>
      <Link to="/">Return Home</Link>
    </section>
  );
}

// EXERCISE 5: Dynamic route and useParams

function DishDetail() {
  const { id } = useParams();

  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Loading dish...</p>;
  if (error) return <p>{error}</p>;

  const dish = data.find(
    (item) => String(item.id) === id
  );

  if (!dish) {
    return (
      <section>
        <h2>Dish Not Found</h2>
        <p>No dish found with ID: {id}</p>
        <Link to="/menu">Return to Menu</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>

      <AddToCartButton dish={dish} />

      <p>
        <Link to="/menu">Back to Menu</Link>
      </p>
    </section>
  );
}

function AddToCartButton({ dish }) {
  const { dispatch } = useCart();

  return (
    <button
      onClick={() =>
        dispatch({
          type: "add",
          dish,
        })
      }
    >
      Add to Cart
    </button>
  );
}

// EXERCISE 6: useSearchParams

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") ?? "All";

  const { data, loading, error } = useFetch("/dishes.json");

  function changeCategory(event) {
    const selectedCategory = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (selectedCategory === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", selectedCategory);
    }

    setSearchParams(nextParams);
  }

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>{error}</p>;

  const filteredDishes =
    category === "All"
      ? data
      : data.filter(
          (dish) => dish.category === category
        );

  return (
    <section>
      <h2>Our Menu</h2>

      <label htmlFor="category">
        Filter by category:
      </label>

      <select
        id="category"
        value={category}
        onChange={changeCategory}
      >
        <option value="All">All</option>
        <option value="Traditional">Traditional</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
      </select>

      {filteredDishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        filteredDishes.map((dish) => (
          <article key={dish.id}>
            <h3>
              <Link to={`/menu/${dish.id}`}>
                {dish.name}
              </Link>
            </h3>

            <p>{dish.description}</p>
            <p>{dish.price} ETB</p>

            <AddToCartButton dish={dish} />
          </article>
        ))
      )}
    </section>
  );
}

// Cart screen

function Cart() {
  const { items, dispatch, total } = useCart();

  return (
    <section>
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((dish, index) => (
          <article key={`${dish.id}-${index}`}>
            <p>
              {dish.name} — {dish.price} ETB
            </p>

            <button
              onClick={() =>
                dispatch({
                  type: "remove",
                  index,
                })
              }
            >
              Remove
            </button>
          </article>
        ))
      )}

      <h3>Total: {total} ETB</h3>

      <button onClick={() => dispatch({ type: "clear" })}>
        Clear Cart
      </button>

      <p>
        <Link to="/checkout">Proceed to Checkout</Link>
      </p>
    </section>
  );
}

// EXERCISE 7: RequireAuth and return navigation

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Checking your session...</p>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

function Login() {
  const { user, login, logout } = useAuth();

  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname ?? "/menu";

  function handleLogin(event) {
    event.preventDefault();

    if (!phone.trim()) {
      return;
    }

    login(phone.trim());
    navigate(from, { replace: true });
  }

  if (user) {
    return (
      <section>
        <h2>You are signed in</h2>
        <p>Phone: {user.phone}</p>

        <button
          onClick={() => {
            logout();
            setPhone("");
          }}
        >
          Sign Out
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2>Sign In</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="phone">Phone number</label>

        <input
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Enter any phone number"
          required
        />

        <button type="submit">Sign In</button>
      </form>

      <p>
        This is a simulated login for learning purposes.
      </p>
    </section>
  );
}

function Checkout() {
  const { user } = useAuth();
  const { items, total, dispatch } = useCart();

  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  function placeOrder(event) {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    if (!address.trim()) {
      return;
    }

    const orderId = Date.now();

    const order = {
      id: orderId,
      phone: user.phone,
      address: address.trim(),
      items,
      total,
    };

    sessionStorage.setItem(
      `day31-order-${orderId}`,
      JSON.stringify(order)
    );

    dispatch({ type: "clear" });

    navigate(`/orders/${orderId}`, {
      replace: true,
    });
  }

  return (
    <section>
      <h2>Checkout</h2>

      <p>Signed in as: {user.phone}</p>

      <p>Items: {items.length}</p>
      <p>Total: {total} ETB</p>

      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/menu">Browse menu</Link>
        </p>
      ) : (
        <form onSubmit={placeOrder}>
          <label htmlFor="address">Delivery address</label>

          <input
            id="address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            required
          />

          <button type="submit">Place Order</button>
        </form>
      )}
    </section>
  );
}

function OrderReceipt() {
  const { id } = useParams();

  const savedOrder = sessionStorage.getItem(
    `day31-order-${id}`
  );

  if (!savedOrder) {
    return <NotFound />;
  }

  const order = JSON.parse(savedOrder);

  return (
    <section>
      <h2>Order Confirmed</h2>
      <p>Order number: {order.id}</p>
      <p>Delivery address: {order.address}</p>
      <p>Total: {order.total} ETB</p>

      <Link to="/menu">Continue Shopping</Link>
    </section>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route
                path="menu/:id"
                element={<DishDetail />}
              />
              <Route path="cart" element={<Cart />} />

              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />

              <Route path="login" element={<Login />} />
              <Route
                path="orders/:id"
                element={<OrderReceipt />}
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;