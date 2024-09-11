import React from "react";
import Header from "../../Components/Header";
import ProfileDms from "../../Components/Profile/ProfileDms";
import CommentsCONT from "../../Components/Feed/Comment";
import Message from "../../Components/Messaging/Message";
import MessageCont from "../../Components/Messaging/MessageCONT";
import { useState, useEffect } from "react";

function MessagesPGU(props) {

    
    const [storedLinks, setStoredLinks] = useState([]);
    const [selected_dm, setSelected_dm] = useState({});
    const [loading, setLoading] = useState(true);
    const [textboxContent, setTextBoxContent] = useState("");
    const [rerend, setRerend] = useState(true);
    const [userPFP, setUserPFP] = useState("")

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === `${name}=`) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    };

    useEffect(() => {
        const fetchconvos = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response = await fetch("http://127.0.0.1:8000/convo/list/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                })
            })
            
            if (response.ok) {
                // Fetch user account details if authenticated
                const convos = await response.json();
                setStoredLinks(convos);
                console.log(storedLinks);
            } else {
                console.log("couldn't fetch convos")
            }
        };

        const fetchprofilepic = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response = await fetch("http://127.0.0.1:8000/profile/own/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                })
            })
            
            if (response.ok) {
                // Fetch user account details if authenticated
                const user = await response.json();
                setUserPFP(user.profile_info.pfp);
                console.log(storedLinks);
            } else {
                console.log("couldn't fetch convos")
            }
        };


        fetchconvos();
        fetchprofilepic();
        setLoading(false);
    }, []);

    const [image, setImage] = useState(null);

    const handleTextChange = (event) => {
        const {value} = event.target
        setTextBoxContent(value)
    }

    const handleDmClick = (cnv) => {
        setSelected_dm(cnv);
    };

    const handleMediaSelection = (event) => {
        const file = event.target.files[0];
    if (file) {
        setImage(file);
    }
    
    // Reset the file input so it can detect the same file selection
    event.target.value = '';
    }

    const handleUploadClick = async () => {
        if(selected_dm.convo_id !== undefined)
        {
            const messageData = new FormData();

            if (image) {
                messageData.append('media', image);
            }
            else {
                messageData.append('text', textboxContent)
            }

            messageData.append('convo', selected_dm.convo_id)
        
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            const response = await fetch("http://127.0.0.1:8000/convo/dm/new/", {
                method: "POST",
                headers: {
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: messageData
            });
            
            if (response.ok) 
            {
                console.log("storedLinks");
                const cnv = selected_dm
            }
            else{
                console.log("wrong");
            }
            setTextBoxContent("");
            setImage(null);
        }
    };

    if (loading) return <>Loadins</>
    
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
                        {storedLinks.length !== 0? 
                        <>
                        {storedLinks.map((link) =>
                            <ProfileDms link={link} changesel={handleDmClick} id={link.convo_id} isSelected={selected_dm.convo_id === link.convo_id}/>
                        )}
                        </>
                        :
                        <div style={{padding:"10px 10px", borderRadius:"5px", backgroundColor:"#fff"}}>
                            <h5>You don't seem to have any connections... </h5>
                            <p>Let's change that! Go to Network and find your self some new friends.</p>
                            <a href="/user/network" className="btn btn-primary">Go to Network</a>
                        </div>
                        }
                        
                        
                    </div>
                </div>
                <div className="Textbox" style={{display:"flex", flexDirection:"column",textAlign:"left",justifyContent:"space-between",width:"70%", padding:"5px 10px",
                    border: "#ccc 1px solid", borderRadius:"10px",  height:"90vh"
                }}>
                    {selected_dm.convo_id !== undefined 
                    ?
                        <>
                        <div>
                            <div style={{display:"flex", flexDirection:"row",textAlign:"left"}}>
                                <h3 style={{fontSize:"4vh",marginRight:"1%",marginBottom:"0px"}}>{selected_dm.user_info.name + " " + selected_dm.user_info.surname}</h3>
                                <p style={{color:"#D3D3D3",fontSize:"3vh",marginTop:"0.5vh",marginBottom:"0px"}}>{selected_dm.user_info.title}</p>
                            </div>
                            <p style={{marginTop:"0px"}}>In your Network</p>
                        </div>
                        <MessageCont convo={selected_dm} rer={rerend} me={userPFP}/>
                        </>
                        :
                        <div style={{"textAlign": "center"}}>
                            <h4>Select a dm from the left</h4>
                            <p>To link is the best place to talk to your lovely, capitalist and money thirsty friends</p>
                        </div>
                    }
                    <div>
                        <div className="ChatBox" style={{display:"flex",flexDirection:"row",width:"100%",height:"45px",borderRadius:"18px",backgroundColor: "#fff", 
                            borderRadius:"10px", border: "#ccc 1px solid", marginTop:"15px"
                        }}>
                            <label className="custom-file-upload" style={{ display: 'inline-block', width:"40px",backgroundColor: "transparent",
                            border:"none", textAlign: 'center'}}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display:'none'}}  // Hide the input
                                    onChange={handleMediaSelection}
                                />
                                <img src="/plus-circle.svg" style={{width:"25px", height:"25px", marginTop:"10px"}}/>
                            </label>
                            {image === null ? 
                                <input key="text-input" style={{flex:"1",backgroundColor: "transparent",height:"100%",border:"none",
                                borderLeft:"1px solid", borderRight:"1px solid"}} placeholder="Type a message..." type="text" onChange={handleTextChange} value={textboxContent}/>
                                :
                                <div key="image-selected" style={{display:"flex",flexDirection:"row", flex:"1", borderLeft:"1px solid"}}>
                                    <button type="button" class="btn btn-danger btn-sm"
                                    style={{borderRadius:"50%", alignSelf: "center", padding:"3px 10px", margin: "2px"}}
                                    onClick={()=>{setImage(null)}}>
                                            X
                                    </button>
                                    <input style={{flex:"1",backgroundColor: "transparent",height:"100%",border:"none",
                                    borderLeft:"none", borderRight:"1px solid"}} value={`Image selected: ${image.name}`} type="text" disabled/>
                                        
                                </div>
                            }
                             
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