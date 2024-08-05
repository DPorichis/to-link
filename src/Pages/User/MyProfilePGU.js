import React from "react";
import Header from "../../Components/Header";
import { useState } from "react";
import Postbox from "../../Components/Feed/Postbox";
import JobTile from "../../Components/Jobs/JobTile";

let dammylistings =
    [
        {
            id:1002,
            state:"Public",
            title:"Junior Dev at ToLink",
            user:"Makis",
            relation:"In your network",
            spot:"Remote",
            time:"Full-time", 
            location:"Athens, Greece", 
            level:"Entry level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            responses: []
        },
        {
            id:1003,
            state:"Public",
            title:"Bet-builder agent",
            user:"Uncle Nionios",
            relation:"In your network",
            spot:"On-site",
            time:"Part-time", 
            location:"Spiti tou, Spata, Greece", 
            level:"Mid level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            responses: []
        }
    ]

const sampleProfile = 
{
    name: "Lakis",
    surname: "Lalakis",
    imgURL: "/logo192.png",
    email: "",
    phone: "",
    website: "",
    bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    experience: ["Important", "Important", "Important"],
    education: ["Important", "Important"],
    listings: dammylistings,
    visibleEdu: "Public",
    visibleExp: "Public",
    visibleAct: "Public",
    visibleCont: "Public"
}




