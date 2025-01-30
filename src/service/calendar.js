import {getHeaders, handleResponse } from './apiUtils';
import { BASE_URL } from './config';

export const CalendarService = {
  getEvents : async () => {
    const response = await fetch(`${BASE_URL}/events`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data;
  },

  createEvent: async (event) => {
    const response = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(event)
    });
    return handleResponse(response);
  },

  updateEvent: async (event, id) => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(event)
    });
    return handleResponse(response);
  },

  deleteEvent: async (id) => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};