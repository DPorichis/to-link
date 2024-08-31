import React from "react";
import { useState } from "react";

import NetworkPGU from "../../Pages/User/NetworkPGU";



function ProfileBannerNotificationsReq(props){
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }
    
    return(
        
        <div className="Box" style={{border:"1px solid #ccc", backgroundColor: "#96b9e459", width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"9px",marginBottom:"9px",borderRadius:"10px",textAlign: "center"}}>
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
            <button type="button" class="btn btn-outline-danger" style={{marginLeft:"4px"}}>
                            Decline
                </button>
                <button type="button" class="btn btn-success" style={{marginLeft:"4px"}}>
                            Accept
                </button>
                <button type="button" class="btn btn-primary" style={{marginLeft:"4px"}}>
                            View Profile
                </button>
            </div>
    </div>
    );
}
export default ProfileBannerNotificationsReq;