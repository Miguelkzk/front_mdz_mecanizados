const BASE_URL = 'http://127.0.0.1:3000';

export const DeliveryNoteService = {
  upload: async (formData) => {
    const response = await fetch(`${BASE_URL}/delivery_notes/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  },
  delete: async (deliveryNote) => {
    const response = await fetch(`${BASE_URL}/delivery_notes/${deliveryNote.id}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  },
}
