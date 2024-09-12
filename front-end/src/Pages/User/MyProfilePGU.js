import React from "react";
import Header from "../../Components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Postbox from "../../Components/Feed/Postbox";
import JobTile from "../../Components/Jobs/JobTile";

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
};

function MyProfilePGU(props) {
    const navigate = useNavigate();

    const [mode, setMode] = useState("info");
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    const [savedProfile, setSavedProfile] = useState({});
    const [editedProfile, setEditedProfile] = useState({});
    const [listings, setListings] = useState([]);
    const [posts, setPosts] = useState([]);
    const [image, setImages] = useState(null);

    const handleImageChange = (e) => {
        setImages(e.target.files[0]);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response = await fetch("http://127.0.0.1:8000/profile/own/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                })
            })
            
            if (response.ok) {
                // Fetch user account details if authenticated
                let userData = await response.json();
                if (userData.profile_info.education === null) 
                {
                    userData.profile_info.education = []
                }
                if (userData.profile_info.experience === null) 
                {
                    userData.profile_info.experience = []
                }
                setSavedProfile(userData.profile_info);
                setEditedProfile(userData.profile_info);
            } else {
                setSavedProfile(null);
                console.log("no user logged in")
            }


            const response1 = await fetch("http://127.0.0.1:8000/listings/list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                    "specify_user": "own"
                })
            })

            if (response1.ok) {
                let answer = await response1.json();
                setListings(answer);
            } else {
                console.log("Problems with fetching your listings info")
            }

            const response2 = await fetch("http://127.0.0.1:8000/posts/fetch/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                    "user_id": "own"
                })
            })

            if (response2.ok) {
                let answer = await response2.json();
                setPosts(answer);
            } else {
                console.log("Problems with fetching your listings info")
            }


            setLoading(false);
        };

        fetchUser();
    }, []);
    
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

    const goToJobListing = (listi) => {
        navigate(`/user/listings?listing_id=${listi.listing_id}`)
    };

    const toggleEdit = () => {
        setEdit(true);
    };

    const togglePreview = () => {
        setEdit(false);
    };

    const discardChanges = () => {
        setEditedProfile(savedProfile);
    };

    const saveChanges = async() => {
        const csrfToken = getCookie('csrftoken');
        // Create a FormData object
        const formData = new FormData();

        // Append all fields from editedProfile to the FormData
        for (let key in editedProfile) {
            if(key === "education" || key === "experience")
            {
                formData.append(key, JSON.stringify(editedProfile[key]))
            }
            else if(key!== "pfp" && editedProfile[key] !== null){
                formData.append(key, editedProfile[key]);
            }
        }

        if (image) {
            formData.append('pfp', image);
        }

        const response = await fetch("http://127.0.0.1:8000/profile/own/update/", {
            method: "PUT",
            headers: {
                'X-CSRFToken': csrfToken
            },
            credentials: "include",
            body: formData
        })
        
        if (response.ok) {
            // Fetch user account details if authenticated
            let userData = await response.json();
            if (userData.education === null) 
            {
                userData.education = []
            }
            if (userData.experience === null) 
            {
                userData.experience = []
            }
            setSavedProfile(userData);
            setEditedProfile(userData);
        } else {
            console.log("no user logged in")
        }
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

    if (loading) return <>Loading...</>

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
                    {savedProfile === editedProfile && image === null?
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
                            <input type="file" class="form-control" name="pfp" accept="image/*" 
                            onChange={handleImageChange} />
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
                                onChange={handleInputChange} value={editedProfile.bio} placeholder="Type your bio here">
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
                            <select class="form-select" name="vis_act" value={editedProfile.vis_act}
                            onChange={handleInputChange}>
                                <option value='1'>Public</option>
                                <option value='2'>Network Only</option>
                                <option value='3'>Private</option>
                            </select>
                            <label for="state" class="form-label">Education Visibility</label>
                            <select class="form-select" name="vis_edu" value={editedProfile.vis_edu}
                            onChange={handleInputChange}>
                                <option value='1'>Public</option>
                                <option value='2'>Network Only</option>
                                <option value='3'>Private</option>
                            </select>
                            <label for="state" class="form-label">Experience Visibility</label>
                            <select class="form-select" name="vis_exp" value={editedProfile.vis_exp}
                            onChange={handleInputChange}>
                                <option value='1'>Public</option>
                                <option value='2'>Network Only</option>
                                <option value='3'>Private</option>
                            </select>
                            <label for="state" class="form-label">Contact Info Visibility</label>
                            <select class="form-select" name="vis_cont" value={editedProfile.vis_cont}
                            onChange={handleInputChange}>
                                <option value='1'>Public</option>
                                <option value='2'>Network Only</option>
                                <option value='3'>Private</option>
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
                        <img src={savedProfile.pfp} alt="Avatar" style={{width:"110px", height:"110px"}} className="link-image" />
                        <div style={{textAlign:"left", marginLeft:"15px", alignContent:"center", height:"100%"}}>
                        <h3 style={{marginBottom: "0px", fontSize:"32px"}}>
                            {savedProfile.name + " " + savedProfile.surname}
                        </h3>
                        <p style={{marginBottom: "0px", fontSize:"20px"}}>
                            {savedProfile.title}
                        </p>
                        </div>
                    </div>
                    {savedProfile.email !== "" || savedProfile.phone !== "" || savedProfile.website !== "" ?
                    <p style={{textAlign:"right", marginBottom:"0px", marginTop:"10px"}}>
                        Contact information<br/>
                        {savedProfile.email?<> Email: {savedProfile.email}<br/> </>:<></>}
                        {savedProfile.phone?<> Phone: {savedProfile.phone}<br/> </>:<></>}
                        {savedProfile.website?<> Website: {savedProfile.website}<br/> </>:<></>}
                    </p>
                    :
                    <p style={{textAlign:"right", marginBottom:"0px", marginTop:"10px"}}>
                        Contact information<br/>
                        Email: {savedProfile.email}<br/>
                        Phone: {savedProfile.phone}<br/>
                        Website: {savedProfile.website}
                    </p>
                    }
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
                    {savedProfile.bio ? 
                    <p>
                        {savedProfile.bio}
                    </p>
                    :
                    <p>
                        No bio set
                    </p>
                    }
                    <h4 style={{marginBottom:"2px"}}>
                        Experience
                    </h4>
                    {savedProfile.experience.length !== 0? 
                        <ul>
                            {savedProfile.experience.map((exp) =>
                                <li>{exp}</li>
                            )}
                        </ul>  
                        :
                        <p>No experience set</p>
                    }
                    
                    <h4 style={{marginBottom:"2px"}}>
                        Education
                    </h4>
                    {savedProfile.education.length !== 0? 
                        <ul>
                            {savedProfile.education.map((exp) =>
                                <li>{exp}</li>
                            )}
                        </ul>  
                        :
                        <p>No education set</p>
                    }
                </div>
                :
                (mode === "posts"
                    ?
                    (posts.length !== 0 ?
                        <>
                        {
                        posts.map(post => (
                            <Postbox post={post}/> 
                        ))
                        }
                        </> 
                    :
                        <>No posts</>
                    )
                    :
                    (mode === "listings"
                    ?
                    <>
                        {listings.length !== 0  ? 
                        <>
                        {listings.map((listi) =>
                            <JobTile listing={listi} handleSelect={goToJobListing} active={false} />
                        )}
                        </>
                        :
                        <>
                            No Listings found
                        </>
                        }
                        
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