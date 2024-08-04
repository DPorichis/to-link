import React from "react";
import Message from "./Message";
import MessagesPGU from "../../Pages/User/MessagesPGU";

function MessageCont(props){
    return(
        <div>
            <Message name = {props.messages[0].name} title = {props.messages[0].title} Message={props.messages[0].Message} imgURL={props.messages[0].imgURL} user={props.messages[0].User} same={false} />
            <Message name = {props.messages[1].name} title = {props.messages[1].title} Message={props.messages[1].Message} imgURL={props.messages[1].imgURL} user={props.messages[1].User} same={false} />
            <Message name = {props.messages[2].name} title = {props.messages[2].title} Message={props.messages[2].Message} imgURL={props.messages[2].imgURL} user={props.messages[2].User} same={true} />
            <Message name = {props.messages[3].name} title = {props.messages[3].title} Message={props.messages[3].Message} imgURL={props.messages[3].imgURL} user={props.messages[3].User} same={false} />
        </div>
    );
}
export default MessageCont;