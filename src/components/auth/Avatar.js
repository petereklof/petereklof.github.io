import React from 'react'

const Avatar = (props) => {
    return ( 
        <div className={props.size ? 'avatar avatar-' + props.size : 'avatar'}>
            
            {props.profile.image === undefined ? (
                <span className="avatar-title rounded-circle">{props.profile.initials}</span>
            ) : (
                <img src={props.profile.image} alt={props.profile.initials} class="avatar-img rounded-circle"></img>)
            }
            
        </div>
     );
}
 
export default Avatar;