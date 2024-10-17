import { BASE_URL } from './config';

const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `${token}`,
  };
};

export const CertificateOfMaterialsService = {
  newCertificate: async (formData) => {
    const response = await fetch(`${BASE_URL}/certificate_of_materials/upload`, {
      method: "POST",
      headers: getHeaders(),
      body: formData,
    });
    const data = await response.json();
    return data;
  },
  delete: async (certificate) => {
    const response = await fetch(`${BASE_URL}/certificate_of_materials/${certificate.id}`,
      {
        method: "DELETE",
        headers: getHeaders()
      }
    );
    const data = await response.json();
    return data;
  },
}
