import React from 'react';
import UserImage from '../UserImage';
import "./Buddies.css";

const Buddies = ({ buddy }) => {

  return (
    <div className="buddy">
      <UserImage user={buddy} />
      <div id='buddy-info'>
        <h3>
          <a href={`/users/${buddy.id}`} >{buddy.username}</a>
        </h3>
      </div>
    </div>
  )
};

export default Buddies;