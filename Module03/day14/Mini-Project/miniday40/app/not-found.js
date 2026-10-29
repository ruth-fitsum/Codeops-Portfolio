import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="error-page">
      <div className="error-icon">404</div>
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find the page or dish you were looking for.</p>

      <Link href="/" className="button button-primary">
        Back to home
      </Link>
    </div>
  );
}