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
            <div style={{display:"flex",flexDirection:"row"}}>
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
                <div className="Textbox" style={{display:"flex", flexDirection:"column",textAlign:"left",marginLeft:"60px",justifyContent:"space-between",width:"50%"}}>
                    <p>
                        <div style={{display:"flex", flexDirection:"row",textAlign:"left"}}>
                            <h3 style={{fontSize:"32px",marginRight:"8px",marginBottom:"0px"}}>{links[1].name}</h3>
                            <p style={{color:"#D3D3D3",fontSize:"20px",marginTop:"7px",marginBottom:"0px"}}>{links[1].title}</p>
                        </div>
                        <p style={{marginTop:"0px"}}>online</p>
                        <div style={{display:"flex", flexDirection:"column",}}>
                        <MessageCont messages = {links} />
                        </div>
                    </p>
                    <p>
                        <div className="ChatBox" style={{display:"flex",flexDirection:"row",width:"100%",height:"40px",borderRadius:"18px",backgroundColor: "#cecdcd"}}>
                            <div style={{borderRadius:"18px",height:"100%",width:"100%"}}>
                            <button style={{width:"10%",backgroundColor: "transparent",height:"90%",border:"none"}}>
                            <img src="/plus-circle.svg" />
                            </button>
                            <input style={{width:"80%",backgroundColor: "transparent",height:"100%",border:"none",borderLeft:"solid"}} placeholder="Type a message" type="text"></input> 
                            <button style={{width:"10%",backgroundColor: "transparent",border:"none"}}>
                            <img src="/upload.svg" style={{}} />
                            </button>
                            </div>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default MessagesPGU;    