import {getHeaders, handleResponse } from './apiUtils';
import { BASE_URL } from './config';

export const SupplierService = {

  getSuppliers: async (name) => {
    const response = await fetch(`${BASE_URL}/suppliers/?name=${name}`,{
      headers: getHeaders()
    });
    return handleResponse(response);
  },
  getSuppliers_with_note: async () => {
    const response = await fetch(`${BASE_URL}/suppliers/index_with_note`,{
      headers: getHeaders()
    });
    return handleResponse(response);
  },
  getNotes: async (id) => {
    const response = await fetch(`${BASE_URL}/suppliers/${id}/show_notes`,{
      headers: getHeaders()
    });
    return handleResponse(response);
  }
  ,
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