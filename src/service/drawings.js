const BASE_URL = 'http://127.0.0.1:3000';

export const DrawingsService = {
  newDrawing: async (formData) => {
    const response = await fetch(`${BASE_URL}/drawings/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  }
}
