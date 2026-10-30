export async function GET(request, { params }) {
  const { id } = await params;

  const statuses = [
    "Preparing",
    "Cooking",
    "Ready for Pickup",
    "Delivered",
  ];

  const order = {
    id,
    customer: "Abebe",
    status: statuses[Math.floor(Date.now() / 15000) % statuses.length],
    items: ["Doro Wot", "Injera", "Tibs"],
    updatedAt: new Date().toISOString(),
  };

  return Response.json(order);
}