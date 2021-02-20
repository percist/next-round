import React from 'react';
import './UserImage.css';

const UserImage = ({ user }) => {
  return (
    <a href={`/users/${user.id}`} >
      {!user.imgUrl && "Loading ..."}
      {user.imgUrl && 
        <img 
          id="user-image"
          src={user.imgUrl} 
          alt="user" 
          />}
    </a>
  )
}