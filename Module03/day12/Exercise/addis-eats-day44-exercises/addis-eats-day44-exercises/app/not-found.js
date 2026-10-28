export default function NotFound() {
  return (
    <div className="container section">
      <p className="eyebrow">404 · Not found</p>
      <h1>We couldn't find that dish.</h1>
      <p className="lead">It may have been removed or the address may be incorrect.</p>
      <a className="button" href="/menu">Return to the menu</a>
    </div>
  );
}
