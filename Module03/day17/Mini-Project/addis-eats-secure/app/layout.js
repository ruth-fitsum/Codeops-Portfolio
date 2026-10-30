import "./globals.css";

export const metadata = {
  title: "Day 42 Authentication Exercises",
  description:
    "Next.js middleware, sessions, authorization, and secure redirects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}