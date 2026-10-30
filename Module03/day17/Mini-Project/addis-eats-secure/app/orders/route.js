import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/users";
import {
  getOrdersFor,
  getOrder,
  markCancelled,
} from "@/lib/orders";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 }
    );
  }

  const user = getUserById(session.id);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid session." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    orders: getOrdersFor(user.id),
  });
}

export async function DELETE(request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Authentication required." },
      { status: 401 }
    );
  }

  const user = getUserById(session.id);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid session." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const orderId = String(body.orderId || "");
    const order = getOrder(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    if (order.userId !== user.id) {
      return NextResponse.json(
        { message: "You cannot cancel another user's order." },
        { status: 403 }
      );
    }

    const cancelledOrder = markCancelled(orderId);

    if (!cancelledOrder) {
      return NextResponse.json(
        { message: "This order cannot be cancelled." },
        { status: 409 }
      );
    }

    return NextResponse.json({
      message: "Order cancelled successfully.",
      order: cancelledOrder,
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }
}