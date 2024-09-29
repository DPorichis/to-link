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
  // Searching State
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [searching, setSearching] = useState(false);

  // Render Control
  const [noAuth, setNoAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [friendsLoading, setFriendsLoading] = useState(true); // Not used
  const [outLoading, setOutLoading] = useState(true); // Not used

  // Search Results
  const [friendsResults, setFriendsResults] = useState({});
  const [outResults, setOutResults] = useState({});
  const [friendCache, setFriendCache] = useState([])
  const [outCache, setOutCache] = useState([])

  // Fetch links according to search term
  const fetchSearchedLinks = async (searchTerm, page, append) => {
    const token = localStorage.getItem('access_token');
    setFriendsLoading(true);
    const response = await fetch(page ? page : "https://127.0.0.1:8000/profile/fetch_searching_link", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 'search': searchTerm })
    });

    if (response.ok) {
      const data = await response.json();
      setFriendsResults(data);
      if(append)
      {
        setFriendCache([...friendCache, ...data.results])
      }
      else
      {
        setFriendCache(data.results)
      }
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
    setFriendsLoading(false);
    setLoading(false);
  };

  // Fetch out of network according to search term
  const fetchSearchedOut = async (searchTerm, page, append) => {
    const token = localStorage.getItem('access_token');
    setOutLoading(true);
    const response1 = await fetch(page ? page : "https://127.0.0.1:8000/profile/fetch_searchout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 'search': searchTerm })
    });

    if (response1.ok) {
      const data = await response1.json();
      setOutResults(data);
      if(append)
      {
        setOutCache([...outCache, ...data.results])
      }
      else
      {
        setOutCache(data.results)
      }
      console.log("Fetched Search Results:", data);
    } else if (response1.status === 401) {
      localStorage.removeItem('access_token');
      await refreshAccessToken();
      if(localStorage.getItem('access_token') !== null)
      {
          await fetchSearchedOut();
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
      setOutLoading(false);
      setLoading(false);
  };

  // Retrive search results
  useEffect(() => {
    setLoading(true);
    fetchSearchedLinks();
    fetchSearchedOut();
  }, []);

  // After each change, refetch results
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearching(newSearchTerm.trim() !== "");
    
    fetchSearchedLinks(newSearchTerm);
    fetchSearchedOut(newSearchTerm);
    
  };

  // Handle changing search by
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSearchTerm(""); // Clear search term when changing filter
    setSearching(false);
    setOutResults({});
    setFriendsResults({});
    fetchSearchedLinks(); // Clear search results when changing filter
    fetchSearchedOut(); // Clear search results when changing filter
  };

  // Pagination Control
  const handleMovement = (direction, target) => {
    if (direction === "prev" && target === "out")
    {
      fetchSearchedOut(searchTerm, outResults.previous, false)
    }
    else if (direction === "next" && target === "out")
    {
      fetchSearchedOut(searchTerm, outResults.next, false)
    }
    else if (direction === "prev" && target === "friends")
    {
      fetchSearchedLinks(searchTerm, friendsResults.previous, false)
    }
    else if (direction === "next" && target === "friends")
    {
      fetchSearchedLinks(searchTerm, friendsResults.next, false)
    }
  }

  // Pagination Control for searchterm data
  const handleLoadMore = (target) => {
    if (target === "out")
    {
      fetchSearchedOut(searchTerm, outResults.next, true)
    }
    else if (target === "friends")
    {
      fetchSearchedLinks(searchTerm, friendsResults.next, true)
    }
  }

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
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    {loading ? (
                      <div>Loading Search Results...</div> // Loading indicator for search results
                    ) : (
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          
                          {friendsResults.results && friendCache.length > 0 ?
                            <>
                              {friendCache
                              .map((link) => (
                                <ProfileBanner key={link.user_id} link={link}/>
                              ))}
                              <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
                                <button disabled={!friendsResults.next} 
                                onClick={() => {handleLoadMore("friends")}}
                                class="btn btn-primary" type="button">
                                  Load More
                                </button>
                              </div>
                            </>
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
                          {outResults.results && outCache.length > 0 ?
                            <>
                            {outCache
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))}
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
                                <button disabled={!outResults.next} 
                                onClick={() => {handleLoadMore("out")}}
                                class="btn btn-primary" type="button">
                                  Load More
                                </button>
                            </div>
                            </>
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
                          {friendsResults.results && friendCache.length > 0 ?
                            <>
                              {friendCache
                              .map((link) => (
                                <ProfileBanner key={link.user_id} link={link}/>
                              ))}
                              <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
                                <button disabled={friendCache.length === friendsResults.count} 
                                onClick={() => {handleLoadMore("friends")}}
                                class="btn btn-primary" type="button">
                                  Load More
                                </button>
                              </div>
                            </>
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
                        {outResults.results && outCache.length > 0 ?
                          <>
                            {outCache
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))}
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
                                <button disabled={!outResults.next} 
                                onClick={() => {handleLoadMore("out")}}
                                class="btn btn-primary" type="button">
                                  Load More
                                </button>
                            </div>
                          </>
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
                  {friendsResults.results && friendsResults.results.length > 0 ?
                    <>
                    <div style={{alignSelf:"center"}}>
                      <button onClick={() => {handleMovement("prev", "friends")}} disabled={!friendsResults.previous} type="button" class="btn btn-primary">{"<"}</button>
                    </div>
                    {friendsResults.results.slice(0, 4)
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))}
                    <div style={{alignSelf:"center"}}>
                      <button onClick={() => {handleMovement("next", "friends")}} disabled={!friendsResults.next} type="button" class="btn btn-primary">{">"}</button>
                    </div>
                    </>
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
                  {outResults.results && outResults.results.length > 0 ?
                    <>
                    <div style={{alignSelf:"center"}}>
                      <button onClick={() => {handleMovement("prev", "out")}} disabled={!outResults.previous} type="button" class="btn btn-primary">{"<"}</button>
                    </div>
                    {outResults.results.slice(0, 4)
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))}
                    <div style={{alignSelf:"center"}}>
                      <button onClick={() => {handleMovement("next", "out")}} disabled={!outResults.next} type="button" class="btn btn-primary">{">"}</button>
                    </div>
                    </>
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
                    {friendsResults.results && friendsResults.results.length > 0 ?
                      <>
                      <div style={{alignSelf:"center"}}>
                        <button onClick={() => {handleMovement("prev", "friends")}} disabled={!friendsResults.previous} type="button" class="btn btn-primary">{"<"}</button>
                      </div>
                      {friendsResults.results.slice(0, 4)
                      .map((link) => (
                        <ProfileCard key={link.user_id} link={link}/>
                      ))}
                      <div style={{alignSelf:"center"}}>
                        <button onClick={() => {handleMovement("next", "friends")}} disabled={!friendsResults.next} type="button" class="btn btn-primary">{">"}</button>
                      </div>
                    </>
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
                  {outResults.results && outResults.results.length > 0 ?
                    <>
                    <div style={{alignSelf:"center"}}>
                      <button onClick={() => {handleMovement("prev", "out")}} disabled={!outResults.previous} type="button" class="btn btn-primary">{"<"}</button>
                    </div>
                    {outResults.results.slice(0, 4)
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))}
                    <div style={{alignSelf:"center"}}>
                      <button onClick={() => {handleMovement("next", "out")}} disabled={!outResults.next} type="button" class="btn btn-primary">{">"}</button>
                    </div>
                    </>
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
