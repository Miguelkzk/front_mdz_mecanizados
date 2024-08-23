const BASE_URL = 'http://127.0.0.1:3000'
export const OrderService = {
  getOrders: async () => {
    const response = await fetch(`${BASE_URL}/orders/`);
    const data = await response.json();
    return data;
  },
  getOder: async (order) => {
    const response = await fetch(`${BASE_URL}/orders/${order.id}`);
    const data = await response.json();
    return data;
  },
  newOrder: async (order) => {
    const response = await fetch(`${BASE_URL}/orders/`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    }
  );
  const data = await response.json();
  return data;

  }
}