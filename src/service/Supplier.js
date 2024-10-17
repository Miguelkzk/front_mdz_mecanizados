import {getHeaders, handleResponse } from './apiUtils';
import { BASE_URL } from './config';

export const SupplierService = {

  getSuppliers: async (name) => {
    const response = await fetch(`${BASE_URL}/suppliers/?name=${name}`,{
      headers: getHeaders()
    });
    return handleResponse(response);
  },
  newSupplier: async (name) => {
    const response = await fetch(`${BASE_URL}/suppliers/`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(name)
      }
    );
    const data = await response.json();
    return data;
  },
  editSupplier: async (body,supplierID ) => {
    const response = await fetch(`${BASE_URL}/suppliers/${supplierID}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  },
}