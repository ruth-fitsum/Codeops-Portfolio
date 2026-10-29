import { NextResponse } from "next/server";
import { createOrder } from "../../../lib/orders";
import { validateOrder } from "../../../lib/validation";
import { getDishById } from "../../../lib/data";

export async function POST(request) {
  try {
    const body = await request.json();
    const customer = body.customer || {};
    const errors = validateOrder(customer);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          error: "Please correct the checkout information.",
          errors,
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const items = [];

    for (const submittedItem of body.items) {
      const dish = getDishById(String(submittedItem.id));
      const quantity = Number(submittedItem.quantity);

      if (
        !dish ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 50
      ) {
        return NextResponse.json(
          { error: "Your cart contains an invalid item." },
          { status: 400 }
        );
      }

      items.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity,
      });
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = createOrder({
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        paymentMethod: customer.paymentMethod,
      },
      items,
      total,
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
  } catch {
    return NextResponse.json(
      { error: "Unable to process your order." },
      { status: 500 }
    );
  }
}