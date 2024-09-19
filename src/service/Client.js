const BASE_URL = 'http://127.0.0.1:3000'
export const ClientService = {
  getClientByName: async (name) => {
    const response = await fetch(`${BASE_URL}/clients/find_by_name?name=${name}`);
    const data = await response.json();
    return data
  },
  getClients: async (name) => {
    const response = await fetch(`${BASE_URL}/clients/?name=${name}`);
    const data = await response.json();
    return data
  },
  newClient: async (name) => {
    const response = await fetch(`${BASE_URL}/clients/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
      }
    );
    const data = await response.json();
    return data;
  },
  updateClient: async (body,clientID ) => {
    const response = await fetch(`${BASE_URL}/clients/${clientID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  }
}