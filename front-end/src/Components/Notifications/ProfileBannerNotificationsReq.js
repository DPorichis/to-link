// ProfileBannerNotificationsReq.js
//This component displays a Banner Notification for friend requests allowing the user to accept or dismiss
// ==============================================================================

import React from "react";
import { useState } from "react";

import NetworkPGU from "../../Pages/User/NetworkPGU";

function ProfileBannerNotificationsReq(props){
    //Render Control
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    //Response the Link Requests
    const handleResponse = async (responseType) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('access_token');
        const data = {
            "request_id": props.user_id_from, 
            "request_response": responseType
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/request/respond', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message); // Handle success
                setIsVisible(false); // Dismiss the notification on success
            } else {
                const result = await response.json();
                setError(result.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to send the request.');
        }

        setLoading(false);
    };

    // Handle dismiss
    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }
    return(
        
        <div className="Box" style={{border:"1px solid #ccc", backgroundColor: "#96b9e459", width:"100%",flexDirection:"row",padding:"5px 10px", display:"flex", justifyContent:"space-between", marginTop:"9px",marginBottom:"9px",borderRadius:"10px",textAlign: "center"}}>
            <div style={{flexDirection:"row",display:"flex",justifyContent:"flex-start",textAlign: "center"}}>
                <img src={props.imgURL} alt="Avatar" style={{width :"64px",height:"64px", borderRadius:"25%"}} className="link-image" />
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',}}>
                    <div className="Name" style={{position:"center", textAlign: "left",justifyContent: "left",marginLeft: "20px"}}>
                        {props.name} {props.surname}
                        <br/>
                        <span style={{color:"#777"}}>
                        {props.title }
                        </span>
                        <br/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
            {/* accept and dismiss the request  */}
            <button
                    type="button"
                    className="btn btn-outline-danger"
                    style={{ marginLeft: "4px" }}
                    onClick={() => handleResponse('decline')}
                    disabled={loading}
                >
                    {loading ? 'Declining...' : 'Decline'}
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    style={{ marginLeft: "4px" }}
                    onClick={() => handleResponse('accept')}
                    disabled={loading}
                >
                    {loading ? 'Accepting...' : 'Accept'}
                </button>
                <a class="btn btn-primary" style={{marginLeft:"4px"}} href={`/user/viewprofile?${props.user_id_from}`}>View Profile</a>
            </div>
    </div>
    );
}
export default ProfileBannerNotificationsReq;