import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/Inter-Regular.woff2",
  display: "swap",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata = {
  title: "Addis Eats | Fresh Food",
  description:
    "Discover Ethiopian favorites and delicious meals with Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}