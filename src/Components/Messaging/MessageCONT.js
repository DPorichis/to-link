import React from "react";
import Message from "./Message";
import MessagesPGU from "../../Pages/User/MessagesPGU";

function MessageCont(props){
    
    return(
        <div>
             <div>
            {props.dm.messages.map((message, index) => (
                <Message
                    key={index}
                    name={props.dm.name}
                    title={props.dm.title}
                    message={message}
                    imgURL={props.dm.imgURL}
                    same={index > 0 && props.dm.messages[index - 1].user === message.user}
                />
            ))}
            
        </div>
        </div>
    );
}
export default MessageCont;