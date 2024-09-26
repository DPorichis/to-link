import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Message from "./Message";

function MessageCont(props) {
    const messagesEndRef = useRef(null);
    const [dms, setDms] = useState([]);

    useEffect(() => {
        const fetchDms = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/convo/dm/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "convo": props.convo.convo_id
                })
            });

            if (response.ok) {
                const convo = await response.json();
                setDms(convo);
            } else {
                console.log("Couldn't fetch DMs");
            }
        };

        fetchDms();
    }, [props.rer]);

    
    useLayoutEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
        }
    }, [dms]);

    return (
        <div style={{ overflowY: "scroll", paddingRight: "10px", flex: "1" }}>
            <div>
                {dms.length === 0 ? (
                    <div style={{ textAlign: "center" }}>
                        <h5>It's a little quiet in here...</h5>
                        <p>Why don't you send a message? Telling your friends how much you love them is always nice!</p>
                    </div>
                ) : (
                    <>
                        {dms.map((message, index) => (
                            <Message
                                key={index}
                                your_message={props.convo.user_info.user !== message.user}
                                other_name={`${props.convo.user_info.name} ${props.convo.user_info.surname}`}
                                other_title={props.convo.user_info.title}
                                other_pfp={props.convo.user_info.pfp}
                                your_pfp={props.me}
                                message={message}
                                same={index > 0 && dms[index - 1].user === message.user}
                            />
                        ))}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default MessageCont;
