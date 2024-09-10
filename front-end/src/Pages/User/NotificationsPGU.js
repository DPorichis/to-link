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
    const [Requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const csrfToken = getCookie('csrftoken');
            try {
                const response = await fetch("http://127.0.0.1:8000/notification/fetch", {
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

        const fetchRequests = async () => {
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
                    setRequests(data);  
                } else {
                    throw new Error('Failed to fetch posts');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };



        fetchRequests();
        fetchNotifications();
    }, []);


    const handleDismiss = async (index) => {

        const csrfToken = getCookie('csrftoken');

        const notif = Notifications[index]

        const response = await fetch("http://127.0.0.1:8000/notification/dismiss", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: "include",
            body: JSON.stringify({
                "notification_id": notif.notification_id
            })
        });

        if (response.ok) {
            const newnotif = Notifications.filter((_, i) => i !== index);
        setNotifications(newnotif);  
        } else {
            throw new Error('Failed to fetch posts');
        }

        
    }


    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <Header log='user' act='notif'/>
            <div style={{display:"flex",flexDirection:"column",textAlign:"left",marginLeft:"15%"}}>
                    <h3 style={{marginTop:"15px"}}>Your Notifications</h3>
                    <h4 style={{marginTop:"20px", marginBottom:"4px"}}>Link Requests</h4>
                    {Requests.length !== 0 ?
                    <div style={{width:"80%", maxHeight:"50vh", overflow:"auto"}}>
                        {Requests.map((Notification) =>
                            <ProfileBannerNotificationsReq name = {Notification.user_info.name} surname={Notification.user_info.surname} title = {Notification.user_info.title} user_id_from={Notification.user_id_from} imgURL = {Notification.user_info.pfp} />
                        )}
                    </div>
                    :
                    <div style={{width:"80%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                        <h5 style={{marginBottom:"3px"}}>No new requests so far</h5>
                        <p style={{marginBottom:"0px"}}>We will let you know when other users request to Link</p>
                    </div>
                    }
                    <h4>Clout Check</h4>
                    {Notifications.length !== 0 ?
                    <div style={{width:"80%", maxHeight:"50vh", overflow:"auto"}}>
                        {Notifications.map((notif, index) =>
                            <ProfileBannerClout clout = {notif.notification_content} dismiss={handleDismiss} item={index}/>
                        )}
                    </div>
                    :
                    <div style={{width:"80%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                        <h5 style={{marginBottom:"3px"}}>No new notifications</h5>
                        <p style={{marginBottom:"0px"}}>Congrats! You know everything that happended lately</p>
                    </div>
                    }      
            </div>
        </div>
    );
}
export default NotificationsPGU;