import React from 'react';

import './ProfileSmall.css';


function ProfileSmall(props){


return(
<li className = "link"  key={props.name}>
    <img src={props.imgURL} alt="Avatar" style={{width :"50px",height:"50px",marginRight: '2px'}} className="link-image" />
    <div style={{display:"flex",flexDirection:"column"}}>
        <div className="link-name" style={{textAlign:"left", margin: '0'}}>{props.name}</div>
        <div className="link-title" style={{textAlign:"left", margin: '0'}}>{props.title}</div>
    </div>
</li>
);
}
export default ProfileSmall