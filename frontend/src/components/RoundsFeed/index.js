import React from 'react';
import RoundsCard from '../RoundsCard';

const RoundsFeed = ({ rounds }) => {
    return (
        <div className="rounds-feed">
            {!Array.isArray(rounds) && <h2>loading...</h2> }
            {Array.isArray(rounds) && rounds.map(round => {
                if (round) return <RoundsCard round={round} />
                else return null
            })}
        </div>
    )
}

export default RoundsFeed;