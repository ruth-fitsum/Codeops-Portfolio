import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="app">
      <Header />

      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}