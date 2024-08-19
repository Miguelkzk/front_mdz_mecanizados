const BASE_URL = 'http://127.0.0.1:3000'
export const SaleService = {
  getSales: async () => {
    const response = await fetch(`${BASE_URL}/sales/`);
    const data = await response.json();
    return data;
  },
  getSaleDetail: async (sale)=>{
    const response = await fetch(`${BASE_URL}/sales/${sale.id}`);
    const data = await response.json();
  return data
  },
  newSale: async (saleData)=>{
    const response = await fetch(`${BASE_URL}/sales/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
      }
    );
    const data = await response.json();
    return data;
    
  }
}