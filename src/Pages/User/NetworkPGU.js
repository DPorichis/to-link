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
        <div className="Searchbar" style={{ display: "flex", flexDirection: "row", width: "100%", height: "5vh", borderRadius: "18px", backgroundColor: "#cecdcd", marginTop: "50px" }}>
          <div style={{ borderRadius: "18px", height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <select name="where" style={{ backgroundColor: "#cecdcd", border: "none", borderRadius: "18px", outline: "none" }} onChange={handleFilterChange}>
              <option value="all">Everyone</option>
              <option value="net">Network Only</option>
              <option value="outnet">Outside Network</option>
            </select>
            <input
              style={{ width: "80%", backgroundColor: "transparent", height: "100%", border: "none", borderLeft: "solid" }}
              placeholder="Search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button style={{ width: "10%", backgroundColor: "transparent", border: "none" }}>
              <img src="/search.svg" alt="Search" />
            </button>
          </div>
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