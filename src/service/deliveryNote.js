const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `${token}`,
  };
};
import { BASE_URL } from './config';


export const DeliveryNoteService = {
  upload: async (formData) => {
    const response = await fetch(`${BASE_URL}/delivery_notes/upload`, {
      method: "POST",
      headers: getHeaders(),
      body: formData,
    });
    const data = await response.json();
    return data;
  },
  delete: async (deliveryNote) => {
    const response = await fetch(`${BASE_URL}/delivery_notes/${deliveryNote.id}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return data;
  },
}
