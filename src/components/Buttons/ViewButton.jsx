import React from "react";
import { Eye, EyeFill } from "react-bootstrap-icons";

function ViewButton({ onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <EyeFill size={24} />
    </button>
  );
}

export default ViewButton;
