import { BASE_URL } from './config';
import {getHeaders, handleResponse } from './apiUtils';

export const MachineService = {
  getMachines: async () => {
    const response = await fetch(`${BASE_URL}/machines`,{
      headers:  getHeaders()
    });

    const data = await response.json();
    return data;
  },
  showMaintenances: async (id, filters) => {
    const queryParams = {};
    if (filters.name_cont) queryParams['q[name_cont]'] = filters.name_cont;
    if (filters.type_maintenance_eq) queryParams['q[type_maintenance_eq]'] = filters.type_maintenance_eq;
    if (filters.filter_by_issue_date_year) queryParams['q[filter_by_issue_date_year]'] = filters.filter_by_issue_date_year;
    if (filters.filter_by_issue_date_month) queryParams['q[filter_by_issue_date_month]'] = filters.filter_by_issue_date_month;

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${BASE_URL}/machines/${id}/show_maintenances?${queryString}`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data;
  },

  UploadFile: async (machine_id, file, issue_date, folder_id, type_maintenance) => {
    if (!file || !folder_id) {
      throw new Error("El archivo o el folder_id no están definidos.");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("issue_date", issue_date);
    formData.append("folder_id", folder_id);
    formData.append("type_maintenance", type_maintenance);
    formData.append("machine_id", machine_id);

    const response = await fetch(`${BASE_URL}/maintenances/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: localStorage.getItem("authToken"),
      }
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud al servidor");
    }
    const data = await response.json();
    return data;
  },

  generateSheet: async (id, month, year, type, frecuency) => {
    let route = '';
    switch (type) {
      case 'preventive':
        route = 'generate_preventive_sheet';
        break;
      case 'corrective':
        route = 'generate_corrective_sheet';
        break;
      case 'routine':
        route = 'generate_routine_sheet';
        break;
    }

    try {
      const response = await fetch(`${BASE_URL}/machines/${id}/${route}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ month, year, frecuency }),
      });

      if (!response.ok) {
        throw new Error(`Error al generar el archivo: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace de descarga
      const a = document.createElement('a');
      a.href = url;

      // Obtener el nombre del archivo del encabezado
      const contentDisposition = response.headers.get('Content-Disposition');
      console.log('contentDisposition:', contentDisposition);
      const fileName = contentDisposition?.split('filename=')[1]?.split(';')[0]?.replace(/"/g, '') || `Plantilla.xlsx`;

      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  }, deleteMaintenance: async (maintenance_id) => {
    const response = await fetch(`${BASE_URL}/maintenances/${maintenance_id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el mantenimiento');
    }
  }, newMachine : async (machine) => {
    const response = await fetch(`${BASE_URL}/machines`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ machine }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar la máquina');
    }
  }, editMachine : async (id, machine) => {
    console.log('machine:', machine);
    const response = await fetch(`${BASE_URL}/machines/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ machine }),
    });

    if (!response.ok) {
      throw new Error('Error al editar la máquina');
    }
  }

};

