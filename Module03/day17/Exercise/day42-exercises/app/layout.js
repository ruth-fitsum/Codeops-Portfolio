import "./globals.css";

export const metadata = {
  title: "Day 42 Authentication Exercises",
  description:
    "CodeOps exercises for Next.js middleware and authentication.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}