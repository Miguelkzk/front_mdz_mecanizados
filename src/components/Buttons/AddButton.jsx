import React from "react";
import { PlusLg } from "react-bootstrap-icons";




function AddButton({ onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <PlusLg size={24} />
    </button>
  );
}

export default AddButton;