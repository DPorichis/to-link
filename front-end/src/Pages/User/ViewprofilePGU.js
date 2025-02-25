// ViewprofilePGU.js
// Contains the page for displaying other user's profile
// =======================================


import React from "react";
import Header from "../../Components/Header";
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Postbox from "../../Components/Feed/Postbox";
import JobTile from "../../Components/Jobs/JobTile";
import { refreshAccessToken } from "../../functoolbox";
import NotFoundPG from "../NotFoundPG";
import ProfileBanner from "../../Components/Profile/ProfileBanner";

function ViewprofilePGU(props) {
    const navigate = useNavigate();

    // Activated info screen
    const [mode, setMode] = useState("info");
    
    // Rendering Control
    const [loading, setLoading] = useState(true);
    const [noAuth, setNoAuth] = useState(false);

    // Retrieve the userid from the url
    const [searchParams] = useSearchParams();
    const id = searchParams.get('user_id');
    
    // Profile Data
    const [viewProfile, setviewProfile] = useState({});
    const [relationship, setRelationship] = useState("No Connection");
    const [listings, setListings] = useState([]);
    const [posts, setPosts] = useState([]);
    const [network, setNetwork] = useState([]);

    // Fetch the requested user
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/profile/view/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "user_id": id
                })
            })
            
            if (response.ok) {
                // Fetch user account details if authenticated
                let userData = await response.json();
                setviewProfile(userData.profile_info)
                setRelationship(userData.relationship)
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchUser();
                }
                else
                {
                    console.log("no user logged in")
                    setNoAuth(true);
                }
                
            }else
            {
                setviewProfile(null);
                console.log("no user logged in")
                setNoAuth(true);
            }

            const response1 = await fetch("http://127.0.0.1:8000/listings/list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "specify_user": id
                })
            })

            if (response1.ok) {
                let answer = await response1.json();
                setListings(answer);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchUser();
                }
                else
                {
                    console.log("Problems with fetching listing info")
                }
                
            } else {
                console.log("Problems with fetching your listings info")
            }

            const response2 = await fetch("http://127.0.0.1:8000/posts/fetch/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "user_id": id
                })
            })

            if (response2.ok) {
                let answer = await response2.json();
                setPosts(answer);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchUser();
                }
                else
                {
                    console.log("Problems with fetching profile info")
                }
                
            } else {
                console.log("Problems with fetching profile info")
            }

            const response3 = await fetch("http://127.0.0.1:8000/links/other", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({
                    "other_user": id
                })

            })

            if (response3.ok) {
                let answer = await response3.json();
                setNetwork(answer);
            } else if (response3.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchUser();
                }
                else
                {
                    console.log("Problems with fetching your listings info")
                }
                
            } else {
                console.log("Problems with fetching your listings info")
            }
            setLoading(false);
        };

        fetchUser();
    }, []);
    

    // Handle Active section changes

    const handleInfo = () => {
        setMode("info");
    };

    const handlePosts = () => {
        setMode("posts");
    };

    const handleListings = () => {
        setMode("listings");
    };

    const handleNetwork = () => {
        setMode("network");
    };


    // Redirect to a user's listing

    const goToJobListing = (listi) => {
        navigate(`/user/listings?listing_id=${listi.listing_id}`)
    };


    // Handle connection request when user wants to issue one

    const handleRequestClick = async (userId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/request/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({ 'request_id': userId })
            });

            if (response.ok) {
                if(relationship === "Pending Request Sent")
                {
                    setRelationship("No Connection")
                } else
                {
                    setRelationship("Pending Request Sent")
                }
            } else {
                const errorResult = await response.json();
                alert(errorResult.error || "Failed to send request");
            }
        } catch (error) {
            console.error("Error sending request:", error);
            alert("An error occurred while sending the request");
        }
    };

    // Handle connection request when a request is present

    const handleResponseClick = async (answer) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await fetch("http://127.0.0.1:8000/request/respond", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({ 'request_id': id,
                    "request_response": answer
                 })
            });

            if (response.ok) {
                if(answer === "accept")
                {
                    setRelationship("Friends")
                }
                else{
                    setRelationship("No Connection")
                }
            } else {
                const errorResult = await response.json();
                alert(errorResult.error || "Failed to respond to request");
                setRelationship("No Connection")
            }
        } catch (error) {
            console.error("Error sending request:", error);
            alert("An error occurred while sending the request");
        }
    };

    // Prevent not Authenticated Users
    if(noAuth){
        return (<NotFoundPG />)
    }

    // Dont show anything when loading
    if(loading) return <>Loading...</>

    return (
        <div>
            <Header log="user" act=""/>
            <div style={{display:"flex", flexDirection:"column", width: "70%", marginLeft:"15%", marginTop:"20px"}}>
                {/* relationship banner */}
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:"5px"}}>
                    { relationship === "Friends" ?
                        <button type="button" class="btn btn-outline-dark" style={{paddingTop: "0px", paddingBottom: "0px", marginRight:"4px"}} onClick={()=>{navigate(`/user/Messages?user_id=${id}`);}}>
                                    Message
                        </button>
                        :
                        (relationship === "Pending Request Sent"?
                        
                            <button type="button" class="btn btn-outline-dark" style={{paddingTop: "0px", paddingBottom: "0px", marginRight:"4px"}} onClick={() => handleRequestClick(id)}>
                                Undo Link Request
                            </button>
                            
                        :
                        (relationship === "Pending Request Received"?
                            <>
                                <button type="button" class="btn btn-danger" style={{paddingTop: "0px", paddingBottom: "0px", marginRight:"4px"}} onClick={() => handleResponseClick("reject")}>
                                    Reject Request
                                </button>
                                <button type="button" class="btn btn-success" style={{paddingTop: "0px", paddingBottom: "0px", marginRight:"4px"}} onClick={() => handleResponseClick("accept")}>
                                    Accept Request
                                </button>
                            </>
                            
                        :
                        (relationship === "No Connection"?
                            <button type="button" class="btn btn-outline-dark" style={{paddingTop: "0px", paddingBottom: "0px", marginRight:"4px"}} onClick={() => handleRequestClick(id)}>
                                Request Link
                            </button>
                        :
                            <></>
                        )
                        
                        ))}
                
                
                    <button type="button" class="btn btn-outline-primary" style={{paddingTop: "0px", paddingBottom: "0px",
                        marginRight:"4px"
                    }}>Share Profile</button>
                </div>
                <>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignContent:"center", height:"100%",
                    marginBottom:"5px",  borderTop: "solid #ddd 1px", padding: "5px 5px"
                }}>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                        <img src={viewProfile.pfp} alt="Avatar" style={{width:"110px", height:"110px", borderRadius:"25%"}} className="link-image" />
                        <div style={{textAlign:"left", marginLeft:"15px", alignContent:"center", height:"100%"}}>
                        <h3 style={{marginBottom: "0px", fontSize:"32px"}}>
                            {viewProfile.name + " " + viewProfile.surname}
                        </h3>
                        <p style={{marginBottom: "0px", fontSize:"20px"}}>
                            {viewProfile.title}
                        </p>
                        </div>
                    </div>
                    {viewProfile.email !== "" || viewProfile.phone !== "" || viewProfile.website !== "" ?
                    <p style={{textAlign:"right", marginBottom:"0px", marginTop:"10px"}}>
                        Contact information<br/>
                        {viewProfile.email?<> Email: {viewProfile.email}<br/> </>:<></>}
                        {viewProfile.phone?<> Phone: {viewProfile.phone}<br/> </>:<></>}
                        {viewProfile.website?<> Website: {viewProfile.website}<br/> </>:<></>}
                    </p>
                    :
                    <p style={{textAlign:"right", marginBottom:"0px", marginTop:"10px"}}>
                        Contact information<br/>
                        Email: {viewProfile.email}<br/>
                        Phone: {viewProfile.phone}<br/>
                        Website: {viewProfile.website}
                    </p>
                    }
                </div>
                {/* Profile Sections */}
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
                        <a class={mode === "network" ? "nav-link active": "nav-link"} onClick={handleNetwork}>Network</a>
                    </li>
                </ul>
                {mode === "info"
                ?
                // General Info Section //
                <div style={{textAlign:"left", marginTop:"10px", padding: "5px 5px"}}>
                    <h4 style={{marginBottom:"2px"}}>
                        About {viewProfile.name}
                    </h4>
                    {viewProfile.bio? 
                        <p>
                            {viewProfile.bio}
                        </p>
                        :
                        <p>No bio set</p>
                    }

                    <h4 style={{marginBottom:"2px"}}>
                        Experience
                    </h4>
                    {viewProfile.experience? 
                        
                        (viewProfile.experience.length > 0 ? 
                            <ul>
                            {viewProfile.experience.map((exp) =>
                                <li>{exp}</li>
                            )}
                        </ul>  
                        :
                        <p>No experience set</p>
                        )
                        :
                        <p>No experience set</p>
                    }
                    <h4 style={{marginBottom:"2px"}}>
                        Education
                    </h4>
                    {viewProfile.education? 
                        (viewProfile.education.length > 0 ? 
                            <ul>
                                {viewProfile.education.map((exp) =>
                                    <li>{exp}</li>
                                )}
                            </ul>
                        :
                        <p>No education set</p>
                        )
                        :
                        <p>No education set</p>
                    }
                    <h4 style={{marginBottom:"2px"}}>
                        Skills
                    </h4>
                    {viewProfile.skills? 
                        <ul>
                            {viewProfile.skills.map((exp) =>
                                <li>{exp}</li>
                            )}
                        </ul>  
                        :
                        <p>No skills set</p>
                    }
                </div>
                :
                (mode === "posts"
                    ?
                    // Posts Section //
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
                    // Listings Section //
                    <>
                        {listings.count !== 0  ? 
                        <>
                        {listings.results.map((listi) =>
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
                    (network.length > 0
                        ?
                            network.map((link) => (
                                <ProfileBanner key={link.user_id} link={link}/>
                            )) 
                        :
                            <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius:"3px", padding:"20px 10px", marginTop:"10px"}}>
                                <h5>Network not Available</h5>
                            <p style={{marginBottom:"0px"}}>
                                Connect with user to be able to see their network
                            </p>
                            </div>
                    )
                    )

                )

                }
                
                </>
            </div>
        </div>
    );
}
export default ViewprofilePGU;    