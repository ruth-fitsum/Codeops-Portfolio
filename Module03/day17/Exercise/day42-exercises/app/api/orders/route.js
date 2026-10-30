import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  getOrdersFor,
  getOrder,
  markCancelled,
} from "@/lib/orders";

export async function GET() {
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { message: "Not signed in." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    orders: getOrdersFor(user.id),
  });
}

export async function DELETE(request) {
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { message: "Not signed in." },
      { status: 401 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const orderId =
    typeof body.orderId === "string"
      ? body.orderId
      : String(body.orderId ?? "");

  const order = getOrder(orderId);

  if (!order) {
    return NextResponse.json(
      { message: "Order not found." },
      { status: 404 }
    );
  }

  if (order.userId !== user.id) {
    return NextResponse.json(
      { message: "You cannot modify another user's order." },
      { status: 403 }
    );
  }

  if (order.status === "Cancelled") {
    return NextResponse.json(
      { message: "This order is already cancelled." },
      { status: 409 }
    );
  }

  markCancelled(orderId);

  return NextResponse.json({
    message: "Order cancelled successfully.",
  });
}