import React from "react";
import { useState } from "react";
import NetworkPGU from "../../Pages/User/NetworkPGU";

function ProfileBannerClout(props){
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }
    return(
        
        <div className="Box" style={{backgroundColor: "#cecdcd",width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"9px",marginBottom:"9px",borderRadius:"10px",textAlign: "center"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start",textAlign: "center"}}>
                <img src={props.imgURL} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'center',alignItems:"center",marginLeft:"15px"}}>
                    TEXT
                </div>
            </div>
            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
                <button type="button" onClick={handleDismiss} style={{padding: "5px 10px", cursor: "pointer", backgroundColor: "#cecdcd", color: "black", borderRadius: "5px",marginRight:"3px"}}>
                            Dismiss
                </button>
            </div>
    </div>
    );
}
export default ProfileBannerClout;