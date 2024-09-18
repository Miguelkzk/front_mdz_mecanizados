const BASE_URL = 'http://127.0.0.1:3000';

export const MaterialService = {
  newMaterial: async (material) => {
    const response = await fetch(`${BASE_URL}/materials/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material),
    });

    const data = await response.json();
    return data;
  },

  editMaterial: async (material, materialID) => {

    const response = await fetch(`${BASE_URL}/materials/${materialID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material),
    });

    const data = await response.json();
    return data;
  },
  deleteMaterial: async (materialID) => {
    const response = await fetch(`${BASE_URL}/materials/${materialID}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  },
};
