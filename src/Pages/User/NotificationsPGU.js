import React from "react";
import Header from "../../Components/Header";
import ProfileBannerNotificationsReq from "../../Components/Notifications/ProfileBannerNotificationsReq";
import ProfileBannerClout from "../../Components/Notifications/ProfileBannerClout";


const links = 
[
{
name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
imgURL: "/logo192.png",
InNetwork: false,
},
{
    name: "Theopoula Tzini",
    title:"CEO of Ibizaaaaaaaaaaaaaaaa",
    imgURL: "/logo192.png",
    InNetwork: false,
    },
{
name: "ANitsaaaaaaaaaaaaaa",
title:"CEO of Koup Skoup",
imgURL: "/logo192.png",
InNetwork: false,
},
{
name: "SpongeBobbbbbbbbbbbbbbbbbbb",
title:"CEO of Bikiniiiiiiiiiiiiiiiii",
imgURL: "/logo192.png",
InNetwork: false,
},
];

function NotificationsPGU(props) {
    return (
        <div>
            <Header log='user' act='notif'/>
            <div style={{display:"flex",flexDirection:"column",textAlign:"left",marginLeft:"15%"}}>
                    <h4 style={{marginTop:"15px"}}>Your Notifications</h4>
                    <h5 style={{marginTop:"20px"}}>Link Requests</h5>
                    <div style={{width:"80%"}}>
                        {links.map((link) =>
                            <ProfileBannerNotificationsReq name = {link.name} title = {link.title} imgURL ={link.imgURL}/>
                        )}
                    </div>
                    <h5>Clout Check</h5>
                    <div style={{width:"80%"}}>
                        <ProfileBannerClout imgURL ={links[0].imgURL}/>
                        <ProfileBannerClout imgURL ={links[0].imgURL}/>
                    </div>      
            </div>
        </div>
    );
}
export default NotificationsPGU;