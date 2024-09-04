import React, {useState, useEffect} from "react";
import Header from "../Components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Postbox from "../Components/Feed/Postbox";


function LandingPG(props) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [userLoggedIn, setUser] = useState({})

    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchUser = async () => {
            const csrfToken = getCookie('csrftoken');
            console.log(csrfToken)

            console.log(document.cookie);
            const response = await fetch("http://127.0.0.1:8000/profile/own/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: "include",
                body: JSON.stringify({
                })
            })
            
            if (response.ok) {
                // Fetch user account details if authenticated
                const userData = await response.json();
                setUser(userData);
            } else {
                setUser(null);
                document.cookie = `_dd_s=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

                console.log("no user logged in")
            }

            setLoading(false);
        };

        fetchUser();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                "email": formData.email,
                "password": formData.password
            }),
        });
        console.log(response)
        console.log(document.cookie);
        } catch (error) {
            console.error("Error:", error);
            return
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    

    const testCookie = async () => {
        const csrfToken = getCookie('csrftoken');
        console.log(csrfToken)

        console.log(document.cookie);
        try {
            const response = await fetch("http://127.0.0.1:8000/profile/own/fetch", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: "include",
            body: JSON.stringify({
            })
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));;
        console.log(response)
        } catch (error) {
            console.error("Error:", error);
            return
        }
    }


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
                        <div style={{textAlign:"left", background: "#e2d9d0", padding: "20px 10px", borderRadius: "5px",
                        border: "solid 1px", borderColor:"#ccc", height:"fit-content", textAlign: "center"}}>
                            <h5>
                                Welcome back Jim!
                            </h5>
                            <img src="/logo192.png" style={{width:"100px", height:"100px"}} />
                            <div style={{display:"flex", width:"100%", marginTop:"10px", flexDirection:"column"}}>
                                <button class="btn btn-primary" style={{width:"100%", marginTop:"10px"}} onClick={testCookie}>Continue as Jim</button>
                                <button class="btn btn-outline-danger" style={{width:"100%", marginTop:"10px"}} onClick={testCookie}>Logout</button>
                            </div>
                        </div>
                    :
                        <div style={{textAlign:"left", background: "#e2d9d0", padding: "20px 10px", borderRadius: "5px",
                            border: "solid 1px", borderColor:"#ccc", height:"fit-content"}}>
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" 
                                    value={formData.email} name="email" onChange={handleChange}/>
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
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
                        <button class="btn btn-primary" style={{width:"100%"}} onClick={testCookie}>Sign up</button>
                    </div>
                    </div>
 
                </div>
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
                            <p>Η καλύτερη εργασία που έχω δει στην ζωή μου</p>
                            <footer class="blockquote-footer">Dr Χαμόδρακας <cite title="Source Title">(Hopefully)</cite></footer>
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