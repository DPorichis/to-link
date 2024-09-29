// JobDashboard.js
// This component is responsible for displaying the job dashboard for a specific job listing.
// =================================================================================


import { useState, useEffect } from "react";
import ProfileBanner from "../Profile/ProfileBanner";

function JobDashboard(props) {


    var startval = "preview";
    if(props.listing.state === "Draft")
    {
        startval = "edit";
    }
    // Selected Listing
    const [editedListing, setEditedListing] = useState(props.listing);
    // Active Section
    const [mode, setMode] = useState(startval);
    // List of Applicants
    const [applications, setApplications] = useState([]);
    
    const handleEdit = () => {
        setMode("edit");
        setEditedListing(props.listing);
    };


    // Section Management //

    const handlePreview = () => {
        setMode("preview");
    };

    const handleResponse = () => {
        setMode("responses");
    };

    // Editing Management //

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedListing((prevListing) => ({
          ...prevListing,
          [name]: value,
        }));
    };

    const handleSave = () => {
        props.update(editedListing.listing_id, editedListing);
    };

    const handleDiscard = () => {
        setEditedListing(props.listing);
    };

    // Skill List management //

    const remSkill = (event) => {
        const {name} = event.target;
        setEditedListing((prevProfile) => ({
          ...prevProfile,
          skills: editedListing.skills.filter((_, i) => i != name),
        }));
    };

    const addSkill = () => {
        setEditedListing((prevProfile) => ({
          ...prevProfile,
          skills: [... prevProfile.skills, ""],
        }));
    };

    const handleSkillChange = (event) => {
        const { name, value } = event.target;
        
        const newSkill = editedListing.skills.map((inst, i) =>
            i == name ? value : inst
        );

        setEditedListing((prevProfile) => ({
        ...prevProfile,
        skills: newSkill,
      }));
    };

    // Fetchin data
    useEffect(() => {
        const fetchapplic = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("https://127.0.0.1:8000/listings/applied/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "listing_id": props.listing.listing_id
                })
            })

            if (response.ok) {
                let answer = await response.json();
                setApplications(answer);
            } else {
                console.log("Problems with fetching your listings applications")
            }
        };
    
        setEditedListing(props.listing);
        fetchapplic();

    }, [props.listing]);

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
                    <a class={mode === "responses" ? "nav-link active": "nav-link"} onClick={handleResponse}>Responses <span class="badge text-bg-success">{props.listing.apl_cnt}</span></a>
                </li>
            </ul>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"left", border: "1px #aaa solid",
                padding: "10px 20px", borderEndEndRadius: "10px", borderEndStartRadius: "10px", textAlign:"left", borderTop: "none"
            }}>
                {mode === "edit"
                ?
                <>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{display: "flex", flexDirection:"column"}}>
                            <h4 style={{marginBottom: "0px"}}>Listing editing</h4>
                            <p style={{marginBottom: "0px"}}>Changes won't be saved, untill save button is pressed</p>
                        </div>
                        {props.listing === editedListing ?
                        <div>
                            <button type="button" class="btn btn-outline-secondary">No Changes Detected</button>
                        </div>
                        :
                        <div>
                            <button type="button" class="btn btn-outline-danger" 
                            style={{marginRight: "4px"}} onClick={handleDiscard}>
                                Discard Changes
                            </button>
                            <button type="button" class="btn btn-success" onClick={handleSave}>Save Changes</button>
                        </div>
                        }
                        
                        
                    </div>
                    
                    <form>
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" name="title" placeholder="ex. Senior React Dev" value={editedListing.title} onChange={handleInputChange}/>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="id" class="form-label">ID</label>
                                <input type="text" id="disabledTextInput" class="form-control" name="id" value={editedListing.id} readonly disabled/>
                            </div>
                            <div class="col-md-6">
                                <label for="state" class="form-label">Visibility</label>
                                <select class="form-select" name="visible" value={editedListing.visible} onChange={handleInputChange}>
                                    <option value="1">Public</option>
                                    <option value="2">Network Only</option>
                                    <option value="3">Private</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="location" class="form-label">Location</label>
                            <input type="text" class="form-control" name="location" placeholder="ex. Athens, Greece" value={editedListing.location} onChange={handleInputChange}/>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="spot" class="form-label">Spot</label>
                                <select class="form-select" name="spot" value={editedListing.spot} onChange={handleInputChange}>
                                    <option value="Not Filled" disabled>Not Filled</option>
                                    <option value="On-site">On-site</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="time" class="form-label">Time</label>
                                <select class="form-select" name="time" value={editedListing.time} onChange={handleInputChange}>
                                    <option value="Not Filled" disabled>Not Filled</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Flexible">Flexible</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="level" class="form-label">Level</label>
                                <select class="form-select" name="level" value={editedListing.level} onChange={handleInputChange}>
                                    <option value="Not Filled" disabled>Not Filled</option>
                                    <option value="Entry-Level">Entry-Level</option>
                                    <option value="Mid-Level">Mid-Level</option>
                                    <option value="High-Level">High-Level</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="desc" class="form-label">Description</label>
                            <textarea class="form-control" name="desc" rows="3" 
                            placeholder="ex. SUPER WOW MUCH MONEY JOB AT TO LINK WOWOWOW"
                            value={editedListing.desc} onChange={handleInputChange}></textarea>
                        </div>
                        <div class="mb-3" style={{marginBottom:"3px"}}>
                            <label for="pfSkills" class="form-label" style={{marginBottom:"2px"}}>Skills</label>
                            <ul id="skillList" class="list-group">
                                {editedListing.skills.map((_, index) =>
                                    <li class="list-group-item" style={{display:"flex", justifyContent:"space-between"}}>
                                        <input type="text" class="form-control" name={index} 
                                        placeholder="Add skill here" value={editedListing.skills[index]} onChange={handleSkillChange}/>
                                        <button type="button" class="btn btn-danger" 
                                        style={{marginLeft: "4px"}} onClick={remSkill} name={index}>
                                            -
                                        </button>
                                    </li>                                    
                                )}
                            </ul>
                            <div class="list-group">
                                <button type="button" class="btn btn-outline-success mt-2" id="addSkill"
                                onClick={addSkill} style={{marginBottom:"5px"}}
                                >Add Skill</button>
                            </div>
                        </div>
                    </form>                
                </>
                :
                (mode === "preview"
                ?
                <>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <h3 style={{marginBottom: "0px"}}>{props.listing.title}</h3>
                            <p style={{marginBottom: "0px", marginTop: "16px", marginLeft: "6px", color: "#888", fontSize:"10px"}}>Listing code: {props.listing.listing_id}</p>
                        </div>
                        <p style={{marginTop: "0px", marginBottom:"3px"}}>
                            <span style={{color: "#444", fontSize:"16px"}}>listed by {props.listing.user_info.name + " " +props.listing.user_info.surname} </span>
                            <span style={{color: "#888", fontSize:"10px"}}>{props.listing.relation}</span>
                        </p>
                    </div>
                    <div>
                        <button type="button" class="btn btn-secondary">Apply for this job</button>
                    </div>
                </div>
                
                <div style={{display: "flex", flexDirection: "row", justifyContent: "left"}}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px"}}>
                        <img width={"20px"} height={"20px"} src="/clock.svg" style={{marginRight:"1px"}}/>
                        <p style={{marginBottom: "2px"}}>{props.listing.time}</p>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px" }}>
                        <img width={"20px"} height={"20px"} src="/map-pin.svg" />
                        <p style={{marginBottom: "2px"}}>{props.listing.spot}</p>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px" }}>
                        <img width={"20px"} height={"20px"} src="/compass.svg" style={{marginRight:"1px"}}/>
                        <p style={{marginBottom: "2px"}}>{props.listing.level}</p>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10px" }}>
                        <img width={"20px"} height={"20px"} src="/map.svg" style={{marginRight:"2px"}}/>
                        <p style={{marginBottom: "2px"}}>{props.listing.location}</p>
                    </span>
                </div>
                <h5 style={{marginTop: "5px"}}>Job Description</h5>
                <p>
                    {props.listing.desc}
                </p>
                <h5 style={{marginBottom:"2px"}}>
                    Skills
                </h5>
                {props.listing.skills.length !== 0? 
                    <ul>
                        {props.listing.skills.map((exp) =>
                            <li>{exp}</li>
                        )}
                    </ul>  
                    :
                    <p>No skills set</p>
                }

                </>
                :
                <>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{display: "flex", flexDirection:"column"}}>
                            <h4 style={{marginBottom: "0px"}}>Listing Responses</h4>
                            <p style={{marginBottom: "0px"}}>All the respondants are listed bellow</p>
                        </div>
                        {props.listing.responses === 0 ?
                        <div>
                            <button type="button" class="btn btn-outline-secondary" onClick={handleSave}>Responses: 0</button>
                        </div>
                        :
                        <div>
                            <button type="button" class="btn btn-success" onClick={handleSave}>Responses: {props.listing.apl_cnt}</button>
                        </div>
                        }
                        
                        
                    </div>
                    {applications.map((link) => (
                        <ProfileBanner link={link}/>
                    ))}
                    
                </>
                )
                }
                
            </div>
        </>
    );
}
export default JobDashboard;