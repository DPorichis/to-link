// ListingsPGU.js
// Users can view all job listings, create new listings, and manage their own listings.
// Also users are able to apply to job listings
// ===================================================================================

import React from "react";
import Header from "../../Components/Header";
import JobTile from "../../Components/Jobs/JobTile";
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import {refreshAccessToken} from "../../functoolbox"
import JobPreview from "../../Components/Jobs/JobPreview";
import NotFoundPG from '../NotFoundPG';
import JobDashboard from "../../Components/Jobs/JobDashboard";

function ListingsPGU(props) {

    // Selected Listing Info
    const [selectedListing, setSelectedListing] = useState({listing_id: "empty"});
    const [youApplied, setYouApplied] = useState("forbiden");

    // Listings by others
    const [responseListing, setResponseListings] = useState({});
    const [listings, setListings] = useState([]);

    // Listings by you
    const [responseOwn, setResponseOwn] = useState({});
    const [yourlistings, setYourListings] = useState([]);
    
    // Render Control
    const [noAuth, setNoAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // Section Control
    const [yourListingsView, setYourListingsView] = useState(false);

    // Fetching specific listing from URL
    const [searchParams] = useSearchParams();
    const id = searchParams.get('listing_id');

    // Listing selection from list
    const changeSelection = (listing) => {
        let list = listing
        if (list.skills === null) 
        {
            list.skills = []
        }
        
        setSelectedListing(list);
    };

    // Fetching Listings Created by you
    const fetchOwnListings = async (page) => {
        const token = localStorage.getItem('access_token');
        const response0 = await fetch(page ? page :"http://127.0.0.1:8000/listings/list", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "specify_user": "own"
            })
        })
        
        if (response0.ok) {
            let answer = await response0.json();
            setResponseOwn(answer);
            if(page)
            {
                setYourListings([...yourlistings, ...answer.results])
            }
            else
            {
                setYourListings(answer.results) 
            }
        } else if (response0.status === 401) {
            localStorage.removeItem('access_token');
            await refreshAccessToken();
            if(localStorage.getItem('access_token') !== null)
            {
                await fetchListings(page);
            }
            else if(response0.status === 403) {
                setNoAuth(true);
            }else
            {
                console.log("no user logged in")
                setNoAuth(true);
            }
            
        }else {
            console.log("Problems with fetching your listings info")
            setNoAuth(true);
        }
        setLoading(false);
    };


    // Fetching Listings Created by Others
    const fetchListings = async (page) => {
        const token = localStorage.getItem('access_token');
        const response1 = await fetch(page ? page :"http://127.0.0.1:8000/listings/list", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
            })
        })
        
        if (response1.ok) {
            let answer = await response1.json();
            setResponseListings(answer);
            if(page)
            {
                setListings([...listings, ...answer.results])
            }
            else
            {
                setListings(answer.results) 
            }
        } else if (response1.status === 401) {
            localStorage.removeItem('access_token');
            await refreshAccessToken();
            if(localStorage.getItem('access_token') !== null)
            {
                await fetchOwnListings();
            }
            else
            {
                console.log("no user logged in")
            }
            
        }else {
            console.log("Problems with fetching your listings info")
            setNoAuth(true);
        }
        setLoading(false);
    };

    // Fetch specific listing
    const restoreListing = async () => {
        const token = localStorage.getItem('access_token');
        const response = await fetch("http://127.0.0.1:8000/listing/fetch", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "listing_id": id
            })
        })
        
        if (response.ok) {
            // Fetch user account details if authenticated
            const listi = await response.json();
            changeSelection(listi);
        } else if (response.status === 401) {
            localStorage.removeItem('access_token');
            await refreshAccessToken();
            if(localStorage.getItem('access_token') !== null)
            {
                await restoreListing();
            }
            else
            {
                console.log("no user logged in")
                setNoAuth(true);
            }
            
        }else {
            console.log("Problems with fetching your listings info")
            setNoAuth(true);
        }
    };


    // Fetch the data according to uper functions
    useEffect(() => {
        fetchListings();
        fetchOwnListings();
        if(id)
        {
            restoreListing()
        }

    }, []);

    // Pagination managment
    const handleLoadMore = async (target) =>
    {
        if(target === "own")
        {
            fetchOwnListings(responseOwn.next)
        }
        else if(target === "all")
        {
            fetchListings(responseListing.next)
        }
    }

    // Fetch applied information upon selection change
    useEffect(() => {
        const checkApplied = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/listings/applied/check", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "listing_id": selectedListing.listing_id
                })
            })
            
            if (response.ok) {
                let answer = await response.json();
                setYouApplied(answer.applied);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await checkApplied();
                }
                else
                {
                    console.log("no user logged in")
                }
                
            }else {
                console.log("Problems with fetching your application info")
            }
        };
        if(yourListingsView === false && selectedListing.listing_id !== "empty")
            checkApplied();
    }, [selectedListing]);
    
    // Application Handling
    const toggleApply = () => {
        const apply = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/listings/applied/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "listing_id": selectedListing.listing_id
                })
            })
            
            if (response.ok) {
                let answer = await response.json();
                if(answer.applied)
                {
                    setYouApplied("applied")
                }
                else
                {
                    setYouApplied("allowed")
                }
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await apply();
                }
                else
                {
                    console.log("no user logged in")
                }
                
            }else {
                console.log("Problems with sending your applicaton")
            }
        };
        apply()
    };

    // Listing Creation Handling
    const createNewListing = async () =>
    {
        const token = localStorage.getItem('access_token');
        const response = await fetch("http://127.0.0.1:8000/listings/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": "Untitled",
                "visible": 3,
                "spot": "Not Filled",
                "time": "Not Filled",
                "level": "Not Filled",
                "desc": "Not Filled",
                "location": "Not Filled"
            })
        })

        fetchOwnListings();
    }

    // Listing Update Handling
    const updateListing = async (id, updatedListingData) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch("http://127.0.0.1:8000/listings/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify(updatedListingData)
        })
        
        if (response.ok) {
            // Fetch user account details if authenticated
            let answer = await response.json();
            
            setYourListings(prevListings => {
                return prevListings.map((item) => 
                  item.listing_id === answer.listing_id ? answer : item
                );
            });

            changeSelection(answer)

            console.log(answer)
        } else if (response.status === 401) {
            localStorage.removeItem('access_token');
            await refreshAccessToken();
            if(localStorage.getItem('access_token') !== null)
            {
                await updateListing(id, updatedListingData);
            }
            else
            {
                console.log("no user logged in")
            }
            
        }else {
            console.log("Problems with fetching your listings info")
        }
    };

    // Own Listing Selection
    const viewOwn = () => 
    {
        setSelectedListing({listing_id: "empty"});
        setYourListingsView(true);
    }

    // Other's Listing Selection
    const viewBrowse = async () => 
    {
        setSelectedListing({listing_id: "empty"});
        setLoading(true);
        fetchListings();
        setLoading(false);
        setYourListingsView(false);
    }

    // No render when loading
    if (loading) return <>Loadins</>

    
    // Prevent not Authenticated Users
    if(noAuth)
    {
        return (<NotFoundPG />)
    }

    return (
        <div>
            <Header log="user" act="listings"/>
            <div style={{display:"flex", flexDirection: "row", width: "90%", marginLeft: "5%", justifyContent:"space-between",
                marginTop:"10px", marginBottom:"10px"
            }}>
                <div style={{display: "flex", flexDirection:"column", width: "25%", justifyContent: "left", textAlign: "left"}}>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked={!yourListingsView}/>
                        <label class="btn btn-outline-primary" for="btnradio1" onClick={viewBrowse}>Browse Listings</label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked={yourListingsView}/>
                        <label class="btn btn-outline-primary" for="btnradio2" onClick={viewOwn}>Your Listings</label>
                    </div>
                </div>
            </div>
            {yourListingsView 
            ?
            // Your Listings List //
            <div style={{display:"flex", flexDirection: "row", width: "90%", marginLeft: "5%", justifyContent:"space-between"}}>
                <div style={{display: "flex", flexDirection:"column", width: "25%", justifyContent: "left", textAlign: "left"}}>
                    <div style={{padding: "5px 10px", borderRadius: "10px", border: "#ccc solid 1px", backgroundColor: "#ddd",
                        maxHeight:"80vh", overflow: "auto"
                    }}>
                        <h5>Your Listings</h5>
                        <button type="button" class="btn btn-success" style={{width: "100%"}} onClick={createNewListing}>Create new Listing</button>
                        
                        {yourlistings.length!==0?
                            <>{yourlistings.map((listi) =>
                                <JobTile listing={listi} handleSelect={changeSelection} active={selectedListing.listing_id === listi.listing_id} />
                            )}
                            {responseOwn.next?
                            <div style={{display:"flex", justifyContent:"center", flexDirection:"row",
                            width:"100%", marginTop:"2px", marginBottom:"2px"}}>
                                <button disabled={!responseOwn.next} 
                                    onClick={() => {handleLoadMore("own")}}
                                    class="btn btn-primary" type="button">
                                    Load More
                                </button>
                            </div>
                            :
                            <></>
                            }
                            </>
                            :
                            <div style={{textAlign:"center", padding:"10px 10px", borderRadius:"5px", backgroundColor:"#fff", marginTop:"10px"}}>
                                <h5>You have no listings...</h5>
                                <p style={{marginBottom:"3px"}}>Create a job listing to attract talent to <br/> your new startup or something</p>
                            </div>
                        }
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    {selectedListing.listing_id === "empty" ?
                    // Your Listings Selection //
                        <div style={{width:"100%", border: "1px #aaa solid",
                            padding: "20px 10px", borderRadius: "10px", textAlign:"left", textAlign:"center"}}>
                                <h4>Select a job from the left side bar</h4>
                                <p style={{marginBottom:"0px"}}>Select one of your listings to edit or check how applied.</p>
                        </div>     
                    :
                        <JobDashboard listing={selectedListing} update={updateListing}/>
                    }
                    
                </div>
            </div>
            :
            // Other's Listings List //
            <div style={{display:"flex", flexDirection: "row", width: "90%", marginLeft: "5%", justifyContent:"space-between"}}>
                <div style={{display: "flex", flexDirection:"column", width: "25%", justifyContent: "left", textAlign: "left"}}>
                    <div style={{padding: "5px 10px", borderRadius: "10px", border: "#ccc solid 1px", backgroundColor: "#ddd", maxHeight:"80vh", overflow: "auto"}}>
                        <h5>Browse Listings</h5>
                        
                        {listings.length!==0?
                            <>
                            {listings.map((listi) =>
                                <JobTile listing={listi} handleSelect={changeSelection} active={selectedListing.listing_id === listi.listing_id} />
                            )}
                            {responseListing.next?
                            <div style={{display:"flex", justifyContent:"center", flexDirection:"row",
                            width:"100%", marginTop:"2px", marginBottom:"2px"}}>
                                <button disabled={!responseListing.next} 
                                    onClick={() => {handleLoadMore("all")}}
                                    class="btn btn-primary" type="button">
                                    Load More
                                </button>
                            </div>
                            :
                            <></>
                            }
                            </>
                            :
                            <div style={{textAlign:"center", padding:"10px 10px", borderRadius:"5px", backgroundColor:"#fff"}}>
                                <h5>No listings found...</h5>
                                <p style={{marginBottom:"3px"}}>Not gonna lie, the job market seems awfull today... <br/>Check later as new jobs may be added</p>
                            </div>
                            
                        }
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    {selectedListing.listing_id === "empty" ?
                        // Other's Listings Selection //
                        <div style={{width:"100%", border: "1px #aaa solid",
                        padding: "20px 10px", borderRadius: "10px", textAlign:"left", textAlign:"center"}}>
                            <h4>Select a job from the left side bar</h4>
                            <p style={{marginBottom:"0px"}}>Found an intresting listing? Select it to preview it and apply.</p>
                        </div>    
                    :
                        <JobPreview listing={selectedListing} applied={youApplied} handleApply={toggleApply}/>
                    }
                </div>
            </div>
            }
            
        </div>
    );
}
export default ListingsPGU;