import React from "react";
import Header from "../../Components/Header";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ProfileBanner from "../../Components/Profile/ProfileBanner";


 
function NetworkPGU(props) {
    
    const links = 
    [
    {
    name: "Theopoula Tzini",
    title:"CEO of Ibiza",
    imgURL: "/logo192.png",
    InNetwork: true,
    },
    {
    name: "Nitsa",
    title:"CEO of Koup Skoup",
    imgURL: "/logo192.png",
    InNetwork: false,
    },
    {
    name: "SpongeBob",
    title:"CEO of Bikini",
    imgURL: "/logo192.png",
    InNetwork: true,
    },
    
    
    ];
    return (
        <div >
            <Header log="user" act="network"/>
            <div style={{display:"flex",marginTop:"9px",marginBottom:"9px",gap: "10px",flexDirection:"row", flexWrap:"wrap"}}>
                {links.map((link) => (
                    <ProfileCard name={link.name} title={link.title} InNetwork={link.InNetwork} />
                ))}
            </div>
            <div style={{display:"flex",marginTop:"9px",marginBottom:"9px",gap: "10px",flexDirection:"column"}}>
                {links.map((link) => (
                    <ProfileBanner name={link.name} title={link.title} InNetwork={link.InNetwork} />
                ))}
            </div>
            
            
        </div>
    );
}
export default NetworkPGU;    