function MyProfilePGU(props) {

    const [mode, setMode] = useState("info");
    const [edit, setEdit] = useState(false);
    
    const handleInfo = () => {
        setMode("info");
    };

    const handlePosts = () => {
        setMode("posts");
    };

    const handleListings = () => {
        setMode("listings");
    };

    const handleActivity = () => {
        setMode("activity");
    };

    const goToJobListing = () => {

    };

    const toggleEdit = () => {
        setEdit(true);
    };

    const togglePreview = () => {
        setEdit(false);
    };

    const [savedProfile, setSavedProfile] = useState(sampleProfile);
    const [editedProfile, setEditedProfile] = useState(sampleProfile);

    const discardChanges = () => {
        setEditedProfile(savedProfile);
    };

    const saveChanges = () => {
        setSavedProfile(editedProfile);
    }

    const addEdu = () => {
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          education: [... prevProfile.education, ""],
        }));
    };

    const remEdu = (event) => {
        const {name} = event.target
        setEditedProfile({
          ... editedProfile,
          education: editedProfile.education.filter((_, i) => i != name)
        });
    };

    const handleEduChange = (event) => {
        const { name, value } = event.target;
        
        const newEdu = editedProfile.education.map((inst, i) =>
            i == name ? value : inst
        );

        console.log(newEdu);
        
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          education: newEdu,
        }));
    };

    const remExp = (event) => {
        const {name} = event.target;
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          experience: editedProfile.experience.filter((_, i) => i != name),
        }));
    };

    const addExp = () => {
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          experience: [... prevProfile.experience, ""],
        }));
    };

    const handleExpChange = (event) => {
        const { name, value } = event.target;
        
        const newExp = editedProfile.experience.map((inst, i) =>
            i == name ? value : inst
        );

        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          experience: newExp,
        }));
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value,
        }));
    };

    return (
        <div>
            <Header log="user" act="profile"/>
            
            <div style={{display:"flex", flexDirection:"column", width: "70%", marginLeft:"15%", marginTop:"20px"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end", marginBottom:"5px"}}>
                    <button type="button" class="btn btn-outline-primary" style={{paddingTop: "0px", paddingBottom: "0px",
                        marginRight:"4px"
                    }}>Share Profile</button>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style={{paddingTop: "0px", paddingBottom: "0px"}}>
                        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked={!edit}
                        style={{paddingTop: "0px", paddingBottom: "0px"}}
                        />
                        <label class="btn btn-outline-primary" for="btnradio1" onClick={togglePreview} style={{paddingTop: "0px", paddingBottom: "0px"}}>Preview</label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked={edit}
                        style={{paddingTop: "0px", paddingBottom: "0px"}}/>
                        <label class="btn btn-outline-primary" for="btnradio2" onClick={toggleEdit} style={{paddingTop: "0px", paddingBottom: "0px"}}>Edit</label>
                    </div>   
                </div>
                {edit
                ?
                <div style={{ textAlign:"left", marginBottom:"5px",  borderTop: "solid #ddd 1px", padding: "5px 5px"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:"4px"}}>
                    <div>
                        <h3 style={{marginBottom: "0px"}}>Profile Editing</h3>
                        <p style={{marginBottom: "0px"}}>Changes won't be saved, untill save button is pressed</p>
                    </div>
                    {savedProfile === editedProfile ?
                            <div>
                                <button type="button" class="btn btn-outline-secondary">No Changes Detected</button>
                            </div>
                            :
                            <div>
                                <button type="button" class="btn btn-outline-danger" 
                                style={{marginRight: "4px"}} onClick={discardChanges}>
                                    Discard Changes
                                </button>
                                <button type="button" class="btn btn-success" onClick={saveChanges}>Save Changes</button>
                            </div>
                    }
                </div>
                <form style={{padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                    <div class="row" style={{marginBottom:"20px"}}>
                        <div class="col-md-8">
                            <h5>Profile Banner</h5>
                            <label for="pfp" class="form-label">Profile Picture</label>
                            <input type="file" class="form-control" name="imgURL" accept="image/*" 
                            onChange={handleInputChange} />
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" name="name"
                                    onChange={handleInputChange} value={editedProfile.name}/>
                                </div>
                                
                                <div class="col-md-6">
                                    <label for="surname" class="form-label">Surname</label>
                                    <input type="text" class="form-control" name="surname" 
                                    onChange={handleInputChange} value={editedProfile.surname}/>
                                </div>
                            </div>
                            <div class="col-mb-3">
                                <label for="imgUrl" class="form-label">Title</label>
                                <input type="text" class="form-control" name="title"
                                onChange={handleInputChange} value={editedProfile.title}/>
                            </div>
                        
                        </div>
                        <div class="col-md-4">
                            <h5>Contact Info</h5>
                            <div class="col-md-12">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="email"
                                onChange={handleInputChange} value={editedProfile.email}/>
                            </div>
                            <div class="col-md-12">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="tel" class="form-control" name="phone"
                                onChange={handleInputChange} value={editedProfile.phone}/>
                            </div>
                            <div class="col-md-12">
                                <label for="website" class="form-label">Website</label>
                                <input type="url" class="form-control" name="website"
                                onChange={handleInputChange} value={editedProfile.website}/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <h5>General Info</h5>
                            <div class="mb-3">
                                <label for="bio" class="form-label">Bio</label>
                                <textarea class="form-control" name="bio"
                                onChange={handleInputChange} value={editedProfile.bio}>
                                this is a bio
                                </textarea>
                            </div>
                            <div class="mb-3">
                                <label for="experience" class="form-label">Experience</label>
                                <ul id="experienceList" class="list-group">
                                {editedProfile.experience.map((exp, index) =>
                                    <li class="list-group-item" style={{display:"flex", justifyContent:"space-between"}}>
                                        <input type="text" class="form-control" name={index} 
                                        placeholder="Add experience here" value={exp} onChange={handleExpChange}/>
                                        <button type="button" class="btn btn-danger" 
                                        style={{marginLeft: "4px"}} onClick={remExp} name={index}>
                                            -
                                        </button>
                                    </li>                                    
                                )}
                                </ul>
                                <div class="list-group">
                                    <button type="button" class="btn btn-outline-success mt-2" id="addExperience"
                                    onClick={addExp}
                                    >Add Experience</button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="education" class="form-label">Education</label>
                                <ul id="educationList" class="list-group">
                                    {editedProfile.education.map((_, index) =>
                                        <li class="list-group-item" style={{display:"flex", justifyContent:"space-between"}}>
                                            <input type="text" class="form-control" name={index} 
                                            placeholder="Add education here" value={editedProfile.education[index]} onChange={handleEduChange}/>
                                            <button type="button" class="btn btn-danger" 
                                            style={{marginLeft: "4px"}} onClick={remEdu} name={index}>
                                                -
                                            </button>
                                        </li>                                    
                                    )}
                                </ul>
                                <div class="list-group">
                                    <button type="button" class="btn btn-outline-success mt-2" id="addExperience"
                                    onClick={addEdu}
                                    >Add Education</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h5>Category Visibility</h5>
                            <label for="state" class="form-label">Activity Visibility</label>
                            <select class="form-select" name="visibleAct" value={editedProfile.visibleAct}
                            onChange={handleInputChange}>
                                <option value="Public">Public</option>
                                <option value="Network Only">Network Only</option>
                                <option value="Private">Private</option>
                            </select>
                            <label for="state" class="form-label">Education Visibility</label>
                            <select class="form-select" name="visibleEdu" value={editedProfile.visibleEdu}
                            onChange={handleInputChange}>
                                <option value="Public">Public</option>
                                <option value="Network Only">Network Only</option>
                                <option value="Private">Private</option>
                            </select>
                            <label for="state" class="form-label">Experience Visibility</label>
                            <select class="form-select" name="visibleExp" value={editedProfile.visibleExp}
                            onChange={handleInputChange}>
                                <option value="Public">Public</option>
                                <option value="Network Only">Network Only</option>
                                <option value="Private">Private</option>
                            </select>
                            <label for="state" class="form-label">Contact Info Visibility</label>
                            <select class="form-select" name="visibleCont" value={editedProfile.visibleCont}
                            onChange={handleInputChange}>
                                <option value="Public">Public</option>
                                <option value="Network Only">Network Only</option>
                                <option value="Private">Private</option>
                            </select>
                        </div>
                    </div>
                </form>
                </div>
                :
                <>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignContent:"center", height:"100%",
                    marginBottom:"5px",  borderTop: "solid #ddd 1px", padding: "5px 5px"
                }}>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                        <img src="/logo192.png" alt="Avatar" style={{width:"110px", height:"110px"}} className="link-image" />
                        <div style={{textAlign:"left", marginLeft:"15px", alignContent:"center", height:"100%"}}>
                        <h3 style={{marginBottom: "0px", fontSize:"32px"}}>
                            {savedProfile.name + " " + savedProfile.surname}
                        </h3>
                        <p style={{marginBottom: "0px", fontSize:"20px"}}>
                            {savedProfile.title}
                        </p>
                        </div>
                    </div>
                    <p style={{textAlign:"right", marginBottom:"0px", marginTop:"10px"}}>
                        Contact information<br/>
                        Email: {savedProfile.email}<br/>
                        Phone: {savedProfile.phone}<br/>
                        Website: {savedProfile.website}
                    </p>
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class={mode === "info" ? "nav-link active": "nav-link"} aria-current="page" onClick={handleInfo}>Info</a>
                    </li>
                    <li class="nav-item">
                        <a class={mode === "posts" ? "nav-link active": "nav-link"} onClick={handlePosts}>Posts</a>
                    </li>
                    <li class="nav-item">
                        <a class={mode === "listings" ? "nav-link active": "nav-link"} onClick={handleListings}>Listings</a>
                    </li>
                    <li class="nav-item">
                        <a class={mode === "activity" ? "nav-link active": "nav-link"} onClick={handleActivity}>Activity</a>
                    </li>
                </ul>
                {mode === "info"
                ?
                <div style={{textAlign:"left", marginTop:"10px", padding: "5px 5px"}}>
                    <h4 style={{marginBottom:"2px"}}>
                        About {savedProfile.name}
                    </h4>
                    <p>
                    {savedProfile.bio}
                    </p>
                    <h4 style={{marginBottom:"2px"}}>
                        Experience
                    </h4>
                    <ul>
                        {savedProfile.experience.map((exp) =>
                            <li>{exp}</li>
                        )}
                    </ul>
                    <h4 style={{marginBottom:"2px"}}>
                        Education
                    </h4>
                    <ul>
                        {savedProfile.education.map((edu) =>
                            <li>{edu}</li>
                        )}
                    </ul>
                </div>
                :
                (mode === "posts"
                    ?
                    <>
                        <Postbox photolist ={[ "/testing-post1.png", "/testing-post.png"]}/>
                        <Postbox photolist ={[ "/testing-post1.png"]}/>
                        <Postbox />
                    </>
                    :
                    (mode === "listings"
                    ?
                    <>
                        {dammylistings.map((listi) =>
                            <JobTile listing={listi} handleSelect={goToJobListing} active={false} />
                        )}
                    </>

                    :
                    <>Activity</>
                    )

                )

                }
                
                </>
                }
            </div>
        </div>
    );
}
export default MyProfilePGU;    