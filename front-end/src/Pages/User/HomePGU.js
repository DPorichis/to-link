import React, {useState, useEffect} from "react";

import Header from "../../Components/Header";
import './homePGU.css';

import ProfileSmall from "../../Components/Profile/ProfileSmall";
import Postbox from "../../Components/Feed/Postbox";

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



function HomePGU(props) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [links, setLinks] = useState([]);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState({});
    
    useEffect(() => {
        const fetchPosts = async () => {
            const csrfToken = getCookie('csrftoken');
            try {
                const response = await fetch("http://127.0.0.1:8000/posts/fetch", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: "include",
                    body: JSON.stringify({})
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);  
                } else {
                    throw new Error('Failed to fetch posts');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchLinks = async () => {
            const csrfToken = getCookie('csrftoken');
            try {
                const response = await fetch("http://127.0.0.1:8000/links/list", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: "include",
                    body: JSON.stringify({})
                });

                if (response.ok) {
                    const data = await response.json();
                    setLinks(data);  
                    console.log("Fetched Links:", data);
                } else {
                    throw new Error('Failed to fetch Links');
                    
                }
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchProfile = async () => {
            const csrfToken = getCookie('csrftoken');
            try {
                const response = await fetch("http://127.0.0.1:8000/profile/own/fetch", {  
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: "include",
                    body: JSON.stringify({})
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log()
                    setProfile(data.profile_info);  
                } else {
                    throw new Error('Failed to fetch profile');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfile();
        console.log(profile)
        fetchPosts();
        fetchLinks();
        setLoading(false);
    }, []);

    if (loading) return <>Loading</>

    return (
        <div>
            <Header log="user" act="home"/>
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-around"}}>
            <div className="sidebar" style={{maxHeight:"90vh", overflow:"auto",width: "20%",alignItems:"left",textAlign:"left",padding:"5px 10px",borderRadius:"10px"}}>
                <div>   
                <h5>Profile view</h5>
                    <div className="Profile" style={{backgroundColor:"white",borderRadius:"10px",display:"flex",flexDirection:"column",padding:"5px 10px",marginBottom:"10px"}}>
                        <div style={{display:"flex",flexDirection:"row"}}>
                                <img src="/logo192.png" alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
                                <div style={{display:"flex",flexDirection:"column",marginBottom:"0px",marginTop:"0px",marginLeft:"5px"}}>
                                    <p style={{marginBottom:"0px",marginTop:"0px"}}>{profile.name} {profile.surname}</p>
                                    <p>{profile.title}</p>
                                </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",textAlign:"center"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h5 style={{marginBottom:"0px"}}>{profile.post_cnt}</h5>
                            <p style={{marginBottom:"0px"}}>posts</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h5 style={{marginBottom:"0px"}}>{profile.link_cnt}</h5>
                            <p style={{marginBottom:"0px"}}>Links</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h5 style={{marginBottom:"0px"}}>{profile.listings_cnt}</h5>
                            <p style={{marginBottom:"0px"}}>listings</p>
                            </div>
                        </div>
                    </div>
                    <h5>MY Links</h5>
                    <div className = "Links" style={{}}>
                            {links.map((link) =>
                            <ProfileSmall link={link}/>
                        )}
                    </div>
                </div>
            </div>
            <div style={{width: "60%",maxHeight:"90vh", overflow:"auto"}}>
                <h5 style={{textAlign:"left",marginBottom:"0px"}}>Upload</h5>
                <hr style={{ border: "1px solid black", margin: "5px 0px" }} />
                <div className="UploadBox" style={{display:"flex",flexDirection:"column",backgroundColor: "#96b9e42c",justifyContent:"flex-start",borderRadius:"9px",
                    width:"95%", marginLeft:"2.5%", border: "solid #A1AECE 1px"}}>
                <div style={{display:"flex",flexDirection:"row",padding:"10px 10px"}}>
                    <img src="/logo192.png" alt="Avatar" style={{width :"50px",height:"50px"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column", flex: "1"}}>
                        
                    <input style={{flex:"1", border:"none", marginTop:"4px", marginRight:"4px", marginLeft:"4px",borderRadius:"9px",
                        padding:"8px 5px"
                    }} placeholder="Brag to your Colleges about something..." type="text" /> 
                    <div style={{display:"flex", justifyContent:"space-between", marginTop:"8px", marginRight:"4px", marginLeft:"4px"}}>
                        <div>
                            <button type="button" class="btn btn-light" style={{marginRight:"4px"}}>
                                <img src="/upload.svg" style={{}} />
                                Upload Media
                            </button>
                            <button type="button" class="btn btn-light">
                                <img src="/link.svg" style={{}} />
                                Insert TOLINK
                            </button>
                        </div>
                        <button type="button" class="btn btn-primary">
                            Upload
                        </button>
                    </div>
                    </div>  
                </div>
                
                </div>
                <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between",marginTop:"10px"}}>
                    <h5 style={{textAlign:"left",marginBottom:"0px"}}>Your Feed</h5>
                    <select name="Short by" style={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius:"3px", outline: "none"}}>
                        <option value="Date">Sort by: Date</option>
                        <option value="Recomended">Sort by: Recommended</option>
                    </select>
                </div>
                <hr style={{ border: "1px solid black", margin: "5px 0px" }} />
                <div>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <Postbox post={post}/> 
                    ))
                ) : (
                    <p>No posts available</p>
                )}
                </div>
            </div>
        </div>
        </div>
    );
}
export default HomePGU;    