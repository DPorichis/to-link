import React, { useRef, useEffect } from "react";
import Message from "./Message"; 

function MessageCont(props) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
        }
    }, [props.dm.messages]); 

    return (
        <div style={{ overflowY: "scroll", height: "550px", paddingRight: "10px" }}>
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
                <div ref={messagesEndRef} /> {}
            </div>
        </div>
    );
}

export default MessageCont;
