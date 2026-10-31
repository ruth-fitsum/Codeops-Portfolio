import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">FRESH FROM ADDIS</p>

          <h1>Good food, made for sharing.</h1>

          <p>
            Explore traditional Ethiopian dishes and discover
            your next favorite meal with Addis Eats.
          </p>

          <Link href="/menu" className="button">
            Explore our menu
          </Link>
        </div>

        <div className="hero-image">
          <Image
            src="/dishes/doro-wat.jpg"
            alt="A traditional Ethiopian Doro Wat meal"
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </section>
    </main>
  );
}