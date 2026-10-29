"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDishes } from "../lib/data";
import { createOrder, cancelOrder as cancelStoredOrder } from "../lib/orders";
import { orderSchema } from "../lib/validation";

export async function placeOrder(formData) {
  const selectedIds = formData.getAll("dishId").map(String);
  const dishes = getDishes();

  const items = selectedIds.map((dishId) => ({
    dishId,
    quantity: Number(formData.get(`quantity-${dishId}`)),
  }));

  const parsed = orderSchema.safeParse({
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    items,
  });

  if (!parsed.success) {
    redirect("/checkout?error=invalid");
  }

  const validatedItems = [];

  for (const item of parsed.data.items) {
    const dish = dishes.find((entry) => entry.id === item.dishId);

    if (!dish) {
      redirect("/checkout?error=invalid");
    }

    validatedItems.push({
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

  const total = validatedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = createOrder({
    customerName: parsed.data.customerName,
    phone: parsed.data.phone,
    items: validatedItems,
    total,
    ownerToken,
  });

  redirect(`/checkout?order=${encodeURIComponent(order.id)}`);
}

export async function cancelOrder(formData) {
  const orderId = String(formData.get("orderId") || "");
  const cookieStore = await cookies();
  const ownerToken = cookieStore.get("order_owner")?.value;

  if (!orderId || !ownerToken) {
    redirect("/checkout?error=unauthorized");
  }

  const cancelled = cancelStoredOrder(orderId, ownerToken);

  if (!cancelled) {
    redirect("/checkout?error=unauthorized");
  }

  redirect("/checkout?cancelled=1");
}