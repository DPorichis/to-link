import React from "react";
import ProfileComments from "../Profile/ProfileComments.js";
import "./JobTile.css";

function JobTile(props) {

    const handleClick = () => {
        props.handleSelect(props.listing);
    };

    return (
        <div onClick={handleClick} className={props.active ? "active-job-tile" : "standard-job-tile"}>
            <h5 style={{marginBottom: "0px"}}>{props.listing.title}</h5>
            <p style={{marginTop: "0px", marginBottom:"3px"}}>
                <span style={{color: "#444", fontSize:"16px"}}>listed by {props.listing.user} </span>
                <span style={{color: "#888", fontSize:"10px"}}>{props.listing.relation}</span>
            </p>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={"20px"} height={"20px"} src="/logo192.png" />
                    <p style={{marginBottom: "2px"}}>{props.listing.time}</p>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={"20px"} height={"20px"} src="/logo192.png" />
                    <p style={{marginBottom: "2px"}}>{props.listing.spot}</p>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={"20px"} height={"20px"} src="/logo192.png" />
                    <p style={{marginBottom: "2px"}}>{props.listing.level}</p>
                </span>
                
            </div>
            
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <img width={"20px"} height={"20px"} src="/logo192.png" />
                <p style={{marginBottom: "2px"}}>{props.listing.location}</p>
            </span>
        </div>
    );
}
export default JobTile;