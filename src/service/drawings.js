import { BASE_URL } from './config';

const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `${token}`,
  };
};

export const DrawingsService = {
  newDrawing: async (formData) => {
    const response = await fetch(`${BASE_URL}/drawings/upload`, {
      method: "POST",
      headers: getHeaders(),
      body: formData,
    });
    const data = await response.json();
    return data;
  },
  delete: async (drawing) => {
    const response = await fetch(`${BASE_URL}/drawings/${drawing.id}`,
      {
        method: "DELETE",
        headers: getHeaders()
      }
    );
    const data = await response.json();
    return data;
  },
}
