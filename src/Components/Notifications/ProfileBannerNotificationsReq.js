import React from "react";

import NetworkPGU from "../../Pages/User/NetworkPGU";

function ProfileBannerNotificationsReq(props){
    return(
        
        <div className="Box" style={{backgroundColor: "#cecdcd",width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"9px",marginBottom:"9px",borderRadius:"10px",textAlign: "center"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start",textAlign: "center"}}>
                <img src={props.imgURL} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',}}>
                    <div className="Name" style={{position:"center", textAlign: "left",justifyContent: "left",marginLeft: "20px"}}>
                        {props.name}
                        <br/>
                        <span style={{color:"#777"}}>
                        {props.title }
                        </span>
                        <br/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
                <button type="button" style={{padding: "5px 10px", cursor: "pointer", backgroundColor: "#cecdcd", color: "black", borderRadius: "5px",marginRight:"3px"}}>
                            Decline
                </button>
                <button type="button" style={{padding: "5px 10px", cursor: "pointer", backgroundColor: "#999", color: "black", borderRadius: "5px",marginRight:"3px"}}>
                            Accept
                </button>
                <button type="button" style={{padding: "5px 10px", cursor: "pointer", backgroundColor: "#999", color: "black", borderRadius: "5px" }}>
                            View Profile
                </button>
            </div>
    </div>
    );
}
export default ProfileBannerNotificationsReq;