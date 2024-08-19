import { Gear } from "react-bootstrap-icons";
import React from "react";


function GearButton({onClick}){
    return(
        <button className="btn" onClick={onClick}>
            <Gear size={24}/>
        </button>
    )
}export default GearButton;