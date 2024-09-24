import React from "react";
import { PencilFill } from "react-bootstrap-icons";

function EditButton2({ onClick }) {
  return (
    <button type="button" className="btn btn-outline-secondary" onClick={onClick}>
      Editar orden
      <PencilFill size={20} style={{ marginLeft: '8px' }} />
    </button>
  );
}

export default EditButton2;
