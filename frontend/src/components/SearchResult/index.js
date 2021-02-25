import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserImage from '../UserImage';
import { FaUserFriends } from 'react-icons/all';
import FollowButton from '../FollowButton';

const SearchResult = ({ type, result, buddy }) => {
  const [ isBuddy, setIsBuddy ] = useState(false);
  const dispatch = useDispatch();

  const followSwitch = () =>{
    if (buddy) {
      return <FaUserFriends />
    }else{
      return <FollowButton userId={result.id}/>
    }
  }

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