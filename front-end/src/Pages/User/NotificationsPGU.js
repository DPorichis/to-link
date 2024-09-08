import React from "react";
import Header from "../../Components/Header";
import ProfileBannerNotificationsReq from "../../Components/Notifications/ProfileBannerNotificationsReq";
import ProfileBannerClout from "../../Components/Notifications/ProfileBannerClout";
import { useState, useEffect } from "react";


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

function NotificationsPGU(props) {
    const [Notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const csrfToken = getCookie('csrftoken');
            try {
                const response = await fetch("http://127.0.0.1:8000/request/list", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: "include",
                    body: JSON.stringify({})
                });

                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);  
                } else {
                    throw new Error('Failed to fetch posts');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);
    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <Header log='user' act='notif'/>
            <div style={{display:"flex",flexDirection:"column",textAlign:"left",marginLeft:"15%"}}>
                    <h4 style={{marginTop:"15px"}}>Your Notifications</h4>
                    <h5 style={{marginTop:"20px"}}>Link Requests</h5>
                    <div style={{width:"80%", maxHeight:"50vh", overflow:"auto"}}>
                        {Notifications.map((Notification) =>
                            <ProfileBannerNotificationsReq name = {Notification.user_info.name} surname={Notification.user_info.surname} title = {Notification.user_info.title} user_id_from={Notification.user_id_from} imgURL = {Notification.user_info.pfp} />
                        )}
                    </div>
                    <h5>Clout Check</h5>
                    <div style={{width:"80%", maxHeight:"20vh", overflow:"auto"}}>
                        
                    </div>      
            </div>
        </div>
    );
}
export default NotificationsPGU;