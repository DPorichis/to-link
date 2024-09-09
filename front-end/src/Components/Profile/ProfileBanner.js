import React from "react";
import { useNavigate } from 'react-router-dom';

import NetworkPGU from "../../Pages/User/NetworkPGU";


const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

function ProfileBanner(props){

    const handleRequestClick = async (userId) => {
        const csrfToken = getCookie('csrftoken');
        try {
            const response = await fetch("http://127.0.0.1:8000/request/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({ 'request_id': userId })
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || "Request sent successfully");
            } else {
                const errorResult = await response.json();
                alert(errorResult.error || "Failed to send request");
            }
        } catch (error) {
            console.error("Error sending request:", error);
            alert("An error occurred while sending the request");
        }
    };
    
    
    const navigate = useNavigate();
    return(
        <>
        { props.InNetwork ? 
        <div className="Box" style={{backgroundColor: "#96b9e459", border:"1px solid #ccc",width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"1px",marginBottom:"1px",borderRadius:"10px"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start"}}>
                <img src={props.link.profile_info.pfp} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',}}>
                    <div className="Name" style={{position:"center", textAlign: "left",justifyContent: "left",marginLeft: "20px",aligncontent:"center"}}>
                        {props.link.profile_info.name} {props.link.profile_info.surname}
                        <br/>
                        <span style={{color:"#777"}}>
                        {props.link.profile_info.title}
                        </span>
                        <br/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
                    <button type="button" class="btn btn-outline-dark" style={{marginRight:"4px"}} onClick={()=>{navigate(`/user/Messages?user_id=${props.link.user_id}`);}}>
                                Message
                    </button>
                    <button type="button" class="btn btn-primary" onClick={()=>{navigate(`/user/viewprofile?user_id=${props.link.user_id}`);}}>
                                View Profile
                    </button>
            </div>
        </div> :
        <div className="Box" style={{backgroundColor: "#96b9e459", border:"1px solid #ccc", width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"1px",marginBottom:"1px",borderRadius:"10px",textAlign: "center"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start",textAlign: "center"}}>
                <img src={props.link.profile_info.pfp} alt="Avatar" style={{width :"64px",height:"64px"}} className="link-image" />
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',}}>
                    <div className="Name" style={{position:"center", textAlign: "left",justifyContent: "left",marginLeft: "20px"}}>
                        {props.link.profile_info.name} {props.link.profile_info.surname}
                        <br/>
                        <span style={{color:"#777"}}>
                        {props.link.profile_info.title }
                        </span>
                        <br/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
            <button type="button" class="btn btn-outline-dark" style={{marginRight:"4px"}}onClick={() => handleRequestClick(props.link.user_id)}>
                                Request Link
                </button>
                <button type="button" class="btn btn-primary" onClick={()=>{navigate(`/user/viewprofile?user_id=${props.link.user_id}`);}}>
                                View Profile
                </button>
            </div>
        </div>
        
         }
        
        </>
    );
}
export default ProfileBanner;