import React from 'react';
import "./Buddies.css"


const Buddies = ({ buddy, rounds, sites }) => {

    //TODO fetch buddy most recent round with status used (see if we can reuse the rounds sidebar call)
    //TODO fetch item of round
    //TODO fetch Site who has item on their menu

    return (
        <div className="buddy">
            <img src={buddy.imgUrl} alt="user"/>
            <div className='buddy-info'>
                <h4>{buddy.username}</h4> {`recently enjoyed a ${buddy.Rounds[0].Items[0].name} at ${buddy.Rounds[0].Items[0].Sites[0].name}`} 
            </div>
        </div>
        
    )
}

export default Buddies;