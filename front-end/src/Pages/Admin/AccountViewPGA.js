import React, { useState } from "react";
import Header from "../../Components/Header";

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

const dummyNetwork = 
[
{
    uid: "0",
    name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
    title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
    imgURL: "/logo192.png"
},
{
    uid: "1",
    name: "Theopoula Tzini",
    title:"CEO of Ibizaaaaaaaaaaaaaaaa",
    imgURL: "/logo192.png"
},
{
    uid: "2",
    name: "ANitsaaaaaaaaaaaaaa",
    title:"CEO of Koup Skoup",
    imgURL: "/logo192.png"
}
]



const dummyprofile =
{
    pfname: "Lakis",
    pfsurname: "Lalakis",
    pfimgURL: "/logo192.png",
    pfemail: "work@work.work",
    pfphone: "2103333333",
    pfwebsite: "google.com",
    pfbio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    pfexperience: ["Important", "Important", "Important"],
    pfeducation: ["Important", "Important"],
    
    id: 12,
    name: "Lakis",
    surname: "Lalakis",
    email: "kati@kati.cy",
    phone: "+306947589234",
    birthdate: "10/10/10",
    country: "Greece",
    city: "Athens",
    password: "...",

    
    listings: dammylistings,
    network: dummyNetwork,
    applications: [],
    posts: [],
    likes: [],
    comments: [],

}


function AccountViewPGA(props) {

    const [activePosts, setActivePosts] = useState(false);
    const [selectedActivity, setActivity] = useState("network");

    const [exportSelection, setExportSelection] = useState(
    {
        format: "JSON",
        selectedArtifacts: []
    });

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
                                onChange={(e) => {setExportSelection({...exportSelection, format: e.value});}}>
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
                                from user #{dummyprofile.id} .
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
                            disabled={exportSelection.selectedArtifacts.length === 0}>Export</button>
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
                                    <img src={dummyprofile.pfimgURL} width={"120px"} height={"120px"}/>
                                </div>
                                <div class="col-md-8" style={{marginBottom:"5px"}}>
                                    <div class="row">
                                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                                            <label class="form-label" style={{marginBottom:"2px"}}>Name</label>
                                            <input type="text" class="form-control" value={dummyprofile.pfname} disabled/>
                                        </div>
                                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                                            <label class="form-label" style={{marginBottom:"2px"}}>Surname</label>
                                            <input type="text" class="form-control" value={dummyprofile.pfsurname} disabled/>
                                        </div>
                                    </div>
                                    <div class="col-md-12" style={{marginBottom:"5px"}}>
                                        <label class="form-label" style={{marginBottom:"2px"}}>Title</label>
                                        <input type="text" class="form-control" value={dummyprofile.pftitle} disabled/>
                                    </div>
                                </div>
                                <div class="col-md-12" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Bio</label>
                                    <textarea class="form-control" name="pfBio"
                                    value={dummyprofile.pfbio} disabled>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Email</label>
                                <input type="email" class="form-control" name="pfEmail" value={dummyprofile.pfemail}
                                disabled/>
                            </div>
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                                <input type="tel" class="form-control" value={dummyprofile.pfphone} 
                                disabled/>
                            </div>
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Website</label>
                                <input type="link" class="form-control" value={dummyprofile.pfwebsite}
                                disabled/>
                            </div>
                        </div>
                                            
                        <div class="row">
                            <div class="col-md-6" style={{marginBottom:"3px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Experience</label>
                                <ul id="experienceList" class="list-group">
                                    {dummyprofile.pfexperience.map((_, index) =>
                                        <li class="list-group-item">
                                            {dummyprofile.pfexperience[index]}
                                        </li>                                    
                                    )}
                                </ul>
                            </div>
                            <div class="col-md-6" style={{marginBottom:"3px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Education</label>
                                <ul id="educationList" class="list-group">
                                    {dummyprofile.pfeducation.map((_, index) =>
                                        <li class="list-group-item">
                                            {dummyprofile.pfeducation[index]}
                                        </li>                                    
                                    )}
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
                                <input type="text" class="form-control" value={dummyprofile.name} disabled/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Email</label>
                                <input type="text" class="form-control" value={dummyprofile.email} disabled/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Country</label>
                                <input type="text" class="form-control" value={dummyprofile.country} disabled/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Birthdate</label>
                                <input type="text" class="form-control" value={dummyprofile.birthdate} disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" style={{marginBottom:"5px"}}>
                        <div class="row">
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Surname</label>
                                <input type="text" class="form-control" value={dummyprofile.surname} disabled/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                                <input type="text" class="form-control" value={dummyprofile.phone} disabled/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>City</label>
                                <input type="text" class="form-control" value={dummyprofile.city} disabled/>
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
                                {dummyprofile.posts.length !== 0 
                                ?
                                (dummyprofile.posts.map((post) =>
                                <tr data-id={post.id}>
                                    <th scope="row">{post.id}</th>
                                    <td>{post.text}</td>
                                    <td>{post.images}</td>
                                    <td>{post.likeCount}</td>
                                    <td>{post.commentCount}</td>
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
                                <th scope="col">State</th>
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
                                {dummyprofile.listings.length !== 0 ?
                                (dummyprofile.listings.map((listi) =>
                                    <tr data-id={listi.id}>
                                        <th scope="row">{listi.id}</th>
                                        <td>{listi.state}</td>
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
                                {dummyprofile.network.length ? 
                                (dummyprofile.network.map((usr) =>
                                <tr data-id={usr.uid}>
                                    <th scope="row">{usr.uid}</th>
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
                                <th scope="col">PID</th>
                                <th scope="col">Poster's UID</th>
                            </tr>
                            </thead>
                            <tbody>
                                {dummyprofile.posts.length !== 0
                                ?
                                (dummyprofile.posts.map((post) =>
                                    <tr data-id={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.uid}</td>
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
                                <th scope="col">LID</th>
                                <th scope="col">Poster's UID</th>
                                <th scope="col">Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                                {dummyprofile.comments.length !== 0 ?

                                (dummyprofile.comments.map((post) =>
                                    <tr data-id={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.uid}</td>
                                        <td>{post.comment}</td>
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
                                <th scope="col">PID</th>
                                <th scope="col">Poster's UID</th>
                            </tr>
                            </thead>
                            <tbody>
                                {dummyprofile.applications.length !== 0?
                                (dummyprofile.applications.map((post) =>
                                    <tr data-id={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.uid}</td>
                                    </tr>
                                ))
                                :
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">#</th>
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