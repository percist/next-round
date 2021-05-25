import React from 'react';
import UserImage from '../UserImage';
import "./Buddies.css";

const Buddies = ({ buddy }) => {

  return (
    <div className="buddy">
      <UserImage user={buddy} />
      <div className='buddy-info'>
          <a href={`/users/${buddy.id}`} >{buddy.username}</a>
      </div>
    </div>
  )
};

export default Buddies;