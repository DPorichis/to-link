import React from "react";
import ProfileComments from "../Profile/ProfileComments.js";

function CommentsCONT(props) {


    console.log("Props in CommentsCONT:", props); // Log props here

    return (
        <div>
            <div className="comments">
                <div className = "LinksComments">
                {props.comments.map((comments) =>
                    <ProfileComments name={comments.profile_info.name} title={comments.title} comments={comments.text} />
                )}
                </div>
            </div>
        </div>
    );
}
export default CommentsCONT;