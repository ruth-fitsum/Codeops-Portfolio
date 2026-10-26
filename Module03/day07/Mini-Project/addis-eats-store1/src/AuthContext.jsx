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
    const savedUser = localStorage.getItem(
      "addis-eats-user"
    );

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("addis-eats-user");
      }
    }

    setLoading(false);
  }, []);

  function login(phone) {
    const newUser = { phone };

    localStorage.setItem(
      "addis-eats-user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("addis-eats-user");
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
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}