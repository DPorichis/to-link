import React from "react";
import Header from "../Components/Header";
function NotFoundPG(props) {
    return (
        <div style={{backgroundColor:"#f2f5e9"}}>
            <Header />
            <div style={{width:"70%", marginLeft:"15%", height:"100vh"}}>
                <img src="/404.png" width={"80%"} style={{marginBottom:"20px"}}/>
                <h5>That's a bummer</h5>
                <p>This page does't seem to exist, or you dont have access to it</p>
                <a class="btn btn-primary" href="/">Go back to Main Page</a>
            </div>
        </div>
    );
}
export default NotFoundPG;    