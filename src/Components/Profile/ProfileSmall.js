import React from 'react';

import './ProfileSmall.css';


function ProfileSmall(props){


return(
<li className = "link"  key={props.name} style={{backgroundColor:"white",borderRadius:"10px",display:"flex",alignItems:"center"}}>
    <img src={props.imgURL} alt="Avatar" style={{width :"30px",height:"30px",marginRight: '5px'}} className="link-image" />
    <div className="link-name" style={{textAlign:"left", margin: '0'}}>{props.name}</div>
</li>
);
}
export default ProfileSmall