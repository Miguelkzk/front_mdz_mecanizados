// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones de ejemplo
const resources = {
  es: {
    translation: {
      "Articles": "Artículos",
      "Providers": 'Proveedores',
      'id': 'ID',
      "code": "Código",
      "name": "Nombre",
      "view all": "ver todo",
      "New article": "Nuevo artículo",
      'stock': 'Stock',
      'default_provider_id': 'ID proveedor',
      'default_provider_name': 'Proveedor',
      'estimated_demand': "Demanda estimada",
      'demand_period_kind': 'Tipo de periodo de la demanda',
      'demand_period_count': 'Cantidad de periodos de la demanda',
      'week': 'Semanal',
      'month': 'Mensual',
      'year': 'Anual',
      'inventory_model':'Modelo de inventario',
      'requested point': 'punto de reposición',
      'security stock': 'stock de seguridad',
      'article': 'artículo',
      'edit':'editar',
      'back':'volver',
      'delete article':'borrar artículo',
      'edit article': 'editar artículo ',
      'purchase_cost': 'costo de compra',
      'storage_cost': 'costo de almacenamiento',
      'order_cost':'costo de orden',
      'fixed_lot': 'Lote fijo',
      'fixed_interval': 'Intervalo fijo',
      'acceptable_error': 'error aceptable',
      'probability': 'probabilidad',
      'quadratic': 'cuadrático',
      'absolute_percentage':'porcentaje absoluto',
      'absolute_deviation':'desviación abosoluta',
      'revision_interval':'Intervalo de revisión',
      'demand_error_calculation_method': 'método para calcular error',
      'pending': 'pendiente',
      'sent':'enviada',
      'finished':'finalizada',
      'quantity':'cantidad',
      'replenish?':'a reponer?',
      'missing?':'faltante?',
      'true':'si',
      'false':'no',
      'sold_at': 'fecha cuando se vendió'
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
