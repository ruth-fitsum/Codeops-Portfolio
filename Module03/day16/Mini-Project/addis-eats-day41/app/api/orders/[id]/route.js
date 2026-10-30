import { NextResponse } from "next/server";

const statuses = [
  {
    status: "Confirmed",
    message: "Your order has been received.",
  },
  {
    status: "Preparing",
    message: "The kitchen is preparing your food.",
  },
  {
    status: "Ready",
    message: "Your food is ready.",
  },
  {
    status: "Delivered",
    message: "Your order has been delivered.",
  },
];

export async function GET(request, { params }) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId < 1) {
    return NextResponse.json(
      { message: "Invalid order ID." },
      { status: 400 }
    );
  }

  // Simulate a status change every 15 seconds.
  const stage = Math.floor(Date.now() / 15000) % statuses.length;
  const currentStatus = statuses[stage];

  return NextResponse.json({
    id: orderId,
    customer: "Addis Eats Customer",
    status: currentStatus.status,
    message: currentStatus.message,
    updatedAt: new Date().toISOString(),
  });
}