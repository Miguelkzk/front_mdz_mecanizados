import {getHeaders, handleResponse } from './apiUtils';
import { BASE_URL } from './config';

export const RemunerationService = {
  getParents : async () => {
    const response = await fetch(`${BASE_URL}/remunerations/show_parents`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
  getDetail : async (id) => {
    const response = await fetch(`${BASE_URL}/remunerations/${id}/show_childrens`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
},
  create : async (data) => {
    const response = await fetch(`${BASE_URL}/remunerations/create_remuneration_for_month`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};