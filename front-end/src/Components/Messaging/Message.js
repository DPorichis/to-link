import React from "react";
import MessagesPGU from "../../Pages/User/MessagesPGU";
import MessageCont from "./MessageCONT";

function Message(props){
    const isCurrentUserYou = props.message.user === "0";
    
    return(
        <div >
        <div style={{marginBottom:"0px"}} >
           {isCurrentUserYou ? (
               <div style={{display:"flex", flexDirection:"row"}}  >
               {props.same ? 
               <> 
               <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginTop:"0px",marginBottom:"5px"}}>
               {props.message.media  ? (
                    <img src={props.message.media} alt="Message content" style={{maxWidth:"200px", marginLeft:"50px"}} />
                ) : (
                    <p style={{marginTop:"0px",marginLeft:"50px",marginBottom:"0px"}}>{props.message.message}</p>
                )}
               </div>
               </>
               :
               <>
               <img src={props.imgURL} alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
               <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginBottom:"0px"}}>
               <p style={{marginBottom:"3px",marginTop:"3px"}}>YOU · {props.message.time}</p>
               {props.message.media ? (
                    <img src={props.message.media} alt="Message content" style={{maxWidth:"200px", marginLeft:"50px"}} />
                ) : (
               <p style={{marginTop:"0px",marginBottom:"3px"}}>{props.message.message}</p>
                )}
               </div>                    
               </>
           }
           </div>
            ) : (
                <div style={{display:"flex", flexDirection:"row"}}  >
                    {props.same ? 
                    <> 
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginTop:"0px",marginBottom:"5px"}}>
                    {props.message.media ? (
                    <img src={props.message.media} alt="Message content" style={{maxWidth:"200px", marginLeft:"50px"}} />
                ) : (
                    <p style={{marginTop:"0px",marginLeft:"50px",marginBottom:"0px"}}>{props.message.message}</p>
                )}
                    </div>
                    </>
                    :
                    <>
                    <img src={props.imgURL} alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginBottom:"0px"}}>
                    <p style={{marginBottom:"3px",marginTop:"3px"}}>{props.name} · {props.message.time}</p>
                    {props.message.media ? (
                    <img src={props.message.media} alt="Message content" style={{maxWidth:"200px", marginLeft:"50px"}} />
                ) : (
                    <p style={{marginTop:"0px",marginBottom:"3px"}}>{props.message.message}</p>
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