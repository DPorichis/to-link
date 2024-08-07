import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from 'react-router-dom';

function AdminDashboardPGA(props) {

    const navigate = useNavigate();

    const dummydata = 
    [
        {
            uid:"0",
            name:"Lakis",
            surname:"Lalakis",
            email:"slet@slet.gr",
            postCount: 4,
            listingsCount: 4
        },
        {
            uid:"1",
            name:"Makis",
            surname:"Mamakis",
            email:"slot@slet.gr",
            postCount: 4,
            listingsCount: 4
        },
        {
            uid:"2",
            name:"Takis",
            surname:"Tatakis",
            email:"slit@slet.gr",
            postCount: 4,
            listingsCount: 4
        },        {
            uid:"3",
            name:"Pakis",
            surname:"Papakis",
            email:"slat@slet.gr",
            postCount: 4,
            listingsCount: 4
        }
    ]

    const [filteredData, setFilterdData] = useState(dummydata);
    
    const [filterParams, setFilterParams] = useState(
    {
        for: 'all',
        text: ''
    }
    );

    useEffect(() => {

        if(filterParams.text === '')
        {
            setFilterdData(dummydata);
            return;
        }
        const data = dummydata;
        var filtereditems;

        if(filterParams.for === 'name')
        {
            filtereditems = data.filter(item =>
            {
                const name = item.name + " " + item.surname;
                return name.toLowerCase().includes(filterParams.text.toLowerCase());
            });       
        }
        else if(filterParams.for === 'email')
        {
            filtereditems = data.filter(item => item.email.toLowerCase().includes(filterParams.text.toLowerCase()));
        }
        else if(filterParams === 'uid')
        {
            filtereditems = data.filter(item => item.uid.toLowerCase().includes(filterParams.text.toLowerCase()));
        }
        else
        {
            filtereditems = data.filter(item => item.uid.toLowerCase().includes(filterParams.text.toLowerCase())
            || item.email.toLowerCase().includes(filterParams.text.toLowerCase())
            || item.name.toLowerCase().includes(filterParams.text.toLowerCase()));
        }

        setFilterdData(filtereditems);
        }, [filterParams]);
    

    const handleRowClick = (event) => {
        const { id } = event.currentTarget.dataset;
        navigate(`/admin/view?${id}`);
    };

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFilterParams({
        ...filterParams,
        [name]: value,
        });
    };

    const [exportMode, setExportMode] = useState(false);
    const [exportSelection, setExportSelection] = useState(
    {
        selectedUsers: [],
        format: "JSON",
        selectedArtifacts: []
    });


    const handleSelectionChange = (e) => {
        const {id} = e.target;
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
                    <>
                        <p style={{marginBottom: "0"}}>You have selected {exportSelection.selectedUsers.length} users for export</p>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <button type="button" class="btn btn-outline-danger btn-sm" onClick={() => {setExportMode(false);}}
                                style={{marginRight:"5px"}}>Cancel</button>
                            <div style={{border: "#ccc solid 1px", alignItems:"center", padding:"3px 5px", borderRadius:"2px", marginRight:"2px"}}>
                                <label style={{marginBottom: "0px"}}>Export format: </label>
                                <select name="format" style={{padding:"0", border: "none", outline: "none"}} 
                                value={exportSelection.format}
                                onChange={(e) => {setExportSelection({...exportSelection, format: e.value});}}>
                                    <option value="JSON">HAHA</option>
                                    <option value="XML">XML</option>
                                </select>
                            </div>
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exportmodal">
                                Export Selected
                            </button>
                            <div class="modal fade" id="exportmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">What do you want to export?</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <form>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Personal Information"
                                                    value={exportSelection.selectedArtifacts.includes("Personal Information")}
                                                    onChange={handleArtifactsChange}
                                                    />
                                                    <label class="form-check-label" for="persinfo">
                                                        Personal Information
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Profile Information"
                                                    value={exportSelection.selectedArtifacts.includes("Profile Information")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="profinfo">
                                                        Profile Information
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Posts"
                                                    value={exportSelection.selectedArtifacts.includes("Posts")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="Posts">
                                                        Posts
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Listings"
                                                    value={exportSelection.selectedArtifacts.includes("Listings")}
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
                                                    value={exportSelection.selectedArtifacts.includes("Comments")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label"for="Comments">
                                                        Comments
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Likes"
                                                    value={exportSelection.selectedArtifacts.includes("Likes")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="Likes">
                                                        Likes
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="Applications"
                                                    value={exportSelection.selectedArtifacts.includes("Applications")}
                                                    onChange={handleArtifactsChange}/>
                                                    <label class="form-check-label" for="Applications">
                                                        Applications
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {exportSelection.selectedArtifacts.length !== 0
                                    ?
                                    <div style={{borderTop:"#ccc solid 1px"}}>
                                    <p>You are about to export 
                                        {exportSelection.selectedArtifacts.map((art) => <>{" "+ art + ","}</>)}
                                        {" "} 
                                        from {exportSelection.selectedUsers.length} users</p>
                                    </div>
                                    :
                                    <></>
                                    }
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary">Export</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <p style={{marginBottom: "0"}}>Select a user for inspection, or export</p>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onClick={() => {setExportMode(true);}}>Export</button>
                        </div>
                    </>
                    }
                    
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
                    <tbody>
                        {filteredData.map((usr) =>
                        <tr data-id={usr.uid}>
                            <th scope="row">{usr.uid}</th>
                            <td>{usr.name + " " + usr.surname}</td>
                            <td>{usr.email}</td>
                            <td>{usr.postCount}</td>
                            <td>{usr.listingsCount}</td>
                            <td><input type="checkbox" id={usr.uid} onChange={handleSelectionChange} 
                            value={exportSelection.selectedUsers.includes(usr.uid)}/></td>
                        </tr>
                        )}
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
                    <tbody>
                        {filteredData.map((usr) =>
                        <tr data-id={usr.uid} onClick={handleRowClick} style={{cursor:"pointer"}}>
                            <th scope="row">{usr.uid}</th>
                            <td>{usr.name + " " + usr.surname}</td>
                            <td>{usr.email}</td>
                            <td>{usr.postCount}</td>
                            <td>{usr.listingsCount}</td>
                        </tr>
                        )}
                    </tbody>
                </table>

                }

            </div>


        </div>
    );
}
export default AdminDashboardPGA; 