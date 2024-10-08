// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones de ejemplo
const resources = {
  es: {
    translation: {
      'id': 'ID',
      "code": "Código",
      "name": "Nombre",
      'purchase_order': 'Orden de compra',
      'client': 'Cliente',
      'state': 'Estado',

      'without_material': 'Sin material',
      'with_material_but_not_started': 'Con material, pero no inciado',
      'in_progress': 'En progreso',
      'not_invoiced': 'No facturado',
      'delivered_and_invoiced': 'Entregado y facturado',
      'incomplete': 'Incompleto',
      'description': 'Descripción',
      'quantity': 'Cantidad',
      'supplier_note': 'Remito proveedor',
      'supplier_name': 'Proveedor',
      'ingresed_at': 'Fecha de ingreso',
      'Invalid username or password':'usuario o contraseña inválidas'
    }
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasar i18n a react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma de respaldo
    interpolation: {
      escapeValue: false // React ya se encarga de la protección contra XSS
    }
  });

export default i18n;
