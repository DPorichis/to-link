import React from "react";
import "./Postbox.css";
import ProfileTag from "../Profile/ProfileTag";
import { useState, useEffect } from "react";
import CommentsCONT from "./Comment";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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


function Postbox(props) {

    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchComments = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log("Props: ", props);
            try {
                const response = await fetch("http://127.0.0.1:8000/posts/comment/show", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: "include",
                    
                    body: JSON.stringify({"post":props.post.post_id})
                });

                if (response.ok) {
                    const data = await response.json();
                    setComments(data);  
                } else {
                    throw new Error('Failed to fetch posts');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);
    const [commentsVisible, setCommentsVisible] = useState(false);

    function togglecomments()
    {
        setCommentsVisible(!commentsVisible);
    }


    const [liked, setLiked] = useState(false);

    function toggleLiked()
    {
        setLiked(!liked);
    }

    return (
        <div className="postboxout">
            <div className="postboxin">
                <ProfileTag name="Litsa Patera" relation="In your Network"/>
                <p> {props.post.text}</p>
                {props.media === undefined ? 
                    <></>
                : 
                (props.photolist.length === 1 ?
                    <img src={props.post.media[0]} style={{maxHeight: "100%"}} alt="" />
                :
                <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={props.post.media[0]} class="d-block w-100" alt="..."/>
                        </div>
                        {props.post.media.slice(1).map((photo) =>
                            <div class="carousel-item">
                                <img class="d-block w-100" src={props.post.media} alt="photo"/>
                            </div>
                        )}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            )
                }
            </div>
            <div></div>
            <div className="actions">
                <button onClick={toggleLiked} className="like-button">
                    {liked ? <> <img src="/liked.svg" alt="you liked this"/> <span >Liked</span> </> : <><img src="/like.svg" alt="like"/> <span>Like</span> </>}
                </button>
                <div className="comment-input">
                    <img src="/comment.svg"/>
                    <input type="text" placeholder={"Type a comment"} className="inv-text-box" style={{width:"300px"}}/>
                    <button>Post</button>
                </div>          
            </div>
            <p style={{textAlign: "left", justifyContent: "left", marginLeft: "2px", marginTop: "2px", marginBottom: "0"}}>{props.post.like_cnt} Likes ·{props.post.comment_cnt} Comments3</p>
            <button className="show-comments-button" onClick={togglecomments}> {commentsVisible ? <>Show Comments v</> : <>Show Comments {">"}</>}</button>
            {commentsVisible ? <><CommentsCONT comments={comments} /></> : <></>}
       </div>
    );
}
export default Postbox; 
