import React from "react";

import NetworkPGU from "../../Pages/User/NetworkPGU";

function ProfileCard(props){
    return(
    <>
        { props.InNetwork ? 
        <div className="Box" style={{backgroundColor: "#cecdcd",width:"20%",height:"40%",flexDirection:"column",padding:"5px 10px", display:"flex", justifyContent:"flex-start",flexWrap: "wrap",marginTop:"9px",marginBottom:"9px"}}>
        <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start"}}>
        <img src="/logo192.png" alt="Avatar" style={{width :"25%",height:"25%"}} className="link-image" />
        <div className="Name" style={{position:"top", textAlign: "center",justifyContent: "center",marginLeft: "20px"}}>
            {props.name}
            <br/>
            <span style={{color:"#777"}}>
            {props.title }
            </span>
            <br/>
        </div>
        </div>
        <button type="button" style={{ marginTop: "10px",marginBottom:"0px" ,padding: "5px 10px", cursor: "pointer", backgroundColor: "#cecdcd", color: "black", borderRadius: "5px"}}>
                        Message
            </button>
            <button type="button" style={{ marginTop: "5px", padding: "5px 10px", cursor: "pointer", backgroundColor: "#999", color: "black", borderRadius: "5px" }}>
                        View Profile
            </button>
        </div> :
        <div className="Box" style={{backgroundColor: "#cecdcd",width:"20%",height:"40%",flexDirection:"column",padding:"5px 10px", display:"flex", justifyContent:"flex-start", marginTop:"9px",flexWrap: "wrap",marginBottom:"9px"}}>
        <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start"}}>
        <img src="/logo192.png" alt="Avatar" style={{width :"25%",height:"25%"}} className="link-image" />
        <div className="Name" style={{position:"top", textAlign: "center",justifyContent: "center",marginLeft: "20px"}}>
            {props.name}
            <br/>
            <span style={{color:"#777"}}>
            {props.title }
            </span>
            <br/>
        </div>
        </div>
        <button type="button" style={{ marginTop: "10px",marginBottom:"0px" ,padding: "5px 10px", cursor: "pointer", backgroundColor: "#cecdcd", color: "black", borderRadius: "5px"}}>
                        Request Link
            </button>
            <button type="button" style={{ marginTop: "5px", padding: "5px 10px", cursor: "pointer", backgroundColor: "#999", color: "black", borderRadius: "5px" }}>
                        View Profile
            </button>
        </div>
        
         }
        
        </>
        );
}
export default ProfileCard;