const orders = [];

export function createOrder(orderData) {
  const order = {
    id: `AE-${Date.now()}`,
    ...orderData,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  return order;
}

export function getOrderById(id) {
  return orders.find((order) => order.id === id);
}

export function getAllOrders() {
  return [...orders];
}