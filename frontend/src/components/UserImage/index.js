import React, { useState } from 'react';
import spinner from  '../../Spinner-1s-44px.gif'
import './UserImage.css';
import { IoPersonCircleOutline } from 'react-icons/all';

const UserImage = ({ user, type }) => {

  const [ imageLoaded, setImageLoaded ] = useState("loading")
  const [ imageErrored, setImageErrored ] = useState("")
  
  const handleImageLoaded = () => setImageLoaded("loaded")
  
  const handleImageErrored = () => setImageErrored(<img src={spinner} alt="loading..."/>)

  if (type === "profile") {
    return (
      <>
        {!user.imgUrl && <IoPersonCircleOutline />}
        {user.imgUrl &&
          <img
            id="user-image"
            src={user.imgUrl}
            onLoad={handleImageLoaded}
            onError={handleImageErrored}
            alt="user"
          />}
      </>
    )
  } else {

    return (
      <a href={`/users/${user.id}`} >
        {!user.imgUrl && <IoPersonCircleOutline />}
        {user.imgUrl &&
          <img
            id="user-image"
            src={user.imgUrl}
            alt="user"
          />}
      </a>
    );
  };
};

export default UserImage;