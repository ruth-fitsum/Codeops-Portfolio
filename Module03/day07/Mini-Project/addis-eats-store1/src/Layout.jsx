import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import { useTheme } from "./ThemeContext";

export default function Layout() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />

      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}