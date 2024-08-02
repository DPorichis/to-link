import React from "react";

function ProfileComments(props){
    return(
    
    <li className = "linkcomms" key={props.name} style={{display:"flex", textAlign:"start",flexDirection: "row",margin:"5px", cursor:"pointer", border: "1px solid transparent", 
                borderRadius: "10px"}}>
                                <img src="/logo192.png" alt="Avatar" style={{width :"5%",flexDirection: "column",height: "5%"}} className="link-image" />
                                <div>
                                    <p style={{margin: "0"}}>
                                        <span className="linkcomms-name" style={{possition:"top",textAlign: "start", fontWeight: "bold",flexDirection: "column",margin: "3px" }}>{props.name}</span>
                                        <span className="linkcomms-title" style={{possition:"top",textAlign: "start"}}>{props.title}</span>
                                    </p>
                                    <span className="linkcomms-Message" style={{textAlign: "end"}}>{props.comments}</span>
                                </div>
                            </li>
    
    );
    }
    export default ProfileComments