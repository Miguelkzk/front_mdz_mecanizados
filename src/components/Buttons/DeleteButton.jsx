import React from "react";
import { Trash3 } from "react-bootstrap-icons";



function DeleteButton({ onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <Trash3 size={24} color="red" />
    </button>
  );
}

export default DeleteButton;