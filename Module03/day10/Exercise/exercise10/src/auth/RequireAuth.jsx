import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequireAuth({ children }) {
  const { isSignedIn } = useAuth();
  const location = useLocation();

  if (!isSignedIn) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          message: "Please sign in before accessing checkout.",
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}

export default RequireAuth;