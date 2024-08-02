import React from "react";

import Header from "../../Components/Header";
import './homePGU.css';

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
    title: "Football player",
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
            I am a Page :D
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
                        
                        <li className = "link" key={link.name}>
                            <img src="/logo192.png" alt="Avatar" style={{width :"15%"}} className="link-image" />
                            <span className="link-name">{link.name}</span>
                            <span className="link-title">{link.title}</span>
                        </li>
                    )}
                </div>
            </div>
        </div>
    );
}
export default HomePGU;    