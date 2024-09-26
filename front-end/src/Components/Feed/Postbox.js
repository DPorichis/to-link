import React, { useState, useEffect } from "react";
import "./Postbox.css";
import ProfileTag from "../Profile/ProfileTag";
import CommentsCONT from "./Comment";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Postbox(props) {
    const [liked, setLiked] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(props.post.like_cnt); 
    const [commentCount, setCommentCount] = useState(props.post.comment_cnt);
    const [showOptions, setShowOptions] = useState(false);

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
        fetchLikes();
    }, [props.post.post_id]); 

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
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <ProfileTag 
                        name={props.post.user_info.name + " " + props.post.user_info.surname} 
                        relation={props.post.user_info.title} 
                        pfp={props.post.user_info.pfp} 
                    />
                    <div className="dropdown">
                        <img 
                            src={"more-horizontal (1).svg"}
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
                <p style={{marginBottom:"0px"}}>{props.post.text} </p>
                {props.post.images?.length === 1 ? (
                    <img src={"http://127.0.0.1:8000" + props.post.images[0].image} style={{maxHeight: "100%"}} alt="" />
                ) : props.post.images?.length > 1 ? (
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
