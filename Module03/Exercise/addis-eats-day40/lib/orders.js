const orders = new Map();

export function createOrder(order) {
  const id = crypto.randomUUID();

  const newOrder = {
    id,
    ...order,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.set(id, newOrder);

  return newOrder;
}

export function getOrder(id) {
  return orders.get(id) || null;
}

export function cancelOrder(id, ownerToken) {
  const order = orders.get(id);

  if (!order || !ownerToken || order.ownerToken !== ownerToken) {
    return false;
  }

  order.status = "cancelled";
  orders.set(id, order);

  return true;
}