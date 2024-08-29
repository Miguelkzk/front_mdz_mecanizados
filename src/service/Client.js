const BASE_URL = 'http://127.0.0.1:3000'
export const ClientService = {
  getClientByName: async (name) => {
    const response = await fetch(`${BASE_URL}/clients/find_by_name?name=${name}`);
    const data = await response.json();
    return data
  },
  getClients: async () => {
    const response = await fetch(`${BASE_URL}/clients/`);
    const data = await response.json();
    return data
  }
}