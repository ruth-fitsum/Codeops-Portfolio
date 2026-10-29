"use server";

import { redirect } from "next/navigation";
import { dishes, getDishById } from "../lib/data";
import { createOrder } from "../lib/orders";
import { validateOrder } from "../lib/validation";

export async function placeOrderAction(previousState, formData) {
  const validation = validateOrder({
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    paymentMethod: formData.get("paymentMethod"),
  });

  let items;

  try {
    items = JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    return {
      fieldErrors: {},
      error: "Your cart data is invalid. Please refresh and try again.",
    };
  }

  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return {
      fieldErrors: {},
      error: "Your cart is empty or contains too many items.",
    };
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
      return {
        fieldErrors: {},
        error: "One or more cart items are invalid. Please update your cart.",
      };
    }

    verifiedItems.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity,
    });
  }

  if (!validation.valid) {
    return {
      fieldErrors: validation.fieldErrors,
      error: "",
    };
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

  redirect(`/checkout?success=${encodeURIComponent(order.id)}`);
}