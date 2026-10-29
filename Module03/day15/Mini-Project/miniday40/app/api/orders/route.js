import { getDishById } from "../../../lib/data";
import { createOrder } from "../../../lib/orders";
import { validateOrder } from "../../../lib/validation";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Request body must contain valid JSON." },
      { status: 400 }
    );
  }

  const validation = validateOrder(body);

  if (!validation.valid) {
    return Response.json(
      { error: "Please correct the submitted fields.", fieldErrors: validation.fieldErrors },
      { status: 422 }
    );
  }

  const items = body.items;

  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return Response.json(
      { error: "Provide a valid, non-empty list of items." },
      { status: 422 }
    );
  }

  const verifiedItems = [];

  for (const item of items) {
    const dish = getDishById(item.id);
    const quantity = Number(item.quantity);

    if (
      !dish ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 20
    ) {
      return Response.json(
        { error: "One or more order items are invalid." },
        { status: 422 }
      );
    }

    verifiedItems.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity,
    });
  }

  const total = verifiedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = createOrder({
    customer: validation.data,
    items: verifiedItems,
    total,
  });

  return Response.json(
    {
      message: "Order created successfully.",
      order,
    },
    { status: 201 }
  );
}