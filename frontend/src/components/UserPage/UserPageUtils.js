import React from "react";
import { FaUserFriends } from 'react-icons/all';
import FollowButton from '../FollowButton';

export const followSwitch = (isBuddy, setIsBuddy, buddyId, userId) =>{
  if (isBuddy) {
    return <FaUserFriends className="following-icon"/>
  }else{
    return <FollowButton buddyId={buddyId} userId={userId} setIsBuddy={setIsBuddy}/>
  }
}

export const fetchIfBuddies = async (userId, buddyId, setIsBuddy) => {
  const getIfBuddy = async () => {
    const res = await fetch(`/api/users/${userId}/buddies/${buddyId}`)
    if (res.ok) return res.json();
  };
  const {buddy} = await getIfBuddy();
  setIsBuddy(!!buddy);
}