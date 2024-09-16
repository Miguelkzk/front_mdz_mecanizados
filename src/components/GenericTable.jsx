import React from 'react';
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { useTranslation } from "react-i18next";

function GenericTable({ fields, elements, viewButton, textViewButton, viewElement, editButton, deleteButton, editElement, deleteElement }) {
  const { t } = useTranslation();

  const stateColors = {
    without_material: "#f5c6cb", // Rojo claro
    with_material_but_not_started: "#fff3cd", // Amarillo claro
    in_progress: "#d4edda", // Verde claro
    not_invoiced: "#cce5ff", // Azul claro
    delivered_and_invoiced: "#e2e3e5", // Gris claro
    incomplete: "#ffd9c2" // Otro tono de rojo claro f3c414
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
    margin: '15px 0',
    overflowX: 'auto'
  };

  const thStyles = {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    border: '1px solid #aab6bd'
  };

  const tdStyles = {
    padding: '10px',
    border: '1px solid #aab6bd'
  };

  const trStyles = {
    borderBottom: '1px solid #dee2e6'
  };

  return (
      <table style={tableStyles}>
        <thead>
          <tr>
            {fields.map((attribute, index) => (
              <th key={index} style={thStyles}>{t(attribute)}</th>
            ))}
            {viewButton && <th style={thStyles}>{textViewButton}</th>}
            {editButton && <th style={thStyles}></th>}
            {deleteButton && <th style={thStyles}></th>}
          </tr>
        </thead>
        <tbody>
          {elements.map((element) => (
            <tr
              key={element.id}
              style={{ ...trStyles, backgroundColor: stateColors[element.state] || 'transparent' }}
            >
              {fields.map((attribute, attrIndex) => (
                <td key={attrIndex} style={tdStyles}>
                  {t(element[attribute])}
                </td>
              ))}
              {viewButton && <td style={tdStyles}><ViewButton onClick={() => viewElement(element)} /></td>}
              {editButton && <td style={tdStyles}><EditButton onClick={() => editElement(element)} /></td>}
              {deleteButton && <td style={tdStyles}><DeleteButton onClick={() => deleteElement(element)} /></td>}
            </tr>
          ))}
        </tbody>
      </table>
  );
}

export default GenericTable;
