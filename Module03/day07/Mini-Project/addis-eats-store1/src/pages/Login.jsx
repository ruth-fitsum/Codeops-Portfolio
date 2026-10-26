import { useState } from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../AuthContext";

export default function Login() {
  const { user, loading, login } = useAuth();

  const [phone, setPhone] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from =
    location.state?.from?.pathname ?? "/menu";

  if (loading) {
    return <p>Checking your session...</p>;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!phone.trim()) {
      return;
    }

    login(phone.trim());

    navigate(from, { replace: true });
  }

  return (
    <section>
      <h2>Sign In</h2>

      <p>Sign in to continue to checkout.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">
          Phone number
        </label>

        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
          placeholder="Enter your phone number"
          required
        />

        <button type="submit">
          Sign In
        </button>
      </form>

      <p className="note">
        This is simulated authentication for
        learning purposes.
      </p>
    </section>
  );
}