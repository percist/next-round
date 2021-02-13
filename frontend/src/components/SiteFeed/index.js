import React from 'react';
import UserRoundsCard from '../UserRoundsCard';

const SiteFeed = ({ sites }) => {
    return (
        <div className="rounds-feed">
        {!Array.isArray(sites) && <h2>loading...</h2> }
        {Array.isArray(sites[0]) && sites.map((round,i) => {
            if (round) return <UserRoundsCard round={round} key={i}/>
            else return null
        })}
    </div>
    )
}

export default SiteFeed;