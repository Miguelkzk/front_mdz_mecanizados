const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `${token}`,
  };
};
import { BASE_URL } from './config';


export const PurchaseOrderService = {
  upload: async (formData) => {
    const response = await fetch(`${BASE_URL}/file_purchase_orders/upload`, {
      method: "POST",
      headers: getHeaders(),
      body: formData,
    });
    const data = await response.json();
    return data;
  },
  delete: async (purchaseOrder) => {
    const response = await fetch(`${BASE_URL}/file_purchase_orders/${purchaseOrder.id}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return data;
  },
}