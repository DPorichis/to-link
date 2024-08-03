import { useState } from "react";

function JobDashboard(props) {

    const [mode, setMode] = useState("preview");
    
    const handleEdit = () => {
        setMode("edit");
    };

    const handlePreview = () => {
        setMode("preview");
    };


    const handleResponse = () => {
        setMode("responses");
    };

    return (
            <>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class={mode === "preview" ? "nav-link active": "nav-link"} aria-current="page" onClick={handlePreview}>Preview</a>
                </li>
                <li class="nav-item">
                    <a class={mode === "edit" ? "nav-link active": "nav-link"} onClick={handleEdit}>Edit</a>
                </li>
                <li class="nav-item">
                    <a class={mode === "responses" ? "nav-link active": "nav-link"} onClick={handleResponse}>Responses</a>
                </li>
            </ul>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"left", border: "1px #aaa solid",
                padding: "10px 20px", borderEndEndRadius: "10px", borderEndStartRadius: "10px", textAlign:"left", borderTop: "none"
            }}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div>
                    <h3 style={{marginBottom: "0px"}}>{props.listing.title}</h3>
                    <p style={{marginTop: "0px", marginBottom:"3px"}}>
                        <span style={{color: "#444", fontSize:"16px"}}>listed by {props.listing.user} </span>
                        <span style={{color: "#888", fontSize:"10px"}}>{props.listing.relation}</span>
                    </p>
                </div>
                <button type="button" class="btn btn-primary">Apply for this job</button>
            </div>
            
            <div style={{display: "flex", flexDirection: "row", justifyContent: "left"}}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px"}}>
                    <img width={"20px"} height={"20px"} src="/logo192.png" />
                    <p style={{marginBottom: "2px"}}>{props.listing.time}</p>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px" }}>
                    <img width={"20px"} height={"20px"} src="/logo192.png" />
                    <p style={{marginBottom: "2px"}}>{props.listing.spot}</p>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px" }}>
                    <img width={"20px"} height={"20px"} src="/logo192.png" />
                    <p style={{marginBottom: "2px"}}>{props.listing.level}</p>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px" }}>
                    <img width={"20px"} height={"20px"} src="/logo192.png" />
                    <p style={{marginBottom: "2px"}}>{props.listing.location}</p>
                </span>
            </div>
            <h5 style={{marginTop: "5px"}}>Job Description</h5>
            <p>
                {props.listing.desc}
            </p>
        </div>
        </>
    );
}
export default JobDashboard;