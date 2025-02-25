//Postbox.js
//This component handles the display of a post, including likes,comments,text and media
// =================================================================================

import React, { useState, useEffect } from "react";
import "./Postbox.css";
import ProfileTag from "../Profile/ProfileTag";
import CommentsCONT from "./Comment";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {jwtDecode} from "jwt-decode";

function Postbox(props) {
    //Likes and comments
    const [liked, setLiked] = useState(false);
    const [own, setOwn] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(props.post.like_cnt); 
    const [commentCount, setCommentCount] = useState(props.post.comment_cnt);
    //Tracking a request on progress
    const [loading, setLoading] = useState(false); 
    //Options dropdown
    const [showOptions, setShowOptions] = useState(false);
     //media handling
    const [media, setMedia] = useState([...props.post.images, ...props.post.videos, ...props.post.audios])

    //Checking if user has liked the picture
    useEffect(() => {
        const fetchLikes = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/posts/like/exists", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ "post_id": props.post.post_id })
            });

            if (response.ok) {
                const data = await response.json();
                setLiked(data.liked);
            } else {
                throw new Error('Failed to fetch Likes');
            }
            setLoading(false);
        };
        console.log(media)
        const token = localStorage.getItem('access_token');
        const decodedToken = jwtDecode(token);
        if (props.post.user === decodedToken.user_id) {
            setOwn(true)
        }
        fetchLikes();
    }, [props.post.post_id]); 
    //When a user likes a post updates the database
    const toggleLiked = async () => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const response = await fetch("http://127.0.0.1:8000/posts/like/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ post_id: props.post.post_id })
        });

        if (response.ok) {
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        } else {
            throw new Error('Failed to like/unlike post');
        }
        setLoading(false);
    };
    //Post deletion
    const handleDeletePost = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        const token = localStorage.getItem('access_token');
        const response = await fetch("http://127.0.0.1:8000/posts/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ post_id: props.post.post_id })
        });
    };

    const togglecomments = () => {
        setCommentsVisible(!commentsVisible);
    };

    const handleTextChange = (e) => {
        setCommentText(e.target.value);
    };

    //When the user comments on a post updates the database
    const handleCommentUpload = async () => {
        const token = localStorage.getItem('access_token');
        const response = await fetch("http://127.0.0.1:8000/posts/comment/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ 
                "post": props.post.post_id, 
                "text": commentText
            })
        });

        if (response.ok) {
            setCommentText("");
            setCommentCount(commentCount + 1);
        }
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className="postboxout">
            <div className="postboxin">
                {own ? <div style={{display:"flex",justifyContent:"space-between"}}>
                    <ProfileTag 
                        name={props.post.user_info.name + " " + props.post.user_info.surname} 
                        relation={props.post.user_info.title} 
                        pfp={props.post.user_info.pfp} 
                    />
                                     
                    <div className="dropdown">
                        <img 
                            src="/more-horizontal (1).svg"
                            alt="more options" 
                            style={{ cursor: "pointer" }} 
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        />
                        
                        <ul className={`dropdown-menu dropdown-menu-end ${showOptions ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#" onClick={handleDeletePost}>Delete Post</a></li>
                        </ul>
                    </div>
                </div>
                :
                <div style={{display:"flex",justifyContent:"flex-start"}}>
                    <ProfileTag 
                        name={props.post.user_info.name + " " + props.post.user_info.surname} 
                        relation={props.post.user_info.title} 
                        pfp={props.post.user_info.pfp} 
                    />
                </div>
                }
                <p style={{marginBottom:"0px"}}>{props.post.text} </p>
                {media.length === 1 ? (
                    (media[0].media_type === "image" ?
                        <img src={"http://127.0.0.1:8000" + media[0].image} style={{maxHeight: "100%"}} alt="" />
                    :
                    (media[0].media_type === "video"?
                        <video controls>
                            <source src={"http://127.0.0.1:8000" + media[0].video} type="video/mp4"/>
                        </video>
                    :
                    <audio controls>
                        <source src={"http://127.0.0.1:8000" + media[0].audio} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                    )
                    )
                ) : media.length > 1 ? (
                    <div id={"carousel"+props.post.post_id} className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                {media[0].media_type === "image" ?
                                        <img src={"http://127.0.0.1:8000" + media[0].image} className="d-block w-100"
                                        style={{ maxHeight: "500px", objectFit: "contain" }} alt="" />
                                    :
                                    (media[0].media_type === "video"?
                                        <video controls
                                        className="d-block w-100"
                                        style={{ maxHeight: "500px", objectFit: "contain" }}>
                                            <source src={"http://127.0.0.1:8000" + media[0].video} type="video/mp4"/>
                                        </video>
                                    :
                                    <audio controls
                                    className="d-block"
                                    style={{ width: "70%", margin: "0 auto", height: "80px" }}>
                                        <source src={"http://127.0.0.1:8000" + media[0].audio} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    )
                                }
                            </div>
                            {media.slice(1).map((med, index) =>
                                <div className="carousel-item" key={index}>
                                    {med.media_type === "image" ?
                                        <img src={"http://127.0.0.1:8000" + med.image} className="d-block w-100"
                                        style={{ maxHeight: "500px", objectFit: "contain" }} alt="" />
                                    :
                                    (med.media_type === "video"?
                                        <video controls
                                        className="d-block w-100"
                                        style={{ maxHeight: "500px", objectFit: "contain" }}>
                                            <source src={"http://127.0.0.1:8000" + med.video} type="video/mp4"/>
                                        </video>
                                    :
                                    <audio controls
                                    className="d-block"
                                    style={{ width: "70%", margin: "0 auto", height: "80px" }}>
                                        <source src={"http://127.0.0.1:8000" + med.audio} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    )
                                    }
                                </div>
                            )}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={"#carousel"+props.post.post_id} data-bs-slide="prev"
                        style={{backgroundColor: "black",
                            borderRadius: "25%",
                            width: "80px",
                            height: "50px"}}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={"#carousel"+props.post.post_id} data-bs-slide="next"
                        style={{backgroundColor: "black",
                            borderRadius: "25%",
                            width: "80px",
                            height: "50px"}}>
                            <span className="carousel-control-next-icon" aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                ) : null}
            </div>
            <div className="actions">
                <button onClick={toggleLiked} className="like-button" disabled={loading}>
                    {liked ? <> <img src="/liked.svg" alt="you liked this"/> <span>Liked</span> </> : <><img src="/like.svg" alt="like"/> <span>Like</span> </>}
                </button>
                <div className="comment-input">
                    <img src="/comment.svg" alt="comment icon" />
                    <input type="text" placeholder={"Type a comment"} className="inv-text-box" style={{width:"300px"}} value={commentText} onChange={handleTextChange}/>
                    <button onClick={handleCommentUpload}>Post</button>
                </div>          
            </div>
            <p style={{textAlign: "left", justifyContent: "left", marginLeft: "2px", marginTop: "2px", marginBottom: "0"}}>
                {likeCount} Likes · {commentCount} Comments
            </p>
            <button className="show-comments-button" onClick={togglecomments}> 
                {commentsVisible ? <>Show Comments v</> : <>Show Comments {">"}</>}
            </button>
            {commentsVisible && <CommentsCONT post_id={props.post.post_id} />}
       </div>
    );
}

export default Postbox;
