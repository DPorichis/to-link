import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";

function SettingsPGU(props) {
    const [savedProfile, setSavedProfile] = useState({});
    const [editedProfile, setEditedProfile] = useState({});

    const [personalEdit, setPersonalEdit] = useState(false);
    const [loginEdit, setLoginEdit] = useState(false);
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
            const response = await fetch("http://127.0.0.1:8000/user/fetch", {
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
                let answer = await response.json();
                setSavedProfile(answer);
                setEditedProfile(answer);
            } else {
            }
        };

        fetchUser();
        setLoading(false);
    }, []);






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
    

    const validateForm = () =>
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
    
    const [formErrors, setFormErrors] = useState({
        name: '',
        surname: '',
        email: '',
    });


    const handleFormChange = (e) => {
        const { name, value} = e.target;
        setEditedProfile({
            ...editedProfile,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log('Form submitted successfully:', passwordForm);
            appendAlert("Personal Info have been successfully changed", 'success');
            setSavedProfile({
                ...editedProfile,
                password: savedProfile.password
            });
            setPersonalEdit(false);
            
        } else {
            setFormErrors(errors);
        }
    };


    const [passwordFormErrors, setPasswordFormErrors] = useState({
        oldPassoword: '',
        password: '',
        passwordVal: '',
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassoword: '',
        password: '',
        passwordVal: '',
    });


    const handlePasswordFormChange = (e) => {
        const { name, value} = e.target;
        setPasswordForm({
            ...passwordForm,
            [name]: value,
        });
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        const errors = validatePasswordForm();
        setPasswordFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log('Form submitted successfully:', passwordForm);
            setSavedProfile({
                ...savedProfile,
                password: passwordForm.password
            });
            setPersonalEdit(false);
            appendAlert("Password has been successfully changed", 'success');
        } else {
            setPasswordFormErrors(errors);
        }
    };

    const validatePasswordForm = () =>
    {

    const errors = {};  

    if(passwordForm.oldPassoword !== savedProfile.password)
    {
        errors.oldPassoword = 'Wrong Password';
    }

    if (passwordForm.password !== passwordForm.passwordVal) {
        errors.passwordVal = 'Passwords do not match';
    }
    
    if (passwordForm.password === ""){
        errors.password = 'You must enter a password'
    }

    return errors;

    };


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
                                <input type="text" class="form-control" value={editedProfile.birthdate} disabled={!personalEdit}
                                onChange={handleFormChange} name="birthdate"/>
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
                </div>
        </div>
    );
}

export default SettingsPGU;



