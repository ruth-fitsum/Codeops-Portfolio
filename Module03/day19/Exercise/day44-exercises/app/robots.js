const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://day44-exercises.example.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}