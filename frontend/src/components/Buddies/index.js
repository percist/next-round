import React from 'react';

const Buddies = ({ buddy, rounds, sites }) => {

    //TODO fetch buddy most recent round with status used (see if we can reuse the rounds sidebar call)
    //TODO fetch item of round
    //TODO fetch Site who has item on their menu

    return (
        <div className="buddy">
           {`${buddy.username} had a ${buddy.Rounds[0].Items[0].name} at ${buddy.Rounds[0].Items[0].Sites[0].name}`} 
        </div>
        
    )
}

export default Buddies;