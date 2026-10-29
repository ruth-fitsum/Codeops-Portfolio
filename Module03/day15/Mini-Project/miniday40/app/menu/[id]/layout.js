export const metadata = {
  title: "Menu | Addis Eats",
  description: "Explore Ethiopian and international dishes at Addis Eats.",
};

export default function MenuLayout({ children }) {
  return <section className="section container">{children}</section>;
}