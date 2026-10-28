export const metadata = {
  title: { absolute: "Addis Eats — Ethiopian Food Discovery" },
  description: "Discover Ethiopian dishes, explore their stories, and browse the Addis Eats menu."
};

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero">
        <p className="eyebrow">A taste of Ethiopia</p>
        <h1>Find your next<br />favorite dish.</h1>
        <p className="lead">
          Explore familiar classics and discover dishes from Ethiopia’s rich food culture.
          Browse the sample menu and see how page metadata helps each dish stand out.
        </p>
        <a className="button" href="/menu">Explore the menu</a>
      </section>
      <section className="section">
        <div className="notice">
          <strong>Day 44 exercise:</strong> inspect this page’s source to find the title,
          description, Open Graph tags, and canonical URL on the menu and dish pages.
        </div>
      </section>
    </div>
  );
}
