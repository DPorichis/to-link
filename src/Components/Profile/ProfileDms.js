import React from 'react';


import './ProfileDms.css';



function ProfileDms(props){


return(

<li className = "linkdms" key={props.name} style={{display:"flex", textAlign:"start",flexDirection: "row",margin:"5px", cursor:"pointer"}}>
                            <img src="/logo192.png" alt="Avatar" style={{width :"15%",flexDirection: "column",height: "20%"}} className="link-image" />
                            <div>
                                <p style={{margin: "0"}}>
                                    <span className="linkdms-name" style={{possition:"top",textAlign: "start", fontWeight: "bold",flexDirection: "column",margin: "3px" }}>{props.name}</span>
                                    <span className="linkdms-title" style={{possition:"top",textAlign: "start"}}>{props.title}</span>
                                </p>
                                <span className="linkdms-Message" style={{textAlign: "end"}}>{props.Message}</span>
                            </div>
                        </li>

);
}
export default ProfileDms