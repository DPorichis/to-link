import React from "react";

function ProfileComments(props){
    return(
    
    <li className = "linkcomms" key={props.name} style={{display:"flex", textAlign:"start",flexDirection: "row",margin:"5px", cursor:"pointer", border: "1px solid transparent", 
                borderRadius: "10px"}}>
                                <img src={props.pfp} alt="Avatar" style={{width :"48px", height :"48px",flexDirection: "column", borderRadius:"25%"}} className="link-image" />
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
                                    <p style={{margin: "0px 0px"}}>
                                        <span className="linkcomms-name" style={{possition:"top",textAlign: "start", fontWeight: "bold",flexDirection: "column", marginLeft: "3px", marginBottom: "1px" }}>{props.name}  </span>
                                        <span className="linkcomms-title" style={{possition:"top",textAlign: "start", marginBottom: "1px" }}>{props.title}</span>
                                    </p>
                                    <span style={{marginLeft:"3px", marginTop:"0px", padding:"0px 0px"}}>{props.comments}</span>
                                </div>
                            </li>
    
    );
    }
    export default ProfileComments