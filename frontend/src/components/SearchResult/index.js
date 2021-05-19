import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import UserImage from '../UserImage';
import { FaUserFriends, IoStorefront, FaGlassCheers } from 'react-icons/all';
import FollowButton from '../FollowButton';

const SearchResult = ({ type, result, buddy }) => {
  const [isBuddy, setIsBuddy] = useState(false);
  const { user } = useSelector(state => state.session)

  const followSwitch = () => {
    if (isBuddy) {
      return <FaUserFriends className="following-icon" />
    } else {
      return <FollowButton buddyId={result.id} userId={user.id} setIsBuddy={setIsBuddy} />
    }
  }

  useEffect(() => {
    setIsBuddy(buddy)
  }, [buddy])

  if (type === "user") {
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
        <div className="user search-result-content_icon">
        {followSwitch()}
      </div>
      </div>
    );
  }
  else if(type === "site"){
    return (
      <div className="site search-result">
        <div className="site search-result-content">
          <div className="site search-result-image">
            <a href={`/sites/${result.id}`} >
              {!user.imgUrl && <IoStorefront />}
              {user.imgUrl &&
                <img
                  className="business-image"
                  src={result.imgUrl}
                  alt="business"
                />}
            </a>
          </div>
          <div className="site search-result-info">
            <div><a href={`/sites/${result.id}`} >{result.name}</a></div>
            <div>Business</div>
            <div>{`${result.address} ${result.city}, ${result.state}`}</div>
          </div>
        </div>
        <div className="site search-result-content_icon">
        <IoStorefront className="following-icon"/>
      </div>
      </div>
    );
  }
  else if(type === "item"){
    console.log(result)
    return (
      <div className="item search-result">
        <div className="item search-result-content">
          <div className="item search-result-image">
            <a href={`/sites/${result.id}`} >
              {!user.imgUrl && <FaGlassCheers />}
              {user.imgUrl &&
                <img
                  className="search-item-image"
                  src={result.imgUrl}
                  alt="item"
                />}
            </a>
          </div>
          <div className="item search-result-info">
            <div>{result.name}</div>
            {!Array.isArray(result.Sites) && 'loading...'}
            {Array.isArray(result.Sites) && <div>On the menu at <a href={`/sites/${result.Sites[0].id}`} >{result.Sites[0].name}</a></div>}
            <div>{`${result.description}`}</div>
          </div>
        </div>
        <div className="item search-result-content_icon">
        <FaGlassCheers className="following-icon"/>
      </div>
      </div>
    );
  }
};

export default SearchResult;