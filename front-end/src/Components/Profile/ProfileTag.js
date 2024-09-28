// ProfileTag.js
//This component displays the name and the relation between the users
// ==============================================================================

import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ProfileTag(props) {
    return (
        <div style={{display: "flex", flexDirection:"row"}}>
            <img src={props.pfp} width="52" height="52" style={{marginRight: "7px", borderRadius:"25%"}} alt="" />
            <div style={{display: "flex", flexDirection:"column", textAlign: "left", justifyContent: "flex-start"}}>
                <p style={{fontSize: "20px", color: "#111", margin: "0px 0px", padding: "0", marginBlockEnd: "0", marginBlockStart: "0"}}>{props.name}</p>
                <p style={{fontSize: "15px", color: "#777", margin: "-4px 0px"}}>{props.relation}</p>
            </div>
        </div>
    );
}
export default ProfileTag; 
