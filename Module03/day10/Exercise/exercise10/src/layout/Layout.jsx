import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "../ui/ErrorBoundary";

function Layout() {
  return (
    <>
      <Header />

      <main className="container">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}

export default Layout;