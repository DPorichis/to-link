import React, {useState} from "react";
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

    const [relationship, setRelationship] = useState(props.link.relationship)
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
                if(relationship === "Pending Request Sent")
                {
                    setRelationship("No Connection")
                } else
                {
                    setRelationship("Pending Request Sent")
                }
            } else {
                const errorResult = await response.json();
                alert(errorResult.error || "Failed to send request");
            }
        } catch (error) {
            console.error("Error sending request:", error);
            alert("An error occurred while sending the request");
        }
    };

    const handleResponseClick = async (answer) => {
        const csrfToken = getCookie('csrftoken');
        try {
            const response = await fetch("http://127.0.0.1:8000/request/respond", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({ 'request_id': props.link.user_id,
                    "request_response": answer
                 })
            });

            if (response.ok) {
                if(answer === "accept")
                {
                    setRelationship("Friends")
                }
                else{
                    setRelationship("No Connection")
                }
            } else {
                const errorResult = await response.json();
                alert(errorResult.error || "Failed to respond to request");
                setRelationship("No Connection")
            }
        } catch (error) {
            console.error("Error sending request:", error);
            alert("An error occurred while sending the request");
        }
    };

    const navigate = useNavigate();
    return(
        <>
        { relationship === "Friends" ? 
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
    </div> 
        :
        (relationship === "Pending Request Sent"?
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
                <button type="button" class="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={() => handleRequestClick(props.link.user_id)}>
                    Undo Link Request
                </button>
                <button type="button" class="btn btn-primary"onClick={()=>{navigate(`/user/viewprofile?user_id=${props.link.user_id}`);}}>
                    View Profile
                </button>
            </div>
        </div>
        :
        (relationship === "Pending Request Received"?
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
                    <button type="button" class="btn btn-danger" style={{marginRight:"5px"}}onClick={() => handleResponseClick("reject")}>
                        Reject Request
                    </button>
                    <button type="button" class="btn btn-success" style={{marginRight:"5px"}}onClick={() => handleResponseClick("accept")}>
                        Accept Request
                    </button>
                    <button type="button" class="btn btn-primary" onClick={()=>{navigate(`/user/viewprofile?user_id=${props.link.user_id}`);}}>
                        View Profile
                    </button>
            </div>
        </div>
        :
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
                <button type="button" class="btn btn-outline-dark" style={{marginRight:"5px"}} onClick={() => handleRequestClick(props.link.user_id)}>
                    Request Link
                </button>
                <button type="button" class="btn btn-primary"onClick={()=>{navigate(`/user/viewprofile?user_id=${props.link.user_id}`);}}>
                    View Profile
                </button>
            </div>
        </div>
        ))}
        
        </>
    );
}
export default ProfileBanner;