//Comments.js
//This component fetching comments for a specific post
// =================================================================================

import React from "react";
import ProfileComments from "../Profile/ProfileComments.js";
import { useState, useEffect } from "react";

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
function CommentsCONT(props) {
    //Render control
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //Comment list
    const [comments, setComments] = useState([]);
    
    
    //Fetching the comments 
    useEffect(() => {
        const fetchComments = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/posts/comment/show", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"post":props.post_id})
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
            setLoading(false);
        };

        fetchComments();
    }, []);

    console.log("Props in CommentsCONT:", props); 
    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <div className="comments">
                <div className = "LinksComments">
                {comments.map((comment) =>
                    <ProfileComments name={comment.profile_info.name + " " + comment.profile_info.surname} title={comment.profile_info.title} comments={comment.text} pfp={comment.profile_info.pfp}/>
                )}
                </div>
            </div>
        </div>
    );
}
export default CommentsCONT;