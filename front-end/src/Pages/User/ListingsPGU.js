import React from "react";
import Header from "../../Components/Header";
import JobTile from "../../Components/Jobs/JobTile";
import { useState, useEffect } from "react";
import JobPreview from "../../Components/Jobs/JobPreview";
import JobDashboard from "../../Components/Jobs/JobDashboard";


let dammyresponses = 
    [
    {
    name: "Theopoula Tzini",
    title:"CEO of Ibiza",
    imgURL: "/logo192.png",
    InNetwork: true,
    },
    {
    name: "Nitsa",
    title:"CEO of Koup Skoup",
    imgURL: "/logo192.png",
    InNetwork: false,
    },
    {
    name: "SpongeBob",
    title:"CEO of Bikini",
    imgURL: "/logo192.png",
    InNetwork: true,
    }
    ]


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
            responses: dammyresponses
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
            responses: dammyresponses
        },
        {
            id:1004,
            state:"Public",
            title:"Junior Dev at ToLink",
            user:"Makis",
            relation:"In your network",
            spot:"Remote",
            time:"Full-time", 
            location:"Athens, Greece", 
            level:"Entry level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            responses: dammyresponses
        }
    ]

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


function ListingsPGU(props) {

    const [selectedListing, setSelectedListing] = useState({listing_id: "empty"});
    const [yourListingsView, setYourListingsView] = useState(false);
    const [listings, setListings] = useState([]);
    const [yourlistings, setYourListings] = useState([]);
    const [youApplied, setYouApplied] = useState("forbiden");


    const [mode, setMode] = useState("info");
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response0 = await fetch("http://127.0.0.1:8000/listings/list", {
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
            
            if (response0.ok) {
                let answer = await response0.json();
                setYourListings(answer);
            } else {
                console.log("Problems with fetching your listings info")
            }


            const response1 = await fetch("http://127.0.0.1:8000/listings/list", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                })
            })
            
            if (response1.ok) {
                let answer = await response1.json();
                setListings(answer);
            } else {
                console.log("Problems with fetching your listings info")
            }
            setLoading(false);
        };

        fetchListings();
    }, []);


    useEffect(() => {
        const checkApplied = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response = await fetch("http://127.0.0.1:8000/listings/applied/check", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                    "listing_id": selectedListing.listing_id
                })
            })
            
            if (response.ok) {
                let answer = await response.json();
                setYouApplied(answer.applied);
            } else {
                console.log("Problems with fetching your application info")
            }
        };
        if(yourListingsView === false && selectedListing.listing_id !== "empty")
            checkApplied();
    }, [selectedListing]);
    
    const toggleApply = () => {
        const apply = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response = await fetch("http://127.0.0.1:8000/listings/applied/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
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
            } else {
                console.log("Problems with fetching your application info")
            }
        };
        apply()
    };


    const changeSelection = (listing) => {
        setSelectedListing(listing);
    };

    const createNewListing = async () =>
    {
        const csrfToken = getCookie('csrftoken');
        console.log(csrfToken)

        console.log(document.cookie);
        const response = await fetch("http://127.0.0.1:8000/listings/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: "include",
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

        const response0 = await fetch("http://127.0.0.1:8000/listings/list", {
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
        
        if (response0.ok) {
            let answer = await response0.json();
            setYourListings(answer);
        } else {
            console.log("Problems with fetching your listings info")
        }
    }

    const updateListing = async (id, updatedListingData) => {
        const csrfToken = getCookie('csrftoken');
        console.log(updatedListingData)

        const response = await fetch("http://127.0.0.1:8000/listings/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: "include",
            body: JSON.stringify(updatedListingData)
        })
        
        if (response.ok) {
            // Fetch user account details if authenticated
            let answer = await response.json();
            console.log(answer)
        } else {
            console.log("no user logged in")
        }
    };

    const viewOwn = () => 
    {
        setSelectedListing({listing_id: "empty"});
        setYourListingsView(true);
    }

    const viewBrowse = () => 
    {
        setSelectedListing({listing_id: "empty"});
        setYourListingsView(false);
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
                            )}</>
                            :
                            <div style={{display:"flex", justifyContent: "center", width:"100%"}}>
                                <p style={{marginTop: "10px", marginBottom:"10px"}}>No listings found :(</p>
                            </div>
                        }
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    {selectedListing.listing_id === "empty" ?
                        <div style={{width:"100%", height:"20vh", border: "1px #aaa solid",
                            padding: "10px 20px", borderRadius: "10px", textAlign:"left", textAlign:"center"}}>
                                <h4>Select a job from the left side bar</h4>
                                <p>Found an intresting listing? Select it to preview it and apply.</p>
                            </div>      
                    :
                        <JobDashboard listing={selectedListing} update={updateListing}/>
                    }
                    
                </div>
            </div>
            :
            <div style={{display:"flex", flexDirection: "row", width: "90%", marginLeft: "5%", justifyContent:"space-between"}}>
                <div style={{display: "flex", flexDirection:"column", width: "25%", justifyContent: "left", textAlign: "left"}}>
                    <div style={{padding: "5px 10px", borderRadius: "10px", border: "#ccc solid 1px", backgroundColor: "#ddd", maxHeight:"80vh", overflow: "auto"}}>
                        <h5>Browse Listings</h5>
                        
                        {listings.length!==0?
                            <>
                            {listings.map((listi) =>
                                <JobTile listing={listi} handleSelect={changeSelection} active={selectedListing.listing_id === listi.listing_id} />
                            )}
                            </>
                            :
                            <div style={{display:"flex", justifyContent: "center", width:"100%"}}>
                                <p>No listings found :(</p>
                            </div>
                            
                        }
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    {selectedListing.listing_id === "empty" ?
                        <div style={{width:"100%", height:"20vh", border: "1px #aaa solid",
                        padding: "10px 20px", borderRadius: "10px", textAlign:"left", textAlign:"center"}}>
                            <h4>Select a job from the left side bar</h4>
                            <p>Found an intresting listing? Select it to preview it and apply.</p>
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