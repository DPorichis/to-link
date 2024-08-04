import React from "react";
import MessagesPGU from "../../Pages/User/MessagesPGU";
import MessageCont from "./MessageCONT";

function Message(props){
    const isCurrentUserYou = props.user === 'you';
        
    return(
        <div >
        <div style={{marginBottom:"0px"}} >
           {isCurrentUserYou ? (
                <div style={{display:"flex", flexDirection:"row",marginTop:"0px"}}  >
                    <img src={props.imgURL} alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left"}}>
                    <p style={{marginBottom:"3px"}}>{props.name}</p>
                    <p style={{marginTop:"0px"}}>{props.Message}</p>
                    </div>
                </div>
            ) : (
                <div style={{display:"flex", flexDirection:"row"}}  >
                    {props.same ? 
                    <> 
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginTop:"0px",marginBottom:"5px"}}>
                    <p style={{marginTop:"0px",marginLeft:"50px",marginBottom:"0px"}}>{props.Message}</p>
                    </div>
                    </>
                    :
                    <>
                    <img src={props.imgURL} alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginBottom:"0px"}}>
                    <p style={{marginBottom:"3px"}}>{props.name}</p>
                    <p style={{marginTop:"0px",marginBottom:"3px"}}>{props.Message}</p>
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