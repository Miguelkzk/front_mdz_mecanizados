import {getHeaders, handleResponse } from './apiUtils';
import { BASE_URL } from './config';


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
    console.log(order)
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
  generateReport: async (year) => {
    const response =  await fetch(`${BASE_URL}/orders/production_sheet`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({year})
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
     const a = document.createElement('a');
      a.href = url;

      // Obtener el nombre del archivo del encabezado
      const contentDisposition = response.headers.get('Content-Disposition');
      console.log('contentDisposition:', contentDisposition);
      const fileName = contentDisposition?.split('filename=')[1]?.split(';')[0]?.replace(/"/g, '') || `Plantilla.xlsx`;

      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
  }
}