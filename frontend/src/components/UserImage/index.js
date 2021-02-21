import React from 'react';
import './UserImage.css';
import { IoPersonCircleOutline } from 'react-icons/all';

const UserImage = ({ user, type }) => {

  if (type === "profile") {
    return (
      <>
        {!user.imgUrl && <IoPersonCircleOutline />}
        {user.imgUrl &&
          <img
            id="user-image"
            src={user.imgUrl}
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