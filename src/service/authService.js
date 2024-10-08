import {getHeaders} from './apiUtils'
const BASE_URL = 'http://127.0.0.1:3000';

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
      const errorData = await response.json(); // Obtiene el mensaje de error del backend
      throw new Error(errorData.error || 'Error desconocido'); // Lanza un error con el mensaje del backend
    }

    const token = response.headers.get('authorization')

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
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });}
};
