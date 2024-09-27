const BASE_URL = 'http://127.0.0.1:3000';

export const CertificateOfMaterialsService = {
  newCertificate: async (formData) => {
    const response = await fetch(`${BASE_URL}/certificate_of_materials/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  },
  delete: async (certificate) => {
    const response = await fetch(`${BASE_URL}/certificate_of_materials/${certificate.id}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  },
}
