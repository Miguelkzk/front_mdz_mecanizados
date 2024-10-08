const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `${token}`,
  };
};

const BASE_URL = 'http://127.0.0.1:3000';

export const SupplierNoteSerive = {
  newSupplierNote: async (formData) => {
    const response = await fetch(`${BASE_URL}/supplier_delivery_notes/upload`, {
      method: "POST",
      headers: getHeaders(),
      body: formData,
    });
    const data = await response.json();
    return data;
  },
  deleteSupplierNote: async (SupplierNote) => {
    const response = await fetch(`${BASE_URL}/supplier_delivery_notes/${SupplierNote.id}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    return data;
  },
}
