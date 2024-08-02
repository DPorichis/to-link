import React from 'react';

import './ProfileSmall.css';


function ProfileSmall(props){


return(
<li className = "link" key={props.name}>
                            <img src="/logo192.png" alt="Avatar" style={{width :"15%"}} className="link-image" />
                            <span className="link-name">{props.name}</span>
                            <span className="link-title">{props.title}</span>
                        </li>
);
}
export default ProfileSmall