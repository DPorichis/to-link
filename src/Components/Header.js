import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Header(props) {
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
                            <a class={props.act !== 'home' ? "nav-link" : "nav-link active"} aria-current="page" href="/admin">Home</a>
                        </li>
                    </ul>
                    </div>
                    </div>
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/user.png" width="40" height="40" class="d-inline-block align-top" alt="" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="/admin/settings">Settings</a></li>
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
                            <a class={props.act !== 'home' ? "nav-link" : "nav-link active"} aria-current="page" href="/user">Home</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'profile' ? "nav-link" : "nav-link active"} href="/user/profile">My Profile</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'listings' ? "nav-link" : "nav-link active"} href="/user/listings">Jobs</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'network' ? "nav-link" : "nav-link active"} href="/user/network">Network</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'messages' ? "nav-link" : "nav-link active"} href="/user/messages">Messages</a>
                        </li>
                        <li class="nav-item mx-5">
                            <a class={props.act !== 'notif' ? "nav-link" : "nav-link active"} href="/user/notifications">Notifications</a>
                        </li>
                        </ul>
                        </div>
                    </div>
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/user.png" width="40" height="40" class="d-inline-block align-top" alt="" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="/user/settings">Settings</a></li>

                        <li><a class="dropdown-item" href="/">Log Out</a></li>
                    </ul>
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
                    <a type="button" class="btn btn-primary" style={{marginRight: 7}} href="/user">Sign In</a>
                    <a type="button" class="btn btn-outline-primary" href="/signup" >Sign Up</a>
                </div>
            </div>
            </nav>

        );
    }
}
export default Header;