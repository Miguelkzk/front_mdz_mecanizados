import {getHeaders } from './apiUtils';

import { BASE_URL } from './config';


export const MaterialService = {
  newMaterial: async (material) => {
    const response = await fetch(`${BASE_URL}/materials/`, {
      method: "POST",
      headers:  getHeaders(),
      body: JSON.stringify(material),
    });

    const data = await response.json();
  },

  editMaterial: async (material, materialID) => {

    const response = await fetch(`${BASE_URL}/materials/${materialID}`, {
      method: "PUT",
      headers:  getHeaders(),
      body: JSON.stringify(material),
    });

    const data = await response.json();
    return data;
  },
  deleteMaterial: async (materialID) => {
    const response = await fetch(`${BASE_URL}/materials/${materialID}`,
      {
        method: "DELETE",
        headers:  getHeaders(),
      }
    );
    const data = await response.json();
    return data;
  },
};
