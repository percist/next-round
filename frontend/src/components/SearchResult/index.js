import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import UserImage from '../UserImage';
import { FaUserFriends } from 'react-icons/all';
import FollowButton from '../FollowButton';

const SearchResult = ({ type, result, buddy }) => {
  const [ isBuddy, setIsBuddy ] = useState(false);
  const {user} = useSelector(state=> state.session)

  const followSwitch = () =>{
    if (isBuddy) {
      return <FaUserFriends />
    }else{
      return <FollowButton buddyId={result.id} userId={user.id} setIsBuddy={setIsBuddy}/>
    }
  }

  useEffect(()=>{
    setIsBuddy(buddy)
  },[])

  if (type === "user"){
  return (
    <div className="user search-result">
      <div className="user search-result-content">

      <div className="user search-result-content_image">
        <UserImage user={result} />
      </div>
      <div className="user search-result-content_info">
        <div><a href={`/users/${result.id}`} >{result.username}</a></div>
        <div>Person</div>
        <div><a href={`/users/${result.id}`} >{`${result.firstName} ${result.lastName}`}</a></div>
      </div>
      </div>
      {followSwitch()}
    </div>
  );
  }
  else{
    return (
      <div className="site search-result">
        <div className="site search-result-image">

        </div>
        <div className="site search-result-info">
          <div><a href={`/users/${result.id}`} >{result.name}</a></div>
          <div>Business</div>
          <div>{`${result.address} ${result.city}, ${result.state}`}</div>
        </div>
        
      </div>
    );
  }
};

export default SearchResult;