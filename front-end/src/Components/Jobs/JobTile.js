//JobTile.js
//This component displays the job Title 
// ======================================

import React from "react";
import ProfileComments from "../Profile/ProfileComments.js";
import "./JobTile.css";

function JobTile(props) {

    const handleClick = () => {
        props.handleSelect(props.listing);
    };

    return (
        <div onClick={handleClick} className={props.active ? "active-job-tile" : "standard-job-tile"}>
            <div style={{display:"flex", justifyContent:"space-between", flexDirection:"row"}}>
            <div>
                <h5 style={{marginBottom: "0px", textAlign:"left"}}>{props.listing.title}</h5>
                <p style={{marginTop: "0px", marginBottom:"3px"}}>
                    <span style={{color: "#444", fontSize:"16px"}}>listed by {props.listing.user_info.name + " " +props.listing.user_info.surname} </span>
                    <span style={{color: "#888", fontSize:"10px"}}>{props.listing.relation}</span>
                </p>
            </div>
            <div>
                {
                    props.listing.visible === 1
                    ?
                    <button type="button" class="btn btn-success" style={{padding: "0px 5px"}}>Public</button>
                    :
                    (
                        props.listing.visible === 2
                        ?
                        <button type="button" class="btn btn-primary" style={{padding: "0px 5px"}}>Network</button>
                        :
                        <button type="button" class="btn btn-secondary" style={{padding: "0px 5px"}}>Private</button>
                    )
                }
            </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={"20px"} height={"20px"} src="/clock.svg" style={{marginRight:"1px"}}/>
                    <p style={{marginBottom: "2px"}}>{props.listing.time}</p>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={"20px"} height={"20px"} src="/map-pin.svg" />
                    <p style={{marginBottom: "2px"}}>{props.listing.spot}</p>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={"20px"} height={"20px"} src="/compass.svg"  style={{marginRight:"1px"}}/>
                    <p style={{marginBottom: "2px"}}>{props.listing.level}</p>
                </span>
                
            </div>
            
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <img width={"20px"} height={"20px"} src="/map.svg"  style={{marginRight:"1px"}}/>
                <p style={{marginBottom: "2px"}}>{props.listing.location}</p>
            </span>
        </div>
    );
}
export default JobTile;