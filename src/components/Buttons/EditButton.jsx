import React from "react";
import { Pencil } from "react-bootstrap-icons";


function EditButton({ onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <Pencil size={24} />
    </button>
  );
}

export default EditButton;
