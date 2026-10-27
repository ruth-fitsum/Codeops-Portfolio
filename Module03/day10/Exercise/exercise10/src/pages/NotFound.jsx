import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="message">
      <h1>404 — Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="button">
        Return home
      </Link>
    </section>
  );
}

export default NotFound;