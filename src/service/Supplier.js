const BASE_URL = 'http://127.0.0.1:3000'
export const SupplierService = {

  getSuppliers: async (name) => {
    const response = await fetch(`${BASE_URL}/suppliers/?name=${name}`);
    const data = await response.json();
    return data;
  }
}