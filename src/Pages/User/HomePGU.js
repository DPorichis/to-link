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
    {
        name: "Theopoula Tzini",
        title: "CEO of IBIZA",
        imgURL: "/logo192.png",
        },
        {
            name: "Theopoula Tzini",
            title: "CEO of IBIZA",
            imgURL: "/logo192.png",
            },
            {
                name: "Theopoula Tzini",
                title: "CEO of IBIZA",
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
            <div className="sidebar" style={{maxHeight:"90vh", overflow:"auto",width: "20%",alignItems:"left",textAlign:"left",padding:"5px 10px",borderRadius:"10px"}}>
                <div>   
                <h5>Profile view</h5>
                    <div className="Profile" style={{backgroundColor:"white",borderRadius:"10px",display:"flex",flexDirection:"column",padding:"5px 10px",marginBottom:"10px"}}>
                        <div style={{display:"flex",flexDirection:"row"}}>
                                <img src="/logo192.png" alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
                                <div style={{display:"flex",flexDirection:"column",marginBottom:"0px",marginTop:"0px",marginLeft:"5px"}}>
                                    <p style={{marginBottom:"0px",marginTop:"0px"}}>NAME NAME</p>
                                    <p>TITLE</p>
                                </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",textAlign:"center"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h5 style={{marginBottom:"0px"}}>YYY</h5>
                            <p style={{marginBottom:"0px"}}>posts</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h5 style={{marginBottom:"0px"}}>YYY</h5>
                            <p style={{marginBottom:"0px"}}>Links</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h5 style={{marginBottom:"0px"}}>YYY</h5>
                            <p style={{marginBottom:"0px"}}>listings</p>
                            </div>
                        </div>
                    </div>
                    <h5>MY Links</h5>
                    <div className = "Links" style={{}}>
                            {links.map((link) =>
                            <ProfileSmall name = {link.name} title = {link.title} imgURL ={link.imgURL}/>
                        )}
                    </div>
                </div>
            </div>
            <div style={{width: "60%",maxHeight:"90vh", overflow:"auto"}}>
                <h5 style={{textAlign:"left"}}>Upload</h5>
                <hr style={{ border: "1px solid black", margin: "10px 0" }} />
                <div className="UploadBox" style={{display:"flex",flexDirection:"column",backgroundColor: "#cecdcd",justifyContent:"flex-start",borderRadius:"9px"}}>
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
                <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between",marginTop:"10px"}}>
                    <h5 style={{textAlign:"left",marginBottom:"0px"}}>Your Feed</h5>
                    <select name="Short by" style={{ backgroundColor: "#cecdcd", border: "none", outline: "none" }}>
                        <option value="Date">Short by: Date</option>
                        <option value="Recomended">Short by: Recommended</option>
                    </select>
                </div>
                <hr style={{ border: "1px solid black", margin: "10px 0",marginTop:"5px" }} />
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