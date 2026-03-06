// src/pages/delivery/DeliveryAPI.jsx
export const fetchOrders = (orders, role, userId) => {
  if (role === "delivery") {
    return orders.filter((o) => !o.delivered && o.assignedTo === userId);
  }
  return orders;
};

export const markDelivered = (orders, setOrders, orderId) => {
  setOrders((prev) =>
    prev.map((o) => (o.id === orderId ? { ...o, status: "delivered", delivered: true } : o))
  );
};

export const assignDeliveryPerson = (orders, setOrders, orderId, userId) => {
  setOrders((prev) =>
    prev.map((o) => (o.id === orderId ? { ...o, assignedTo: userId } : o))
  );
};
