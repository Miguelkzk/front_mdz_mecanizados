const BASE_URL = 'http://127.0.0.1:3000'
export const PucharseOrderService = {
  getOrders: async () => {
    const response = await fetch(`${BASE_URL}/purchase_orders//`);
    const data = await response.json();
    return data;
  },
  getAttributes: async ()=>{
    const response = await fetch(`${BASE_URL}/purchase_orders/attributes_description`);
    const data = await response.json();
  return data
  },
  updateOrder: async (body,order)=>{
    console.log(body)
    const response = await fetch(`${BASE_URL}/purchase_orders/${order.id}`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  const data = await response.json();
  return data;
  },
  deleteOrder: async (order) => {
    const response = await fetch(`${BASE_URL}/purchase_orders/${order.id}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  },
  newOrder: async (quantity, article) => {
    const body ={
      article_id: article.id,
      quantity: quantity,
      state: "pending"
    }
    const response = await fetch(`${BASE_URL}/purchase_orders/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
    const data = await response.json();
    return data;
  },
}