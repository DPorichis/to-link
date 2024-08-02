import React from "react";
import "./Postbox.css";
import ProfileTag from "../Profile/ProfileTag";
import { useState } from "react";
import CommentsCONT from "./Comment";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Postbox(props) {

    const [commentsVisible, setCommentsVisible] = useState(false);

    function togglecomments()
    {
        setCommentsVisible(!commentsVisible);
    }

    return (
        <div className="postboxout">
            <div className="postboxin">
                <ProfileTag name="Litsa Patera" relation="In your Network"/>
                <p> «Αυτό που μου είπε η Λίτσα Πατέρα είναι ότι αυτα τα παιδια θα πάρουν 10 στην εργασία. Είναι οριστικό. Δεν υπάρχει επιστροφή εκεί. PLZ κυριε Χαμόδρακα PLZPLZPLZPLZPLZPLZPLZ</p>
                {props.photolist === undefined ? 
                    <></>
                : 
                (props.photolist.length === 1 ?
                    <img src={props.photolist[0]} style={{maxHeight: "100%"}} alt="" />
                :
                <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={props.photolist[0]} class="d-block w-100" alt="..."/>
                        </div>
                        {props.photolist.slice(1).map((photo) =>
                            <div class="carousel-item">
                                <img class="d-block w-100" src={photo} alt="photo"/>
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
                <button onClick={props.Like} className="like-button">
                    {props.liked ? <> <img src="/liked.svg" alt="you liked this"/> <span>Liked</span> </> : <><img src="/like.svg" alt="like"/> <span>Like</span> </>}
                </button>
                <div className="comment-input">
                    <img src="/comment.svg" alt="you liked this"/>
                    <input type="text" placeholder={"Type a comment"} className="inv-text-box"/>
                    <button>Post</button>
                </div>          
            </div>
            <p style={{textAlign: "left", justifyContent: "left", marginLeft: "2px", marginTop: "2px", marginBottom: "0"}}>{props.likecount}1234 liked this · {props.commentcount}5 comments</p>
            <button className="show-comments-button" onClick={togglecomments}> Show Comments v </button>
            {commentsVisible ? <><CommentsCONT /></> : <></>}
       </div>
    );
}
export default Postbox; 
