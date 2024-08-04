import React from "react";
import Header from "../../Components/Header";
import JobTile from "../../Components/Jobs/JobTile";
import { useState } from "react";
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

function ListingsPGU(props) {

    const [selectedListing, setSelectedListing] = useState({id: "empty"});
    const [yourListingsView, setYourListingsView] = useState(false);
    const [listings, setListings] = useState(dammylistings);
    const [yourlistings, setYourListings] = useState([]);

    const changeSelection = (listing) => {
        setSelectedListing(listing);
    };

    const createNewListing = () =>
    {
        var newid = 0;
        if (yourlistings.length !== 0)
            newid = yourlistings[yourlistings.length - 1].id + 1;
        
        setYourListings([{
            id: newid,
            state:"Private",
            title:"Untitled Listing",
            user:"You",
            relation:"(It's you)",
            spot:"Not Filled",
            time:"Not Filled", 
            location:"Not Filled", 
            level:"Not Filled",
            desc:"Set a Description",
            responses: dammyresponses
        }, ...yourlistings]);
    }

    const updateListing = (id, updatedListingData) => {
        setYourListings((prevListings) => {
          return prevListings.map((listing) => {
            if (listing.id === id) {
              return { ...updatedListingData }; // Merge original listing with updated data
            }
            return listing; // Return unchanged listings
          });
        });

        if(id === selectedListing.id)
        {
            setSelectedListing(updatedListingData);
        }
    };

    const viewOwn = () => 
    {
        setSelectedListing({id: "empty"});
        setYourListingsView(true);
    }

    const viewBrowse = () => 
    {
        setSelectedListing({id: "empty"});
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
                    <div style={{padding: "5px 10px", borderRadius: "10px", border: "#ccc solid 1px", backgroundColor: "#ddd"}}>
                        <h5>Your Listings</h5>
                        <button type="button" class="btn btn-success" style={{width: "100%"}} onClick={createNewListing}>Create new Listing</button>
                        {yourlistings.map((listi) =>
                            <JobTile listing={listi} handleSelect={changeSelection} active={selectedListing.id === listi.id} />
                        )}
                        {yourlistings.length === 0 ?
                        <div style={{display:"flex", justifyContent: "center", width:"100%"}}>
                            <p style={{marginTop: "10px", marginBottom:"10px"}}>No listings found :(</p>
                        </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    {selectedListing.id === "empty" ?
                        <>Select a job from the left side bar</>    
                    :
                        <JobDashboard listing={selectedListing} update={updateListing}/>
                    }
                    
                </div>
            </div>
            :
            <div style={{display:"flex", flexDirection: "row", width: "90%", marginLeft: "5%", justifyContent:"space-between"}}>
                <div style={{display: "flex", flexDirection:"column", width: "25%", justifyContent: "left", textAlign: "left"}}>
                    <div style={{padding: "5px 10px", borderRadius: "10px", border: "#ccc solid 1px", backgroundColor: "#ddd"}}>
                        <h5>Browse Listings</h5>
                        {listings.map((listi) =>
                            <JobTile listing={listi} handleSelect={changeSelection} active={selectedListing.id === listi.id} />
                        )}
                        {listings.length === 0 ?
                            <div style={{display:"flex", justifyContent: "center", width:"100%"}}>
                                <p>No listings found :(</p>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    {selectedListing.id === "empty" ?
                        <>Select a job from the left side bar</>    
                    :
                        <JobPreview listing={selectedListing}/>
                    }
                </div>
            </div>
            }
            
        </div>
    );
}
export default ListingsPGU;