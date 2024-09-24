// NetworkPGU.js
// Contains the network page, rendering your network and searching for new users
// =======================================

import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ProfileBanner from "../../Components/Profile/ProfileBanner";
import { refreshAccessToken } from "../../functoolbox";
import NotFoundPG from "../NotFoundPG";

function NetworkPGU(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [searching, setSearching] = useState(false);
  const [noAuth, setNoAuth] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch links according to search term
  const fetchSearchedLinks = async (searchTerm) => {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/profile/fetch_searching_link", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 'search': searchTerm })
    });

    if (response.ok) {
      const data = await response.json();
      setSearchResults(data);
      console.log("Fetched Search Results:", data);
    } else if (response.status === 401) {
      localStorage.removeItem('access_token');
      await refreshAccessToken();
      if(localStorage.getItem('access_token') !== null)
      {
          await fetchSearchedLinks();
      }
      else
      {
          console.log("Problems with fetching your results")
          setNoAuth(true);
      } 
    } else {
        console.log("Problems with fetching your results")
        setNoAuth(true);
    }
    
      setLoading(false);
  };

  // Retrive search results
  useEffect(() => {
    setLoading(true);
    fetchSearchedLinks();
  }, []);

  // After each change, refetch results
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearching(newSearchTerm.trim() !== "");
    
    fetchSearchedLinks(newSearchTerm);
    
  };

  // Handle changing search by
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSearchTerm(""); // Clear search term when changing filter
    setSearching(false);
    setSearchResults([]);
    fetchSearchedLinks(); // Clear search results when changing filter
  };


  // Group by if they are friends or not

  const filteredUnknownResults = searchResults
  .filter((link) => link.relationship !== "Friends");

  const filteredFriendsResults = searchResults
  .filter((link) => link.relationship === "Friends");

  // Prevent not Authenticated Users
  if(noAuth)
  {
    return (<NotFoundPG />)
  }

  // No render when loading
  if(loading) return <>Loading</>


  return (
    <div>
      <Header log="user" act="network" />
      <div style={{ display: "flex", flexDirection: "column", width: "70%", marginLeft: "15%" }}>
        <div style={{border:"#ccc solid 1px", borderRadius: "10px",
        display:"flex", flexDirection:"row", marginBottom:"10px"
        }}>
          {/* Searchbar Element */}
          <div style={{display:"flex", flexDirection:"column", justifyContent:"left", textAlign:"left", width:"15%", borderRight:"#333 solid 1px",
              borderEndStartRadius: "10px", borderStartStartRadius: "10px", padding:"3px 3px"
          }}>
          <label style={{fontSize:"12px", marginLeft:"2px"}}>Searching by</label>
            <select name="where" style={{border:"none", outline:"none", padding:"0"}} onChange={handleFilterChange}>
              <option value="all">Everyone</option>
              <option value="net">Network Only</option>
              <option value="outnet">Outside Network</option>
            </select>
            </div>
            <input placeholder="Search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange} style={{width:"79%", border:"none", outline:"none"}}
            />
            <button style={{width:"6%", border:"none", outline:"none", borderEndEndRadius: "10px", borderStartEndRadius: "10px"}}>
                <img src="/search.svg" style={{}} />
            </button>
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
          {searching ? 
          // If a term is present //
          (
            <>
              {filter === "all" 
              // And searching for all //
              && (
                <>
                  <h5>Your Network {searchResults.length}</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    {loading ? (
                      <div>Loading Search Results...</div> // Loading indicator for search results
                    ) : (
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {filteredFriendsResults.length > 0 ?
                            filteredFriendsResults
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))
                          :
                          <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                              <h5 style={{marginBottom:"3px"}}>No results found</h5>
                              <p style={{marginBottom:"0px"}}>No user in your network matches that query</p>
                          </div>
                          }
                      </div>
                    )}
                  </div>
                  <h5>People you may know</h5>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {filteredUnknownResults.length > 0 ?
                            filteredUnknownResults
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))
                          :
                          <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                              <h5 style={{marginBottom:"3px"}}>No results found</h5>
                              <p style={{marginBottom:"0px"}}>No user in outside your network matches that query</p>
                          </div>
                          }
                        </div>
                </>
              )}
              {filter === "net" && 
              // And searching for network only //
              (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    {loading ? (
                      <div>Loading Search Results...</div> // Loading indicator for search results
                    ) : (
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {filteredFriendsResults.length > 0 ?
                            filteredFriendsResults
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))
                          :
                          <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                              <h5 style={{marginBottom:"3px"}}>No results found</h5>
                              <p style={{marginBottom:"0px"}}>No user in your network matches that query</p>
                          </div>
                          }
                        </div>
                    )}
                  </div>
                </>
              )}
              {filter === "outnet" && 
              // And searching for out of network //
              (
                <>
                  <h5>People you may know</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    {loading ? (
                      <div>Loading Search Results...</div> // Loading indicator for search results
                    ) : (
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {filteredUnknownResults.length > 0 ?
                            filteredUnknownResults
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))
                          :
                          <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                              <h5 style={{marginBottom:"3px"}}>No results found</h5>
                              <p style={{marginBottom:"0px"}}>No user in outside your network matches that query</p>
                          </div>
                          }
                        </div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : 
          // If no term is present //
          (
            <>
              {filter === "all" && 
              // And searching for all //
              (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                  {filteredFriendsResults.length > 0 ?
                    filteredFriendsResults.slice(0, 4)
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))
                    :
                    <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                      <h5 style={{marginBottom:"3px"}}>You have no users in your Network</h5>
                      <p style={{marginBottom:"0px"}}>That's not cool! Find people you are intrested in and ask to Link</p>
                    </div>
                  }
                  </div>
                  
                  </div>
                  <h5>People you may know</h5>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                  {filteredUnknownResults.length > 0 ?
                    filteredUnknownResults.slice(0, 4)
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))
                    :
                    <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                      <h5 style={{marginBottom:"3px"}}>No users found</h5>
                      <p style={{marginBottom:"0px"}}>This is a new app, ok? Come back later to check if new users are here</p>
                  </div>
                  }
                </div>
                </>
              )}
              {filter === "net" && 
              // And searching for network only //
              (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                    {filteredFriendsResults.length > 0 ?
                    filteredFriendsResults.slice(0, 4)
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))
                    :
                    <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                      <h5 style={{marginBottom:"3px"}}>You have no users in your Network</h5>
                      <p style={{marginBottom:"0px"}}>That's not cool! Find people you are intrested in and ask to Link</p>
                    </div>
                  }
                    </div>
                  </div>
                </>
              )}
              {filter === "outnet" && 
              // And searching for out of network //
              (
                <>
                  <h5>People you may know</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                  {filteredUnknownResults.length > 0 ?
                    filteredUnknownResults.slice(0, 4)
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))
                    :
                    <div style={{width:"100%", padding:"10px 10px", borderRadius:"5px", border:"1px #aaa solid", marginBottom:"10px"}}>
                      <h5 style={{marginBottom:"3px"}}>No users found</h5>
                      <p style={{marginBottom:"0px"}}>This is a new app, ok? Come back later to check if new users are here</p>
                  </div>
                  }
                </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NetworkPGU;
