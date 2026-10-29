import { z } from "zod";

export const orderItemSchema = z.object({
  dishId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20),
});

export const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+251|0)9\d{8}$/, "Enter a valid Ethiopian mobile number."),
  items: z.array(orderItemSchema).min(1).max(30),
});

export function validateOrderItems(items) {
  const parsed = z.array(orderItemSchema).min(1).max(30).safeParse(items);

  if (!parsed.success) {
    return {
      success: false,
      error: "Select at least one dish and enter a valid quantity.",
    };
  }

  const validDishIds = new Set(getValidDishIds());

  for (const item of parsed.data) {
    if (!validDishIds.has(item.dishId)) {
      return {
        success: false,
        error: "One or more selected dishes do not exist.",
      };
    }
  }

  return {
    success: true,
    data: parsed.data,
  };
}

function getValidDishIds() {
  return dishesForValidation().map((dish) => dish.id);
}

function dishesForValidation() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}