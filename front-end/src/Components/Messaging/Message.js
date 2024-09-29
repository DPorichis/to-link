// Message.js
// Component handle every message individual
// Displays text or media content, handles message formatting and time stamps
// ==============================================================================

import React from "react";
import MessagesPGU from "../../Pages/User/MessagesPGU";
import MessageCont from "./MessageCONT";

function Message(props){
    const date = new Date(props.message.timestamp);

    
    const currentDate = new Date();

    // Calculate the difference in time (in milliseconds)
    const timeDifference = currentDate - date;

    // Convert the difference to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);


    var formattedDate;

    if(daysDifference > 7)
    {
        formattedDate = date.toLocaleString('en-US', {
            weekday: 'long',  // 'short' or 'narrow' for shorter versions
            year: 'numeric',
            month: 'long',    // 'short' or 'narrow' for shorter versions
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false     // Use 24-hour format (set to true for 12-hour format)
        });
    }
    else if (daysDifference < 0)
    {
        formattedDate = date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false     // Use 24-hour format (set to true for 12-hour format)
        });
    }
    else{
        formattedDate = date.toLocaleString('en-US', {
            weekday: 'long',  // 'short' or 'narrow' for shorter versions
            hour: '2-digit',
            minute: '2-digit',
            hour12: false     // Use 24-hour format (set to true for 12-hour format)
        });

    }



    return(
        <div >
        <div style={{marginBottom:"0px"}} >
           {props.your_message ? (
               <div style={{display:"flex", flexDirection:"row"}}  >
            {/* if it is the same user the photo is not rendering again, it renders just the text */}
               {props.same ? 
                <> 
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left", marginTop:"0px",marginBottom:"2px", marginLeft:"4px"}}>
                        {props.message.media? (
                            <img src={"https://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                        ) : (
                            <p style={{marginTop:"0px",marginLeft:"50px",marginBottom:"0px"}}>{props.message.text}</p>
                        )}
                    </div>
                </>
               :
               <>
                    <img src={props.your_pfp} alt="Avatar" style={{width :"50px",height:"50px", borderRadius:"25%"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column", textAlign:"left", marginBottom:"2px", marginLeft:"4px"}}>
                    <p style={{marginBottom: "2px"}}>You · {formattedDate}</p>
                    {/* This if case handles media and text */}
                    {props.message.media? (
                        <img src={"https://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                    ) : (
                        <p style={{marginTop:"0px",marginBottom:"2px"}}>{props.message.text}</p>
                    )}
                    </div>                    
               </>
           }
           </div>
            ) : (
                <div style={{display:"flex", flexDirection:"row"}}  >
                {/* if it is the same user the photo is not rendering again, it renders just the text */}
                    {props.same ? 
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginTop:"0px",marginBottom:"5px", marginLeft:"4px"}}>
                    {/* This if case handles media and text */}
                        {props.message.media ? (
                            <img src={"https://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                        ) : (
                            <p style={{marginTop:"0px",marginLeft:"50px",marginBottom:"0px"}}>{props.message.text}</p>
                        )}
                    </div>
                    :
                    <>
                    <img src={props.other_pfp} alt="Avatar" style={{width :"50px",height:"50px", borderRadius:"25%"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column",textAlign:"left",marginBottom:"0px", marginLeft:"4px", marginBottom:"2px"}}>
                    <p style={{marginBottom: "2px"}}>{props.other_name} · {formattedDate}</p>
                    {/* This if case handles media and text */}
                    {props.message.media ? (
                    <img src={"https://127.0.0.1:8000" + props.message.media} alt="Message content" style={{maxWidth:"500px", marginLeft:"50px"}} />
                ) : (
                    <p style={{marginTop:"0px",marginBottom:"2px"}}>{props.message.text}</p>
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