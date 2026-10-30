import "./globals.css";

export const metadata = {
  title: "CodeOps Day 41",
  description: "Data fetching using SWR and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}