"use server";

import { redirect } from "next/navigation";
import { cancelOrder } from "../lib/orders";

export async function cancelOrderAction(formData) {
  const orderId = formData.get("orderId");

  if (typeof orderId !== "string" || !orderId.trim()) {
    redirect("/cart");
  }

  cancelOrder(orderId);
  redirect("/cart?cancelled=1");
}