import React, {useState, useEffect} from "react";
import Header from "../../Components/Header";
import { useSearchParams } from 'react-router-dom';
import NotFoundPG from '../NotFoundPG';
import {jwtDecode} from "jwt-decode";

function AccountViewPGA(props) {

    const [activePosts, setActivePosts] = useState(false);
    const [selectedActivity, setActivity] = useState("network");
    const [noAuth, setNoAuth] = useState(false)
    
    const [searchParams] = useSearchParams();

    const id = searchParams.get('user_id');
    const [exportSelection, setExportSelection] = useState(
    {
        selectedUsers: [id],
        format: "JSON",
        selectedArtifacts: []
    });


    const [profile, setProfile] = useState({});
    const [personal, setPersonal] = useState({});
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [listings, setListings] = useState([]);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [applications, setApplications] = useState([]);
    const [connections, setConnections] = useState([]);

    
    useEffect(() => {

        const fetchProfile = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/profile", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchPersonal = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/personal", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setPersonal(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchListings = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/listings", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setListings(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchApplications = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/applications", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setApplications(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchPosts = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/posts", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchComments = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/comments", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchLikes = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/likes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setLikes(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchConnections = async () => {

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/admin/fetch/connections", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({"user_id": id})
            });

            if (response.ok) {
                const data = await response.json();
                setConnections(data);  
            } else {
                throw new Error('Failed to fetch posts');
            }
        };


        const token = localStorage.getItem('access_token');        
        // If no token, redirect to login
        if (!token) {
            setNoAuth(true);
            return
        }
        const decodedToken = jwtDecode(token);
        if (!decodedToken.is_admin) {
            setNoAuth(true);
            return
        }
        fetchProfile();
        fetchPersonal();
        fetchPosts();
        fetchComments();
        fetchLikes();
        fetchApplications();
        fetchListings();
        fetchConnections();
        setLoading(false);
    }, []);


    const handleArtifactsChange = (e) => {
        const {id} = e.target;
        if(!exportSelection.selectedArtifacts.includes(id))
        {
            setExportSelection({
                ...exportSelection,
                selectedArtifacts: [...exportSelection.selectedArtifacts, id]
            })
        }
        else
        {
            setExportSelection({
                ...exportSelection,
                selectedArtifacts: exportSelection.selectedArtifacts.filter(art => art !== id)
            });
        }
    }

    const handleExport = async () => {
        const token = localStorage.getItem('access_token');
        console.log(exportSelection)
        const response = await fetch("http://127.0.0.1:8000/admin/export", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            
            body: JSON.stringify(exportSelection)
        });

        if (!response.ok) {
            throw new Error('Failed to download file');
        }
    
        // Manage the file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        
        if(exportSelection.format === "XML")
            {link.setAttribute('download', 'user_data.xml');}
        else
            {link.setAttribute('download', 'user_data.json');}
        
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setExportSelection({
            selectedUsers: [],
            format: "JSON",
            selectedArtifacts: []
        });


    }

    const handleFormatChange = (e) => {
        const {value} = e.target
        setExportSelection({...exportSelection, format: value});
        console.log(exportSelection)
    }


    if (noAuth) return <NotFoundPG/>
    if (loading) return <>Loading...</>

    return (
        <div>
            <Header log='admin' act='view'/>
            <div style={{display:"flex", width:"70%", marginLeft:"15%", marginTop:"10px", flexDirection:"column"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",
                alignContent:"end",
                borderBottom:"#aaa solid 1px", marginBottom:"5px", paddingBottom:"2px", width:"100%"}}>
                    <a class="btn btn-secondary btn-sm" href="/admin">
                        {"< Back"}
                    </a>
                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exportmodal">
                        Export Selected
                    </button>
                    <div class="modal fade" id="exportmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                    style={{textAlign:"left"}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Export Options</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <p style={{marginBottom:"3px"}}>What do you want to export?</p>
                            <div class="row" style={{marginBottom:"5px"}}>
                                <div class="col-md-6">
                                    <form>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Personal Information"
                                            checked={exportSelection.selectedArtifacts.includes("Personal Information")}
                                            onChange={handleArtifactsChange}
                                            />
                                            <label class="form-check-label" for="persinfo">
                                                Personal Information
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Profile Information"
                                            checked={exportSelection.selectedArtifacts.includes("Profile Information")}
                                            onChange={handleArtifactsChange}/>
                                            <label class="form-check-label" for="profinfo">
                                                Profile Information
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Posts"
                                            checked={exportSelection.selectedArtifacts.includes("Posts")}
                                            onChange={handleArtifactsChange}/>
                                            <label class="form-check-label" for="Posts">
                                                Posts
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Listings"
                                            checked={exportSelection.selectedArtifacts.includes("Listings")}
                                            onChange={handleArtifactsChange}/>
                                            <label class="form-check-label" for="Listings">
                                                Listings
                                            </label>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-md-6">
                                    <form>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Network"
                                            checked={exportSelection.selectedArtifacts.includes("Network")}
                                            onChange={handleArtifactsChange}/>
                                            <label class="form-check-label" for="Network">
                                                Network
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Comments"
                                            checked={exportSelection.selectedArtifacts.includes("Comments")}
                                            onChange={handleArtifactsChange}/>
                                            <label class="form-check-label"for="Comments">
                                                Comments
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Likes"
                                            checked={exportSelection.selectedArtifacts.includes("Likes")}
                                            onChange={handleArtifactsChange}/>
                                            <label class="form-check-label" for="Likes">
                                                Likes
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="Applications"
                                            checked={exportSelection.selectedArtifacts.includes("Applications")}
                                            onChange={handleArtifactsChange}/>
                                            <label class="form-check-label" for="Applications">
                                                Applications
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-4" style={{marginBottom:"10px"}}>
                                <label for="level" class="form-label" style={{marginBottom:"5px"}}>Export format</label>
                                <select class="form-select" name="level" value={exportSelection.format}
                                onChange={handleFormatChange}>
                                    <option value="JSON">JSON</option>
                                    <option value="XML">XML</option>
                                </select>
                            </div>
                            
                            
                            <div style={{borderTop:"#ccc solid 1px", paddingTop:"4px"}}>
                            {exportSelection.selectedArtifacts.length !== 0
                            ?
                            <p style={{marginBottom:"0px"}}>You are about to export 
                                {exportSelection.selectedArtifacts.map((art) => <>{" "+ art + ","}</>)}
                                {" "} 
                                from user #{id}.
                            </p>
                            :
                            <p style={{marginBottom:"0px"}}>
                                You must select something to export.
                            </p>
                            }
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Back</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            disabled={exportSelection.selectedArtifacts.length === 0} onClick={handleExport}>Export</button>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                <div style={{marginBottom:"5px", width:"100%", textAlign:"left"}}>
                    <h5>Profile Information</h5>
                    <div class="row" style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-4" style={{display:"flex", justifyContent:"center"}}>
                                    <img src={"http://127.0.0.1:8000" + profile.pfp} width={"125px"} height={"125px"} style={{borderRadius:"25%", marginTop:"10px"}}/>
                                </div>
                                <div class="col-md-8" style={{marginBottom:"5px"}}>
                                    <div class="row">
                                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                                            <label class="form-label" style={{marginBottom:"2px"}}>Name</label>
                                            <input type="text" class="form-control" value={profile.name} placeholder="Not filled" disabled/>
                                        </div>
                                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                                            <label class="form-label" style={{marginBottom:"2px"}}>Surname</label>
                                            <input type="text" class="form-control" value={profile.surname} placeholder="Not filled" disabled/>
                                        </div>
                                    </div>
                                    <div class="col-md-12" style={{marginBottom:"5px"}}>
                                        <label class="form-label" style={{marginBottom:"2px"}}>Title</label>
                                        <input type="text" class="form-control" value={profile.title} placeholder="Not filled" disabled/>
                                    </div>
                                </div>
                                <div class="col-md-12" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Bio</label>
                                    <textarea class="form-control" name="pfBio"
                                    value={profile.bio} disabled placeholder="Not filled">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Email</label>
                                <input type="email" class="form-control" name="pfEmail" value={profile.email}
                                disabled placeholder="Not filled"/>
                            </div>
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                                <input type="tel" class="form-control" value={profile.phone} 
                                disabled placeholder="Not filled"/>
                            </div>
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Website</label>
                                <input type="link" class="form-control" value={profile.website}
                                disabled placeholder="Not filled"/>
                            </div>
                        </div>
                                            
                        <div class="row">
                            <div class="col-md-6" style={{marginBottom:"3px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Experience</label>
                                <ul id="experienceList" class="list-group">
                                    {profile.experience
                                    ?
                                    (profile.experience.map((_, index) =>
                                        <li class="list-group-item">
                                            {profile.experience[index]}
                                        </li>                                
                                    ))
                                    :
                                        <li class="list-group-item">
                                            Not filled
                                        </li>                                
                                    }
                                    
                                    
                                </ul>
                            </div>
                            <div class="col-md-6" style={{marginBottom:"3px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Education</label>
                                <ul id="educationList" class="list-group">
                                    {profile.education
                                        ?
                                        (profile.education.map((_, index) =>
                                            <li class="list-group-item">
                                                {profile.education[index]}
                                            </li>                                
                                        ))
                                        :
                                        <li class="list-group-item">
                                            Not filled
                                        </li>                                    
                                    }
                                </ul>
                            </div>
                        </div>                
                    </div>
                </div>
                <div style={{textAlign:"left"}}>
                <h5>Personal Information</h5>
                <div class="row" style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                    <div class="col-md-12" style={{marginBottom:"5px"}}>
                        <div class="row">
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Name</label>
                                <input type="text" class="form-control" value={personal.name} disabled 
                                placeholder="Not filled"/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Email</label>
                                <input type="text" class="form-control" value={personal.email} disabled 
                                placeholder="Not filled"/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Country</label>
                                <input type="text" class="form-control" value={personal.country} disabled
                                placeholder="Not filled"/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Birthdate</label>
                                <input type="text" class="form-control" value={personal.birthdate} disabled
                                placeholder="Not filled"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" style={{marginBottom:"5px"}}>
                        <div class="row">
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Surname</label>
                                <input type="text" class="form-control" value={personal.surname} disabled
                                placeholder="Not filled"/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                                <input type="text" class="form-control" value={personal.phone} disabled
                                placeholder="Not filled"/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>City</label>
                                <input type="text" class="form-control" value={personal.city} disabled
                                placeholder="Not filled"/>
                            </div>
                        </div>
                    </div>
                                    
                </div>
                </div>

                <div style={{textAlign:"left", marginBottom:"10px"}}>
                    <h5>User Uploads</h5>
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class={activePosts? "nav-link active": "nav-link"} onClick={() => {setActivePosts(true)}}>Posts</a>
                        </li>
                        <li class="nav-item">
                            <a class={!activePosts? "nav-link active": "nav-link"} onClick={() => {setActivePosts(false)}}>Listings</a>
                        </li>
                    </ul>
                    <div>
                    <table class="table table-striped table-bordered">
                        {activePosts ?
                        <>
                            <thead>
                            <tr>
                                <th scope="col">PID</th>
                                <th scope="col">Text</th>
                                <th scope="col">Images</th>
                                <th scope="col">LikeCount</th>
                                <th scope="col">CommentCount</th>
                            </tr>
                            </thead>
                            <tbody>
                                {posts.length !== 0 
                                ?
                                (posts.map((post) =>
                                <tr data-id={post.post_id}>
                                    <th scope="row">{post.post_id}</th>
                                    <td>{post.text}</td>
                                    <td>{post.media?
                                        <>
                                        {post.images.map((image, index) => (
                                        <a key={index} href={"http://127.0.0.1:8000" + image.image}>image #{index}</a>
                                        ))
                                        }
                                        </>
                                        :
                                        <>none</>
                                        
                                        
                                        }</td>
                                    <td>{post.like_cnt}</td>
                                    <td>{post.comment_cnt}</td>
                                </tr>
                                ))
                                :
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">#</th>
                                    <td colspan="4">No Post Found</td>
                                </tr>
                                }
                            </tbody>
                        </>
                        :
                        <>
                            <thead>
                            <tr>
                                <th scope="col">LID</th>
                                <th scope="col">Visibility</th>
                                <th scope="col">Title</th>
                                <th scope="col">Level</th>
                                <th scope="col">Spot</th>
                                <th scope="col">Hours</th>
                                <th scope="col">Location</th>
                                <th scope="col">Description</th>
                                <th scope="col">#Application</th>
                            </tr>
                            </thead>
                            <tbody>
                                {listings.length !== 0 ?
                                (listings.map((listi) =>
                                    <tr data-id={listi.listing_id}>
                                        <th scope="row">{listi.listing_id}</th>
                                        <td>{listi.visible === 3?
                                        "Private" : (listi.visible === 2 ? "Network" : "Public")}</td>
                                        <td>{listi.title}</td>
                                        <td>{listi.level}</td>
                                        <td>{listi.spot}</td>
                                        <td>{listi.time}</td>
                                        <td>{listi.location}</td>
                                        <td style={{wordBreak:"break-all"}}>{listi.desc}</td>
                                        <td>0</td>
                                    </tr>
                                ))
                                :
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">#</th>
                                    <td colspan="8">No Post Found</td>
                                </tr>
                                }
                            </tbody>
                        </>

                        }
                    </table>
                    </div>
                </div>
                <div style={{textAlign:"left", marginBottom:"40px"}}>
                    <h5>User Activity</h5>
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class={selectedActivity === "network"? "nav-link active": "nav-link"} onClick={() => {setActivity("network")}}>Network</a>
                        </li>
                        <li class="nav-item">
                            <a class={selectedActivity === "likes"? "nav-link active": "nav-link"} onClick={() => {setActivity("likes")}}>Likes</a>
                        </li>
                        <li class="nav-item">
                            <a class={selectedActivity === "comments"? "nav-link active": "nav-link"} onClick={() => {setActivity("comments")}}>Comments</a>
                        </li>
                        <li class="nav-item">
                            <a class={selectedActivity === "applications"? "nav-link active": "nav-link"} onClick={() => {setActivity("applications")}}>Applications</a>
                        </li>
                    </ul>
                    <div>
                    <table class="table table-striped table-bordered">
                        {selectedActivity === "network" ?
                        <>
                            <thead>
                            <tr>
                                <th scope="col">UID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Title</th>
                            </tr>
                            </thead>
                            <tbody>
                                {connections.length ? 
                                (connections.map((usr) =>
                                <tr data-id={usr.uid}>
                                    <th scope="row">{usr.user_id}</th>
                                    <td>{usr.name + " " + usr.surname}</td>
                                    <td>{usr.title}</td>
                                </tr>
                                ))
                                :
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">#</th>
                                    <td colspan="8">No Network Links found</td>
                                </tr>
                                }
                            </tbody>
                        </>
                        :
                        (selectedActivity === "likes"?
                        <>
                            <thead>
                            <tr>
                                <th scope="col">Post ID</th>
                            </tr>
                            </thead>
                            <tbody>
                                {likes.length !== 0
                                ?
                                (likes.map((post) =>
                                    <tr data-id={post.post}>
                                        <th scope="row">{post.post}</th>
                                    </tr>
                                ))
                                :
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">#</th>
                                    <td colspan="1">No Likes found</td>
                                </tr>
                                }
                            </tbody>
                        </>
                        :(selectedActivity === "comments"
                        ?
                        <>
                            <thead>
                            <tr>
                                <th scope="col">Comment ID</th>
                                <th scope="col">Post ID</th>
                                <th scope="col">Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                                {comments.length !== 0 ?

                                (comments.map((post) =>
                                    <tr data-id={post.comment_id}>
                                        <th scope="row">{post.comment_id}</th>
                                        <td>{post.post_id}</td>
                                        <td>{post.text}</td>
                                    </tr>
                                ))
                                :
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">#</th>
                                    <td colspan="2">No comments found</td>
                                </tr>
                                }
                            </tbody>
                        </>
                        :
                        <>
                            <thead>
                            <tr>
                                <th scope="col">Listing ID</th>
                            </tr>
                            </thead>
                            <tbody>
                                {applications.length !== 0?
                                (applications.map((post) =>
                                    <tr data-id={post.id}>
                                        <th scope="row">{post.listing}</th>
                                    </tr>
                                ))
                                :
                                <tr style={{textAlign:"center"}}>
                                    <td colspan="2">No applications found</td>
                                </tr>
                                }
                            </tbody>
                        </>
                        )
                        )

                        }
                    </table>
                    </div>
                </div>
            </div>


        </div>

    );
}
export default AccountViewPGA;    