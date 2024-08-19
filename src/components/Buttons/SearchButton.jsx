import React from "react";
import { Search } from "react-bootstrap-icons";

function SearchButton ({ onClick }) {
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
      <Search size={20} />
    </button>
  );
}

export default SearchButton;
