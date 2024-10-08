import {getHeaders, handleResponse } from './apiUtils';
const BASE_URL = 'http://127.0.0.1:3000'

export const OrderService = {

  getOrders: async (filters) => {
    const response = await fetch(`${BASE_URL}/orders/?state=${filters.state}&purchase_order=${filters.purchaseOrder}&client_name=${filters.clientName}&name=${filters.orderName}&page=${filters.page}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);

  },
  getOder: async (order) => {
    const response = await fetch(`${BASE_URL}/orders/${order.id}`,{
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);

  },
  getMaterials: async (orderID) => {
    const response = await fetch(`${BASE_URL}/orders/${orderID}/materials_in_order`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    return handleResponse(response);

  },
  newOrder: async (order) => {
    const response = await fetch(`${BASE_URL}/orders/`,
    {
      method: "POST",
      headers: getHeaders(),
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
      headers: getHeaders(),
      body: JSON.stringify(order)
    }
  );
  const data = await response.json();
  return data;
  },
  editOrder: async (body, orderID) => {
    const response = await fetch(`${BASE_URL}/orders/${orderID}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    const data = await response.json();
    return data;
  },
}