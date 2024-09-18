const BASE_URL = 'http://127.0.0.1:3000'
export const OrderService = {

  getOrders: async (filters) => {
    const response = await fetch(`${BASE_URL}/orders/?state=${filters.state}&purchase_order=${filters.purchaseOrder}&client_name=${filters.clientName}&name=${filters.orderName}`);
    const data = await response.json();
    return data;
  },
  getOder: async (order) => {
    const response = await fetch(`${BASE_URL}/orders/${order.id}`);
    const data = await response.json();
    return data;
  },
  getMaterials: async (orderID) => {
    const response = await fetch(`${BASE_URL}/orders/${orderID}/materials_in_order`);
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

  },
  generateWorkOrder: async (order) => {
    const response = await fetch(`${BASE_URL}/orders/${order.id}/generate_work_order`,
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
  },
  editOrder: async (body, orderID) => {
    const response = await fetch(`${BASE_URL}/orders/${orderID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  },
}