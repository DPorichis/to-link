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
                <h5 style={{textAlign:"left"}}>Upload</h5>
                <hr style={{ border: "1px solid black", margin: "10px 0" }} />
                <div className="UploadBox" style={{display:"flex",flexDirection:"column",backgroundColor: "#cecdcd",justifyContent:"flex-start",borderRadius:"9px",height:"6%"}}>
                    <div style={{display:"flex",flexDirection:"row",padding:"10px 10px"}}>
                    <img src="/logo192.png" alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
                    <input style={{width:"90%",height:"100%",border:"none",marginTop:"4px",borderRadius:"9px",height:"40px"}} placeholder="Brag to your Colleges about something..." type="text" /> 
                    </div>
                    <div style={{textAlign:"left",marginLeft:"10%"}}>
                        <button style={{width:"30%",backgroundColor: "#cecdcd",border:"none"}}>
                            <img src="/upload.svg" style={{}} />
                            Upload Media
                        </button>
                        <button style={{width:"30%",backgroundColor: "#cecdcd",border:"none"}}>
                            <img src="/link.svg" style={{}} />
                            Insert TOLINK
                        </button>
                    </div>

                </div>
                <h5 style={{textAlign:"left"}}>Your Feed</h5>
                <hr style={{ border: "1px solid black", margin: "10px 0" }} />
                <div>
                    <Postbox photolist ={[ "/testing-post1.png", "/testing-post.png"]}/>
                    <Postbox photolist ={[ "/testing-post1.png"]}/>
                    <Postbox />
                </div>
            </div>
        </div>
        </div>
    );
}
export default HomePGU;    