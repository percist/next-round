import React from 'react';
import UserRoundsFeed from '../UserRoundsFeed';
import SiteRoundsFeed from '../SiteRoundsFeed';
import spinner from  '../../Spinner-1s-44px.gif';
import './RoundsFeed.css';

const RoundsFeed = ({ rounds, site, type }) => {

  if (type === "users") {
    return (
      <div className="rounds-feed">
        {!Array.isArray(rounds) && <image src={spinner} />}
        {Array.isArray(rounds) && <UserRoundsFeed roundsArray={rounds} />}
      </div>
    )
  } else if (type === "site") {
    return (
      <div className="rounds-feed">
        {!site && <image src={spinner} />}
        {site && Array.isArray(rounds) && rounds.map((round, i) => {
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