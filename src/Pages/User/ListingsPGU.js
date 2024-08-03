import React from "react";
import Header from "../../Components/Header";
import JobTile from "../../Components/Jobs/JobTile";
import { useState } from "react";
import JobPreview from "../../Components/Jobs/JobPreview";
import JobDashboard from "../../Components/Jobs/JobDashboard";



function ListingsPGU(props) {

    const [selectedListing, setSelectedListing] = useState({});
    const [yourListingsView, setYourListingsView] = useState(false);

    const changeSelection = (listing) => {
        setSelectedListing(listing);
    };

    const listings =
    [
        {
            id:"li1002",
            title:"Junior Dev at ToLink",
            user:"Makis",
            relation:"In your network",
            spot:"Remote",
            time:"Full-time", 
            location:"Athens, Greece", 
            level:"Entry level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        },
        {
            id:"li1003",
            title:"Bet-builder agent",
            user:"Uncle Nionios",
            relation:"In your network",
            spot:"On-site",
            time:"Part-time", 
            location:"Spiti tou, Spata, Greece", 
            level:"Mid level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        },
        {
            id:"li1004",
            title:"Junior Dev at ToLink",
            user:"Makis",
            relation:"In your network",
            spot:"Remote",
            time:"Full-time", 
            location:"Athens, Greece", 
            level:"Entry level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        }
    ]

    const viewOwn = () => 
    {
        setYourListingsView(true);
    }

    const viewBrowse = () => 
    {
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
                        <JobTile listing={listings[0]} handleSelect={changeSelection} active={selectedListing.id === listings[0].id} />
                        <JobTile listing={listings[1]} handleSelect={changeSelection} active={selectedListing.id === listings[1].id}/>
                        <JobTile listing={listings[2]} handleSelect={changeSelection} active={selectedListing.id === listings[2].id}/>
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    <JobDashboard listing={selectedListing}/>
                </div>
            </div>
            :
            <div style={{display:"flex", flexDirection: "row", width: "90%", marginLeft: "5%", justifyContent:"space-between"}}>
                <div style={{display: "flex", flexDirection:"column", width: "25%", justifyContent: "left", textAlign: "left"}}>
                    <div style={{padding: "5px 10px", borderRadius: "10px", border: "#ccc solid 1px", backgroundColor: "#ddd"}}>
                        <h5>Browse Listings</h5>
                        <JobTile listing={listings[0]} handleSelect={changeSelection} active={selectedListing.id === listings[0].id} />
                        <JobTile listing={listings[1]} handleSelect={changeSelection} active={selectedListing.id === listings[1].id}/>
                        <JobTile listing={listings[2]} handleSelect={changeSelection} active={selectedListing.id === listings[2].id}/>
                    </div>
                </div>
                <div style={{width: "70%"}}>
                    <JobPreview listing={selectedListing}/>
                </div>
            </div>
            }
            
        </div>
    );
}
export default ListingsPGU;