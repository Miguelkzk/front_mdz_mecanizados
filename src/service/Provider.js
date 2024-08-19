const BASE_URL = 'http://127.0.0.1:3000'
export const ProviderServide = {
  getProvider: async (id) => {
    const response = await fetch(`${BASE_URL}/providers/${id}`);
    const data = await response.json();
    return data;
  }
}