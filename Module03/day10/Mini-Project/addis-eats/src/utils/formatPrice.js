export function getDishPrice(id) {
  return 150 + (Number(id) % 10) * 25;
}

export function formatPrice(price) {
  return `${Number(price).toLocaleString("en-ET")} ETB`;
}