import React from "react";
import ProfileComments from "../Profile/ProfileComments.js";

function CommentsCONT(props) {


    const comments = 
    [
    {
    name: "Lakis Lalakis",
    title:"CEO of DIT",
    imgURL: "/logo192.png",
    comments: "Perasa sto DI"
    },
    {
    name: "Ioannic",
    title: "CEO of TSILI" ,
    imgURL: "/logo192.png",
    comments: "AXIO MELOS"
    },
    {
    name: "Lionel Messi",
    title: "CEO of Real Madrid",
    imgURL: "/logo192.png",
    comments: "another victory"
    },
    {
    name: "Makis Kotsampasis",
    title: "CEO of SYNERGEIO O MAKIS",
    imgURL: "/logo192.png",
    comments: "FWTIIIIII PIASE MIA MPYRA"
    },
    {
    name: "Theopoula Tzini",
    title: "CEO of IBIZA",
    imgURL: "/logo192.png",
    comments : "KANAME THRAFSI"
    },
    ];

    return (
        <div>
            <div className="comments">
                <div className = "LinksComments">
                {comments.map((comment) =>
                <ProfileComments name = {comment.name} title = {comment.title} comments={comment.comments} />
                )}
                </div>
            </div>
        </div>
    );
}
export default CommentsCONT;    