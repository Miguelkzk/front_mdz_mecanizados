import React from "react";
import { Pencil, PencilFill } from "react-bootstrap-icons";


function EditButton2({ onClick }) {
  return (
    <button type="button" class="btn btn-outline-secondary" onClick={onClick}>
      <PencilFill size={20} />
    </button>
  );
}

export default EditButton2;
