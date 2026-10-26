import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">
        Addis Eats
      </Link>

      <p>Ethiopian food, made easy.</p>
    </header>
  );
}