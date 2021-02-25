import { FaUserFriends } from 'react-icons/all';
import FollowButton from '../FollowButton';

export const followSwitch = (isBuddy, setIsBuddy, buddyId, userId) =>{
  if (isBuddy) {
    return <FaUserFriends />
  }else{
    return <FollowButton buddyId={buddyId} userId={userId} setIsBuddy={setIsBuddy}/>
  }
}