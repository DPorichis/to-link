// Header.js
// This component implements a dynamic navigation bar that adapts based on the user's authentication status and role (admin or user).
//This bar navigates the user to home,listings,notifications,messages,settings, log out.
//Also this component is used to redirect you to sign in and signup
// ==============================================================================

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {jwtDecode} from "jwt-decode";

import "./Header.css"

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

function Header(props) {

    const [pf, setPf] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("https://127.0.0.1:8000/profile/own/header", {  
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({})
            });

            if (response.ok) {
                const data = await response.json();
                setPf(data.profile_info);  
            }
            else
            {
                setPf("no_auth");
            }
            console.log(`user pfp is: ${pf}`)

    }

    fetchProfile();
    setLoading(false);
}, []);


    if(loading)
    {
        return (
            <nav class="navbar navbar-expand-lg" style={{background:"rgb(161,174,206)", background: "linear-gradient(160deg, rgba(161,174,206,1) 0%, rgba(251,252,254,1) 100%)",
                boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.75)", marginBottom:"20px"
            }}>
            <div class="container-fluid" >
                <img src="/cropedlogo.png" width="50px" height="50px" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="/" style={{font:"Raleway Semi bold italic", margin: "0px 0px"}}>To Link</a>
                
                <div>
                    <button type="button" class="btn btn-primary" style={{marginRight: 7}}>Loading...</button>
                </div>
            </div>
            </nav>

        );
    };

    if(pf === null)
    {
        return (
            <nav class="navbar navbar-expand-lg" style={{background:"rgb(161,174,206)", background: "linear-gradient(160deg, rgba(161,174,206,1) 0%, rgba(251,252,254,1) 100%)",
                boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.75)", marginBottom:"20px"
            }}>
            <div class="container-fluid" >
                <img src="/cropedlogo.png" width="50px" height="50px" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="/" style={{font:"Raleway Semi bold italic", margin: "0px 0px"}}>To Link</a>
                
                <div>
                    <a type="button" class="btn btn-primary" style={{marginRight: 7}} href="/">Sign In</a>
                    <a type="button" class="btn btn-outline-primary" href="/signup">Sign Up</a>
                </div>
            </div>
            </nav>
        );
    }


    if(props.log === 'admin')
    {
        return (
            <nav class="navbar navbar-expand-lg" style={{background:"rgb(161,174,206)", background: "linear-gradient(160deg, rgba(161,174,206,1) 0%, rgba(251,252,254,1) 100%)",
                boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.75)", marginBottom:"20px"
            }}>
            <div class="container-fluid">
                <img src="/cropedlogo.png" width="50" height="50" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="#">To Link</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <div class="w-100 d-flex justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'home' ? "nav-link" : "nav-link active"} aria-current="page" href="/admin"
                            style={{borderRadius: "5px"}}>Home</a>
                        </li>
                    </ul>
                    </div>
                    </div>
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={pf.pfp} width="40" height="40" style={{borderRadius:"25%"}} class="d-inline-block align-top" alt="" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="/admin/settings">Settings</a></li>
                        <li><a class="dropdown-item" href="/user">Switch to User</a></li>
                        <li><a class="dropdown-item" href="/">Log Out</a></li>
                    </ul>
            </div>
            </nav>
        );  
    }
    else if(props.log === 'user')
    {
        return (
            <nav class="navbar navbar-expand-lg" style={{background:"rgb(161,174,206)", background: "linear-gradient(160deg, rgba(161,174,206,1) 0%, rgba(251,252,254,1) 100%)",
                boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.75)", marginBottom:"20px"
            }}>
            <div class="container-fluid" >
                <img src="/cropedlogo.png" width="50px" height="50px" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="/" style={{font:"Raleway Semi bold italic"}}>To Link</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <div class="w-100 d-flex justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'home' ? "nav-link" : "nav-link active"} aria-current="page" href="/user"
                            style={{borderRadius: "5px"}} >Home</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'profile' ? "nav-link" : "nav-link active"} href="/user/profile"
                            style={{borderRadius: "5px"}}>My Profile</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'listings' ? "nav-link" : "nav-link active"} href="/user/listings"
                            style={{borderRadius: "5px"}}>Jobs</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'network' ? "nav-link" : "nav-link active"} href="/user/network"
                            style={{borderRadius: "5px"}}>Network</a>
                        </li>
                        <li class="nav-item mx-5" style={{position:"relative"}}>
                        {pf.messages ? <div style={{position:"absolute", right: "0",top: "20%", height:"10px", width:"10px", borderRadius:"100%", backgroundColor:"red"}}></div>: <></>}
                            <a class={props.act !== 'messages' ? "nav-link" : "nav-link active"} href="/user/messages"
                            style={{borderRadius: "5px"}}>Messages</a>
                        </li>
                        <li class="nav-item mx-5" style={{position:"relative"}}>
                            {pf.notifications ? <div style={{position:"absolute", right: "0",top: "20%", height:"10px", width:"10px", borderRadius:"100%", backgroundColor:"red"}}></div>: <></>}
                            <a class={props.act !== 'notif' ? "nav-link" : "nav-link active"} href="/user/notifications"
                            style={{borderRadius: "5px"}}>Notifications</a>
                        </li>
                        </ul>
                        </div>
                    </div>
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={pf.pfp} width="40" height="40" style={{borderRadius:"25%"}} class="d-inline-block align-top" alt="" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="/user/settings">Settings</a></li>
                        {jwtDecode(localStorage.getItem('access_token')).is_admin ?
                            <li><a class="dropdown-item" href="/admin">Switch to Admin</a></li>
                            :
                            <></>
                        }
                        <li><a class="dropdown-item" href="/">Log Out</a></li>
                    </ul>
            </div>
            </nav>
        );   
    }
    else if(props.log === '404')
    {
        return (
            <nav class="navbar navbar-expand-lg" style={{background:"rgb(161,174,206)", background: "linear-gradient(160deg, rgba(161,174,206,1) 0%, rgba(251,252,254,1) 100%)",
                boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.75)", marginBottom:"20px"
            }}>
            <div class="container-fluid" >
                <img src="/cropedlogo.png" width="50px" height="50px" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="/" style={{font:"Raleway Semi bold italic", margin: "0px 0px"}}>To Link</a>
                
                <div>
                    <a type="button" class="btn btn-primary" href="/">Return Home</a>
                </div>
            </div>
            </nav>
        );
    }
    else 
    {
        return (
            <nav class="navbar navbar-expand-lg" style={{background:"rgb(161,174,206)", background: "linear-gradient(160deg, rgba(161,174,206,1) 0%, rgba(251,252,254,1) 100%)",
                boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.75)", marginBottom:"20px"
            }}>
            <div class="container-fluid" >
                <img src="/cropedlogo.png" width="50px" height="50px" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="/" style={{font:"Raleway Semi bold italic", margin: "0px 0px"}}>To Link</a>
                
                <div>
                    <a type="button" class="btn btn-primary" style={{marginRight: 7}} href="/">Sign In</a>
                    <a type="button" class="btn btn-outline-primary" href="/signup">Sign Up</a>
                </div>
            </div>
            </nav>
        );
    }
}
export default Header;