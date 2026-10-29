import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDishes } from "../../../lib/data";
import { createOrder } from "../../../lib/orders";
import { orderSchema } from "../../../lib/validation";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Order validation failed.",
        details: parsed.error.flatten(),
      },
      { status: 422 }
    );
  }

  const dishes = getDishes();
  const items = [];

  for (const item of parsed.data.items) {
    const dish = dishes.find((entry) => entry.id === item.dishId);

    if (!dish) {
      return NextResponse.json(
        { error: `Dish ${item.dishId} does not exist.` },
        { status: 422 }
      );
    }

    items.push({
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: item.quantity,
    });
  }

  const cookieStore = await cookies();

  let ownerToken = cookieStore.get("order_owner")?.value;

  if (!ownerToken) {
    ownerToken = crypto.randomUUID();

    cookieStore.set("order_owner", ownerToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = createOrder({
    customerName: parsed.data.customerName,
    phone: parsed.data.phone,
    items,
    total,
    ownerToken,
  });

  return NextResponse.json(
    {
      message: "Order created successfully.",
      order: {
        id: order.id,
        status: order.status,
        total: order.total,
      },
    },
    { status: 201 }
  );
}