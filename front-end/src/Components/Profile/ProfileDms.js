import React from 'react';
import MessagesPGU from '../../Pages/User/MessagesPGU';


import './ProfileDms.css';

function ProfileDms(props){
return(
    <li className = {props.isSelected ? "linkdms-selected" : "linkdms" } key={props.name} onClick={() => props.changesel(props.link) } >
        <img src={props.link.imgURL} alt="Avatar" style={{width :"54px",flexDirection: "column",height: "54px"}} className="link-image" />
        <div>
            <p style={{margin: "0"}}>
                <span className="linkdms-name" style={{possition:"top",textAlign: "start", fontWeight: "bold",flexDirection: "column",margin: "3px" }}>
                {props.link.user_info.name + " " + props.link.user_info.surname}
                </span>
                <span className="linkdms-title" style={{possition:"top",textAlign: "start",color:"#D3D3D3" }}>
                {props.link.user_info.title}
                </span>
            </p>
            <span className="linkdms-Message" style={{textAlign: "end"}}>{props.link.timestamp}</span>
        </div>
    </li>

);
}
export default ProfileDms