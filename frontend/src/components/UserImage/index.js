import React from 'react';
import spinner from  '../../Spinner-1s-44px.gif'
import './UserImage.css';
import { IoPersonCircleOutline } from 'react-icons/all';

const UserImage = ({ user, type }) => {
  
  const handleImageErrored = () => <IoPersonCircleOutline />

  if (type === "profile") {
    return (
      <>
        {!user.imgUrl && <img src={spinner} alt="loading..."/>}
        {user.imgUrl &&
          <img
            className="user-image"
            src={user.imgUrl}
            onError={handleImageErrored}
            alt={user.username}
          />}
      </>
    )
  } else {

    return (
      <a href={`/users/${user.id}`} >
        {!user.imgUrl && <img src={spinner} alt="loading..."/>}
        {user.imgUrl &&
          <img
            className="user-image"
            src={user.imgUrl}
            alt={user.username}
          />}
      </a>
    );
  };
};

export default UserImage;