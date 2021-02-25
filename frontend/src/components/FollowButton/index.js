import React from 'react';
import { TiUserAdd } from 'react-icons/all';
import { fetchCreateBuddy } from './FollowButtonUtils';

const FollowButton = ({ userId, buddyId, setIsBuddy }) => {

  return (
    <TiUserAdd onClick={()=> fetchCreateBuddy(userId, buddyId, setIsBuddy)}/>
  )
}

export default FollowButton