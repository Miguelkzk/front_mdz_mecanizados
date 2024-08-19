
import React from "react";
import { GraphUp } from "react-bootstrap-icons";


function GraphButton ({onClick}){
    return(
        <button className="btn" onClick={onClick}>
            <GraphUp size={24}/>
        </button>
    )
}export default GraphButton;