import React from 'react';
import UserRoundsCard from '../UserRoundsCard';
import SiteRoundsCard from '../SiteRoundsCard';
import './RoundsFeed.css'

const RoundsFeed = ({ rounds, site }) => {
    return (
        <div className="rounds-feed">
            {!Array.isArray(rounds) && <h2>loading...</h2> }
            {Array.isArray(rounds[0]) && rounds.map((round,i) => {
                if (round) return <UserRoundsCard round={round} key={i}/>
                else return null
            })}
            {site && Array.isArray(rounds) && rounds.map((round, i) => {
                if (round) return <SiteRoundsCard round={round} key={i} site={site}/>
                else return "No Rounds Redeemed Here Yet."
            })}
        </div>
    )
}

export default RoundsFeed;