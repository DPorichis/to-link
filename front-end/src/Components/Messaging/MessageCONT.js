import React, { useRef, useEffect, useState } from "react";
import Message from "./Message"; 

function MessageCont(props) {
    const messagesEndRef = useRef(null);

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

    const [dms, setDms] = useState([])

    useEffect(() => {
        const fetchdms = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response = await fetch("http://127.0.0.1:8000/convo/dm/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                    "convo": props.convo.convo_id
                })
            })
            
            if (response.ok) {
                // Fetch user account details if authenticated
                const convo = await response.json();
                setDms(convo);
            } else {
                console.log("couldn't fetch convos")
            }
        };

        fetchdms();
    }, [props.rer]);


    return (
        <div style={{ overflowY: "scroll", paddingRight: "10px", flex:"1" }}>
            <div>
                {dms.length === 0?
                    <div style={{"textAlign": "center"}}>
                        <h5>It's a little quiet in here...</h5>
                        <p> Why don't you sent a message? Telling your friends how much you love them is always nice!</p>
                    </div>
                :
                    <>
                        {dms.map((message, index) => (
                            <Message
                                key={index}
                                your_message={props.convo.user_info.user !== message.user}
                                other_name={props.convo.user_info.name + " " + props.convo.user_info.surname}
                                other_title={props.convo.user_info.title}
                                other_pfp={props.convo.user_info.pfp}
                                your_pfp={props.me} // FIX
                                message={message}
                                same={index > 0 && dms[index - 1].user === message.user}
                            />
                        ))}
                    </>
                
                }
                
                <div ref={messagesEndRef} /> {}
            </div>
        </div>
    );
}

export default MessageCont;
