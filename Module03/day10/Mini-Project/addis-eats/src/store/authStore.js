import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem("addis-eats-auth") === "true",

  login: () => {
    localStorage.setItem("addis-eats-auth", "true");
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("addis-eats-auth");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;