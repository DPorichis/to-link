import React, {useState, useEffect} from "react";

import Header from "../../Components/Header";
import './homePGU.css';

import ProfileSmall from "../../Components/Profile/ProfileSmall";
import NotFoundPG from '../NotFoundPG';
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
    const [noAuth, setNoAuth] = useState(false);
    const [profile, setProfile] = useState({});
    const [PostCount, setPostCount] = useState(); 
    
    
    const [postText, setpostText] = useState("");
    const [postMedia, setpostMedia] = useState([]);

    const handleTextChange = (e) => {
        const {value} = e.target
        setpostText(value)
    }


    // Handle selection
    const handleMediaChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        // Update both the state for files and the images
        setpostMedia(prevMedia => [...prevMedia, ...fileArray]);
        event.target.value = '';
    };

    // Handle removal
    const removeImage = (index) => {
        setpostMedia(prevMedia => prevMedia.filter((img, imgIndex) => imgIndex !== index));
    };


    const fetchPosts = async () => {
        const csrfToken = getCookie('csrftoken');
        try {
            const response = await fetch("http://127.0.0.1:8000/posts/fetch/all", {
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
            } else if(response.status === 403) {
                setNoAuth(true);
            } else {
                throw new Error('Failed to fetch posts');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUploadClick = async () => {
            const postData = new FormData();

            if (postMedia.length !== 0) {
                postMedia.forEach((file, index) => {
                    postData.append('image_uploads', file);
                });
                postData.append('media', true);
            }
            
            postData.append('text', postText)
        
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            const response = await fetch("http://127.0.0.1:8000/posts/upload/", {
                method: "POST",
                headers: {
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: postData
            });
            
            if (response.ok) 
            {
                console.log("Post Uploaded");
                fetchPosts();
                setPostCount(PostCount +1)
            }
            else{
                console.log("wrong");
            }
            setpostText("");
            setpostMedia([]);
        };



    useEffect(() => {
        
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
                } else if(response.status === 403) {
                    setNoAuth(true);
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
                    setPostCount(data.profile_info.post_cnt) 
                } else if(response.status === 403) {
                    setNoAuth(true);
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
    
    
    if(noAuth)
    {
        return (<NotFoundPG />)
    }

    return (
        <div>
            <Header log="user" act="home" pfp={profile.pfp}/>
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-around"}}>
            <div className="sidebar" style={{maxHeight:"90vh", overflow:"auto",width: "20%",alignItems:"left",textAlign:"left",padding:"5px 10px",borderRadius:"10px"}}>
                <div>   
                <h5>Profile view</h5>
                    <div className="Profile" style={{backgroundColor:"white",borderRadius:"10px",display:"flex",flexDirection:"column",padding:"5px 10px",marginBottom:"10px"}}>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <img src={profile.pfp} alt="Avatar" style={{width :"50px",height:"50px", borderRadius:"25%"}} className="link-image" />
                                <div style={{display:"flex",flexDirection:"column",marginBottom:"0px",marginTop:"0px",marginLeft:"5px"}}>
                                    <p style={{marginBottom:"0px",marginTop:"0px"}}>{profile.name} {profile.surname}</p>
                                    <p>{profile.title}</p>
                                </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",textAlign:"center"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h5 style={{marginBottom:"0px"}}>{PostCount}</h5>
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
                    <img src={profile.pfp} alt="Avatar" style={{width :"50px",height:"50px", borderRadius:"25%"}} className="link-image" />
                    <div style={{display:"flex", flexDirection:"column", flex: "1"}}>
                        
                    <input style={{flex:"1", border:"none", marginTop:"4px", marginRight:"4px", marginLeft:"4px",borderRadius:"9px",
                        padding:"8px 5px"
                    }} placeholder="Brag to your Colleges about something..." type="text" onChange={handleTextChange} value={postText}/> 
                    <div style={{display:"flex", justifyContent:"space-between", marginTop:"8px", marginRight:"4px", marginLeft:"4px"}}>
                        <div>

                        <label type="button" class="btn btn-light">
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display:'none'}}  // Hide the input
                                    onChange={handleMediaChange}
                                />
                                <img src="/upload.svg" style={{}} />
                                Upload Media
                            </label>
                        </div>
                        <button type="button" class="btn btn-primary" onClick={handleUploadClick}>
                            Upload
                        </button>
                    </div>
                    {postMedia.length !== 0 ?
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"left", marginTop:"8px", marginRight:"4px", marginLeft:"4px"}}>
                        <p>Attached Media</p>
                        {postMedia.map((image, index) => (
                            <div key={index} style={{display:"flex", border:"1px solid #ddd", justifyContent:"space-between",
                                borderRadius:"5px", backgroundColor:"#fff"
                            }}>
                                <p style={{padding:"0px 0px", margin:"3px 3px"}}>Media Attached: {image.name}</p>
                                <button onClick={() => removeImage(index)}
                                type="button" class="btn btn-danger btn-sm">
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    :
                    <>
                    </>
                    }
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