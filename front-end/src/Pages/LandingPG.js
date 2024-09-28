// LandingPG.js
// Contains the Landing page
// =======================================

import React, {useState, useEffect} from "react";
import Header from "../Components/Header";
import {refreshAccessToken} from "../functoolbox"
import {jwtDecode} from "jwt-decode";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useNavigate } from 'react-router-dom';

function LandingPG(props) {

    const navigate = useNavigate();

    // Login Form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [userLoggedIn, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Check if a User is logged in already
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/profile/own/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                })})
            
            if (response.ok) {
                // Fetch user account details if authenticated
                const userData = await response.json();
                setUser(userData);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchUser();
                }
                else
                {
                    setUser(null);
                    console.log("no user logged in")
                }
                
            }else
            {
                setUser(null);
                console.log("no user logged in")
            }
        };

        fetchUser();
        setLoading(false);
    }, []);


    // Check if the data corespond to a user
    const handleSubmit = async (e) => {
        const token = localStorage.getItem('access_token');
        e.preventDefault();
        setError(false);
        const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": formData.email,
            "password": formData.password
        })});
        if(response.ok)
        {
            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            const decodedToken = jwtDecode(data.access);
            if (decodedToken.is_admin) {
                navigate(`/admin`);
            }
            else
            {navigate(`/user`);}
            
        }
        else
        {
            console.log("NAHHHHHHHHHH!")
            setError(true);
        }
    };

    // Update coresponding field with its new value
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    // Logout the authenticated user
    const handleLogout = async () => {
        const token = localStorage.getItem('refresh_token');

        const response = await fetch('http://127.0.0.1:8000/logout/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            // If logout is successful, clear any stored user data on the frontend
            setUser(null);
            console.log("User Logged out successfully");
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        } else if (response.status === 401) {
            localStorage.removeItem('access_token');
            await refreshAccessToken();
            if(localStorage.getItem('access_token') !== null)
            {
                await handleLogout();
            }
            else
            {
                setUser(null);
                console.log("no user logged in")
            }
            
        }else
        {
            setUser(null);
            console.log("no user logged in")
        }
    };

    // Don't show anything while we fetch data
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Header />
            <div style={{display:"flex", width:"90%", marginLeft:"5%", flexDirection:"column"}}>
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"2%"}}>
                    <div style={{width:"50%", textAlign: "left"}}>
                        <img src="/Accent.png" width="100%" />
                    </div>

                    <div style={{display:"flex", flexDirection:"column", width:"40%", textAlign:"left", justifyContent:"center"}}>
                    <h3>Welcome to whatever this is</h3>
                    <p>All your favorite high ego friends are waiting inside!</p>
                    {userLoggedIn?
                        // If a user is logged in, display him //
                        <div style={{textAlign:"left", background: "#e2d9d0", padding: "20px 10px", borderRadius: "5px",
                        border: "solid 1px", borderColor:"#ccc", height:"fit-content", textAlign: "center"}}>
                            <h5>
                                Welcome back {userLoggedIn.profile_info.name}!
                            </h5>
                            <img src={userLoggedIn.profile_info.pfp} style={{width:"100px", height:"100px", borderRadius:"50%"}} />
                            <div style={{display:"flex", width:"100%", marginTop:"10px", flexDirection:"column"}}>
                                <a class="btn btn-primary" style={{width:"100%", marginTop:"10px"}} href={jwtDecode(localStorage.getItem('access_token')).is_admin ? "/admin" : "/user"}>Continue as {userLoggedIn.profile_info.name}</a>
                                <button class="btn btn-outline-danger" style={{width:"100%", marginTop:"10px"}} onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    :
                        // If no user is logged in, ask for email and password //
                        <div style={{textAlign:"left", background: "#e2d9d0", padding: "20px 10px", borderRadius: "5px",
                            border: "solid 1px", borderColor:"#ccc", height:"fit-content"}}>
                            
                            {error ?
                            <button class="btn btn-danger" style={{width:"100%"}}>This account either doesn't exist, or the credentials are wrong...</button>
                            :
                            <></>
                            }
                            
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" 
                                    value={formData.email} name="email" onChange={handleChange}/>
                                    <div id="emailHelp" class="form-text">Use your account's email (can differ from your contact email)</div>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" 
                                    value={formData.password} name="password" onChange={handleChange}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Sign In</button>
                                </div>
                            </form>
                        </div>
                    }
                    

                    <div style={{borderTop: "solid 1px #aaa", display:"flex", width:"100%", marginTop:"10px", paddingTop:"10px"}}>
                        <a class="btn btn-primary" style={{width:"100%"}} href="/signup">Sign up</a>
                    </div>
                    </div>
 
                </div>
                {/* Marketing Things (We find them kinda funny) */}
                <div style={{marginTop:"2%", marginBottom: "2%"}}>
                <h3>Redefining social-networking from the ground up</h3>
                <p>Built by professionals, for professionals</p>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div class="card border-secondary mb-3" style={{maxWidth: "18rem", marginTop: "10px", height:"fit-content"}}>
                        <div class="card-header">Personal Messages</div>
                        <div class="card-body text-secondary">
                            <h5 class="card-title">Emails are dead</h5>
                            <p class="card-text">Text all your colleagues securely. (Until our whole database gets leaked and we end up in legal trouble)</p>
                        </div>
                    </div>
                    <div class="card border-secondary mb-3" style={{maxWidth: "18rem", marginTop: "70px", height:"fit-content"}}>
                        <div class="card-header">Job Listings</div>
                        <div class="card-body text-secondary">
                            <h5 class="card-title">Job-hopping made easy</h5>
                            <p class="card-text">Browse available jobs, and apply in seconds using your profile as a CV. <br/><b>Feeling like a boss?</b> Post your job listings for millions to see</p>
                        </div>
                    </div>
                    <div class="card border-secondary mb-3" style={{maxWidth: "18rem", marginTop: "50px", height:"fit-content"}}>
                        <div class="card-header">Feed</div>
                        <div class="card-body text-secondary">
                            <h5 class="card-title">Did Tiffany land a minimum wage job?</h5>
                            <p class="card-text">I don't know. Find out in your feed!</p>
                        </div>
                    </div>
                </div>
                </div>
                <div style={{marginTop:"2%", marginBottom: "2%"}}>
                <h3>Industry leaders and flourishing professionals use TO Link. Every. Single. Day.</h3>
                <p>Some honorable mentions</p>
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"2%"}}>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                            <p>Η καλύτερη εργασία που έχω δει στην ζωή μου</p>
                            <footer class="blockquote-footer">Dr Χαμόδρακας <cite title="Source Title">(Hopefully)</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                            <p>ΔΕΝ ΑΝΤΕΧΩ ΑΛΛΟ</p>
                            <footer class="blockquote-footer">Δ. Πορίχης</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
                </div>
            </div>        
        </div>
    );
}
export default LandingPG;    