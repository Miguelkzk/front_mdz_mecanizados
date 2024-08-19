const BASE_URL = 'http://127.0.0.1:3000'
export const AttributesService = {
  get: async (nameModel) => {
    const response = await fetch(`${BASE_URL}/model_attributes/${nameModel}`);
    const data = await response.json();
    return data;
  }
}
