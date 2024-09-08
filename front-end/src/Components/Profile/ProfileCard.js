import React from "react";

import NetworkPGU from "../../Pages/User/NetworkPGU";

function ProfileCard(props){
    return(
    <>
        { props.InNetwork ? 
        <div className="Box" style={{backgroundColor: "#96b9e459", border:"1px solid #ccc", borderRadius:"10px", width:"23%", minHeight:"100%",flexDirection:"column",padding:"5px 10px", display:"flex", justifyContent:"flex-start",flexWrap: "wrap",marginTop:"9px",marginBottom:"9px",justifyContent:"space-between",maxWidth:"23%",maxHeight:"100%",overflow:"hidden"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start"}}>
                <img src={props.link.user_info.pfp} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div className="Name" style={{position:"top", textAlign: "left",justifyContent: "center",marginLeft: "20px", width:"75%",wordBreak:"break-all"}}>
                    {props.link.user_info.name} {props.link.user_info.surname}
                    <br/>
                    <span style={{color:"#777"}}>
                    {props.link.user_info.title }
                    </span>
                    <br/>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
            <button type="button" class="btn btn-outline-dark" style={{marginBottom:"3px", marginTop:"4px"}}>
                        Message
            </button>
            <button type="button" class="btn btn-primary">
                        View Profile
            </button>
            </div>
        </div> 
        :
        <div className="Box" style={{backgroundColor: "#96b9e459", border:"1px solid #ccc", borderRadius:"10px", width:"23%", minHeight:"100%",flexDirection:"column",padding:"5px 10px", display:"flex", justifyContent:"flex-start",flexWrap: "wrap",marginTop:"9px",marginBottom:"9px",justifyContent:"space-between",maxWidth:"23%",maxHeight:"100%",overflow:"hidden"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start"}}>
                <img src={props.imgURL} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div className="Name" style={{position:"top", textAlign: "left",justifyContent: "center",marginLeft: "20px",width:"75%", wordBreak:"break-all"}}>
                    {props.name}
                    <br/>
                    <span style={{color:"#777"}}>
                    {props.title }
                    </span>
                    <br/>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
            <button type="button" class="btn btn-outline-dark" style={{marginBottom:"3px", marginTop:"4px"}}>
                            Request Link
            </button>
            <button type="button" class="btn btn-primary">
                        View Profile
            </button>
            </div>
        </div>
        
         }
        
        </>
        );
}
export default ProfileCard;