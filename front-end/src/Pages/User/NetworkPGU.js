import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ProfileBanner from "../../Components/Profile/ProfileBanner";

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

function NetworkPGU(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const cardsPerRow = 4; // Declare cardsPerRow here

  const fetchLinks = async () => {
    const csrfToken = getCookie('csrftoken');
    setLoading(true); // Set loading to true before fetching data
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
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const fetchSearchedLinks = async (searchTerm) => {
    const csrfToken = getCookie('csrftoken');
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch("http://127.0.0.1:8000/profile/fetch_searching_link", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        credentials: "include",
        body: JSON.stringify({ 'search': searchTerm }) // Include searchTerm in the request body
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        console.log("Fetched Search Results:", data);
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchLinks();
    fetchSearchedLinks();
  }, []);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearching(newSearchTerm.trim() !== "");
    
    // Call the search function whenever the search term changes
    if (newSearchTerm.trim()) {
      fetchSearchedLinks(newSearchTerm);
    } else {
      setSearchResults([]);
    }
  };


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSearchTerm(""); // Clear search term when changing filter
    setSearching(false);
    setSearchResults([]); // Clear search results when changing filter
  };

  

  return (
    <div>
      <Header log="user" act="network" />
      <div style={{ display: "flex", flexDirection: "column", width: "70%", marginLeft: "15%" }}>
        <div style={{border:"#ccc solid 1px", borderRadius: "10px",
        display:"flex", flexDirection:"row", marginBottom:"10px"
        }}>
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
          {searching ? (
            <>
              {filter === "all" && (
                <>
                  <h5>Your Network {searchResults.length}</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    {loading ? (
                      <div>Loading Search Results...</div> // Loading indicator for search results
                    ) : (
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {searchResults
                            .filter((link) => link.relationship === "Friends")  // Filter to only include "Friends"
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))}
                        </div>
                    )}
                  </div>
                  <h5>People you may know</h5>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {searchResults
                            .filter((link) => link.relationship !== "Friends")  // Filter to only include "Friends"
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))}
                        </div>
                </>
              )}
              {filter === "net" && (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    {loading ? (
                      <div>Loading Search Results...</div> // Loading indicator for search results
                    ) : (
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {searchResults
                            .filter((link) => link.relationship === "Friends")  // Filter to only include "Friends"
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))}
                        </div>
                    )}
                  </div>
                </>
              )}
              {filter === "outnet" && (
                <>
                  <h5>People you may know</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    {loading ? (
                      <div>Loading Search Results...</div> // Loading indicator for search results
                    ) : (
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                          {searchResults
                            .filter((link) => link.relationship !== "Friends")  // Filter to only include "Friends"
                            .map((link) => (
                              <ProfileBanner key={link.user_id} link={link}/>
                            ))}
                        </div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {filter === "all" && (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                    {searchResults
                      .filter((link) => link.relationship === "Friends")  // Filter to only include "Friends"
                      .map((link) => (
                        <ProfileCard key={link.user_id} link={link}/>
                      ))}
                </div>
                  </div>
                  <h5>People you may know</h5>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                  {searchResults
                    .filter((link) => link.relationship !== "Friends")  // Filter to include only "No Connection"
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))}
                  
                </div>
                </>
              )}
              {filter === "net" && (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                      {links.map((link) =>
                        <ProfileCard key={link.id} link={link}/> 
                      )}
                    </div>
                  </div>
                </>
              )}
              {filter === "outnet" && (
                <>
                  <h5>People you may know</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                  {searchResults
                    .filter((link) => link.relationship !== "Friends")  // Filter to include only "No Connection"
                    .map((link) => (
                      <ProfileCard key={link.user_id} link={link}/>
                    ))}
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
