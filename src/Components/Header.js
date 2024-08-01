import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Header(props) {
    if(props.log === 'admin')
    {
        return (
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <img src="/logo192.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="#">To Link</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class={props.act !== 'home' ? "nav-link" : "nav-link active"} aria-current="page" href="/admin">Home</a>
                    </div>
                </div>
            </div>
            </nav>
        );  
    }
    else if(props.log === 'user')
    {
        return (
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <img src="/logo192.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                <a class="navbar-brand" href="#">To Link</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class={props.act !== 'home' ? "nav-link" : "nav-link active"} aria-current="page" href="/user">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class={props.act !== 'profile' ? "nav-link" : "nav-link active"} href="/user/profile">My Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class={props.act !== 'listings' ? "nav-link" : "nav-link active"} href="/user/listings">Jobs</a>
                        </li>
                        <li class="nav-item">
                            <a class={props.act !== 'network' ? "nav-link" : "nav-link active"} href="/user/network">Network</a>
                        </li>
                        <li class="nav-item">
                            <a class={props.act !== 'messages' ? "nav-link" : "nav-link active"} href="/user/messages">Messages</a>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown link
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                <button class="d-flex">
                    <img src="/logo192.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                </button>
            </div>
            </nav>
        );   
    }
    else 
    {
        return (
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="#">
                <img src="/logo192.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                Bootstrap
                </a>
            </nav>
        );
    }
}
export default Header;