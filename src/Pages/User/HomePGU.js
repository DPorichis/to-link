import React from "react";

import Header from "../../Components/Header";
import './homePGU.css';

function HomePGU(props) {
    const links = 
    [
    {
    name: "Lakis Lalakis",
    title:"CEO of DIT",
    },
    {
    name: "Ioannic",
    title: "CEO of TSILI" ,
    },
    {
    name: "Lionel Messi",
    title: "Football player",
    },
    {
    name: "Makis Kotsampasis",
    title: "CEO of SYNERGEIO O MAKIS",
    },
    {
    name: "Theopoula Tzini",
    title: "CEO of IBIZA",
    },
    ];
    
    return (
        <div>
            <Header log="user" act="home"/>
            I am a Page :D
            <div className="sidebar">
            Profile view
                <div className="Profile">
                    NAME
                    MPLA MPLA
                </div>
                MY Links
                <div className = "Links">
                        {links.map((link) =>
                        <li className = "link" key={link.name}>{link.name} 
                        <span className="link-title">{link.title}</span></li>
                        )}
                </div>
            </div>
        </div>
    );
}
export default HomePGU;    