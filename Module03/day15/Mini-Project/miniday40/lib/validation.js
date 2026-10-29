export function validateOrder(data) {
  const fieldErrors = {};

  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  const address = String(data.address || "").trim();
  const paymentMethod = String(data.paymentMethod || "").trim();

  if (name.length < 2) {
    fieldErrors.name = "Enter your full name.";
  }

  if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    fieldErrors.phone = "Enter a valid Ethiopian mobile number.";
  }

  if (address.length < 5) {
    fieldErrors.address = "Enter a delivery address of at least 5 characters.";
  }

  if (!["Cash on Delivery", "Mobile Money"].includes(paymentMethod)) {
    fieldErrors.paymentMethod = "Select a valid payment method.";
  }

  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
    data: { name, phone, address, paymentMethod },
  };
}