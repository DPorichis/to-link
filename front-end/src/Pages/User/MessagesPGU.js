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
{
    name: "Lakis Lalakis",
    title:"CEO of DIT",
    imgURL: "/logo192.png",
    messages: convo,
    },
    {
        name: "Lakis Lalakis",
        title:"CEO of DIT",
        imgURL: "/logo192.png",
        messages: convo,
        },
        {
            name: "Lakis Lalakis",
            title:"CEO of DIT",
            imgURL: "/logo192.png",
            messages: convo,
            },
            {
                name: "Lakis Lalakis",
                title:"CEO of DIT",
                imgURL: "/logo192.png",
                messages: convo,
                },
{
name: "Makis Kotsampasis",
title: "CEO of SYNERGEIO O MAKIS",
imgURL: "/logo192.png",
messages : convo,
},
{
    name: "Makis Kotsampasis",
    title: "CEO of SYNERGEIO O MAKIS",
    imgURL: "/logo192.png",
    messages : convo,
    },
    {
        name: "Makis Kotsampasis",
        title: "CEO of SYNERGEIO O MAKIS",
        imgURL: "/logo192.png",
        messages : convo,
        },
        {
            name: "Makis Kotsampasis",
            title: "CEO of SYNERGEIO O MAKIS",
            imgURL: "/logo192.png",
            messages : convo,
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
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between", marginLeft:"5%", width:"90%"}}>
                <div className="sidebar" style={{maxHeight:"90vh",overflow:"auto",width:"25%", padding:"5px 10px", borderRadius:"10px",
                    border:"1px solid #A1AECE"
                }}>
                    <h5 style={{ textAlign: "left" }}>
                        Your DMs
                    </h5>
                    <div style={{padding: "5px 5px", display: "flex", flexDirection: "column", borderRadius: "10px"}}>
                        {storedLinks.map((link, index) =>
                        <ProfileDms name = {link.name} title = {link.title} messages={link.messages} imgURL={link.imgURL} changesel={handleDmClick} id={index} isSelected={selected_dm === index}/>
                        )}
                    </div>
                </div>
                <div className="Textbox" style={{display:"flex", flexDirection:"column",textAlign:"left",justifyContent:"space-between",width:"70%", padding:"5px 10px",
                    border: "#ccc 1px solid", borderRadius:"10px",  height:"90vh"
                }}>
                    <div >
                        <div style={{display:"flex", flexDirection:"row",textAlign:"left"}}>
                            <h3 style={{fontSize:"4vh",marginRight:"1%",marginBottom:"0px"}}>{storedLinks[selected_dm].name}</h3>
                            <p style={{color:"#D3D3D3",fontSize:"3vh",marginTop:"0.5vh",marginBottom:"0px"}}>{storedLinks[selected_dm].title}</p>
                        </div>
                        <p style={{marginTop:"0px"}}>online</p>
                    </div>
                    <MessageCont dm = {storedLinks[selected_dm]} />
                    <div>
                        <div className="ChatBox" style={{display:"flex",flexDirection:"row",width:"100%",height:"45px",borderRadius:"18px",backgroundColor: "#fff", 
                            borderRadius:"10px", border: "#ccc 1px solid", marginTop:"15px"
                        }}>
                            <button style={{width:"40px",backgroundColor: "transparent", border:"none"}}>
                                <img src="/plus-circle.svg" width={"25px"} height={"25px"}/>
                            </button>
                            <input style={{flex:"1",backgroundColor: "transparent",height:"100%",border:"none",
                            borderLeft:"1px solid", borderRight:"1px solid"}} placeholder="Type a message..." type="text" onChange={handleTextChange} value={textboxContent}/> 
                            <button style={{width:"40px",backgroundColor: "transparent",border:"none"}} onClick={handleUploadClick}>
                                <img src="/upload.svg" width={"25px"} height={"25px"} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MessagesPGU;