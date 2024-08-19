import React from "react";
import { Trash } from "react-bootstrap-icons";

function DeleteButton2({ onClick }) {
  return (
    <button 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        maxHeight: '30px', 
        border: 'none', 
        background: 'none', 
        padding: 0,
        cursor: 'pointer'
      }} 
      className="btn" 
      onClick={onClick}
    >
      <Trash size={20} />
    </button>
  );
}

export default DeleteButton2;
