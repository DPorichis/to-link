import React from 'react';
import MessagesPGU from '../../Pages/User/MessagesPGU';


import './ProfileDms.css';



function ProfileDms(props){
    const lastMessage = props.messages.length > 0 ? props.messages[props.messages.length - 1].message : '';

return(

<li className = "linkdms" key={props.name} style={{display:"flex", textAlign:"start",flexDirection: "row",margin:"5px", cursor:"pointer", border: "1px solid transparent", 
            borderRadius: "10px"}} onClick={() => props.changesel(props.id) } >
                            <img src={props.imgURL} alt="Avatar" style={{width :"54px",flexDirection: "column",height: "54px"}} className="link-image" />
                            <div>
                                <p style={{margin: "0"}}>
                                    <span className="linkdms-name" style={{possition:"top",textAlign: "start", fontWeight: "bold",flexDirection: "column",margin: "3px" }}>{props.name}</span>
                                    <span className="linkdms-title" style={{possition:"top",textAlign: "start"}}>{props.title}</span>
                                </p>
                                <span className="linkdms-Message" style={{textAlign: "end"}}>{lastMessage}</span>
                            </div>
                        </li>

);
}
export default ProfileDms