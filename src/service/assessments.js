import {getHeaders, handleResponse } from './apiUtils';
import { BASE_URL } from './config';

export const assessmentService = {
  newAssessment: async (body) => {
    const response = await fetch(`${BASE_URL}/assessments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return handleResponse(response);
  },

  deleteAssessment: async (id) => {
    const response = await fetch(`${BASE_URL}/assessments/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response);
  },
  updateAssessment: async (id, body) => {
    const response = await fetch(`${BASE_URL}/assessments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return handleResponse(response);
  }

}