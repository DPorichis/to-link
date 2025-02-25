// AdminDashboardPGA.js
// This page allows admin to fetch users
// Export user data in different formats (JSON or XML).
//==================================================

import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from 'react-router-dom';

import "./AdminDashboardPGA.css"
import { useFormState } from "react-dom";
import { refreshAccessToken } from "../../functoolbox";
import NotFoundPG from '../NotFoundPG';
import {jwtDecode} from "jwt-decode";


function AdminDashboardPGA(props) {

    // User List
    const [users, setUsers] = useState({});
    const [filteredData, setFilterdData] = useState({});

    // Search parameters
    const [filterParams, setFilterParams] = useState(
        {
            for: 'all',
            text: ''
        }
        );   

    // Export Managment
    const [exportMode, setExportMode] = useState(false);
    const [exportSelection, setExportSelection] = useState(
    {
        selectedUsers: [],
        format: "JSON",
        selectedArtifacts: []
    });

    // Render Control
    const [loading, setLoading] = useState(true);
    const [noAuth, setNoAuth] = useState(false);


    // Fetch User List
    const fetchUsers = async (page) => {
        const token = localStorage.getItem('access_token');        
        const response = await fetch(page ? page : "http://127.0.0.1:8000/admin/fetch/allusers", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ search: filterParams.text, filter_by: filterParams.for })
        });
    
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
            setFilterdData(data);
        } else if (response.status === 401) {
            localStorage.removeItem('access_token');
            await refreshAccessToken();
            if (localStorage.getItem('access_token') !== null) {
                await fetchUsers();
            } else {
                setNoAuth(true);
                console.log("no user logged in");
            }
        } else {
            setNoAuth(true);
        }
        setLoading(false);
    };

    // Re-fetch upon filter Params change
    useEffect(() => {
        const token = localStorage.getItem('access_token');        
        // If no token, redirect to login
        if (!token) {
            setNoAuth(true);
            return
        }
        const decodedToken = jwtDecode(token);
        if (!decodedToken.is_admin) {
            setNoAuth(true);
            return
        }
        fetchUsers();
    }, [filterParams]);


    // Redirect to detailed view //

    const navigate = useNavigate();

    const handleRowClick = (event) => {
        const { id } = event.currentTarget.dataset;
        navigate(`/admin/view?user_id=${id}`);
    };

    

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFilterParams({
        ...filterParams,
        [name]: value,
        });
    };

    // Export Managment //

    const handleSelectionChange = (e) => {
        const {id} = e.target;
        console.log(id)
        console.log(exportSelection)
        if(!exportSelection.selectedUsers.includes(id))
        {
            setExportSelection({
                ...exportSelection,
                selectedUsers: [...exportSelection.selectedUsers, id]
            })
        }
        else
        {
            setExportSelection({
                ...exportSelection,
                selectedUsers: exportSelection.selectedUsers.filter(usr => usr !== id)
            });
        }
    }

    const handleArtifactsChange = (e) => {
        const {id} = e.target;
        if(!exportSelection.selectedArtifacts.includes(id))
        {
            setExportSelection({
                ...exportSelection,
                selectedArtifacts: [...exportSelection.selectedArtifacts, id]
            })
        }
        else
        {
            setExportSelection({
                ...exportSelection,
                selectedArtifacts: exportSelection.selectedArtifacts.filter(art => art !== id)
            });
        }
    }

    const handleExport = async () => {
        const token = localStorage.getItem('access_token');
        console.log(exportSelection)
        const response = await fetch("http://127.0.0.1:8000/admin/export", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            
            body: JSON.stringify(exportSelection)
        });

        if (!response.ok) {
            throw new Error('Failed to download file');
        }
    
        // Manage the file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        
        if(exportSelection.format === "XML")
            {link.setAttribute('download', 'user_data.xml');}
        else
            {link.setAttribute('download', 'user_data.json');}
        
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setExportSelection({
            selectedUsers: [],
            format: "JSON",
            selectedArtifacts: []
        });
        setExportMode(false);


    }

    const handleFormatChange = (e) => {
        const {value} = e.target
        setExportSelection({...exportSelection, format: value});
        console.log(exportSelection)
    }


    const handleCancel = () => {
        setExportSelection({
            selectedUsers: [],
            format: "JSON",
            selectedArtifacts: []
        });
        setExportMode(false);
        
    };
    
    // Rendering Control

    if (noAuth) return <NotFoundPG/>
    if (loading) return <>Loading</>

    return (
        <div>
            <Header log='admin' act='home'/>
            <div style={{width:"70%", marginLeft:"15%", marginTop:"10px", textAlign:"left"}}>
                <h4>User Managment View</h4>
                <div style={{border:"#ccc solid 1px", borderRadius: "10px",
                    display:"flex", flexDirection:"row", marginBottom:"10px"
                }}>
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"left", textAlign:"left", width:"15%", borderRight:"#333 solid 1px",
                        borderEndStartRadius: "10px", borderStartStartRadius: "10px", padding:"3px 3px"
                    }}>
                        <label style={{fontSize:"12px", marginLeft:"2px"}}>Searching by</label>
                        <select name="for" style={{border:"none", outline:"none", padding:"0"}} value={filterParams.for}
                        onChange={handleChange}>
                            <option value="all">Anything</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="uid">User ID</option>
                        </select>
                    </div>
                    <input name="text" style={{width:"79%", border:"none", outline:"none"}} value={filterParams.text}
                    onChange={handleChange}/>
                    <button style={{width:"6%", border:"none", outline:"none", borderEndEndRadius: "10px", borderStartEndRadius: "10px",}}>
                        <img src="/search.svg" style={{}} />
                    </button>
                </div>
                
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom: "3px"}}>
                    {exportMode?
                    // Export View
                    <>
                        <p style={{marginBottom: "0"}}>You have selected {exportSelection.selectedUsers.length} users for export.</p>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <button type="button" class="btn btn-outline-danger btn-sm" onClick={handleCancel}
                                style={{marginRight:"5px"}}>Cancel</button>
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exportmodal"
                            disabled={exportSelection.selectedUsers.length === 0}>
                                Export Selected
                            </button>
                            <div class="modal fade" id="exportmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Export Options</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <p style={{marginBottom:"3px"}}>What do you want to export?</p>
                                    <div class="row" style={{marginBottom:"5px"}}>
                                        <div class="col-md-6">
                                            <form>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Personal Information"
                                                    checked={exportSelection.selectedArtifacts.includes("Personal Information")}
                                                    onChange={handleArtifactsChange}
                                                    />
                                                    <label class="form-check-label" for="persinfo">
                                                        Personal Information
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Profile Information"
                                                    checked={exportSelection.selectedArtifacts.includes("Profile Information")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="profinfo">
                                                        Profile Information
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Posts"
                                                    checked={exportSelection.selectedArtifacts.includes("Posts")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="Posts">
                                                        Posts
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Listings"
                                                    checked={exportSelection.selectedArtifacts.includes("Listings")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="Listings">
                                                        Listings
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-md-6">
                                            <form>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Comments"
                                                    checked={exportSelection.selectedArtifacts.includes("Comments")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label"for="Comments">
                                                        Comments
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Likes"
                                                    checked={exportSelection.selectedArtifacts.includes("Likes")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="Likes">
                                                        Likes
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Applications"
                                                    checked={exportSelection.selectedArtifacts.includes("Applications")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="Applications">
                                                        Applications
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-md-4" style={{marginBottom:"10px"}}>
                                        <label for="level" class="form-label" style={{marginBottom:"5px"}}>Export format</label>
                                        <select class="form-select" name="level" value={exportSelection.format}
                                        onChange={handleFormatChange}>
                                            <option value="JSON">JSON</option>
                                            <option value="XML">XML</option>
                                        </select>
                                    </div>
                                    
                                    
                                    <div style={{borderTop:"#ccc solid 1px", paddingTop:"4px"}}>
                                    {exportSelection.selectedArtifacts.length !== 0
                                    ?
                                    <p style={{marginBottom:"0px"}}>You are about to export 
                                        {exportSelection.selectedArtifacts.map((art) => <>{" "+ art + ","}</>)}
                                        {" "} 
                                        from {exportSelection.selectedUsers.length} users.
                                    </p>
                                    :
                                    <p style={{marginBottom:"0px"}}>
                                        You must select something to export.
                                    </p>
                                    }
                                    </div>
                                    
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Back</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                    disabled={exportSelection.selectedArtifacts.length === 0} onClick={handleExport}>Export</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <p style={{marginBottom: "0"}}>Select a user for inspection, or export.</p>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onClick={() => {setExportMode(true);}}>Export</button>
                        </div>
                    </>
                    }
                    
                </div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2px", marginBottom:"0px"}}>
                    <span style={{marginTop:"4px"}}>Total Results: {filteredData.count}</span>
                    <nav aria-label="..." style={{marginBottom:"0px"}}>
                        <ul class="pagination pagination-sm" style={{marginBottom:"5px"}}>
                            <li class={filteredData.previous ? "page-item" : "page-item disabled"}>
                                <button class="page-link" onClick={()=>{fetchUsers(filteredData.previous)}} disabled={!filteredData.previous}>{"< Previous Page"}</button>
                            </li>
                            <li class={filteredData.next ? "page-item" : "page-item disabled"}><button class="page-link" onClick={()=>{fetchUsers(filteredData.next)}} disabled={!filteredData.next}>{"Next Page >"}</button></li>
                        </ul>
                    </nav>
                </div>
                {exportMode?
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">UserID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">PostCount</th>
                            <th scope="col">ListingsCount</th>
                            <th scope="col">Include in Export</th>
                        </tr>
                    </thead>
                    <tbody className="admin-table-element">
                        {filteredData.results ? filteredData.results.map((usr) =>
                        <tr data-id={usr.user_id}>
                            <th scope="row">{usr.user_id}</th>
                            <td>{usr.user_info.name + " " + usr.user_info.surname + " (AKA:"+ usr.name + " " + usr.surname + ")"}</td>
                            <td>{usr.user_info.email}</td>
                            <td>{usr.post_cnt}</td>
                            <td>{usr.listings_cnt}</td>
                            <td><input type="checkbox" id={usr.user_id} onChange={handleSelectionChange} 
                            checked={exportSelection.selectedUsers.includes(String(usr.user_id))}/></td>
                        </tr>
                        )
                        :
                        <></>
                        }
                    </tbody>
                </table>
                :
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">UserID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">PostCount</th>
                            <th scope="col">ListingsCount</th>
                        </tr>
                    </thead>
                    <tbody className="admin-table-element">
                        {filteredData.results ? filteredData.results.map((usr) =>
                        <tr data-id={usr.user_id} onClick={handleRowClick} style={{cursor:"pointer"}}>
                            <th scope="row">{usr.user_id}</th>
                            <td>{usr.user_info.name + " " + usr.user_info.surname + " (AKA:"+ usr.name + " " + usr.surname + ")"}</td>
                            <td>{usr.user_info.email}</td>
                            <td>{usr.post_cnt}</td>
                            <td>{usr.listings_cnt}</td>
                        </tr>
                        ):
                        <></>}
                    </tbody>
                </table>
                }

            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", marginTop:"2px", marginBottom:"20px"}}>
                    <nav aria-label="..." style={{marginBottom:"0px"}}>
                        <ul class="pagination pagination-sm" style={{marginBottom:"5px"}}>
                            <li class={filteredData.previous ? "page-item" : "page-item disabled"}>
                                <button class="page-link" onClick={()=>{fetchUsers(filteredData.previous)}} disabled={!filteredData.previous}>{"< Previous Page"}</button>
                            </li>
                            <li class={filteredData.next ? "page-item" : "page-item disabled"}><button class="page-link" onClick={()=>{fetchUsers(filteredData.next)}} disabled={!filteredData.next}>{"Next Page >"}</button></li>
                        </ul>
                    </nav>
                </div>
            </div>


        </div>
    );
}
export default AdminDashboardPGA; 