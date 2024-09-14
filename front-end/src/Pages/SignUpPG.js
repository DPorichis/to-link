import React, { useState, useEffect} from "react";
import Header from "../Components/Header";

import "./SignUp.css"


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const emptyAccount = 
{
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordval: "",
    accept: false
}

function SignUpPG(props) {

    // useEffect(() => {
        
    //     const logout = async () => {
    //     const response = await fetch("http://127.0.0.1:8000/logout", {
    //         method: "POST",
    //         credentials: "include",  // Include cookies in the request
    //     });
    //     if (response.ok) {
    //         console.log("Logged out successfully");
    //     } else {
    //         console.error("Logout failed");
    //     }
    //     document.cookie = `csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // }

    //     logout();
    // }, []);


    const [image, setImages] = useState(null);

    const handleImageChange = (e) => {
        setImages(e.target.files[0]);
    };

    const [prog, setProg] = useState(0)
 
    const [formData0, setFormData0] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordVal: '',
        agreed: false,
    });

    const [formErrors0, setFormErrors0] = useState({
        email: '',
        password: '',
        passwordVal: '',
        name:'',
        lastName:'',
        agreed:''
    });

    const [formErrors1, setFormErrors1] = useState({
        pfFirstName:'',
        pfLastName:''
    });

    const [formData1, setFormData1] = useState({
        birthdate: null,
        country: '',
        city: '',
        phoneNumber: '',
        

        pfFirstName: '',
        pfLastName: '',
        pfTitle: '',
        pfBio: '',
        pfEducation: [],
        pfExperience: [],
        pfSkills:[],
        pfPicture: '',
    
        pfPhone: '',
        pfEmail: '',
        pfWebsite: ''
    });

    const handleChange0 = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData0({
        ...formData0,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit0 = async (e) => {
        e.preventDefault();
        const errors = await validateForm();
        if (Object.keys(errors).length === 0) {
            console.log('Form submitted successfully:', formData0);
            setFormData1({
                ...formData1,
                pfFirstName: formData0.firstName,
                pfLastName: formData0.lastName,
            });
            setProg(1);
        } else {
            setFormErrors0(errors);
        }
    };
    
    const validateForm = async () => {

        // try {
        //     const response = await fetch("http://127.0.0.1:8000/logout", {
        //         method: "POST",
        //         credentials: "include",  // Include cookies in the request
        //     });
        //     if (response.ok) {
        //         console.log("Logged out successfully");
        //     } else {
        //         console.error("Logout failed");
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        // }

        const errors = {};
        
        if (formData0.password !== formData0.passwordVal) {
        errors.passwordVal = 'Passwords do not match';
        }
        
        // Regular expression for validating an email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData0.email === "" || !re.test(formData0.email))
        {
        errors.email = 'You must enter a valid email address'
        }
        
        if (formData0.agreed === false){
        errors.agreed = 'You must agree to the terms'
        }

        if (formData0.password === ""){
        errors.password = 'You must enter a password'
        }

        if (formData0.name === ""){
        errors.name = 'You must enter a first name'
        }

        if (formData0.lastName === ""){
        errors.lastName = 'You must enter a last name'
        }

        if (Object.keys(errors).length===0){
            const response = await fetch("http://127.0.0.1:8000/signup", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                name: formData0.firstName,
                surname: formData0.lastName,
                email: formData0.email,
                password: formData0.password,
                }),
            });
            
            const data = await response.json();

            // Check if the 'success' field is present
            if (response.ok) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
            } else {
                console.log("Failed:", data);
                errors.email = 'Email is already in use'
            }
        }
        
        return errors;
    };


    
    const handleChange1 = (e) => {
        const { name, value} = e.target;
        setFormData1({
        ...formData1,
        [name]: value,
        });
    };

    const addEdu = () => {
        setFormData1((prevProfile) => ({
          ...prevProfile,
          pfEducation: [... prevProfile.pfEducation, ""],
        }));
    };

    const remEdu = (event) => {
        const {name} = event.target
        setFormData1({
          ... formData1,
          pfEducation: formData1.pfEducation.filter((_, i) => i != name)
        });
    };

    const handleEduChange = (event) => {
        const { name, value } = event.target;
        
        const newEdu = formData1.pfEducation.map((inst, i) =>
            i == name ? value : inst
        );

        console.log(newEdu);
        
        setFormData1((prevProfile) => ({
          ...prevProfile,
          pfEducation: newEdu,
        }));
    };

    const remExp = (event) => {
        const {name} = event.target;
        setFormData1((prevProfile) => ({
          ...prevProfile,
          pfExperience: formData1.pfExperience.filter((_, i) => i != name),
        }));
    };

    const addExp = () => {
        setFormData1((prevProfile) => ({
          ...prevProfile,
          pfExperience: [... prevProfile.pfExperience, ""],
        }));
    };

    const handleExpChange = (event) => {
        const { name, value } = event.target;
        
        const newExp = formData1.pfExperience.map((inst, i) =>
            i == name ? value : inst
        );

        setFormData1((prevProfile) => ({
        ...prevProfile,
        pfExperience: newExp,
      }));
    };

    const remSkill = (event) => {
        const {name} = event.target;
        setFormData1((prevProfile) => ({
          ...prevProfile,
          pfSkills: formData1.pfSkills.filter((_, i) => i != name),
        }));
    };

    const addSkill = () => {
        setFormData1((prevProfile) => ({
          ...prevProfile,
          pfSkills: [... prevProfile.pfSkills, ""],
        }));
    };

    const handleSkillChange = (event) => {
        const { name, value } = event.target;
        
        const newSkill = formData1.pfSkills.map((inst, i) =>
            i == name ? value : inst
        );

        setFormData1((prevProfile) => ({
        ...prevProfile,
        pfSkills: newSkill,
      }));
    };

    const validateForm1 = () => {

        const errors = {};
        
        if (formData1.pfFirstName === ""){
            errors.pfFirstName = 'You must enter a first name'
        }

        if (formData1.pfLastName === ""){
            errors.pfLastName = 'You must enter a last name'
        }

        const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Regular expression for YYYY-MM-DD format

        if (!datePattern.test(formData1.birthdate)) {
            errors.birthdate = 'You must enter a valid birthdate';
        }

        return errors;
    };


    const handleSubmit1 = async (e) => {
        e.preventDefault()
        
        const errors = validateForm1();
        
        if (Object.keys(errors).length !== 0) {
            setFormErrors1(errors);
            return
        }
        
        // Create a FormData object
        const readyForm = new FormData();

        readyForm.append("name", formData1.pfFirstName);      // 'name' in serializer
        readyForm.append("surname", formData1.pfLastName);    // 'surname' in serializer
        readyForm.append("title", formData1.pfTitle);         // 'title' in serializer
        readyForm.append("bio", formData1.pfBio);             // 'bio' in serializer
        readyForm.append("phone", formData1.pfPhone);         // 'phone' in serializer
        readyForm.append("website", formData1.pfWebsite);     // 'website' in serializer
        readyForm.append("email", formData1.pfEmail);         // 'email' in serializer

        // Experience and Education are likely arrays, so you need to stringify them
        readyForm.append("experience", JSON.stringify(formData1.pfExperience));
        readyForm.append("education", JSON.stringify(formData1.pfEducation));
        readyForm.append("skills", JSON.stringify(formData1.pfSkills));
        
        if (image) {
            readyForm.append('pfp', image);
        }

        const token = localStorage.getItem('access_token');

        const response = await fetch("http://127.0.0.1:8000/profile/own/update/", {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: readyForm
        })


        if (response.ok) {
            console.log("skibidi yes")
        } else {
            console.log("no user logged in")
        }
        
        const response1 = await fetch("http://127.0.0.1:8000/user/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "country": formData1.country, 
                "city": formData1.city, 
                "phone": formData1.phoneNumber, 
                "birthdate": formData1.birthdate
            })
        })
        
        if (response.ok) {
            console.log("skibidi yes")
        } else {
            console.log("no user logged in")
        }
        setProg(2);
    };

    return (
        <div>
            <Header />
            <div style={{width:"70%", marginLeft:"15%"}}>
            {prog === 0 ? 
            <>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
            style={{marginBottom:"10px"}}>
                <div class="progress-bar" style={{width: "0%"}}></div>
            </div>
            <div style={{padding:"20px 40px", border: "#aaa 1px solid ", borderRadius: "15px", textAlign: "left"}}>
                <h5>Enter your credentials</h5>
                <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit0}>
                    <div className="col-md-6" style={{marginBottom:"5px"}}>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className={`form-control ${formErrors0.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        name="firstName"
                        value={formData0.firstName}
                        onChange={handleChange0}
                        required
                        placeholder="ex. John"
                    />
                    <div className="invalid-feedback">{formErrors0.name || 'Please enter your first name.'}</div>
                    </div>
                    <div className="col-md-6" style={{marginBottom:"5px"}}>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className={`form-control ${formErrors0.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        name="lastName"
                        value={formData0.lastName}
                        onChange={handleChange0}
                        required
                        placeholder="ex. Johnson"
                    />
                    <div className="invalid-feedback">{formErrors0.name || 'Please enter your last name.'}</div>
                    </div>
                    <div className="col-md-12" style={{marginBottom:"5px"}}>
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input
                        type="email"
                        className={`form-control ${formErrors0.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        aria-describedby="inputGroupPrepend"
                        value={formData0.email}
                        onChange={handleChange0}
                        required
                        placeholder="ex. JohnJohnson@email.com"
                        />
                        <div className="invalid-feedback">{formErrors0.email || 'Please enter a valid email address.'}</div>
                    </div>
                    </div>
                    <div className="col-md-12" style={{marginBottom:"5px"}}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${formErrors0.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData0.password}
                        onChange={handleChange0}
                        required
                        placeholder="Enter your password"
                    />
                    <div className="invalid-feedback">{formErrors0.password || 'Please enter a password.'}</div>
                    </div>
                    <div className="col-md-12" style={{marginBottom:"5px"}}>
                    <label htmlFor="passwordVal" className="form-label">Password Validation</label>
                    <input
                        type="password"
                        className={`form-control ${formErrors0.passwordVal ? 'is-invalid' : ''}`}
                        id="passwordVal"
                        name="passwordVal"
                        value={formData0.passwordVal}
                        onChange={handleChange0}
                        required
                        placeholder="Re-enter your password"
                    />
                    <div className="invalid-feedback">{formErrors0.passwordVal || 'Please enter the same password as before.'}</div>
                    </div>
                    <div className="col-12" style={{marginBottom:"5px"}}>
                    <div className="form-check">
                        <input
                        className={`form-check-input ${formErrors0.agreed ? 'is-invalid' : ''}`}
                        type="checkbox"
                        id="agreed"
                        name="agreed"
                        checked={formData0.agreed}
                        onChange={handleChange0}
                        required
                        />
                        <label className="form-check-label" htmlFor="agreed">
                            Agree to terms and conditions
                        </label>
                        <div className="invalid-feedback">{formErrors0.agreed || 'You must agree to the terms'}</div>
                    </div>
                    </div>
                </form>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit0}>Next Step</button>
                </div>
        </div>
        </>
        : (prog === 1 ? 
            <>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
            style={{marginBottom:"10px"}}>
                <div class="progress-bar" style={{width: "50%"}}></div>
            </div>
            <div style={{padding:"20px 40px", border: "#aaa 1px solid ", borderRadius: "15px", textAlign: "left"}}>
            <h3>Account Information</h3>
            <p>Your account has been created successfully! Let's fill in your information.</p>
            <form onSubmit={handleSubmit1}>
                <h5>Personal Information</h5>
                <div style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                    <p>This information is private, and won't ever be visible to other users</p>
                    <div class="row" >
                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                            <label for="country" class="form-label" style={{marginBottom:"2px"}}>Country of Residence</label>
                            <input type="text" class="form-control" name="country"
                            onChange={handleChange1} value={formData1.country}/>
                        </div>
                        
                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                            <label for="city" class="form-label" style={{marginBottom:"2px"}}>City</label>
                            <input type="text" class="form-control" name="city" 
                            onChange={handleChange1} value={formData1.city}/>
                        </div>

                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                            <label class="form-label" style={{marginBottom:"2px"}}>Birthdate</label>
                            <input type="date" 
                                className={`form-control ${formErrors1.birthdate ? 'is-invalid' : ''}`}
                                value={formData1.birthdate}
                                onChange={handleChange1}
                                id="birthdate"
                                name="birthdate"/>
                            <div className="invalid-feedback">{formErrors1.birthdate || 'Please enter a valid date.'}</div>
                        </div>
                        
                        <div class="col-md-6" style={{marginBottom:"5px"}}>
                            <label for="phoneNumber" class="form-label" style={{marginBottom:"2px"}}>Phone Number</label>
                            <input type="text" class="form-control" name="phoneNumber" 
                            onChange={handleChange1} value={formData1.phoneNumber}/>
                        </div>

                    </div>
                
                </div>
                <h5>Profile Information</h5>
                <div class="row" style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                    <p>The following information will be public. Visibility settings can be adjusted in profile settings afterwards</p>
                    
                    <div class="col-md-8" style={{marginBottom:"5px"}}>
                        <h5>Profile Banner</h5>
                        <label for="pfp" class="form-label" style={{marginBottom:"2px"}}>Profile Picture</label>
                        <input type="file" class="form-control" name="imgURL" accept="image/*" 
                        onChange={handleImageChange} />
                        <div class="row">
                            <div class="col-md-6" style={{marginBottom:"5px"}}>
                                <label htmlFor="lastName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${formErrors1.pfFirstName ? 'is-invalid' : ''}`}
                                    id="pfFirstName"
                                    name="pfFirstName"
                                    value={formData1.pfFirstName}
                                    onChange={handleChange1}
                                    
                                    placeholder="ex. Jim"
                                />
                                <div className="invalid-feedback">{formErrors1.pfFirstName || 'Please enter your last name.'}</div>
                            </div>
                            
                            <div class="col-md-6" style={{marginBottom:"5px"}}>
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${formErrors1.pfLastName ? 'is-invalid' : ''}`}
                                    id="lastNpfLastNameame"
                                    name="pfLastName"
                                    value={formData1.pfLastName}
                                    onChange={handleChange1}
                                    
                                    placeholder="ex. Johnson"
                                />
                                <div className="invalid-feedback">{formErrors1.pfLastName || 'Please enter your last name.'}</div>
                            </div>
                        </div>
                        <div class="col-mb-3" style={{marginBottom:"5px"}}>
                            <label for="imgUrl" class="form-label" style={{marginBottom:"2px"}}>Title</label>
                            <input type="text" class="form-control" name="pfTitle"
                            onChange={handleChange1} value={formData1.pfTitle}/>
                        </div>
                    
                    </div>
                    <div class="col-md-4">
                        <h5>Contact Info</h5>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <label for="pfEmail" class="form-label" style={{marginBottom:"2px"}}>Email</label>
                            <input type="email" class="form-control" name="pfEmail"
                            onChange={handleChange1} value={formData1.pfEmail}/>
                        </div>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <label for="pfPhone" class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                            <input type="tel" class="form-control" name="pfPhone"
                            onChange={handleChange1} value={formData1.pfPhone}/>
                        </div>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <label for="pfWebsite" class="form-label" style={{marginBottom:"2px"}}>Website</label>
                            <input type="link" class="form-control" name="pfWebsite"
                            onChange={handleChange1} value={formData1.pfWebsite}/>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <h5>General Info</h5>
                        <div class="mb-12" style={{marginBottom:"5px"}}>
                            <label for="pfBio" class="form-label" style={{marginBottom:"2px"}}>Bio</label>
                            <textarea class="form-control" name="pfBio"
                            onChange={handleChange1} value={formData1.pfBio}>
                            this is a bio
                            </textarea>
                        </div>
                        <div class="mb-12" style={{marginBottom:"3px"}}>
                            <label for="pfExperience" class="form-label" style={{marginBottom:"2px"}}>Experience</label>
                            <ul id="experienceList" class="list-group">
                            {formData1.pfExperience.map((exp, index) =>
                                <li class="list-group-item" style={{display:"flex", justifyContent:"space-between"}}>
                                    <input type="text" class="form-control" name={index} 
                                    placeholder="Add experience here" value={exp} onChange={handleExpChange}/>
                                    <button type="button" class="btn btn-danger" 
                                    style={{marginLeft: "4px"}} onClick={remExp} name={index}>
                                        -
                                    </button>
                                </li>                                    
                            )}
                            </ul>
                            <div class="list-group">
                                <button type="button" class="btn btn-outline-success mt-2" id="addExperience"
                                onClick={addExp} style={{marginBottom:"5px"}}
                                >Add Experience</button>
                            </div>
                        </div>
                        <div class="mb-12" style={{marginBottom:"3px"}}>
                            <label for="pfEducation" class="form-label" style={{marginBottom:"2px"}}>Education</label>
                            <ul id="educationList" class="list-group">
                                {formData1.pfEducation.map((_, index) =>
                                    <li class="list-group-item" style={{display:"flex", justifyContent:"space-between"}}>
                                        <input type="text" class="form-control" name={index} 
                                        placeholder="Add education here" value={formData1.pfEducation[index]} onChange={handleEduChange}/>
                                        <button type="button" class="btn btn-danger" 
                                        style={{marginLeft: "4px"}} onClick={remEdu} name={index}>
                                            -
                                        </button>
                                    </li>                                    
                                )}
                            </ul>
                            <div class="list-group">
                                <button type="button" class="btn btn-outline-success mt-2" id="addExperience"
                                onClick={addEdu} style={{marginBottom:"5px"}}
                                >Add Education</button>
                            </div>
                        </div>
                        <div class="mb-12" style={{marginBottom:"3px"}}>
                            <label for="pfSkills" class="form-label" style={{marginBottom:"2px"}}>Skills</label>
                            <ul id="skillList" class="list-group">
                                {formData1.pfSkills.map((_, index) =>
                                    <li class="list-group-item" style={{display:"flex", justifyContent:"space-between"}}>
                                        <input type="text" class="form-control" name={index} 
                                        placeholder="Add skill here" value={formData1.pfSkills[index]} onChange={handleSkillChange}/>
                                        <button type="button" class="btn btn-danger" 
                                        style={{marginLeft: "4px"}} onClick={remSkill} name={index}>
                                            -
                                        </button>
                                    </li>                                    
                                )}
                            </ul>
                            <div class="list-group">
                                <button type="button" class="btn btn-outline-success mt-2" id="addSkill"
                                onClick={addSkill} style={{marginBottom:"5px"}}
                                >Add Skill</button>
                            </div>
                        </div>
                    </div>                
                </div>
                <div style={{display:"flex", justifyContent:"end"}}>
                        <button className="btn btn-outline-danger" style={{marginRight:"5px"}}>Cancel Account Creation</button>
                        <button className="btn btn-primary" type="submit">Next Step</button>
                </div>
            </form>
        </div>
        </>   
        :
            <>
            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
            style={{marginBottom:"10px"}}>
                <div class="progress-bar" style={{width: "100%"}}></div>
            </div>
            <div style={{padding:"20px 40px", border: "#aaa 1px solid ", borderRadius: "15px", textAlign: "left"}}>    
                <h3>You are all set!</h3>
                <p>Your account is set up and ready to be used! Click the button bellow to log in to the amazing world of ToLink!</p>
                <a href="/" className="btn btn-primary">Login In here</a>
            </div>
            </>
            )}
            </div>
            
        </div>

    );
}
export default SignUpPG;    