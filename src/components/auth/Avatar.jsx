import React from 'react';

const Avatar = ({ size, profile }) => (
  <div className={size ? `avatar avatar-${size}` : 'avatar'}>

    {profile.image === undefined ? (
      <span className="avatar-title rounded-circle">{profile.initials}</span>
    ) : (
      <img src={profile.image} alt={profile.initials} className="avatar-img rounded-circle" />)}

  </div>
);

export default Avatar;
