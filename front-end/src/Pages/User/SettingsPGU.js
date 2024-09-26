// SettingsPGU.js
// Contains the page for user settings, changing personal info and password
// =======================================

import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { refreshAccessToken } from "../../functoolbox";
import NotFoundPG from "../NotFoundPG";

function SettingsPGU(props) {
    // Before and after to track changes and discard
    const [savedProfile, setSavedProfile] = useState({});
    const [editedProfile, setEditedProfile] = useState({});

    // Check for changes
    const [personalEdit, setPersonalEdit] = useState(false);

    // Rendering Control
    const [loading, setLoading] = useState(true);
    const [noAuth, setNoAuth] = useState(false);

    // Bring the users data
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/user/fetch", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                })
            })
            
            if (response.ok) {
                let answer = await response.json();
                setSavedProfile(answer);
                setEditedProfile(answer);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await fetchUser();
                }
                else
                {
                    console.log("no user logged in")
                    setNoAuth(true);
                }
                
            }else{
                setNoAuth(true);
            }
        };

        fetchUser();
        setLoading(false);
    }, []);


    // Alert pop-up logic
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }

    const handleDeleteProfile = async () => {
        const token = localStorage.getItem('access_token');
        const response = await fetch("http://127.0.0.1:8000/profile/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    
        if (response.ok) {
            // Profile deleted successfully
            appendAlert("Profile deleted successfully.", 'success');
            // Optionally, redirect the user or log them out
            localStorage.removeItem('access_token');
            // You might want to redirect to a login page or home page
            window.location.href = '/login'; // Change this to your desired route
        } else if (response.status === 401) {
            localStorage.removeItem('access_token');
            await refreshAccessToken();
            if (localStorage.getItem('access_token') !== null) {
                await handleDeleteProfile();
            } else {
                appendAlert("You are not authorized. Please log in again.", 'danger');
            }
        } else {
            const errorData = await response.json();
            appendAlert(errorData.error || "Failed to delete profile.", 'danger');
        }
    };
    
    
    // Check if the new personal data are valid
    const validateForm = async () =>
        {
        const errors = {};  
    
        if(editedProfile.name === "")
        {
            errors.name = 'Please enter your name.';
        }
    
        if(editedProfile.surname === "")
        {
            errors.surname = 'Please enter your surname.';
        }

        // Regular expression for validating an email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (editedProfile.email === "" || !re.test(editedProfile.email))
        {
            errors.email = 'You must enter a valid email address'
        }

        return errors;
    
    };
    
    // Possible form errors
    const [formErrors, setFormErrors] = useState({
        name: '',
        surname: '',
        email: '',
    });

    // Update coresponding field with its new value
    const handleFormChange = (e) => {
        const { name, value} = e.target;
        setEditedProfile({
            ...editedProfile,
            [name]: value,
        });
    }

    // Submit Personal Info changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = await validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            // Create a FormData object
            const formData = new FormData();

            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/user/update", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editedProfile
                )
            })
            
            if (response.ok) {
                let userData = await response.json();
                setSavedProfile(userData);
                setEditedProfile(userData);
                console.log('Form submitted successfully:', passwordForm);
                appendAlert("Personal Info have been successfully changed", 'success');
                setSavedProfile({
                    ...editedProfile,
                });
                setPersonalEdit(false);
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await handleSubmit(e);
                }
                else
                {
                    console.log("no user logged in")
                }
                
            }else{
                let errormessages = await response.json();
                if ("birthdate" in errormessages)
                {
                    setFormErrors(prevErrors => ({
                        ...prevErrors,
                        birthdate: "Please enter a valid date"
                    }));    
                }
                else
                {
                    setFormErrors(prevErrors => ({
                        ...prevErrors,
                        email: "This email can't be used because it is associated with another account"
                    }));     
                }
            }
        }
        else{
            setFormErrors(errors);
        }
        
        };

    // Password errors
    const [passwordFormErrors, setPasswordFormErrors] = useState({
        oldPassoword: '',
        password: '',
        passwordVal: '',
    });

    // Password Form
    const [passwordForm, setPasswordForm] = useState({
        oldPassoword: '',
        password: '',
        passwordVal: '',
    });

    // Update coresponding field with its new value
    const handlePasswordFormChange = (e) => {
        const { name, value} = e.target;
        setPasswordForm({
            ...passwordForm,
            [name]: value,
        });
    }
    
    // Set new password
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const errors = validatePasswordForm();
        setPasswordFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            const token = localStorage.getItem('access_token');
            const response = await fetch("http://127.0.0.1:8000/user/newPassword", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    current_password: passwordForm.oldPassoword,
                    new_password: passwordForm.password
                })
            })
            
            if (response.ok) {
                let userData = await response.json();
                console.log('Form submitted successfully:', passwordForm);
                appendAlert("Password Changed successfully", 'success');
            } else if (response.status === 401) {
                localStorage.removeItem('access_token');
                await refreshAccessToken();
                if(localStorage.getItem('access_token') !== null)
                {
                    await handlePasswordChange(e);
                }
                else
                {
                    console.log("no user logged in")
                }
                
            }else 
            {
                setPasswordFormErrors(prevErrors => ({
                    ...prevErrors,
                    oldPassoword: "Incorrect Password"
                }));
            }
        }
        else{
            setPasswordFormErrors(errors);
        }
    };

    // Check if the values are legit
    const validatePasswordForm = () =>
    {

        const errors = {};  

        if (passwordForm.password !== passwordForm.passwordVal) {
            errors.passwordVal = 'Passwords do not match';
        }
        
        if (passwordForm.password === ""){
            errors.password = 'You must enter a password'
        }

        return errors;

    };

    
    // No render when loading
    if (loading) return <p>Loading</p>;

    // Prevent not Authenticated Users
    if(noAuth)
    {
        return (<NotFoundPG />)
    }

    return (
        <div>
            <Header log="user" act="settings" />
            <div style={{ display: "flex", justifyContent: "left", alignItems: "left", flexDirection: "column", textAlign:"left",
                marginLeft:"15%", width:"70%", marginTop:"10px"
            }}>
                <div id="liveAlertPlaceholder"></div>
                <h4>Settings</h4>
                <div class="row" style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                    <div style={{flexDirection:"row", justifyContent:"space-between", display:"flex"}}>
                        <h5>Your Personal Information</h5>
                            {personalEdit 
                            ?
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <button class="btn btn-danger btn-sm" style={{marginRight:"3px"}}
                                    onClick={() => {setEditedProfile(savedProfile); setPersonalEdit(false); setFormErrors({});}}>
                                        Discard Changes
                                    </button>                                
                                    <button class="btn btn-primary btn-sm" onClick={handleSubmit}>
                                        Save Changes
                                    </button>
                                </div>
                            :
                                <button class="btn btn-primary btn-sm" onClick={() => {setPersonalEdit(true)}}>
                                    Edit
                                </button>
                        }
                    </div>
                    <div class="col-md-12" style={{marginBottom:"5px"}}>
                        <div class="row">
                            <div className="col-md-3" style={{marginBottom:"5px"}}>
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={editedProfile.name}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Enter your name"
                                    disabled={!personalEdit}
                                />
                                <div className="invalid-feedback">{formErrors.name || 'Please enter your name.'}</div>
                            </div>
                            <div className="col-md-3" style={{marginBottom:"5px"}}>
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    value={editedProfile.email}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Enter your email"
                                    disabled={!personalEdit}
                                />
                                <div className="invalid-feedback">{formErrors.email || 'Please enter your email.'}</div>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Country</label>
                                <input type="text" class="form-control" value={editedProfile.country} disabled={!personalEdit}
                                onChange={handleFormChange} name="country"/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Birthdate</label>
                                <input type="date" 
                                    className={`form-control ${formErrors.birthdate ? 'is-invalid' : ''}`}
                                    value={editedProfile.birthdate} 
                                    disabled={!personalEdit}
                                    onChange={handleFormChange}
                                    id="birthdate"
                                    name="birthdate" 
                                    required/>
                                <div className="invalid-feedback">{formErrors.birthdate || 'Please enter a valid date.'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" style={{marginBottom:"5px"}}>
                        <div class="row">
                            <div className="col-md-3" style={{marginBottom:"5px"}}>
                                <label htmlFor="name" className="form-label">Surname</label>
                                <input
                                    type="text"
                                    className={`form-control ${formErrors.surname ? 'is-invalid' : ''}`}
                                    id="surname"
                                    name="surname"
                                    value={editedProfile.surname}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Enter your surname"
                                    disabled={!personalEdit}
                                />
                                <div className="invalid-feedback">{formErrors.surname || 'Please enter your surname.'}</div>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                                <input type="text" class="form-control" value={editedProfile.phone} disabled={!personalEdit}
                                onChange={handleFormChange} name="phone"/>
                            </div>
                            <div class="col-md-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>City</label>
                                <input type="text" class="form-control" value={editedProfile.city} disabled={!personalEdit}
                                onChange={handleFormChange} name="city"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                    <h5>Update your password</h5>
                    <form onSubmit={handlePasswordChange}>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <div class="row">
                                <div className="col-md-3" style={{marginBottom:"5px"}}>
                                    <label htmlFor="password" className="form-label">Current Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${passwordFormErrors.oldPassoword ? 'is-invalid' : ''}`}
                                        id="oldPassoword"
                                        name="oldPassoword"
                                        value={passwordForm.oldPassoword}
                                        onChange={handlePasswordFormChange}
                                        required
                                        placeholder="Enter your password"
                                    />
                                    <div className="invalid-feedback">{passwordFormErrors.password || 'Wrong Password.'}</div>
                                </div>
                                <div className="col-md-3" style={{marginBottom:"5px"}}>
                                    <label htmlFor="password" className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${passwordFormErrors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        value={passwordForm.password}
                                        onChange={handlePasswordFormChange}
                                        required
                                        placeholder="Enter your password"
                                    />
                                    <div className="invalid-feedback">{passwordFormErrors.password || 'Please enter a password.'}</div>
                                </div>
                                <div className="col-md-3" style={{marginBottom:"5px"}}>
                                    <label htmlFor="password" className="form-label">New Password Validation</label>
                                    <input
                                        type="password"
                                        className={`form-control ${passwordFormErrors.passwordVal ? 'is-invalid' : ''}`}
                                        id="passwordVal"
                                        name="passwordVal"
                                        value={passwordForm.passwordVal}
                                        onChange={handlePasswordFormChange}
                                        required
                                        placeholder="Enter your password"
                                    />
                                    <div className="invalid-feedback">{passwordFormErrors.passwordVal || 'Please enter a password.'}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"right"}}>
                            <button class="btn btn-primary" id="liveAlertBtn">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>  
                <button class="btn btn-primary" id="liveAlertBtn" onClick={handleDeleteProfile}>
                                delete profile
                </button>          
                </div>
        </div>
    );
}

export default SettingsPGU;



