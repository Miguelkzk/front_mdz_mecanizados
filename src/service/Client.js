import {getHeaders, handleResponse } from './apiUtils';
const BASE_URL = 'http://127.0.0.1:3000'

export const ClientService = {
  getClientByName: async (name) => {
    const response = await fetch(`${BASE_URL}/clients/find_by_name?name=${name}`,{
      headers:  getHeaders()
    });
    const data = await response.json();
    return data;
  },
  getClients: async (name) => {
    const response = await fetch(`${BASE_URL}/clients/?name=${name}`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data;
  },
  newClient: async (name) => {
    const response = await fetch(`${BASE_URL}/clients/`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(name)
      }
    );
    const data = await response.json();
    return data;
  },
  updateClient: async (body,clientID ) => {
    const response = await fetch(`${BASE_URL}/clients/${clientID}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  }
}