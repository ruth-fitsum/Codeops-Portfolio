export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const phone = form.phone.replace(/\s/g, "");

  if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    errors.phone = "Use 0911234567 or +251911234567.";
  }

  return errors;
}