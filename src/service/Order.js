const BASE_URL = 'http://127.0.0.1:3000'
export const OrderService = {
  getOrders: async () => {
    const response = await fetch(`${BASE_URL}/orders/`);
    const data = await response.json();
    return data;
  }
}