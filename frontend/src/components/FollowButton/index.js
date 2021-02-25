import React from 'react';
import { TiUserAdd } from 'react-icons/all';
import { fetchCreateBuddy } from './FollowButtonUtils';
import './FollowButton.css';

const FollowButton = ({ userId, buddyId, setIsBuddy }) => {

  return (
    <TiUserAdd className="follow-icon" onClick={()=> fetchCreateBuddy(userId, buddyId, setIsBuddy)}/>
  )
}

export default FollowButton