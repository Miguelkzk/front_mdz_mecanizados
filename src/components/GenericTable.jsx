import React from 'react';
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { useTranslation } from "react-i18next";
import '../styles/GenericTable.css'

function GenericTable({ fields, elements, viewButton, textViewButton, viewElement, editButton, deleteButton, editElement, deleteElement }) {
  const { t } = useTranslation();

  const stateColors = {
    without_material: "#f5c6cb",
    with_material_but_not_started: "#fff3cd",
    in_progress: "#d4edda",
    not_invoiced: "#cce5ff",
    delivered_and_invoiced: "#e2e3e5",
    incomplete: "#ffd9c2"
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
  };

  return (
    <div className="table-responsive">
      <table style={tableStyles} className="generic-table">
        <thead>
          <tr>
            {fields.map((attribute, index) => (
              <th key={index}>{t(attribute)}</th>
            ))}
            {viewButton && <th>{textViewButton}</th>}
            {editButton && <th></th>}
            {deleteButton && <th></th>}
          </tr>
        </thead>
        <tbody>
          {elements.map((element) => (
            <tr key={element.id} style={{ backgroundColor: stateColors[element.state] || 'transparent' }}>
              {fields.map((attribute, attrIndex) => (
                <td key={attrIndex}>
                  {t(element[attribute])}
                </td>
              ))}
              {viewButton && <td><ViewButton onClick={() => viewElement(element)} /></td>}
              {editButton && <td><EditButton onClick={() => editElement(element)} /></td>}
              {deleteButton && <td><DeleteButton onClick={() => deleteElement(element)} /></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;
