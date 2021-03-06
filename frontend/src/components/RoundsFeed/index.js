import React from 'react';
import UserRoundsFeed from '../UserRoundsFeed';
import SiteRoundsFeed from '../SiteRoundsFeed';
import spinner from  '../../Spinner-1s-44px.gif';
import './RoundsFeed.css';

const RoundsFeed = ({ rounds, site, type }) => {

  if (type === "users") {
    return (
      <div className="rounds-feed">
        {!Array.isArray(rounds) && <img src={spinner} alt="loading..."/>}
        {Array.isArray(rounds) && <UserRoundsFeed roundsArray={rounds} />}
      </div>
    )
  } else if (type === "site") {
    return (
      <div className="rounds-feed">
        {!site && <img src={spinner} alt="loading..."/>}
        {site && Array.isArray(rounds) && rounds.sort((a,b)=> a.updatedAt - b.updatedAt).map((round, i) => {
          if (!!round) {
            return <SiteRoundsFeed round={round} key={i} site={site} />
          } else return null
        })}
        {site && !rounds[0]}
      </div>
    )
  }
};

export default RoundsFeed;