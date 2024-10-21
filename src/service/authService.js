import { GiConsoleController } from 'react-icons/gi';
import {getHeaders} from './apiUtils'
import { BASE_URL } from './config';

export const authService = {
  login: async (formData) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");

      let errorData;
      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json(); // Solo intenta parsear si es JSON
      } else {
        errorData = { error: await response.text() }; // De lo contrario, maneja como texto
      }

      throw new Error(errorData.error || 'Error desconocido'); // Lanza un error con el mensaje del backend
    }

    const token = response.headers.get('authorization');

    if (!token) {
      throw new Error('Token de autorización no encontrado en la respuesta.');
    }

    // Extrae los datos del cuerpo de la respuesta
    const data = await response.json();

    return { data, token }; // Devuelve los datos junto con el token
  },
  logout: async() => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "DELETE",
      headers: getHeaders()
    });
    const data = await response.json();
    return data
  },
  register : async(formData) => {
    console.log(formData)
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(formData)
    });
    const data = await response.json()
    return data;
  }

};
