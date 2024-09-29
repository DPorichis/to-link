// ProfileDms.js
// This component displays the name, and the title in the messages interface
// ==============================================================================

import React, { useState } from 'react';
import MessagesPGU from '../../Pages/User/MessagesPGU';


import './ProfileDms.css';

function ProfileDms(props){

    const date = new Date(props.link.timestamp);

    
    const currentDate = new Date();

    // Calculate the difference in time (in milliseconds)
    const timeDifference = currentDate - date;

    // Convert the difference to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);


    var formattedDate;

    if(daysDifference > 7)
    {
        formattedDate = date.toLocaleString('en-US', {
            weekday: 'long',  // 'short' or 'narrow' for shorter versions
            year: 'numeric',
            month: 'narrow',    // 'short' or 'narrow' for shorter versions
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false     // Use 24-hour format (set to true for 12-hour format)
        });
    }
    else if (daysDifference < 1)
    {
        formattedDate = date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false     // Use 24-hour format (set to true for 12-hour format)
        });
    }
    else{
        formattedDate = date.toLocaleString('en-US', {
            weekday: 'long',  // 'short' or 'narrow' for shorter versions
            hour: '2-digit',
            minute: '2-digit',
            hour12: false     // Use 24-hour format (set to true for 12-hour format)
        });

    }

    //Notification state
    const [notif, setNotif] = useState(props.link.notification)


    return(
    <li className = {props.isSelected ? "linkdms-selected" : "linkdms" } key={props.name} onClick={() => {props.changesel(props.link);  setNotif(false);}} >
        <img src={props.link.user_info.pfp} alt="Avatar" style={{width :"54px",flexDirection: "column",height: "54px", borderRadius:"25%", marginRight:"2px"}} className="link-image" />
        <div>
            <p style={{marginBottom: "0px", marginTop:"3px", marginLeft:"3px"}}>
                    <b>{props.link.user_info.name + " " + props.link.user_info.surname}</b>
            </p>
            <span className="linkdms-Message" style={{textAlign: "start", marginLeft:"3px"}}>{(daysDifference < 1 ? "Today, " + formattedDate : formattedDate)}</span>
        </div>
        {notif ? <div style={{position:"absolute", height:"15px", width:"15px", borderRadius:"100%", backgroundColor:"red"}}></div>: <></>}
    </li>

);
}
export default ProfileDms