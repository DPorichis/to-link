import React from "react";

import NetworkPGU from "../../Pages/User/NetworkPGU";

function ProfileBanner(props){
    return(
        <>
        { props.InNetwork ? 
        <div className="Box" style={{backgroundColor: "#96b9e459", border:"1px solid #ccc",width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"1px",marginBottom:"1px",borderRadius:"10px"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start"}}>
                <img src={props.link.user_info.pfp} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',}}>
                    <div className="Name" style={{position:"center", textAlign: "left",justifyContent: "left",marginLeft: "20px",aligncontent:"center"}}>
                        {props.link.user_info.name} {props.link.user_info.surname}
                        <br/>
                        <span style={{color:"#777"}}>
                        {props.link.user_info.title}
                        </span>
                        <br/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
                    <button type="button" class="btn btn-outline-dark" style={{marginRight:"4px"}}>
                                Message
                    </button>
                    <button type="button" class="btn btn-primary">
                                View Profile
                    </button>
            </div>
        </div> :
        <div className="Box" style={{backgroundColor: "#96b9e459", border:"1px solid #ccc", width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"1px",marginBottom:"1px",borderRadius:"10px",textAlign: "center"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start",textAlign: "center"}}>
                <img src={props.link.user_info.pfp} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',}}>
                    <div className="Name" style={{position:"center", textAlign: "left",justifyContent: "left",marginLeft: "20px"}}>
                        {props.link.user_info.name}
                        <br/>
                        <span style={{color:"#777"}}>
                        {props.title }
                        </span>
                        <br/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
            <button type="button" class="btn btn-outline-dark" style={{marginRight:"4px"}}>
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
export default ProfileBanner;