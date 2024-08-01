import React from "react";

import Header from "../../Components/Header";
import './homePGU.css';

function HomePGU(props) {
    return (
        <div>
            <Header log="user" act="home"/>
            I am a Page :D
            <div className="sidebar">
            Profile view
                <div className="Profile">
                    NAME NAME 
                    MPLA MPLA
                </div>
                MY Links
                <div className = "Links">
                    <div className = "link">
                        IOANNIC
                    </div>
                    <div className = "link">
                        LAKIS
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePGU;    