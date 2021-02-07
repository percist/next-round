import React from 'react';
import UserRoundsCard from '../UserRoundsCard';
import SiteRoundsCard from '../SiteRoundsCard';

const RoundsFeed = ({ rounds, site }) => {
    return (
        <div className="rounds-feed">
            {!Array.isArray(rounds) && <h2>loading...</h2> }
            {Array.isArray(rounds[0]) && rounds.map(round => {
                if (round) return <UserRoundsCard round={round} />
                else return null
            })}
            {Array.isArray(rounds) && rounds.map(round => {
                if (round) return <SiteRoundsCard round={round} site={site}/>
                else return "No Rounds Redeemed Here Yet."
            })}
        </div>
    )
}

export default RoundsFeed;