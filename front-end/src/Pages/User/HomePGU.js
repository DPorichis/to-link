import React, {useState, useEffect} from "react";

import Header from "../../Components/Header";
import './homePGU.css';
import {refreshAccessToken} from "../../functoolbox"
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
    const [postsToShow, setPostsToShow] = useState(5);

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


    const deletePost = async (postId) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await fetch("http://127.0.0.1:8000/posts/delete/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id: postId })  // Sending the post ID in the request body
            });
    
            if (response.ok) {
                console.log("Post deleted successfully");
                setPosts(posts.filter(post => post.post_id !== postId));  // Remove post from the frontend
                setPostCount(PostCount - 1);  // Update the post count in the frontend
            } else if (response.status === 403) {
                console.log("You don't have permission to delete this post.");
            } else {
                console.log("Failed to delete post");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle removal
    const removeImage = (index) => {
        setpostMedia(prevMedia => prevMedia.filter((img, imgIndex) => imgIndex !== index));
    };

    const PostsList = ({ posts }) => {
        // Set initial state for number of posts to display
        const [postsToShow, setPostsToShow] = useState(5);
    
        // Function to handle loading more posts
        const loadMorePosts = () => {
            setPostsToShow(prevPostsToShow => prevPostsToShow + 5);
        };
    }



const fetchPostid = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch("http://127.0.0.1:8000/posts/getid", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Fetched Post IDs:", data); 
        return data;
    } else {
        throw new Error('Failed to fetch post IDs');
    }
};


const fetchPosts = async () => {
    const token = localStorage.getItem('access_token');
    try {
        const postIds = await fetchPostid();
        console.log("POST ID IN FETCH", postIds);
        if (postIds && postIds.length > 0) {
            const response = await fetch("http://127.0.0.1:8000/posts/view/byid", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"post_id" : postIds }) 
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data);  
            } else if (response.status === 403) {
                setNoAuth(true);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if (localStorage.getItem('access_token') !== null) {
                    await fetchPosts(); 
                } else {
                    console.log("No user logged in");
                    setNoAuth(true);
                }   
            } else {
                throw new Error('Failed to fetch posts');
            }
        } else {
            console.log("No post IDs found");
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



    const handleUploadClick = async () => {
        const token = localStorage.getItem('access_token');
        const postData = new FormData();

        if (postMedia.length !== 0) {
            postMedia.forEach((file, index) => {
                postData.append('image_uploads', file);
            });
            postData.append('media', true);
        }
        
        postData.append('text', postText)

        const response = await fetch("http://127.0.0.1:8000/posts/upload/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: postData
        });
        
        if (response.ok) 
        {
            console.log("Post Uploaded");
            fetchPosts();
            setPostCount(PostCount +1);
            setpostText("");
            setpostMedia([]);
        }
        else{
            console.log("wrong");
        }
        
    };

    useEffect(() => {
        const fetchLinks = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/links/list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchLinks();
                }
                else
                {
                    console.log("no user logged in")
                    setNoAuth(true);
                }   
            } else {
                throw new Error('Failed to fetch posts');
            }
        };

        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/profile/own/fetch", {  
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({})
            });

            if (response.ok) {
                const data = await response.json();
                console.log()
                setProfile(data.profile_info); 
                setPostCount(data.profile_info.post_cnt) 
            } else if(response.status === 403) {
                setNoAuth(true);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchProfile();
                }
                else
                {
                    console.log("no user logged in")
                    setNoAuth(true);
                }   
            } else {
                throw new Error('Failed to fetch posts');
            }
        };
        fetchPostid();      
        fetchProfile();
        console.log(profile)
        fetchPosts();
        fetchLinks();
        setLoading(false);
    }, []);

    const loadMorePosts = () => {
        setPostsToShow(prev => prev + 5);  // Load 5 more posts
    };


    
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
                        {links.length > 0? 
                        (links.map((link) =>
                            <ProfileSmall link={link}/>
                        ))
                        :
                        <div style={{backgroundColor:"white",borderRadius:"10px", padding:"4px 4px", textAlign:"center"}}>
                            <h6 style={{marginBottom:"2px"}}>You have no connections</h6>
                            <p style={{marginBottom:"4px"}}>Let's change that!</p>
                            <a href="/user/network" class="btn btn-primary btn-sm">Go to network</a>
                        </div>
                    }
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
                    posts.slice(0, postsToShow).map(post => (
                        <Postbox post={post}/> 
                    ))
                ) : (
                    <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius:"3px", padding:"20px 10px"}}>
                        <h5>This place is awfully quiet...</h5>
                        <p style={{marginBottom:"0px"}}>We are a new app ok? Don't judge us that hard. <br/>
                        Instead, post something, the box is up there!</p>
                    </div>
                )}
                </div>
                {posts.length > postsToShow && (
                    <button 
                        style={{ marginTop: "10px" }}
                        className="btn btn-primary"
                        onClick={loadMorePosts}
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
        </div>
    );
}
export default HomePGU;    