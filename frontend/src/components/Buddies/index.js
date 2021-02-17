import React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import "./Buddies.css"


const Buddies = ({ buddy }) => {

  return (
    <div className="buddy">
      {!buddy.imgUrl && <IoPersonCircleOutline />}
      {buddy.imgUrl && <img src={buddy.imgUrl} alt="user" />}
      <div id='buddy-info'>
        <h3>
          <a href={`/users/${buddy.id}`} >{buddy.username}</a>
        </h3>

      </div>
    </div>

  )
}

export default Buddies;