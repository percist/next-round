import React, {useState, useRef} from 'react';
import spinner from  '../../Spinner-1s-44px.gif'
import './UserImage.css';
import { IoPersonCircleOutline } from 'react-icons/all';

const UserImage = ({ user, type }) => {
  
  const [loading, setLoading] = useState(true);

  const handleImageErrored = () => <IoPersonCircleOutline />

  if (type === "profile") {
    return (
      <>
        <div hidden={!loading} className="user-placeholder">
          <img src={spinner} alt="loading..."/>
        </div>        {user.imgUrl &&
          <img
            id="user-image"
            src={user.imgUrl}
            onError={handleImageErrored}
            onLoad={() => setLoading(false)}
            alt="user"
          />}
      </>
    )
  } else {

    return (
      <a href={`/users/${user.id}`} >
        <div hidden={!loading} className="user-placeholder">
          <img src={spinner} alt="loading..."/>
        </div>
        {user.imgUrl &&
          <img
            id="user-image"
            src={user.imgUrl}
            alt="user"
            onError={handleImageErrored}
            onLoad={() => setLoading(false)}
          />}
      </a>
    );
  };
};

export default UserImage;