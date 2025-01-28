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
};