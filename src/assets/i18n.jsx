import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
      'Invalid username or password':'usuario o contraseña inválidas',
      'month': 'Mes',
      'year': 'Año',
      'amount_usd': 'Monto en USD',
      'amount_ars': 'Monto en ARS',
      'total_month': 'Total del mes',
      'exchange_rate': 'Tasa de cambio USD/ARS',
      'corrective': 'Correctivo',
      'preventive': 'Preventivo',
      'biannual': 'Semestral',
      'brand': 'Marca',
      'model': 'Modelo',
      'horsepower': 'HP',
      'routine_detail': 'Detalle rutinario',
      'preventive_detail_biannual': 'Detalle preventivo semestral',
      'preventive_detail_annual': 'Detalle preventivo anual',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
