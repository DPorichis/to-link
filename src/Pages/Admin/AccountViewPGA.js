import React from "react";
import Header from "../../Components/Header";

let dammylistings =
    [
        {
            id:1002,
            state:"Public",
            title:"Junior Dev at ToLink",
            user:"Makis",
            relation:"In your network",
            spot:"Remote",
            time:"Full-time", 
            location:"Athens, Greece", 
            level:"Entry level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            responses: []
        },
        {
            id:1003,
            state:"Public",
            title:"Bet-builder agent",
            user:"Uncle Nionios",
            relation:"In your network",
            spot:"On-site",
            time:"Part-time", 
            location:"Spiti tou, Spata, Greece", 
            level:"Mid level",
            desc:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            responses: []
        }
    ]
const dummyprofile =
{
    pfname: "Lakis",
    pfsurname: "Lalakis",
    pfimgURL: "/logo192.png",
    pfemail: "work@work.work",
    pfphone: "2103333333",
    pfwebsite: "google.com",
    pfbio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    pfexperience: ["Important", "Important", "Important"],
    pfeducation: ["Important", "Important"],
    
    name: "Lakis",
    surname: "Lalakis",
    email: "kati@kati.cy",
    phone: "+306947589234",
    birthdate: "10/10/10",
    country: "Greece",
    city: "Athens",
    password: "...",

    
    listings: dammylistings,
    applications: [],
    posts: [],
    likes: [],
    comments: [],

}


function AccountViewPGA(props) {
    return (
        <div>
            <Header log='admin' act='view'/>
            <div style={{display:"flex", width:"70%", marginLeft:"15%", marginTop:"10px", flexDirection:"column"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", 
                borderBottom:"#aaa solid 1px", marginBottom:"5px", paddingBottom:"2px", width:"100%"}}>
                    <button>
                        {"< Back"}
                    </button>
                    
                    <button>
                        {"Export"}
                    </button>

                </div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", 
                marginBottom:"5px", width:"100%", textAlign:"left"}}>
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", 
                    marginBottom:"5px", width:"50%"}}>
                    <h5>Profile Information</h5>
                    <div class="row" style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                        <div class="col-md-4">
                            <img src={dummyprofile.pfimgURL} width={"120px"} height={"120px"}/>
                        </div>
                        <div class="col-md-8" style={{marginBottom:"5px"}}>
                            <div class="row">
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Name</label>
                                    <input type="text" class="form-control" value={dummyprofile.pfname}/>
                                </div>
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Surname</label>
                                    <input type="text" class="form-control" value={dummyprofile.pfsurname}/>
                                </div>
                            </div>
                            <div class="col-mb-3" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Title</label>
                                <input type="text" class="form-control" value={dummyprofile.pftitle}/>
                            </div>
                        
                        </div>
                        <div class="col-md-8" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Bio</label>
                                <textarea class="form-control" name="pfBio"
                                value={dummyprofile.pfbio}>
                                </textarea>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Email</label>
                                <input type="email" class="form-control" name="pfEmail" value={dummyprofile.pfemail}/>
                            </div>
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                                <input type="tel" class="form-control" value={dummyprofile.pfphone}/>
                            </div>
                            <div class="col-md-12" style={{marginBottom:"5px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Website</label>
                                <input type="link" class="form-control" value={dummyprofile.pfwebsite}/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            
                            <div class="mb-12" style={{marginBottom:"3px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Experience</label>
                                <ul id="experienceList" class="list-group">
                                    {dummyprofile.pfexperience.map((_, index) =>
                                        <li class="list-group-item">
                                            {dummyprofile.pfexperience[index]}
                                        </li>                                    
                                    )}
                                </ul>
                            </div>
                            <div class="mb-12" style={{marginBottom:"3px"}}>
                                <label class="form-label" style={{marginBottom:"2px"}}>Education</label>
                                <ul id="educationList" class="list-group">
                                    {dummyprofile.pfeducation.map((_, index) =>
                                        <li class="list-group-item">
                                            {dummyprofile.pfeducation[index]}
                                        </li>                                    
                                    )}
                                </ul>
                            </div>
                        </div>                
                    </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", 
                    marginBottom:"5px", width:"50%"}}>
                    <h5>Personal Information</h5>
                    <div class="row" style={{marginBottom:"20px", padding: "10px 10px", borderRadius: "10px", border: "#ddd solid 1px"}}>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <div class="row">
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Name</label>
                                    <input type="text" class="form-control" value={dummyprofile.name}/>
                                </div>
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Surname</label>
                                    <input type="text" class="form-control" value={dummyprofile.surname}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <div class="row">
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Email</label>
                                    <input type="text" class="form-control" value={dummyprofile.email}/>
                                </div>
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Phone</label>
                                    <input type="text" class="form-control" value={dummyprofile.phone}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <div class="row">
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Country</label>
                                    <input type="text" class="form-control" value={dummyprofile.country}/>
                                </div>
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>City</label>
                                    <input type="text" class="form-control" value={dummyprofile.city}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12" style={{marginBottom:"5px"}}>
                            <div class="row">
                                <div class="col-md-6" style={{marginBottom:"5px"}}>
                                    <label class="form-label" style={{marginBottom:"2px"}}>Birthdate</label>
                                    <input type="text" class="form-control" value={dummyprofile.birthdate}/>
                                </div>
                            </div>
                        </div>
                                        
                    </div>
                    
                    </div>




                </div>
            </div>
        </div>
    );
}
export default AccountViewPGA;    