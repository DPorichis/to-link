import React from 'react';

import './ProfileSmall.css';
import { useNavigate } from 'react-router-dom';


function ProfileSmall(props){

    const navigate = useNavigate();

    return(
    <li className = "link"  key={props.name} style={{backgroundColor:"white",borderRadius:"10px",display:"flex",alignItems:"center", cursor:"pointer"}}
    onClick={()=>{navigate(`/user/viewprofile?user_id=${props.link.user_info.user_id}`);}}
    >
        <img src={props.link.user_info.pfp} alt="Avatar" style={{width :"30px",height:"30px",marginRight: '5px'}} className="link-image" />
        <div className="link-name" style={{textAlign:"left", margin: '0'}}>{props.link.user_info.name + " " + props.link.user_info.surname}</div>
    </li>
);
}
export default ProfileSmall