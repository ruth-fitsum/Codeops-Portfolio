import { z } from "zod";

export const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

export const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name for the delivery."),

  phone: z
    .string()
    .transform((value) => value.replace(/\s/g, ""))
    .pipe(
      z
        .string()
        .regex(
          TELEBIRR,
          "Use 0911234567 or +251911234567."
        )
    ),

  area: z.enum(["Bole", "Kazanchis", "Megenagna", "Piassa"]),

  notes: z.string(),
});