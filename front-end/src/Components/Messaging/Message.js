import React from "react";
import MessagesPGU from "../../Pages/User/MessagesPGU";
import MessageCont from "./MessageCONT";

function Message(props){
    return(
        <div >
        <div style={{marginBottom:"0px"}} >
           {props.your_message ? (
               <div style={{display:"flex", flexDirection:"row"}}  >
               {props.same ? 
                <> 
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginTop:"0px",marginBottom:"5px"}}>
                        {props.message.media? (
                            <img src={"http://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                        ) : (
                            <p style={{marginTop:"0px",marginLeft:"50px",marginBottom:"0px"}}>{props.message.text}</p>
                        )}
                    </div>
                </>
               :
               <>
                    <img src={props.your_pfp} alt="Avatar" style={{width :"50px",height:"50px", borderRadius:"25%"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginBottom:"0px"}}>
                    <p style={{marginBottom:"3px",marginTop:"3px"}}>You · {props.message.timestamp}</p>
                    {props.message.media? (
                        <img src={"http://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                    ) : (
                        <p style={{marginTop:"0px",marginBottom:"3px"}}>{props.message.text}</p>
                    )}
                    </div>                    
               </>
           }
           </div>
            ) : (
                <div style={{display:"flex", flexDirection:"row"}}  >
                    {props.same ? 
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginTop:"0px",marginBottom:"5px"}}>
                        {props.message.media ? (
                            <img src={"http://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                        ) : (
                            <p style={{marginTop:"0px",marginLeft:"50px",marginBottom:"0px"}}>{props.message.text}</p>
                        )}
                    </div>
                    :
                    <>
                    <img src={props.other_pfp} alt="Avatar" style={{width :"50px",height:"50px", borderRadius:"25%"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginBottom:"0px"}}>
                    <p style={{marginBottom:"3px",marginTop:"3px"}}>{props.other_name} · {props.message.timestamp}</p>
                    {props.message.media ? (
                    <img src={"http://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                ) : (
                    <p style={{marginTop:"0px",marginBottom:"3px"}}>{props.message.text}</p>
                )}
                    </div>                    
                    </>
                }
                </div>
            )} 
        </div>
        </div>
    );
}

export default Message;