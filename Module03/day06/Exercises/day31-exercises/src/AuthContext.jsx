import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("day31-user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("day31-user");
      }
    }

    setLoading(false);
  }, []);

  function login(phone) {
    const newUser = { phone };

    localStorage.setItem(
      "day31-user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("day31-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}