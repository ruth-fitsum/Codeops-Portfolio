import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <section className="home">
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}

      <h1>Welcome to Addis Eats</h1>

      <p>
        Discover delicious meals, explore the menu, and build your next order.
      </p>

      <Link to="/menu" className="button">
        Explore the menu
      </Link>
    </section>
  );
}

export default Home;