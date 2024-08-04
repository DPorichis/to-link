import React from "react";

import Header from "../../Components/Header";
import './homePGU.css';

import ProfileSmall from "../../Components/Profile/ProfileSmall";
import Postbox from "../../Components/Feed/Postbox";

function HomePGU(props) {
    const links = 
    [
    {
    name: "Lakis Lalakis",
    title:"CEO of DIT",
    imgURL: "/logo192.png",
    },
    {
    name: "Ioannic",
    title: "CEO of TSILI" ,
    imgURL: "/logo192.png",
    },
    {
    name: "Lionel Messi",
    title: "CEO of Real Madrid",
    imgURL: "/logo192.png",
    },
    {
    name: "Makis Kotsampasis",
    title: "CEO of SYNERGEIO O MAKIS",
    imgURL: "/logo192.png",
    },
    {
    name: "Theopoula Tzini",
    title: "CEO of IBIZA",
    imgURL: "/logo192.png",
    },
    ];
    
    return (
        <div>
            <Header log="user" act="home"/>
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-around"}}>
            <div className="sidebar">
                Profile view
                <div className="Profile">
                    <div className="Text" style={{width:"60%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis, lacus at rutrum dapibus, tortor massa posuere lorem, a pellentesque quam urna vitae dolor. Integer eleifend feugiat augue, consequat mattis nibh dictum vitae.
                    
                    </div>
                    <div className="Image">
                        <img src="/logo192.png" alt="Avatar" style={{width :"45%"}} className="link-image" />
                        <span style={{display: "block", textAlign: "center"}}>
                            777 links
                        </span>
                    </div>
                </div>
                MY Links
                <div className = "Links">
                        {links.map((link) =>
                        <ProfileSmall name = {link.name} title = {link.title} imgURL ={link.imgURL}/>
                    )}
                </div>
            </div>
            <div style={{width: "60%"}}>
                    <Postbox photolist ={[ "/testing-post1.png", "/testing-post.png"]}/>
                    <Postbox photolist ={[ "/testing-post1.png"]}/>
                    <Postbox />
            </div>
        </div>
        </div>
    );
}
export default HomePGU;    