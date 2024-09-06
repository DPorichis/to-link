function JobPreview(props) {

    // const handleClick = () => {
    //     props.handleSelect(props.listing);
    // };

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"left", border: "1px #aaa solid",
            padding: "10px 20px", borderRadius: "10px", textAlign:"left", maxHeight:"80vh", overflow: "auto"
        }}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div>
                    <h3 style={{marginBottom: "0px"}}>{props.listing.title}</h3>
                    <p style={{marginTop: "0px", marginBottom:"3px"}}>
                        <span style={{color: "#444", fontSize:"16px"}}>listed by {props.listing.user_info.name + " " +props.listing.user_info.name} </span>
                        <span style={{color: "#888", fontSize:"10px"}}>{props.listing.relation}</span>
                    </p>
                </div>
                <div>
                    {props.applied === "applied"?
                        <button type="button" class="btn btn-outline-primary" onClick={props.handleApply}>You applied for this job</button>
                    :
                    (props.applied === "allowed" ? 
                        <button type="button" class="btn btn-primary" onClick={props.handleApply}>Apply for this job</button>
                        :
                        <button type="button" class="btn btn-secondary">You can't apply to this job</button>
                    )
                        
                    }
                </div>
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
    );
}
export default JobPreview;