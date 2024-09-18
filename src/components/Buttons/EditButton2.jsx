import React from "react";
import { Pencil, PencilFill } from "react-bootstrap-icons";


function EditButton2({ onClick }) {
  return (
    <button type="button" className="btn btn-outline-secondary" onClick={onClick}>
      Editar orden
      <PencilFill size={20} />
    </button>
  );
}

export default EditButton2;
