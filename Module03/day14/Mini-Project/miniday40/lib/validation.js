export function validateOrder(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (
    !values.phone ||
    !/^(?:\+251|0)9\d{8}$/.test(values.phone.trim())
  ) {
    errors.phone = "Enter a valid Ethiopian mobile number.";
  }

  if (!values.address || values.address.trim().length < 5) {
    errors.address = "Please enter your delivery address.";
  }

  if (
    !["Cash on Delivery", "Mobile Money"].includes(values.paymentMethod)
  ) {
    errors.paymentMethod = "Please choose a valid payment method.";
  }

  return errors;
}