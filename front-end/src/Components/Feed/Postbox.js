import React, { useState, useEffect } from "react";
import "./Postbox.css";
import ProfileTag from "../Profile/ProfileTag";
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
    const [liked, setLiked] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(props.post.like_cnt); // Initialize likeCount

    useEffect(() => {
        const fetchLikes = async () => {
            const csrfToken = getCookie('csrftoken');
            try {
                const response = await fetch("http://127.0.0.1:8000/posts/like/exists", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: "include",
                    body: JSON.stringify({ "post_id": props.post.post_id })
                });

                if (response.ok) {
                    const data = await response.json();
                    setLiked(data.liked);
                    setLikeCount(data.like_count); // Update likeCount based on response
                } else {
                    throw new Error('Failed to fetch Likes');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLikes();
    }, [props.post.post_id]); // Re-run this effect if the post ID changes

    const toggleLiked = async () => {
        setLoading(true);
        const csrfToken = getCookie('csrftoken');
        try {
            const response = await fetch("http://127.0.0.1:8000/posts/like/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({ post_id: props.post.post_id })
            });

            if (response.ok) {
                const data = await response.json();
                setLiked(!liked); // Toggle the liked state based on previous state
                
            } else {
                throw new Error('Failed to like/unlike post');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    function togglecomments() {
        setCommentsVisible(!commentsVisible);
    }

    const handleTextChange = (e) => {
        setCommentText(e.target.value)
    }

    const handleCommentUpload = async () => {
        const csrfToken = getCookie('csrftoken');
        const response = await fetch("http://127.0.0.1:8000/posts/comment/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: "include",
            body: JSON.stringify({ 
                "post": props.post.post_id, 
                "text": commentText
            })
        });

        if (response.ok)
        {
            setCommentText("")
        }

    }

    return (
        <div className="postboxout">
            <div className="postboxin">
                <ProfileTag name={props.post.user_info.name + " " + props.post.user_info.surname} relation={props.post.user_info.title} pfp={props.post.user_info.pfp}/>
                <p>{props.post.text}</p>
                {props.post.media?
                (props.post.images.length === 1 ?
                    <img src={"http://127.0.0.1:8000" + props.post.images[0].image} style={{maxHeight: "100%"}} alt="" />
                :
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={"http://127.0.0.1:8000" + props.post.images[0].image} className="d-block w-100" alt="..."/>
                        </div>
                        {props.post.images.slice(1).map((photo, index) =>
                            <div className="carousel-item" key={index}>
                                <img className="d-block w-100" src={"http://127.0.0.1:8000" + photo.image} alt="photo"/>
                            </div>
                        )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                ) 
                :
                <></> 
                }
            </div>
            <div></div>
            <div className="actions">
                <button onClick={toggleLiked} className="like-button" disabled={loading}>
                    {liked ? <> <img src="/liked.svg" alt="you liked this"/> <span>Liked</span> </> : <><img src="/like.svg" alt="like"/> <span>Like</span> </>}
                </button>
                <div className="comment-input">
                    <img src="/comment.svg"/>
                    <input type="text" placeholder={"Type a comment"} className="inv-text-box" style={{width:"300px"}} value={commentText} onChange={handleTextChange}/>
                    <button onClick={handleCommentUpload}>Post</button>
                </div>          
            </div>
            <p style={{textAlign: "left", justifyContent: "left", marginLeft: "2px", marginTop: "2px", marginBottom: "0"}}>
                {props.post.like_cnt} Likes · {props.post.comment_cnt} Comments
            </p>
            <button className="show-comments-button" onClick={togglecomments}> 
                {commentsVisible ? <>Show Comments v</> : <>Show Comments {">"}</>}
            </button>
            {commentsVisible ? <CommentsCONT post_id={props.post.post_id} /> : <></>}
       </div>
    );
}

export default Postbox;
