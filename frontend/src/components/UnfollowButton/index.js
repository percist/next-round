import React from 'react';
import { fetchDeleteBuddy } from './UnfollowButtonUtils';

const UnfollowButton = ({ userId, buddyId, setIsBuddy }) => {

  return (
    <div onClick={()=> fetchDeleteBuddy(userId, buddyId, setIsBuddy)}>
      Unfollow
    </div>
  )
}

export default UnfollowButton