//MessageCONT
// This components is responsible for rendering the conversation messages with pagination
// =======================================
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Message from "./Message";

function MessageCont(props) {
    //States for the Dms
    const messagesEndRef = useRef(null);
    //Message Data
    const [dms, setDms] = useState({});
    const [messageCache, setMessageCache] = useState([])

    //Fetching the user Dms
    const fetchDms = async (page) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(page ? page : "https://127.0.0.1:8000/convo/dm/fetch", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "convo": props.convo.convo_id,
                "page": page
            })
        });

        if (response.ok) {
            const convo = await response.json();
            setDms(convo);
            if(page)
            {
                setMessageCache([...messageCache, ...convo.results])
            }
            else
            {
                setMessageCache(convo.results)
            }

        } else {
            console.log("Couldn't fetch DMs");
        }
    };

    // fetches new messages when the conversation changes or is refreshed
    useEffect(() => {
        fetchDms();
    },[props.rer, props.convo.convo_id]);

    // Load more messages
    const handleLoadMore = () => {
        fetchDms(dms.next)
    }
    
    useLayoutEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "auto",block: "end"});
        }
    }, [messageCache]);

    

    return (
        <div style={{ overflowY: "scroll", paddingRight: "10px", flex: "1" }}>
            <div>
            {dms.next?
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
                <button onClick={handleLoadMore}
                class="btn btn-primary" type="button">
                        Load More
                </button>
            </div>
            :
            <></>
            }
            {/* if there is no messages renders a text otherwise renders the messages */}
                {dms.count === 0 ? (
                    <div style={{ textAlign: "center" }}>
                        <h5>It's a little quiet in here...</h5>
                        <p>Why don't you send a message? Telling your friends how much you love them is always nice!</p>
                    </div>
                ) : (
                    <>
                    {messageCache.slice().reverse().map((message, index) => (
                            <Message
                                key={index}
                                your_message={props.convo.user_info.user !== message.user}
                                other_name={`${props.convo.user_info.name} ${props.convo.user_info.surname}`}
                                other_title={props.convo.user_info.title}
                                other_pfp={props.convo.user_info.pfp}
                                your_pfp={props.me}
                                message={message}
                                same={index > 0 && messageCache[index - 1].user === message.user}
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
