import React from "react";
import Header from "../../Components/Header";
import ProfileDms from "../../Components/Profile/ProfileDms";
import CommentsCONT from "../../Components/Feed/Comment";
import Message from "../../Components/Messaging/Message";
import MessageCont from "../../Components/Messaging/MessageCONT";
import { useState } from "react";


const convo= [
    {
        user:"1",
        message: "Fwtiiiii ",
        time: "10:05",
        media: null
    },
    {
        user:"1",
        message: "eisai edw ",
        time: "10:05",
        media: null
    },
    {
        user:"0",
        message: "Parakalw",
        time: "10:08",
        media: null
    },
    {
        user:"1",
        message: "Piase mia mpyraa",
        time: "10:10",
        media: null
    },
    {
        user:"0",
        message:"EFTASEE",
        time: "10:10",
        media: null
    },
    {
        user:"1",
        message:"",
        time: "10:10",
        media: "/logo192.png"
    },
    {
        user:"1",
        message:"STIN YGEIA SOY",
        time: "10:10",
        media: null
    }
    

];

const links = 
[
{
name: "Makis Kotsampasis",
title:"CEO of synergio o makis",
imgURL: "/logo192.png",
messages: convo
},
{
name: "Lakis Lalakis",
title:"CEO of DIT",
imgURL: "/logo192.png",
messages: convo,
},
{
name: "Ioannic",
title: "CEO of TSILI" ,
imgURL: "/logo192.png",
messages: convo,

},
{
name: "Lionel Messi",
title: "CEO of Real Madrid",
imgURL: "/logo192.png",
messages: convo,

},
{
name: "Makis Kotsampasis",
title: "CEO of SYNERGEIO O MAKIS",
imgURL: "/logo192.png",
messages : convo,
},

];


function MessagesPGU(props) {
    
    const [storedLinks, setStoredLinks] = useState(links);
    
    const [selected_dm, setSelected_dm] = useState(0);
    const [textboxContent, setTextBoxContent] = useState("");

    const handleTextChange = (event) => {
        const {value} = event.target
        setTextBoxContent(value)
    }

    const handleDmClick = (index) => {
        setSelected_dm(index); 
    };

    const handleUploadClick = () => {
        if (textboxContent.trim() !== "") {
            const newMessage = {
                user: "0",
                message: textboxContent,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                media: null
            };
            const updatedLinks = [...storedLinks];
            updatedLinks[selected_dm].messages = [...updatedLinks[selected_dm].messages, newMessage];
            setStoredLinks(updatedLinks);
            setTextBoxContent("");
        }
    };
    
    return (
        <div >
            <Header log="user" act="messages"/>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div className="sidebar">
                    <div style={{ textAlign: "left" }}>
                    Your DMs
                    </div>
                    <div className = "LinksDms">
                        {storedLinks.map((link, index) =>
                        <ProfileDms name = {link.name} title = {link.title} messages={link.messages} imgURL={link.imgURL} changesel={handleDmClick} id={index} isSelected={selected_dm === index}/>
                        )}
                    </div>
                </div>
                <div className="Textbox" style={{display:"flex", flexDirection:"column",textAlign:"left",marginLeft:"60px",justifyContent:"space-between",width:"50%"}}>
                    <p>
                        <div style={{display:"flex", flexDirection:"row",textAlign:"left"}}>
                            <h3 style={{fontSize:"4vh",marginRight:"8px",marginBottom:"0px"}}>{storedLinks[selected_dm].name}</h3>
                            <p style={{color:"#D3D3D3",fontSize:"3vh",marginTop:"0.5vh",marginBottom:"0px"}}>{storedLinks[selected_dm].title}</p>
                        </div>
                        <p style={{marginTop:"0px"}}>online</p>
                        <div style={{display:"flex", flexDirection:"column",}}>
                        <MessageCont dm = {storedLinks[selected_dm]} />
                        </div>
                    </p>
                    <p>
                        <div className="ChatBox" style={{display:"flex",flexDirection:"row",width:"100%",height:"6vh",borderRadius:"18px",backgroundColor: "#cecdcd"}}>
                            <div style={{borderRadius:"18px",height:"100%",width:"100%"}}>
                            <button style={{width:"10%",backgroundColor: "transparent",height:"90%",border:"none"}}>
                            <img src="/plus-circle.svg" />
                            </button>
                            <input style={{width:"80%",backgroundColor: "transparent",height:"100%",border:"none",
                                borderLeft:"solid"}} placeholder="Type a message..." type="text" onChange={handleTextChange} value={textboxContent}/> 
                            <button style={{width:"10%",backgroundColor: "transparent",border:"none"}} onClick={handleUploadClick}>
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