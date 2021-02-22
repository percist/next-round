import React, { useEffect, useState } from 'react';
import {timeDifference} from '../../dateUtilities';
import CommentFeed from '../CommentFeed';
import CommentForm from '../CommentForm';
import UserImage from '../UserImage';
import spinner from  '../../Spinner-1s-44px.gif'
import { receiverFetchFunction, fetchRoundComments } from './RoundsCardUtils';

const RoundsCard = ({ user, site, item, round, type }) => {
  const [receiver, setReceiver] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    receiverFetchFunction(round, type, setReceiver);
  }, [type, round])

  useEffect(() => {
    fetchRoundComments(round, setComments);
  }, [round])

  if (type === "user") user = receiver;

  return (
    <div className="rounds-card" >
      <div className="rounds-card-header">
        <div id="rounds-card-header_image">
          {!user && <img src={spinner} alt="loading..."/>}
          {user && <UserImage user={user} />}
        </div>
        <div className="rounds-card-header-description">
          <div id="rounds-card-header_name">
            {!user && <img src={spinner} alt="loading..."/>}
            {user && user.username}
          </div>
          <div id="rounds-card-header_time">
            {/* using createdAt for demo but in production would use updatedAt*/}
            {timeDifference(round.createdAt)} 
          </div>
        </div>
      </div>
        <div id="rounds-card-header_comment">
          {round.comment}
        </div>
      <div className="rounds-card-image">
        {!round.imgUrl &&
          !site.imgUrl &&
          <img src={spinner} alt="loading..."/>
        }
        {round.imgUrl &&
          <img src={round.imgUrl} alt="round"
          />}
        {!round.imgUrl &&
          site.imgUrl &&
          <img src={site.imgUrl} alt="site"
          />}
      </div>
      <div className="rounds-card-info">
        <div id="rounds-card-info_site_name">
          {!site && <img src={spinner} alt="loading..."/>}
          {site &&
            <a href={`/sites/${site.id}`} >
              {site.name}
            </a>}
        </div>
        <div id="rounds-card-info_site_item">
         {!item && <img src={spinner} alt="loading..."/>}
          {item && `${item.name}`}
        </div>
        <div id="rounds-card-info_site_location">
          {!site && <img src={spinner} alt="loading..."/>}
          {site && `${site.city}, ${site.state}`}
        </div>
      </div>
        <hr id="rounds-card-info_divider" color='silver'/>
        <div id="rounds-card-info_comments">
          <CommentForm round={round} comments={comments} setComments={setComments}/>
          <CommentFeed round={round} comments={comments} setComments={setComments}/>
        </div>
    </div>
  )
};

export default RoundsCard;