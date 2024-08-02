import React from "react";
import Header from "../../Components/Header";
import ProfileDms from "../../Components/Profile/ProfileDms";

function MessagesPGU(props) {


    const links = 
    [
    {
    name: "Lakis Lalakis",
    title:"CEO of DIT",
    imgURL: "/logo192.png",
    Message: "Bathmoi mystudies "
    },
    {
    name: "Ioannic",
    title: "CEO of TSILI" ,
    imgURL: "/logo192.png",
    Message: "To post egkrithike"
    },
    {
    name: "Lionel Messi",
    title: "CEO of Real Madrid",
    imgURL: "/logo192.png",
    Message: "Tha valw over 2.5 goal"
    },
    {
    name: "Makis Kotsampasis",
    title: "CEO of SYNERGEIO O MAKIS",
    imgURL: "/logo192.png",
    Message : "Fwti piase mia mpyra"
    },
    {
    name: "Theopoula Tzini",
    title: "CEO of IBIZA",
    imgURL: "/logo192.png",
    Message : "Kaname Thraysi"
    },
    ];

    return (
        <div>
            <Header log="user" act="messages"/>
            <div className="sidebar">
                <div style={{ textAlign: "left" }}>
                Your DMs
                </div>
                <div className = "LinksDms">
                {links.map((link) =>
                <ProfileDms name = {link.name} title = {link.title} Message={link.Message} />
            )}
                </div>
            </div>
        </div>
    );
}
export default MessagesPGU;    