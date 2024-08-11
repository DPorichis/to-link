import React from "react";
import Header from "../../Components/Header";
import ProfileCard from "../../Components/Profile/ProfileCard";
import ProfileBanner from "../../Components/Profile/ProfileBanner";
import { useState } from "react";

const links = 
[
{
name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
imgURL: "/logo192.png",
InNetwork: false,
},
{
    name: "Theopoula Tzini",
    title:"CEO of Ibizaaaaaaaaaaaaaaaa",
    imgURL: "/logo192.png",
    InNetwork: false,
    },
{
name: "ANitsaaaaaaaaaaaaaa",
title:"CEO of Koup Skoup",
imgURL: "/logo192.png",
InNetwork: false,
},
{
name: "SpongeBobbbbbbbbbbbbbbbbbbb",
title:"CEO of Bikiniiiiiiiiiiiiiiiii",
imgURL: "/logo192.png",
InNetwork: false,
},
{
    name: "SpongeBob",
    title:"CEO of Bikini",
    imgURL: "/logo192.png",
    InNetwork: false,
    },
    {
        name: "SpongeBob",
        title:"CEO of Bikini",
        imgURL: "/logo192.png",
        InNetwork: true,
        },
        {
            name: "SpongeBob",
            title:"CEO of Bikini",
            imgURL: "/logo192.png",
            InNetwork: true,
            },
            {
                name: "SpongeBob",
                title:"CEO of Bikini",
                imgURL: "/logo192.png",
                InNetwork: true,
                },
                {
                    name: "SpongeBob",
                    title:"CEO of Bikini",
                    imgURL: "/logo192.png",
                    InNetwork: true,
                    },
                    {
                        name: "SpongeBob",
                        title:"CEO of Bikini",
                        imgURL: "/logo192.png",
                        InNetwork: true,
                        },
                        {
                            name: "SpongeBob",
                            title:"CEO of Bikini",
                            imgURL: "/logo192.png",
                            InNetwork: true,
                            },
                            {
                                name: "SpongeBob",
                                title:"CEO of Bikini",
                                imgURL: "/logo192.png",
                                InNetwork: true,
                                },
                                {
                                    name: "SpongeBob",
                                    title:"CEO of Bikini",
                                    imgURL: "/logo192.png",
                                    InNetwork: true,
                                    },
                                    {
                                        name: "SpongeBob",
                                        title:"CEO of Bikini",
                                        imgURL: "/logo192.png",
                                        InNetwork: false,
                                        },
                                        {
                                            name: "SpongeBob",
                                            title:"CEO of Bikini",
                                            imgURL: "/logo192.png",
                                            InNetwork: false,
                                            },
                                            {
                                                name: "SpongeBob",
                                                title:"CEO of Bikini",
                                                imgURL: "/logo192.png",
                                                InNetwork: false,
                                                },
                                                {
                                                    name: "SpongeBob",
                                                    title:"CEO of Bikini",
                                                    imgURL: "/logo192.png",
                                                    InNetwork: false,
                                                    },
                                                    {
                                                        name: "SpongeBob",
                                                        title:"CEO of Bikini",
                                                        imgURL: "/logo192.png",
                                                        InNetwork: true,
                                                        },
                                                        {
                                                            name: "SpongeBob",
                                                            title:"CEO of Bikini",
                                                            imgURL: "/logo192.png",
                                                            InNetwork: true,
                                                            },
                                                            {
                                                                name: "SpongeBob",
                                                                title:"CEO of Bikini",
                                                                imgURL: "/logo192.png",
                                                                InNetwork: true,
                                                                },
                                                                {
                                                                    name: "SpongeBob",
                                                                    title:"CEO of Bikini",
                                                                    imgURL: "/logo192.png",
                                                                    InNetwork: true,
                                                                    },
                                                                    {
                                                                        name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
                                                                        title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
                                                                        imgURL: "/logo192.png",
                                                                        InNetwork: false,
                                                                        },
                                                                        {
                                                                            name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
                                                                            title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
                                                                            imgURL: "/logo192.png",
                                                                            InNetwork: false,
                                                                            },
                                                                            {
                                                                                name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
                                                                                title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
                                                                                imgURL: "/logo192.png",
                                                                                InNetwork: false,
                                                                                },
                                                                                {
                                                                                    name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
                                                                                    title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
                                                                                    imgURL: "/logo192.png",
                                                                                    InNetwork: false,
                                                                                    },
                                                                                    {
                                                                                        name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
                                                                                        title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
                                                                                        imgURL: "/logo192.png",
                                                                                        InNetwork: false,
                                                                                        },
                                                                                        {
                                                                                            name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
                                                                                            title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
                                                                                            imgURL: "/logo192.png",
                                                                                            InNetwork: false,
                                                                                            },
                                                                                            {
                                                                                                name: "Theopoula Tziniiiiiiiiiiiiiiiiii",
                                                                                                title:"CEO of Ibizaaaaaaaaaaaaaaaaaa",
                                                                                                imgURL: "/logo192.png",
                                                                                                InNetwork: false,
                                                                                                },



]; 


function NetworkPGU(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const sortedInNetworkCards = [...links.filter(link => link.InNetwork)].sort((a, b) => a.name.localeCompare(b.name));
    const sortedOutOfNetworkCards = [...links.filter(link => !link.InNetwork)].sort((a, b) => a.name.localeCompare(b.name));
    const [filter, setFilter] = useState("all"); 
    const [searching, setSearching] = useState(false);

    

    const cardsPerRow = 4;
    

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setSearching(newSearchTerm.trim() !== "");
    };

    const filteredInNetworkCards = sortedInNetworkCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredOutOfNetworkCards = sortedOutOfNetworkCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setSearchTerm(""); // Clear search term when changing filter
        setSearching(false);
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
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "57vh", overflowY: "auto", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                      {filteredInNetworkCards.map((link, index) => (
                        <ProfileBanner key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                      ))}
                    </div>
                  </div>
                  <h5>People you may know</h5>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px", overflowY: "scroll" }}>
                    {filteredOutOfNetworkCards.slice(0, cardsPerRow).map((link, index) => (
                      <ProfileBanner key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                    ))}
                  </div>
                </>
              )}
              {filter === "net" && (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                      {filteredInNetworkCards.map((link, index) => (
                        <ProfileBanner key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                      ))}
                    </div>
                  </div>
                </>
              )}
              {filter === "outnet" && (
                <>
                  <h5>People you may know</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                      {filteredOutOfNetworkCards.map((link, index) => (
                        <ProfileBanner key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                      ))}
                    </div>
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
                      {filteredInNetworkCards.map((link, index) => (
                        <ProfileCard key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                      ))}
                    </div>
                  </div>
                  <h5>People you may know</h5>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px", overflowY: "scroll" }}>
                    {filteredOutOfNetworkCards.slice(0, cardsPerRow).map((link, index) => (
                      <ProfileCard key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                    ))}
                  </div>
                </>
              )}
              {filter === "net" && (
                <>
                  <h5>Your Network</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                      {filteredInNetworkCards.map((link, index) => (
                        <ProfileCard key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
                      ))}
                    </div>
                  </div>
                </>
              )}
              {filter === "outnet" && (
                <>
                  <h5>People you may know</h5>
                  <div style={{ maxHeight: "65vh", overflowY: "auto", marginBottom: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", marginTop: "9px", marginBottom: "9px" }}>
                      {filteredOutOfNetworkCards.map((link, index) => (
                        <ProfileCard key={index} name={link.name} title={link.title} InNetwork={link.InNetwork} imgURL={link.imgURL} />
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