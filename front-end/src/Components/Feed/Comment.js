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

    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchComments = async () => {
            const csrfToken = getCookie('csrftoken');
            try {
                const response = await fetch("http://127.0.0.1:8000/posts/comment/show", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: "include",
                    body: JSON.stringify({"post":props.post_id})
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

    console.log("Props in CommentsCONT:", props); // Log props here
    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <div className="comments">
                <div className = "LinksComments">
                {comments.map((comment) =>
                    <ProfileComments name={comment.profile_info.name} title={comment.title} comments={comment.text} />
                )}
                </div>
            </div>
        </div>
    );
}
export default CommentsCONT;