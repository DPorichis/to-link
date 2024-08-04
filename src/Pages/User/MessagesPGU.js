import React from "react";
import Header from "../../Components/Header";
import ProfileDms from "../../Components/Profile/ProfileDms";
import CommentsCONT from "../../Components/Feed/Comment";
import Message from "../../Components/Messaging/Message";
import MessageCont from "../../Components/Messaging/MessageCONT";

function MessagesPGU(props) {


    const links = 
    [
    {
    name: "YOU",
    title:"CEO of DIT",
    imgURL: "/logo192.png",
    Message: "SUPER RARE",
    User: "Lakis",
    same: "",
    },
    {
    name: "Lakis Lalakis",
    title:"CEO of DIT",
    imgURL: "/logo192.png",
    Message: "Bathmoi mystudies",
    User: "Lakis",
    same: "",
    },
    {
        name: "Lakis Lalakis",
        title:"CEO of DIT",
        imgURL: "/logo192.png",
        Message: "EPITELOUS",
        User: "Lakis",
        same: "",
        },
        {
            name: "YOU",
            title:"CEO of DIT",
            imgURL: "/logo192.png",
            Message: "KAIROS HTAN",
            User: "Lakis",
            same: "",
            },
    {
    name: "Ioannic",
    title: "CEO of TSILI" ,
    imgURL: "/logo192.png",
    Message: "To post egkrithike",
    User: "you"
    },
    {
    name: "Lionel Messi",
    title: "CEO of Real Madrid",
    imgURL: "/logo192.png",
    Message: "Tha valw over 2.5 goal",
    User: "you"
    },
    {
    name: "Makis Kotsampasis",
    title: "CEO of SYNERGEIO O MAKIS",
    imgURL: "/logo192.png",
    Message : "Fwti piase mia mpyra",
    User: "you"
    },
    {
    name: "Theopoula Tzini",
    title: "CEO of IBIZA",
    imgURL: "/logo192.png",
    Message : "Kaname Thraysi",
    User: "you"
    },
    ];
    let previousUser = null;
    return (
        <div >
            <Header log="user" act="messages"/>
            <div className="sidebar">
                <div style={{ textAlign: "left" }}>
                Your DMs
                </div>
                <div className = "LinksDms">
                {links.map((link) =>
                <ProfileDms name = {link.name} title = {link.title} Message={link.Message} imgURL={link.imgURL} user={link.User} Prev={link.Prev}/>
            )}
            
                </div>
            
            </div>
            <div style={{display:"flex", flexDirection:"column",}}>
            <MessageCont messages = {links} />
            </div>
        </div>
    );
}
export default MessagesPGU;    