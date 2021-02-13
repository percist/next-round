import React from 'react';
import UserRoundsFeed from '../UserRoundsFeed';
import SiteRoundsFeed from '../SiteRoundsFeed';
import './RoundsFeed.css'

const RoundsFeed = ({ rounds, site, type }) => {

    if (type == "users") {
        return (
            <div className="rounds-feed">
                {!Array.isArray(rounds) && <h2>loading...</h2>}
                {Array.isArray(rounds[0]) && rounds.map((round, i) => {
                    if (round) return <UserRoundsFeed roundArray={round} key={i} />
                    else return null
                })}
            </div>
        )
    } else if (type == "site") {
        return (
            <div className="rounds-feed">
                {!site && <h2>loading...</h2>}
                {site && Array.isArray(rounds) && rounds.map((round, i) => {
                    if (round) return <SiteRoundsFeed round={round} key={i} site={site} />
                    else return "No Rounds Redeemed Here Yet."
                })}
            </div>
        )
    }
}

export default RoundsFeed;