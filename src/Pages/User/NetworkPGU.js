import React from "react";
import Header from "../../Components/Header";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ProfileBanner from "../../Components/Profile/ProfileBanner";
import { useState } from "react";

const links = 
[
{
name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
imgURL: "/logo192.png",
InNetwork: true,
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
InNetwork: true,
},
{
name: "SpongeBobbbbbbbbbbbbbbbbbbb",
title:"CEO of Bikiniiiiiiiiiiiiiiiii",
imgURL: "/logo192.png",
InNetwork: true,
},
{
    name: "SpongeBob",
    title:"CEO of Bikini",
    imgURL: "/logo192.png",
    InNetwork: false,
    },
    {
        name: "SpongeBob",
        title:"CEO of Bikini",
        imgURL: "/logo192.png",
        InNetwork: true,
        },
        {
            name: "SpongeBob",
            title:"CEO of Bikini",
            imgURL: "/logo192.png",
            InNetwork: true,
            },
            {
                name: "SpongeBob",
                title:"CEO of Bikini",
                imgURL: "/logo192.png",
                InNetwork: true,
                },
                {
                    name: "SpongeBob",
                    title:"CEO of Bikini",
                    imgURL: "/logo192.png",
                    InNetwork: true,
                    },
                    {
                        name: "SpongeBob",
                        title:"CEO of Bikini",
                        imgURL: "/logo192.png",
                        InNetwork: true,
                        },
                        {
                            name: "SpongeBob",
                            title:"CEO of Bikini",
                            imgURL: "/logo192.png",
                            InNetwork: true,
                            },
                            {
                                name: "SpongeBob",
                                title:"CEO of Bikini",
                                imgURL: "/logo192.png",
                                InNetwork: true,
                                },
                                {
                                    name: "SpongeBob",
                                    title:"CEO of Bikini",
                                    imgURL: "/logo192.png",
                                    InNetwork: true,
                                    },


]; 


function NetworkPGU(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const sortedInNetworkCards = [...links.filter(link => link.InNetwork)].sort((a, b) => a.name.localeCompare(b.name));
    const sortedOutOfNetworkCards = [...links.filter(link => !link.InNetwork)].sort((a, b) => a.name.localeCompare(b.name));

    const cardsPerRow = 4;
    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInNetworkCards = sortedInNetworkCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredOutOfNetworkCards = sortedOutOfNetworkCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div >
            <Header log="user" act="network"/>
            <div style={{display:"flex",flexDirection:"column",width:"70%",marginLeft:"200px"}}>
            <div className="Searchbar" style={{display:"flex",flexDirection:"row",width:"100%",height:"40px",borderRadius:"18px",backgroundColor: "#cecdcd",marginTop:"50px"}}>
                <div style={{borderRadius:"18px",height:"100%",width:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <button style={{width:"10%",backgroundColor: "transparent",height:"90%",border:"none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <span style={{fontSize: "14px", color: "#888"}}>Search all users V</span>
                    </button>
                    <input style={{width:"80%",backgroundColor: "transparent",height:"100%",border:"none", borderLeft:"solid"}} placeholder="Search" type="text" value={searchTerm}
                            onChange={handleSearchChange}/> 
                    <button style={{width:"10%",backgroundColor: "transparent",border:"none"}}>
                        <img src="/search.svg" style={{}} />
                    </button>
                 </div>
            </div>
            <div style={{textAlign:"left", marginTop:"10px"}}>
            <h5> Your Network </h5>
            <div style={{ maxHeight: "450px", overflowY: "auto", marginBottom: "10px"}}>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                            {filteredInNetworkCards.map((link, index) =>(
                                <ProfileCard key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                            ))}
                </div>
            </div>
            <h5> People you may know</h5>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px",overflowY: "scroll" }}>
                        {filteredOutOfNetworkCards.slice(0, cardsPerRow).map((link, index) => (
                            <ProfileCard key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                        ))}
            </div>
            </div>
            </div>
        </div>
    );
}
export default NetworkPGU;    